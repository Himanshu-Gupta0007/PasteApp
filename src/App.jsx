import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Paste from './Pages/Paste';
import Navbar from './Navbar'
import './Paste.css';
import ViewPaste from './Pages/ViewPaste';

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/paste" element={<Paste />} />
        <Route path="/paste/:id" element={<ViewPaste />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
