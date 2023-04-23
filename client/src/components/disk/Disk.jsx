import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import file from "../../redux/slice/FileSlice";
import {createDir, getFiles} from "../../actions/file";
import FileList from "./filelist/FileList";
import './disk.css';

function Disk() {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.fileToolkit.currentDir);

    useEffect(()=>{
        dispatch(getFiles(currentDir));
    }, [currentDir]);

    function createDirHandler() {
        dispatch(createDir(currentDir , 'test8'));
    }

    return (
        <div className="disk">
            <div className="disk__btns">
                <button className="disk__back">Назад</button>
                <button
                    className="disk__create"
                    onClick={() => createDirHandler()}
                >Создать папку</button>
            </div>
            <FileList />
        </div>
    );
}

export default Disk;