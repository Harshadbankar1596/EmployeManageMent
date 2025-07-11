import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-column">
          <div className="footer-logo">
            <span className="logo-icon">⭐</span>
            <span className="logo-text">StarBridge</span>
          </div>
          <p className="footer-description">
            Connecting brands with the world's top celebrities and influencers to create powerful marketing campaigns.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fab fa-facebook-f">F</i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fab fa-instagram">I</i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fab fa-twitter">T</i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fab fa-linkedin-in">L</i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fab fa-youtube">Y</i>
            </a>
          </div>
        </div>
        
        <div className="footer-column">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/influencers">Influencers</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h3 className="footer-heading">Categories</h3>
          <ul className="footer-links">
            <li><a href="/actors">Actors</a></li>
            <li><a href="/athletes">Athletes</a></li>
            <li><a href="/musicians">Musicians</a></li>
            <li><a href="/comedians">Comedians</a></li>
            <li><a href="/models">Models</a></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h3 className="footer-heading">Contact Us</h3>
          <ul className="footer-contact">
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span>123 Celebrity Blvd, Los Angeles, CA 90001</span>
            </li>
            <li>
              <i className="fas fa-phone"></i>
              <span>+1 (800) 123-4567</span>
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              <span>info@starbridge.com</span>
            </li>
            <li>
              <i className="fas fa-clock"></i>
              <span>Mon-Fri: 9AM - 6PM PST</span>
            </li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h3 className="footer-heading">Newsletter</h3>
          <p className="newsletter-text">
            Subscribe to get updates on new influencers and exclusive offers
          </p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button className="subscribe-btn">Subscribe</button>
          </div>
          <div className="payment-methods">
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-amex"></i>
            <i className="fab fa-cc-paypal"></i>
            <i className="fab fa-cc-apple-pay"></i>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© 2025 StarBridge. All rights reserved.</p>
          <div className="footer-legal">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;