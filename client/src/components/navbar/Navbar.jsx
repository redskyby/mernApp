import React from 'react';
import './navbar.css'
import Logo from '../../assets/navbar-logo.svg'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

function Navbar () {
    const isAuth = useSelector(state => state.userToolkit.isAuth);

    return (
        <div className="navbar">
            <div className="container">
                <img src={Logo} alt="" className="navbar__logo"/>
                <div className="navbar__header">MERN CLOUD</div>
                {!isAuth && <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div>}
                {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>}
                {isAuth && <div className="navbar__login"><NavLink to="/registration">Выход</NavLink></div>}
            </div>
        </div>
    );
};

export default Navbar;