import React from "react";
import "./service.css"; // You can create services.css for styling

const Services = () => {
  return (
    <div className="services-container">
      <h2 className="services-heading">Our Services</h2>
      
      <div className="services-grid">
        
        <div className="service-card">
          <h3>Celebrity Booking</h3>
          <p>Book top influencers, actors, singers, and more for your brand promotions, events, and collaborations.</p>
        </div>

        <div className="service-card">
          <h3>Brand Promotions</h3>
          <p>Partner with verified influencers to promote your brand on Instagram, YouTube, Facebook, and other platforms.</p>
        </div>

        <div className="service-card">
          <h3>Custom Video Messages</h3>
          <p>Get personalized video messages from celebrities for birthdays, events, or special occasions.</p>
        </div>

        <div className="service-card">
          <h3>Event Appearances</h3>
          <p>Invite top stars to grace your weddings, parties, corporate events, or public shows.</p>
        </div>

      </div>

      <div className="how-to-book-section">
        <h2>How to Book a Star</h2>
        <ol>
          <li>Browse through our verified list of celebrities & influencers.</li>
          <li>Select your preferred star based on category and price.</li>
          <li>Click on <strong>"Book Now"</strong> to initiate a booking via WhatsApp.</li>
          <li>Our team or the manager will connect with you for confirmation.</li>
          <li>Secure payment & booking confirmation will be provided.</li>
        </ol>
      </div>
    </div>
  );
};

export default Services;
