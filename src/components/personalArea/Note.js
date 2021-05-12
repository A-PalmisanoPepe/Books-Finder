import "../../css/Note.css";
import "../../css/BoxInfo.css";
import imgNote from "../../images/note.png";
import React from 'react';
import DeleteNote from "./DeleteNote";

export default function Note({note}) {
    const prensentNote = () => {
        if (!note.bookId) {
            return (
                <div className="box-info no-transform">
                    <div className="container-note">
                        <div className="container-thumbnail">
                            <img src={imgNote} alt=""/>
                        </div>

                        <div className="container-text-box-info">
                            <div className="text-box-info">
                                <div className="note">
                                    <h4>NOTE</h4>

                                    {note.note}
                                </div>
                            </div>
                        </div>
                    </div>

                    <DeleteNote note={note}/>
                </div>
            )
        } else {
            return (
                <div className="note">
                    <h4>NOTE</h4>

                    {note.note}
                </div>
            )
        }
    }

    const noNote = () => {
        return (
            null
        )
    }

    if (!note.note) {
        return noNote();
    } else {
        return prensentNote();
    }
}
