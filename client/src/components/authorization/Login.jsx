import React, {useState} from 'react';
import './registration.css'
import Input from "../../utils/input/Input";


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className='authorization '>
            <div className="authorization__header">Авторизация</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button className="authorization__btn" >Зарегистрироваться</button>
        </div>
    );
};

export default Login;