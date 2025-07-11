import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./main.css";

const Influencers = () => {
  const scrollRef = useRef(null);
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:5000/api/profiles")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setInfluencers(data);
        } else if (Array.isArray(data.data)) {
          setInfluencers(data.data);
        } else {
          throw new Error("Unexpected API response format");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching influencers:", err);
        setError("Failed to load influencers. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Jab influencers aa jaye tab scroll karo
  useEffect(() => {
    if (influencers.length > 0 && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [influencers]);

  return (
    <div ref={scrollRef} className="main-container">
      <h2>Our Influencers</h2>

      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading influencers...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      ) : (
        <div className="card-container">
          {influencers.map((item, index) => (
            <div className="influencer-card" key={index}>
              <div className="card-badge">Verified</div>
              <img src={item.img} alt={item.name} />
              <div className="card-content">
                <h3>{item.name}</h3>
                <p className="category">{item.profession || "Influencer"}</p>
                <div className="stats">
                  <div className="stat">
                    <span>👥</span> {item.followers}
                  </div>
                  <div className="stat">
                    <span>💼</span> {item.profession}
                  </div>
                  <div className="stat">
                    <span>💰</span> ₹{item.price || "5000"}
                  </div>
                </div>
                <p className="bio">{item.about || "Available for collaborations."}</p>
                <div className="card-actions">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      const message = `Hello, I want to book ${item.name}.\nProfession: ${item.profession}\nFollowers: ${item.followers}`;
                      const url = `https://wa.me/7028445707?text=${encodeURIComponent(message)}`;
                      window.open(url, "_blank");
                    }}
                  >
                    Book Now
                  </button>
                  <button
                    className="secondary-btn"
                    onClick={() =>
                      navigate("/oneperson/" + item.name, { state: item })
                    }
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Influencers;
