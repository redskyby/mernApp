import React, {useState} from 'react';
import Input from "../../utils/input/Input";

function PopUp(props) {

    const [dirname, setDirName] = useState('');


    return (
        <div className='popup'>
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
                <button className="popup__create"></button>
            </div>
        </div>
    );
}

export default PopUp;