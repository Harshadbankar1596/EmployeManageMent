import React from 'react';
import './maincontact.css';

const Maincontact = () => {
  return (
    <div className="contact-container">

      <div className="form-box">

        {/* Left Side Form */}
        <div className="form-left">
          <h2>Get in touch</h2>
          <p>Our friendly team would love to hear from you.</p>

          <form className="contact-form">
            <div className="form-row">
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required />
            </div>

            <input type="email" placeholder="Email Address" required />
            <input type="tel" placeholder="Phone Number" required />
            
            <textarea placeholder="Your Message" rows="4" required></textarea>

            <div className="policy-row">
              <input type="checkbox" required />
              <label>I agree to the Privacy Policy</label>
            </div>

            <button type="submit" className="send-btn">Send Message</button>
          </form>
        </div>

        {/* Right Side Image */}
        <div className="form-right">
          <img src="./group6.png" alt="Contact Illustration" />
        </div>

      </div>
    </div>
  );
};

export default Maincontact;
