import "../../css/FolderBreadcumbs.css";
import React from 'react';
import {Link} from "react-router-dom";
import {ROOT_FOLDER} from '../../hooks/useFolder';

export default function FolderBreadcrumbs({currentFolder}) {
    let path = [];
    path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
    if(currentFolder) {
        path = [...path, ...currentFolder.path]
    }

    function link(folder, index) {
        let pathName;
        if(folder.id) {
            pathName = `/folder/${folder.id}`;   
        } else {
            pathName = "/personal-area"; 
        } 
        return {
            pathname: pathName,
            state: { folder: { ...folder, path: path.slice(1, index)} }
        }
    }

    return (
        <div className="Folder-breadcumbs">
            {path.map((folder, index) => (
                <div key={folder.id}>                   
                    <Link to={() => link(folder, index)}><div className="link">{folder.folderName}<p>&nbsp;/&nbsp;</p></div></Link> 
                </div>
            ))}
            {currentFolder && (
                <div>
                    <p>{currentFolder.folderName}</p>
                </div>
            )}
        </div>
    )
}
