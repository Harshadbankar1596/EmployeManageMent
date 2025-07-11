import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <img src="./iqlogo.svg" alt="Logo" />
      </div>

      <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        &#9776;
      </div>

      <div className={`nav-menu ${menuOpen ? 'show' : ''}`}>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/category" className="nav-link">Category</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/exam" className="nav-link">Exam</Link>
      </div>

      <div className={`nav-actions ${menuOpen ? 'show' : ''}`}>
        <div className="search-box">
          <button className="search-btn">🔍</button>
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
        <div className="loginsbtn">
          <button className="btn-login">Login</button>
          <button className="btn-signup">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
