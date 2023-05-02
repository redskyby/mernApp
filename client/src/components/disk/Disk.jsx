import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {POP_TO_STACK,  SET_POPUP_DISPLAY} from "../../redux/slice/FileSlice";
import { getFiles} from "../../actions/file";
import FileList from "./filelist/FileList";
import './disk.css';
import PopUp from "./PopUp";

function Disk() {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.fileToolkit.currentDir);
    const dirStack = useSelector(state => state.fileToolkit.dirStack);


    useEffect(()=>{
            dispatch(getFiles(currentDir));
    }, [currentDir]);

    function showPopUpHandler() {
        dispatch(SET_POPUP_DISPLAY('flex'));
    }

    function backClickHandler() {
        dispatch(POP_TO_STACK(dirStack));
    }

    return (
        <div className="disk">
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
                    <label htmlFor="" className="disk_upload-label"></label>
                </div>
            </div>
            <FileList/>
            <PopUp/>
        </div>
    );
}

export default Disk;