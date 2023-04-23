import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import {useDispatch, useSelector} from "react-redux";
import {SET_POPUP_DISPLAY} from "../../redux/slice/FileSlice";
import {createDir} from "../../actions/file";

function PopUp() {

    const [dirname, setDirName] = useState('');
    const popUpDisplay = useSelector(state => state.fileToolkit.popUpDisplay);
    const currentDir = useSelector(state => state.fileToolkit.currentDir);
    const dispatch = useDispatch();

    function showPopUpHandler() {
        dispatch(createDir(currentDir , dirname));
        setDirName('');
        dispatch(SET_POPUP_DISPLAY('none'));
    }

    return (
        <div
            onClick={()=> dispatch(SET_POPUP_DISPLAY('none'))}
            className='popup'
            style={{display : popUpDisplay}}
        >
            <div
                className="popup__content"
                onClick={ event => event.stopPropagation()}
            >
                <div className="popup__header">
                    <div className="popup__title">Создать новую папку</div>
                    <button
                        type="button"
                        className="popup__close"
                        onClick={()=> dispatch(SET_POPUP_DISPLAY('none'))}
                    >X</button>
                </div>
                <Input
                    type="text"
                    placeholder='Введите название папки....'
                    value={dirname}
                    setValue={setDirName}
                />
                <button
                    className="popup__create"
                    onClick={()=> showPopUpHandler()}
                >Создать</button>
            </div>
        </div>
    );
}

export default PopUp;