import React, {useState} from 'react';
import {useSelector} from "react-redux";
import './fileList.css'
import File from "./file/File";
import {CSSTransition, TransitionGroup} from "react-transition-group";

function FileList() {
    const [checkPlace, setCheckPlace] = useState(false);
    const files = useSelector(state => state.fileToolkit.files)

    if(files.length === 0){
        return (
            <div className='loader'>Файлы не найдены.</div>
        )
    }
    return (
        <div className='filelist'>
            <div
                className="filelist__header"
            >
                <div className="filelist__name">Название</div>
                <div className={checkPlace ? "filelist__change__place__date" : "filelist__date"}>Дата</div>
                <div className={checkPlace ? "filelist__change__place__size" : "filelist__size"}>Размер</div>
            </div>
            <TransitionGroup>
                {
                    files.map(file =>
                        <CSSTransition
                            key={file._id}
                            timeout={500}
                            classNames={'file'}
                            exit={false}
                        >
                            <File file={file} setCheckPlace={setCheckPlace}/>
                        </CSSTransition>
                    )
                }
            </TransitionGroup>
        </div>
    );
}

export default FileList;