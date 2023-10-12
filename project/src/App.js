import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./Navbar";
import Home from "./Home";
// import Contact from "./Contact";
// import Details from "./Details";
import Service from "./Service";
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Details from "./Details";


const App = () => {
  return (
    <>
  <Navbar/>
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/Details' element={<Details/>} />
    <Route path='/Service' element={<Service/>} />
    {/* <Route path='/Contact' element={<Contact/>} /> */}
    <Route path="/" element={<Navigate replace to="/home" />} />
   </Routes>
   </>
  );
}

export default App;
