import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">

            {/* Top Section */}
            <div className="footer-top">
                <div className="footer-heading">
                    <h2>Let's Connect with Us</h2>
                    <p>Connect • Collaborate • Learn</p>
                </div>
            </div>

            <hr style={{border:"1px solid white"}} />

            {/* Middle Grid */}
            <div className="footer-grid">

                {/* Column 1 - Logo & Paragraph */}
                <div className="footer-col">
                    <img src="./iqlogo2.svg" className="logo" alt="iQStudify Logo" />
                    <p>
                        Helping students master exams through smart, focused MCQ practice and detailed performance insights.
                    </p>
                </div>

                {/* Column 2 - Quick Links */}
                <div className="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link className="footer-link" to="/">Home</Link></li>
                        <li><Link className="footer-link" to="/category">Category</Link></li>
                        <li><Link className="footer-link" to="/about">About Us</Link></li>
                    </ul>
                </div>

                {/* Column 3 - Utilities */}
                <div className="footer-col">
                    <h4>Utilities</h4>
                    <ul>
                        <li><Link className="footer-link" to="/faqs">FAQs</Link></li>
                        <li><Link className="footer-link" to="/privacy">Privacy Policy</Link></li>
                        <li><Link className="footer-link" to="/terms">Terms & Conditions</Link></li>
                        <li><a className="footer-link" href="mailto:support@iqstudify.com">Support</a></li>
                    </ul>
                </div>

                {/* Column 4 - Contact Us */}
                <div className="footer-col">
                    <h4>Contact Us</h4>
                    <p>Email: <a className="footer-link" href="mailto:support@iqstudify.com">support@iqstudify.com</a></p>
                    <p>Phone: <a className="footer-link" href="tel:+919876543210">+91 98765 43210</a></p>
                    <p>Address: iQStudify Pvt. Ltd.<br />
                        123 Golden City Center,<br />
                        Sambhaji Nagar, India</p>
                </div>

            </div>


            {/* Bottom Copyright */}
            <div className="footer-bottom">
                <p>© 2025 All Rights Reserved.</p>
                <div className="developed-by">
                    <span>Developed by</span>
                    <img src="./techsuryalogo.svg" alt="Developer Logo" />
                </div>
            </div>

        </footer>
    );
};

export default Footer;
