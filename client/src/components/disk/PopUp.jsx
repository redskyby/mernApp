import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import {useSelector} from "react-redux";

function PopUp(props) {

    const [dirname, setDirName] = useState('');
    const popUpDisplay = useSelector(state => state.fileToolkit.popUpDisplay);

    return (
        <div className='popup' style={{display : popUpDisplay}}>
            <div className="popup__content">
                <div className="popup__header">
                    <div className="popup__title">Создать новую папку</div>
                    <button type="button" className="popup__close">X</button>
                </div>
                <Input
                    type="text"
                    placeholder='Введите название папки....'
                    value={dirname}
                    setValue={setDirName}
                />
                <button className="popup__create">Создать</button>
            </div>
        </div>
    );
}

export default PopUp;