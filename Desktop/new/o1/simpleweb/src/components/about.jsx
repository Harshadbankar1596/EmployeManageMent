import React from "react";
import "./main.css"; // Reuse existing styles for consistency

const About = () => {
  return (
    <div className="main-container">
      
      {/* About Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>About StarBrige</h1>
          <p>Your trusted platform to connect with verified celebrities, influencers, and performers for all your events.</p>
        </div>
      </div>

      {/* About Content */}
      <div className="about-section">
        <h2>Why Choose Us?</h2>
        <p>
          StarBrige simplifies the process of booking celebrities and influencers. With a curated list of verified profiles, we ensure smooth, reliable, and direct connections for your brand promotions, private events, or social media collaborations.
        </p>

        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-value">10,000+</div>
            <div className="stat-label">Verified Talents</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">98%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">24h</div>
            <div className="stat-label">Average Response</div>
          </div>
        </div>

        <h2>Our Mission</h2>
        <p>
          We aim to make influencer and celebrity booking transparent, quick, and affordable for everyone. Whether you're planning a campaign, wedding, brand event, or a private celebration — we make it happen.
        </p>

        <h2>Contact Us</h2>
        <p>
          📞 <strong>+91-7028445707</strong> <br />
          ✉️ <strong>StarBrigeBookings@gmail.com</strong>
        </p>
      </div>
    </div>
  );
};

export default About;
