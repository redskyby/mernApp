import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {POP_TO_STACK,  SET_POPUP_DISPLAY , SET_VIEW} from "../../redux/slice/FileSlice";
import {getFiles, upLoadFile} from "../../actions/file";
import FileList from "./filelist/FileList";
import './disk.css';
import PopUp from "./PopUp";
import Uploader from "./uploader/Uploader";

function Disk() {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.fileToolkit.currentDir);
    const loader = useSelector(state => state.appToolKit.loader);
    const dirStack = useSelector(state => state.fileToolkit.dirStack);
    const [dragEnter , setDragEnter] = useState(false);
    const [sort , setSort] = useState('type');

    useEffect(()=>{
            dispatch(getFiles(currentDir ,sort));
    }, [currentDir, sort]);

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

    }

    function dragLeaveHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false);
    }

    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(upLoadFile(file, currentDir)))
        setDragEnter(false)
    }

    if(loader) {
        return (
            <div className="loader">
                <div className="lds-dual-ring"></div>
            </div>
        )
    }

    return ( !dragEnter ?
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
                <select
                    className='disk__select'
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                >
                    <option value="name">По имени</option>
                    <option value="type">По типу</option>
                    <option value="date">По дате</option>
                </select>
                <button className="disk__plate" onClick={()=>dispatch(SET_VIEW('plate'))}/>
                <button className="disk__list" onClick={()=>dispatch(SET_VIEW('list'))}/>
            </div>
            <FileList/>
            <PopUp/>
            <Uploader/>
        </div>
            :
            <div className="drop-area"
                 onDrop={dropHandler}
                 onDragEnter={dragEnterHandler}
                 onDragLeave={dragLeaveHandler}
                 onDragOver={dragEnterHandler}
            >Перетащите файлы сюда</div>
    );
}

export default Disk;