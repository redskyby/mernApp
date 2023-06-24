import React from 'react';
import './file.css';
import dirLogo from '../../../../assets/dir.svg';
import fileLogo from '../../../../assets/file.svg';
import {useDispatch, useSelector} from "react-redux";
import {PUSH_TO_STACK, SET_CURRENT_DIR} from "../../../../redux/slice/FileSlice";
import {deleteFile, downloadFile} from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";


function File({file, setCheckPlace}) {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.fileToolkit.currentDir);
    const fileView = useSelector(state => state.fileToolkit.view);

    function openDirHandler() {
        if (file.type === 'dir') {
            dispatch(SET_CURRENT_DIR(file._id));
            dispatch(PUSH_TO_STACK(currentDir));
        }
    }

    function downloadClickerHandler(e) {
        e.stopPropagation();
        downloadFile(file);
    }

    function deleteClickHandler(e) {
        e.stopPropagation();
        dispatch(deleteFile(file));
    }

    if (fileView === 'list') {
        return (
            <div
                className='file'
                onClick={() => openDirHandler(file)}

                onMouseOver={(e) => {
                    e.stopPropagation();
                    setCheckPlace(true)
                }}

                onMouseLeave={(e) => {
                    e.stopPropagation();
                    setCheckPlace(false)
                }}
            >
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img"/>
                <div className="file__name">{file.name}</div>
                <div className="file__date">{file.date.slice(0, 10)}</div>
                <div className="file__size">{sizeFormat(file.size)}</div>
                {file.type !== 'dir' &&
                    <button
                        onClick={(e) => downloadClickerHandler(e)}
                        type="button"
                        className='file__btn file__download'
                    >download</button>
                }
                <button
                    onClick={(e) => deleteClickHandler(e)}
                    type="button"
                    className='file__btn file__delete'
                >delete
                </button>
            </div>
        );
    }
    if (fileView === 'plate') {
        return (
            <div
                className='file-plate'
                onClick={() => openDirHandler(file)}

                onMouseOver={(e) => {
                    e.stopPropagation();
                    setCheckPlace(true)
                }}

                onMouseLeave={(e) => {
                    e.stopPropagation();
                    setCheckPlace(false)
                }}
            >
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file-plate__img"/>
                <div className="file-plate__name">{file.name}</div>
                <div className="file-plate__btns">

                    {file.type !== 'dir' &&
                        <button
                            onClick={(e) => downloadClickerHandler(e)}
                            type="button"
                            className='file-plate__btn file-plate__download'
                        >download</button>
                    }
                    <button
                        onClick={(e) => deleteClickHandler(e)}
                        type="button"
                        className='file-plate__btn file-plate__delete'
                    >delete
                    </button>
                </div>
            </div>
        );
    }
}

export default File;