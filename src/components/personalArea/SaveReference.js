import "../../css/Modal.css";
import React, {useContext, useState, useEffect} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {database} from "../../firebase";
import {useAuth} from "../../context/AuthContext";
import {BookIdContext} from "../../context/BookIdContext";

export default function SaveReference() {

    const { currentUser } = useAuth();
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState("");
    const [bookId] = useContext(BookIdContext);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [response, setResponse] = useState([]);
    let arrayFolder = [];
   
    function openModal() {
        setOpen(true);
    }

    function closeModal(e) {
        e.stopPropagation();
        setOpen(false);
    }

    function handleSubmit(e) {
        e.preventDefault();

        // CREATE A NOTE IN THE DB
        database.notes.add({
            bookId: bookId,
            note: note,
            folderId: selectedFolder,
            userId: currentUser.uid,
            createdAt: database.getCurrentTimestamp()
        }).then((docRef) => {
            console.log("Document written with ID: " + docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: " + error);
        });
        setNote("");
        closeModal(e);
    }

    async function CreateFoldersList() {
        if(currentUser) {
        let data = await database.folders.where("userId", "==", currentUser.uid).get();
        
        data.forEach((doc) => {
            arrayFolder.push({ folderId: doc.id, folderName: doc.data().folderName});
        }); 
        setResponse(arrayFolder);
        }
    }

    useEffect(() => {
        return CreateFoldersList();    
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    function FoldersList() {
        return (
            response.map(folder => (
                    <div className="select-folder" key={folder.folderId} onClick={()=> setSelectedFolder(folder.folderId)}>
                        <h4>{folder.folderName}</h4>
                    </div>
            ))
        )
    }

    function SelectFolderInstruction() {
        if (response.length < 1) {
            return (
                <div className="container-instructions">
                    There are no folder in your Personal Area. Book reference will be stored in the Root Folder. 
                </div>    
            )
        } else {
            return (
                <div className="container-instructions"> 
                    <h4>SELECT A FOLDER:</h4>

                    <div className="container-select-folder">
                        <FoldersList/>
                    </div>

                    <h4>OR CHOOSE THE&nbsp;<div className="select-root-folder" onClick={()=> setSelectedFolder(null)}>ROOT FOLDER</div>.</h4>
                </div>
            )
        }
    }

    function Modal() {
        if(open) {
            return(
                <div className="container-modal-button">
                    <CSSTransition in={open} timeout={300} classNames="modal-transition">
                        <div className="modal-container">
                            <div className="modal">
                                <form className="form" name="note" onSubmit={handleSubmit}>                                
                                    <h3>SAVE BOOK REFERENCE</h3>

                                    <SelectFolderInstruction/>
                                
                                    <div className="input-form">
                                        <label htmlFor="note">NOTE:</label>

                                        <input 
                                            type="text" 
                                            id="note" 
                                            maxLength="500"
                                            value={note}
                                            onChange={e => setNote(e.target.value)}
                                            autoFocus
                                        />
                                    </div>

                                    <button type="submit">SAVE REFERENCE</button>

                                    <button type="button" onClick={closeModal}>CLOSE</button>
                                </form>
                            </div>
                        </div>
                    </CSSTransition>
                </div>
            )
        } else {
            return(
                null
            )
        }
    }

  function SaveReferenceButton() {
    if (currentUser) {
      return (
        <div className="container-modal-button">
            <div className="options-result" onClick={openModal}>SAVE REFERENCE</div>

            <Modal/>    
        </div>
      );
    } else {
        return(
            null
        )
    }
  }

  return(
    <TransitionGroup>
        <SaveReferenceButton/>
    </TransitionGroup>
  )
}
