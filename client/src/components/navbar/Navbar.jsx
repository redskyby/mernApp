import React, {useState} from 'react';
import './navbar.css'
import Logo from '../../assets/navbar-logo.svg'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LOG_OUT} from "../../redux/slice/UserSlice";
import {getFiles, searchFiles} from "../../actions/file";
import {SHOW_LOADER} from "../../redux/slice/AppSlice";
import avatarLogo from '../../assets/avatar.svg';
import {API_URL} from '../../config';

function Navbar() {
    const isAuth = useSelector(state => state.userToolkit.isAuth);
    const currentDir = useSelector(state => state.fileToolkit.currentDir);
    const currentUser = useSelector(state => state.userToolkit.currentUser);
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(false);
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo;


    function searchChangeHandker(e) {
        setSearchName(e.target.value);
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout);
        }
        dispatch(SHOW_LOADER())
        if (e.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value));
            }, 500, e.target.value));
        }else{
            dispatch(getFiles(currentDir))
        }
    }

    return (
        <div className="navbar">
            <div className="container">
                <NavLink to="/" className="container__main_logo">
                    <img src={Logo} alt="" className="navbar__logo"/>
                    <div className="navbar__header">MERN CLOUD</div>
                </NavLink>
                {isAuth && <input
                    className='navbar__search'
                    placeholder="Название файла"
                    type="text"
                    value={searchName}
                    onChange={e => searchChangeHandker(e)}
                />}
                {!isAuth && <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div>}
                {!isAuth &&
                    <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>}
                {isAuth && <div
                    className="navbar__login"
                    onClick={() => dispatch(LOG_OUT())}
                >Выход</div>}
                {isAuth &&
                    <NavLink to={'/profile'}>
                        <img className="navbar__avatar" src={avatar} alt="user avatar"/>
                    </NavLink>
                }
            </div>
        </div>
    );
};

export default Navbar;