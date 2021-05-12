import "../../css/Modal.css";
import "../../css/DeleteButton.css";
import deleteImg from "../../images/delete.png";
import React, {useState, useEffect} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {database} from "../../firebase";
import {useAuth} from "../../context/AuthContext";

export default function DeleteNote({note}) {
    const [open, setOpen] = useState(false);
    const [idNote, setIdNote] = useState("");
    const { currentUser } = useAuth();

    function openModal() {
        setOpen(true);
    }

    function closeModal(e) {
        e.stopPropagation();
        setOpen(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        database.notes
        .where("userId", "==", currentUser.uid)
        .where("createdAt", "==", note.createdAt)
        .get()
        .then((doc) => doc.forEach((doc)=>setIdNote(doc.id)))
        .catch((error) => {
            console.error("Error reading document: " + error);
        });
        closeModal(e);
    }

    function deleteNote() {
        if(idNote) {
            database.notes
            .doc(idNote)
            .delete()
            .then(() => console.log("Note deleted."))
            .catch((error) => {
                console.error("Error deleting document: " + error);
            });
        }
    }

    useEffect(() => {
        return deleteNote();
    }, [idNote])  // eslint-disable-line react-hooks/exhaustive-deps

    function Button() {
        return (
            <div className="button-delete">
                <img src={deleteImg} alt=""/>
            </div>
        )
    }

    function Modal() {
        if (open) {
            return (
                <div className="container-modal-button">
                    <Button/>
                    
                    <CSSTransition in={open} timeout={300} classNames="modal-transition">
                        <div className="modal-container-mini">
                            <div className="modal-mini form">
                                <button type="button" onClick={handleSubmit}>DELETE NOTE</button>

                                <button type="button" onClick={closeModal}>CLOSE</button>
                            </div>
                        </div>
                    </CSSTransition>
                </div>
            )
        } else {
            return (
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
