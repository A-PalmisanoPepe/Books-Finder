import {useReducer, useEffect} from "react";
import {database} from "../firebase";
import {useAuth} from "../context/AuthContext";

const ACTIONS = {
    SELECT_FOLDER: "select-folder",
    UPDATE_FOLDER: "update-folder",
    SET_CHILD_FOLDERS: "set-child-folders",
    SET_CHILD_NOTES: "set-child-notes",
}

export const ROOT_FOLDER = { folderName: 'Root', id: null, path: []  }

function reducer(state, { type, payload}) {
    switch (type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childNotes: [],
                childFolders: []
            }
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: payload.folder
            }
        case ACTIONS.SET_CHILD_FOLDERS:
            return {
                ...state,
                childFolders: payload.childFolders
            }
        case ACTIONS.SET_CHILD_NOTES:
            return {
                ...state,
                childNotes: payload.childNotes,
            }
        default:
            return state
    }
}

export function useFolder(folderId = null, folder = null) {
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childNotes: []
    })
    const { currentUser } = useAuth();

    useEffect(() => {
        dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } })
    }, [folderId, folder])

    useEffect(() => {
        if (folderId == null) {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: ROOT_FOLDER }
            })
        }
        database.folders
        .doc(folderId)
        .get()
        .then(doc => {
            dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: database.formatDoc(doc) }
            })
        })
        .catch(() => {
            dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: ROOT_FOLDER },
            })
        })
    }, [folderId])

    useEffect(() =>{
        return database.folders
        .where("parentId", "==", folderId)
        .where("userId", "==", currentUser.uid)
        .orderBy("createdAt")
        .onSnapshot(snapshot => {
            dispatch({
                type: ACTIONS.SET_CHILD_FOLDERS,
                payload: { childFolders: snapshot.docs.map(database.formatDoc) }
            })
        })
    }, [folderId, currentUser])

    useEffect(() => {
        return (
          database.notes
            .where("folderId", "==", folderId)
            .where("userId", "==", currentUser.uid)
            .orderBy("createdAt")
            .onSnapshot(snapshot => {
              dispatch({
                type: ACTIONS.SET_CHILD_NOTES,
                payload: { childNotes: snapshot.docs.map(database.formatDoc) },
              })
            })
        )
      }, [folderId, currentUser])

    return state
}