import React from 'react'
import './mainmcq.css'
const mainmcq = () => {
    return (
        <div className="testimonial-container">

            <div className="testimonial-left">
                <span className="quote-mark">“</span>
                <h2 className="testimonial-heading">
                    Students now recognize that regular MCQ practice means better performance and visible progress
                </h2>
                <p className="testimonial-desc">
                    With IQStudify, our learners are now able to focus on specific weak areas through data-driven practice sessions.
                    The platform helps identify their knowledge gaps and goals — and based on this, teachers and mentors can step in
                    and provide support exactly where it's needed
                </p>
                <h4 className="testimonial-author">
                    Riya Sharma, <span>Engineering Student</span>
                </h4>
                <span className="quote-mark right">”</span>
            </div>

            <div className="testimonial-right">
                <img src="./group5.png" alt="Student Studying" className="testimonial-img" />
            </div>

        </div>

    )
}

export default mainmcq