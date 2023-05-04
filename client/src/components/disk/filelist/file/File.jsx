import React from 'react';
import './file.css';
import dirLogo from '../../../../assets/dir.svg';
import fileLogo from '../../../../assets/file.svg';
import {useDispatch, useSelector} from "react-redux";
import {PUSH_TO_STACK, SET_CURRENT_DIR} from "../../../../redux/slice/FileSlice";


function File({file}) {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.fileToolkit.currentDir);

    function openDirHandler() {
        if(file.type === 'dir'){
            dispatch(SET_CURRENT_DIR(file._id));
            dispatch(PUSH_TO_STACK(currentDir));
        }
    }

    return (
        <div
            className='file'
            onClick={() => openDirHandler(file)}
        >
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img"/>
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0, 10)}</div>
            <div className="file__size">{file.size}</div>
        </div>

    );
}

export default File;