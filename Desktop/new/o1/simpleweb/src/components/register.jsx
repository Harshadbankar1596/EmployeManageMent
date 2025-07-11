import React, { useState } from 'react';
import './register.css'; // Link to CSS file

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    followers: '',
    img: '',
    profession: '',
    experience: '',
    about: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Failed to submit profile data');
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        followers: '',
        img: '',
        profession: '',
        experience: '',
        about: ''
      });
    } catch (err) {
      setError(err.message || 'An error occurred while submitting');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h1>Create Your Profile</h1>
          <p>Fill in your details to create your influencer profile</p>
          <div className="header-line"></div>
        </div>
        
        <div className="form-card">
          {success ? (
            <div className="success-message">
              <div className="success-icon">✔️</div>
              <h2>Profile Submitted Successfully!</h2>
              <p>Your profile has been successfully submitted to our platform.</p>
              <button onClick={() => setSuccess(false)}>Create Another Profile</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                
                <div>
                  <label>Full Name</label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label>Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    required
                  />
                </div>
                
                <div>
                  <label>Number of Followers</label>
                  <input
                    name="followers"
                    type="number"
                    value={formData.followers}
                    onChange={handleChange}
                    placeholder="50000"
                    min="0"
                    required
                  />
                </div>
                
                <div className="full-width">
                  <label>Profile Image URL</label>
                  <input
                    name="img"
                    type="url"
                    value={formData.img}
                    onChange={handleChange}
                    placeholder="https://example.com/profile.jpg"
                    required
                  />
                  {formData.img && (
                    <div className="image-preview">
                      <span>Preview:</span>
                      <img src={formData.img} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                    </div>
                  )}
                </div>
                
                <div>
                  <label>Profession</label>
                  <input
                    name="profession"
                    type="text"
                    value={formData.profession}
                    onChange={handleChange}
                    placeholder="Fashion Influencer"
                    required
                  />
                </div>
                
                <div>
                  <label>Experience (years)</label>
                  <input
                    name="experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="3"
                    min="0"
                    max="50"
                    required
                  />
                </div>
                
                <div className="full-width">
                  <label>About Yourself</label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                    required
                  ></textarea>
                </div>
              </div>
              
              {error && <div className="error-message">Error: {error}</div>}
              
              <div className="submit-section">
                <button type="submit" disabled={loading}>
                  {loading ? 'Submitting...' : 'Create Profile'}
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="form-footer">
          This form sends data to http://localhost:5000/api/profile via POST request
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
