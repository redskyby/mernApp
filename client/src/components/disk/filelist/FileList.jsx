import React from 'react';
import {useSelector} from "react-redux";
import './fileList.css'
import File from "./file/File";

function FileList() {
    const files = useSelector(state => state.fileToolkit.files).map(file => <File key={file.id} file={file}/>);

    return (
        <div className='filelist'>
            <div className="filelist__header">
                <div className="filelist__name">Название</div>
                <div className="filelist__date">Дата</div>
                <div className="filelist__size">Размер</div>
            </div>
            {files}
        </div>
    );
}

export default FileList;