import React from 'react';
import "./uploader.css";
function UploadFile({file}) {
    return (
        <div className="upload-file">
            <div className="upload-file__header">
                <div className="upload-file__name">
                    {file.name}
                </div>
                <button
                    type="button"
                    className="upload-file__remove"
                >X</button>
            </div>
            <div className="upload-file__progress-bar">
                <div className="upload-file__upload-bar" style={{width: file.progress + "%"}}/>
                <div className="upload-file__percent">{file.progress}%</div>
            </div>
        </div>
    );
}

export default UploadFile;