import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {POP_TO_STACK,  SET_POPUP_DISPLAY} from "../../redux/slice/FileSlice";
import {getFiles, upLoadFile} from "../../actions/file";
import FileList from "./filelist/FileList";
import './disk.css';
import PopUp from "./PopUp";

function Disk() {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.fileToolkit.currentDir);
    const dirStack = useSelector(state => state.fileToolkit.dirStack);
    const [dragEnter , setDragEnter] = useState(false);

    useEffect(()=>{
            dispatch(getFiles(currentDir));
    }, [currentDir]);

    function showPopUpHandler() {
        dispatch(SET_POPUP_DISPLAY('flex'));
    }

    function backClickHandler() {
        dispatch(POP_TO_STACK(dirStack));
    }

    function fileUploadsHandler(event) {
        const files = [...event.target.files];
        files.forEach(file =>dispatch(upLoadFile(file , currentDir)))
    }

    function dragEnterHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
        console.log(dragEnter);
    }

    function dragLeaveHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false);
    }

    return ( !dragEnter?
        <div
            className="disk"
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}
        >
            <div className="disk__btns">
                {currentDir &&  <button
                    className="disk__back"
                    onClick={() => backClickHandler()}
                >Назад
                </button>}
                <button
                    className="disk__create"
                    onClick={() => showPopUpHandler()}
                >Создать папку
                </button>
                <div className="disk__upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                    <input
                        multiple={true}
                        onChange={(event) =>fileUploadsHandler(event)}
                        type="file"
                        id="disk__upload-input"
                        className="disk__upload-input"
                    />
                </div>
            </div>
            <FileList/>
            <PopUp/>
        </div>
            :
            <div className="drop-area"
                 onDragEnter={dragEnterHandler}
                 onDragLeave={dragLeaveHandler}
                 onDragOver={dragEnterHandler}
            >Перетащите файлы сюда</div>
    );
}

export default Disk;