import React from "react";
import './app.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Registration from "./authorization/Registration";
import Login from "./authorization/Login";
import {useSelector} from "react-redux";


function App() {
    const isAuth = useSelector(state => state.userToolkit.isAuth);


    return (
        <BrowserRouter>
            <div className="app">
                <Navbar/>
                <div className="wrap">
                    {!isAuth &&
                    <Routes>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                    }
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
