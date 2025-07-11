import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Nav.jsx';
import BlogForm from './components/BlogForm.jsx';
import BlogList from './components/BlogList.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Allblogs from './components/Allblogs.jsx';

function App() {

  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={
            <>
              <BlogForm />
            </>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/allblogs" element={<Allblogs />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
