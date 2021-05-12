import "../../css/Modal.css";
import addButton from "../../images/add-note.png";
import React, {useContext, useState} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {database} from "../../firebase";
import {useAuth} from "../../context/AuthContext";
import {BookIdContext} from "../../context/BookIdContext";

export default function AddNoteButton({currentFolder}) {
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState("");
    const {currentUser} = useAuth();
    const [bookId] = useContext(BookIdContext);
    
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
        
        // CREATE A NOTE IN THE DB
        database.notes.add({
            bookId: bookId,
            note: note,
            folderId: currentFolder.id,
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
                                <form className="form" name="note" onSubmit={handleSubmit}>

                                    <h3>NOTE</h3>

                                    <div className="input-form">
                                        <label htmlFor="note"></label>

                                        <input 
                                            type="text" 
                                            maxLength="500"
                                            id="note" 
                                            required 
                                            value={note}
                                            onChange={e => setNote(e.target.value)}
                                            autoFocus
                                        />
                                    </div>

                                    <button type="submit">ADD NOTE</button>

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
