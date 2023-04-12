import React from 'react';
import './fileList.css';
import {useSelector} from "react-redux";

function File() {
    const files = useSelector(state => state.fileToolkit.files);

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

export default File;