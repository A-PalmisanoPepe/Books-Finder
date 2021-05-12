import "../../css/BoxInfo.css";
import imgNotAvailable from "../../images/img-not-available.png";
import React, { useState, useEffect } from "react";
import _ from "lodash";
import axios from 'axios';
import Note from "./Note";
import DeleteNote from "./DeleteNote";
import {apikey} from '../../apikey';


export default function SavedBook({note}) {
    const [result, setResult] = useState({});
    const [img, setImg] = useState({});

    useEffect(() => {
        getData();
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    const getData = async () => {
        try {
            const data = await axios.get(
                `https://www.googleapis.com/books/v1/volumes/${note.bookId}?key=${apikey}`
            );
            const result = await data.data;
            const image = await result.volumeInfo.imageLinks;
            setResult(result);
            setImg(_.get(image, "thumbnail", imgNotAvailable));
        } catch (err) {
            console.error(err);
        }
    };

    const presentBook = () => {
        return (
                <div className="box-info no-transform">
                    <div className="saved-book">
                    <div className="container-thumbnail">
                        <img src={img} alt="" />
                    </div>

                    <div className="container-text-box-info">
                        <div className="text-box-info">
                            <h2>{_.get(result.volumeInfo, "title", "")}</h2>

                            <h3>{_.join(_.get(result.volumeInfo, "authors", ""), ", ")}</h3>

                            <h3>
                                Available on{" "}
                                <a href={_.get(result.volumeInfo, "infoLink", "")} target="_blank" rel="noreferrer">
                                    Google play
                                </a>.{" "}
                            </h3>
                        </div>

                        <Note note={note}/></div>
                        
                    </div><DeleteNote note={note}/>
                </div>
        );
    }

    const noBook = () => {
        return (
            <Note note={note}/>
        )
    }

    if(!note.bookId || !result) {
        return noBook();
    } else {
        return presentBook();
    }
}
