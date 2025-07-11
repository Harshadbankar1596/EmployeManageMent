import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './nav.css';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Track route changes

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('starUser'));
    if (storedUser?.email) {
      setUser(storedUser);
    } else {
      setUser(null);
    }
  }, [location]);  // Runs every route change, captures login page redirect

  const handleLogout = () => {
    localStorage.removeItem('starUser');
    setUser(null);
    navigate('/');
  };

  return (
    <header className={`mainnav ${isScrolled ? 'scrolled' : ''}`}>
      <nav className='navbox container'>
        <div className="logo">
          <Link to="/">
            <span className="logo-icon">⭐</span>
            <span className="logo-text">StarBridge</span>
          </Link>
        </div>

        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/influencers" onClick={() => setMobileMenuOpen(false)}>Influencers</Link>
          <Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </div>

        <div className="nav-buttons">
          {user?.email ? (
            <div className="profile-initial" onClick={handleLogout} title="Logout">
              {user.email.charAt(0).toUpperCase()}
            </div>
          ) : (
            <>
              <button className="login-btn" onClick={() => navigate('/login')}>
                Login
              </button>
              <Link to="/register" className="register-btn">
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className={`bar ${mobileMenuOpen ? 'bar1' : ''}`}></div>
          <div className={`bar ${mobileMenuOpen ? 'bar2' : ''}`}></div>
          <div className={`bar ${mobileMenuOpen ? 'bar3' : ''}`}></div>
        </button>
      </nav>
    </header>
  );
};

export default Nav;
