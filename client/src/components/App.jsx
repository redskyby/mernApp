import React from "react";
import './app.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./navbar/Navbar";




function App() {
  return (
    <BrowserRouter>
        <div className="app">
            <Navbar/>
        </div>
    </BrowserRouter>
  );
}

export default App;
