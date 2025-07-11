import React from 'react'
import './mainabout.css'
const mainabout = () => {
    return (
        <div className="about-container">

            {/* Left Side - Boxes & Images */}
            <div className="about-left">

                <div className="first">
                    <div className="blue-box box-shadow">
                        ✅ 1000+ Students Learning Every Day
                    </div>
                    <img src="./group4.png" alt="Engineer Boy" className="about-img engineer-img" />
                </div>

                <div className="second">
                    <img src="group3.png" alt="Student Thinking" className="about-img" />

                    <div className="yellow-box box-shadow">
                        📊 Track Your Progress in Real Time
                    </div>
                </div>

            </div>

            {/* Right Side - Text Content */}
            <div className="about-right">

                <div className="goal-content">
                    <h3 className="sub-heading">Our Main Goal</h3>
                    <h2 className="main-heading">
                        To simplify exam preparation and make learning accessible, engaging, and effective for every student.
                    </h2>
                    <p className="description">
                        At IQStudify, our mission is to empower students with smart MCQ practice tools that focus on concept clarity,
                        daily improvement, and exam-readiness. We believe that with the right structure, content, and consistency — every student can succeed.
                    </p>

                    <h4 className="core-title">🔑 Core Objectives:</h4>
                    <ul className="core-list">
                        <li>✔️ Provide high-quality, exam-aligned MCQs</li>
                        <li>✔️ Help students identify strengths and weaknesses</li>
                        <li>✔️ Promote daily, focused, and trackable learning</li>
                        <li>✔️ Make learning enjoyable with clean, intuitive design</li>
                    </ul>
                </div>

            </div>

        </div>
    )
}

export default mainabout