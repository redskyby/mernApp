import React from 'react';
import "./uploader.css";

function Uploader() {

    return (
        <div>
            <div className="uploader">
                <div className="uploader__header">
                    <div className="uploader__title">Загрузки</div>
                    <button type="button">X</button>
                </div>
            </div>
        </div>
    );
}

export default Uploader;