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

       // if(currentDir) {
           // dispatch(PUSH_TO_STACK(currentDir));
            dispatch(SET_CURRENT_DIR(file._id));

            dispatch(PUSH_TO_STACK(currentDir));
       /* }else{
           // dispatch(PUSH_TO_STACK(file._id));
            dispatch(SET_CURRENT_DIR(file._id));
            dispatch(PUSH_TO_STACK(file._id));
        }*/

    }

    return (
       <div
           className='file'
           onClick={ file.type === 'dir' ? () => openDirHandler() : ''}
       >
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img"/>
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0,10)}</div>
            <div className="file__size">{file.size}</div>
        </div>

    );
}

export default File;