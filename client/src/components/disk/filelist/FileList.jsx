import React, {useState} from 'react';
import {useSelector} from "react-redux";
import './fileList.css'
import File from "./file/File";

function FileList() {
    const [checkPlace , setCheckPlace] = useState(false);
    const files = useSelector(state => state.fileToolkit.files).map(file => <File key={file._id} file={file} setCheckPlace={setCheckPlace}/>);

    return (
        <div className='filelist'>
            <div
                className="filelist__header"
            >
                <div className="filelist__name">Название</div>
                <div className={checkPlace ? "filelist__change__place__date" : "filelist__date" }  >Дата</div>
                <div className={checkPlace ? "filelist__change__place__size" : "filelist__size"}>Размер</div>
            </div>
            {files}
        </div>
    );
}

export default FileList;