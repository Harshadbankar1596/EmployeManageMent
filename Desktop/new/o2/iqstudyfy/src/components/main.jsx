import React from 'react';
import LandingPage from "./landingpage.jsx";
import { FaUserCog, FaCode, FaGlobeAmericas, FaArrowCircleRight } from 'react-icons/fa';
import { MdComputer } from 'react-icons/md';
import Mainabout from './mainabout.jsx';
import Mainmcq from './mainmcq.jsx';
import Maincontact from './maincontact.jsx';
import Footer from './footer.jsx';
import './main.css';

const Main = () => {
  return (
    <div>
      {/* Landing Page at the Top */}
      <LandingPage />

      {/* Categories Section */}
      <div className="categories-container">
        <h2>Browse Top Exam Categories</h2>
        <p>Choose your target exam and start practicing now.</p>

        <div className="category-grid">
          <div className="category-card blue-dark">
            <FaUserCog className="category-icon" color="white" />
            <h3>Engineering</h3>
            <p>Computer Science And Engineering<br />
              Civil Engineering Electrical Engineering<br />
              Mechanical Engineering</p>
          </div>

          <div className="category-card blue-light">
            <MdComputer className="category-icon" color="white" />
            <h3>Basic Computer</h3>
            <p>Hardware, Software, MS Office,<br />
              Operating Systems, Internet, HTML</p>
          </div>

          <div className="category-card yellow">
            <FaCode className="category-icon" color="white" />
            <h3>IT & Programming</h3>
            <p>Python, Java, HTML/CSS, C++,<br />
              DSA, Git, APIs</p>
          </div>

          <div className="category-card blue-light">
            <FaGlobeAmericas className="category-icon" color="white" />
            <h3>General Knowledge</h3>
            <p>Static GK, Current Affairs, Geography,<br />
              History, Polity</p>
          </div>

          {/* Browse All Button */}
          <div className="browse-all-btn">
            <FaArrowCircleRight size={80} />
            <p style={{ color: "black" }}>Browse All</p>
          </div>
        </div>
      </div>

      {/* About Section Same to Same */}
      <Mainabout />

      {/* MQC */}
      <Mainmcq />


      {/* contact */}
      <Maincontact />

      {/* Footer */}
    <Footer />

    </div>
  );
};

export default Main;
