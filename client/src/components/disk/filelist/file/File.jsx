import React from 'react';
import './file.css';
import dirLogo from '../../../../assets/dir.svg';
import fileLogo from '../../../../assets/file.svg';

function File({file}) {
    function openHadler() {

    }

    return (
       <div
           className='file'
           onClick={() => openHadler()}
       >
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img"/>
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0,10)}</div>
            <div className="file__size">{file.size}</div>
        </div>

    );
}

export default File;