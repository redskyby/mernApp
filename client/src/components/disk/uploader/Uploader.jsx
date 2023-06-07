import React from 'react';
import "./uploader.css";
import UploadFile from "./UploadFile";

function Uploader() {
    const files = [];
    return (
        <div>
            <div className="uploader">
                <div className="uploader__header">
                    <div className="uploader__title">Загрузки</div>
                    <button type="button">X</button>
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