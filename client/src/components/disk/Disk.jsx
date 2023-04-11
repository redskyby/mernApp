import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import file from "../../redux/slice/FileSlice";
import {getFiles} from "../../actions/file";

function Disk() {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.fileToolkit.currentDir);

    useEffect(()=>{
        dispatch(getFiles(currentDir));
    }, [currentDir]);
    return (
        <div>Disk</div>
    );
}

export default Disk;