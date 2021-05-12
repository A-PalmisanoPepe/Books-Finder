import "../../css/Modal.css";
import addButton from "../../images/add-folder.png";
import React, {useState} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {database} from "../../firebase";
import {useAuth} from "../../context/AuthContext";
import {ROOT_FOLDER} from "../../hooks/useFolder";

export default function AddFolderButton({currentFolder}) {
    const [open, setOpen] = useState(false);
    const [folderName, setFolderName] = useState("");
    const {currentUser} = useAuth();
    
    function openModal() {
        setOpen(true);
    }

    function closeModal(e) {
        e.stopPropagation();
        setOpen(false);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(currentFolder == null) return

        //CREATE PATH
        let path = [] ;
        path = [...currentFolder.path];

        if (currentFolder !== ROOT_FOLDER) {
            path.push({folderName: currentFolder.folderName, id: currentFolder.id});
        }
        
        // CREATE A FOLDER IN THE DB
        database.folders.add({
            folderName: folderName,
            parentId: currentFolder.id,
            userId: currentUser.uid,
            path: path,
            createdAt: database.getCurrentTimestamp()
        }).then((docRef) => {
            console.log("Document written with ID: " + docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: " + error);
        });
        setFolderName("");
        closeModal(e);
    }

    function Button() {
        return(
            <div className="add-button">
                <img src={addButton} alt=""/>
            </div>
        )
    }

    function Modal() {
        if(open) {
            return(
                <div className="container-modal-button">
                    <Button/>
                    
                    <CSSTransition in={open} timeout={300} classNames="modal-transition">
                    <div className="modal-container">
                        <div className="modal">
                            <form className="form" name="folder-name" onSubmit={handleSubmit}>
                                <h3>FOLDER NAME</h3>

                                <div className="input-form" >
                                    <label htmlFor="name"></label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        maxLength="20"
                                        required 
                                        value={folderName}
                                        onChange={e => setFolderName(e.target.value)}
                                        autoFocus
                                    />
                                </div>

                                <button type="submit">ADD FOLDER</button>

                                <button type="button" onClick={closeModal}>CLOSE</button>
                            </form>
                        </div>
                    </div>
                    </CSSTransition>
                </div>
            )
        } else {
            return(
                <div className="container-modal-button">
                    <Button/>
                </div>
            )
        }
    }
  
    return (
        <div className="container-modal-button" onClick={openModal}>
            <TransitionGroup>
            <Modal/>
            </TransitionGroup>
        </div>
    )
}
