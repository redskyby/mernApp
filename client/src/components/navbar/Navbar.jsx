import React from 'react';
import './navbar.css'
import Logo from '../../assets/navbar-logo.svg'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LOG_OUT} from "../../redux/slice/UserSlice";


function Navbar () {
    const isAuth = useSelector(state => state.userToolkit.isAuth);
    const dispatch = useDispatch();
    return (
        <div className="navbar">
            <div className="container">
                <img src={Logo} alt="" className="navbar__logo"/>
                <div className="navbar__header">MERN CLOUD</div>
                {!isAuth && <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div>}
                {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>}
                {isAuth && <div
                    className="navbar__login"
                     onClick={ ()=> dispatch(LOG_OUT())}
                >Выход</div>}
            </div>
        </div>
    );
};

export default Navbar;