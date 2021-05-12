import "../../css/PersonalArea.css";
import React from "react";
import {useParams, useLocation} from "react-router-dom";
import {useFolder} from "../../hooks/useFolder";
import AddFolderButton from "./AddFolderButton";
import Folder from "./Folder";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import AddNoteButton from "./AddNoteButton";
import SavedBook from './SavedBook';


function PersonalArea() {
    const { folderId } = useParams();
    const { state = {} } = useLocation();
    const { folder, childFolders, childNotes } = useFolder(folderId, state.folder);

    return (
        <div className="Personal-area">
            <div className="folders-navbar">
                <FolderBreadcrumbs currentFolder={folder} />

                <div className="container-add-button">
                    <AddFolderButton currentFolder={folder} />
                    <AddNoteButton currentFolder={folder} />
                </div>
            </div>
            {childFolders.length > 0 && (

                childFolders.map((childFolder) => (
                    <div key={childFolder.id} className="container-box-info">
                        <Folder folder={childFolder}/>
                    </div>
                ))

            )}
            {childNotes.length > 0 && (

                childNotes.map((childNote) => (
                    <div key={childNote.id} className="container-box-info">
                        <SavedBook note={childNote}/>
                    </div>
                ))

            )}
        </div>
    );
}

export default PersonalArea;
