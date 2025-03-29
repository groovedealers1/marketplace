import * as React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import "./index.css";
import Home from "./components/Home.jsx";
import Card from "./components/Card.jsx";
import SuccessPage from "./components/Success.jsx";
import Login from "./components/Login.jsx";
import AdminCommands from "./components/AdminCommands.jsx";


function App(){
  return (
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/wear/:id" element={<Card/>}/>
            <Route path='/success' element={<SuccessPage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/admin-commands' element={<AdminCommands/>}/>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
  );
}

export default App;