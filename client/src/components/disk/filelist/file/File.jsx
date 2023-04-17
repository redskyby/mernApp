import React from 'react';
import './file.css';
import {useSelector} from "react-redux";

function File() {
    const files = useSelector(state => state.fileToolkit.files);

    return (

        <></>
    );
}

export default File;