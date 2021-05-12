import "../../css/Folder.css";
import "../../css/BoxInfo.css";
import imgFolder from "../../images/folder.png";
import React from 'react';
import {Link} from "react-router-dom";
import DeleteFolder from "./DeleteFolder";

export default function Folder({folder}) {
    const prensentFolder = () => {
        return (
            <div className="box-info">
                <Link className="folder" to={{pathname: `/folder/${folder.id}`, state: { folder: folder }}}>
                    <div className="container-thumbnail">
                        <img src={imgFolder} alt=""/>
                    </div>

                    <div className="container-text-box-info">
                        <div className="text-box-info">
                            <h2>{folder.folderName}</h2>
                        </div>
                    </div>
                </Link>
            
                <DeleteFolder folder={folder}/>
            </div>
        )
    }

    if (!folder) {
        return (
            null
        );
    } else {
        return prensentFolder();
    }
}
