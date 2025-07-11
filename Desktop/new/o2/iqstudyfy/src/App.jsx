import React from 'react';
import Nav from './components/nav.jsx';
import Main from './components/main.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'; // Importing the CSS file for global styles

const App = () => {
  return (
    <BrowserRouter>
    <Nav />
      <Routes>
        <Route path="/" element={<Main/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
