import React from 'react';
import './landingpage.css';
// import Nav from './nav';

const LandingPage = () => {
    return (
        <>
            {/* Nav सबसे ऊपर */}
            

            <div className="landing-container">
                {/* Left Image and Tag */}
                <div className="left-section">
                    <img src="/group1.png" alt="Student" className="left-img" />
                </div>

                {/* Center Content */}
                <div className="center-section">
                    <h1>Ace Every Competitive <br />Exam with <span>iQstudyfy</span> Practice</h1>
                    <p>
                        Explore expertly crafted MCQs, real-time performance tracking, and smart learning paths —
                        all designed to help you master every subject and succeed with confidence.
                    </p>
                    <button className="start-btn">Start Exam</button>
                </div>

                {/* Right Image and Tag */}
                <div className="right-section">
                    <img src="/group2.png" alt="Student" className="right-img" />
                </div>
            </div>
        </>
    );
};

export default LandingPage;
