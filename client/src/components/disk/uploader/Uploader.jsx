import React from 'react';
import "./uploader.css";
import UploadFile from "./UploadFile";
import {useDispatch, useSelector} from "react-redux";
import {HIDE_UPLOADER} from "../../../redux/slice/UploadSlice";

function Uploader() {
    const files = useSelector(state => state.uploadToolKit.files);
    const isVisible = useSelector(state => state.uploadToolKit.isVisitable);
    const dispatch = useDispatch();

    return ( isVisible &&
        <div>
            <div className="uploader">
                <div className="uploader__header">
                    <div className="uploader__title">Загрузки</div>
                    <button type="button"
                            onClick={()=>dispatch(HIDE_UPLOADER())}
                    >X</button>
                </div>
            </div>
            {
                files.map(file =>
                    <UploadFile key={file.id} file={file} />
                )
            }
        </div>
    );
}

export default Uploader;