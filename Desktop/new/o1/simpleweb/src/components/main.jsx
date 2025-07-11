import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./main.css";

const Main = () => {
  const navigate = useNavigate();
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const fetchInfluencers = (apiUrl) => {
    setLoading(true);
    setError(null);

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setInfluencers(data);
        } else if (Array.isArray(data.data)) {
          setInfluencers(data.data);
        } else {
          throw new Error("Unexpected API structure");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching influencers:", err);
        setError("Failed to load influencers. Please try again later.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInfluencers("http://localhost:5000/api/profiles");
  }, []);

  const handleFilterChange = (category) => {
    setFilter(category);
    if (category === "all") {
      fetchInfluencers("http://localhost:5000/api/profiles");
    } else {
      // Filter client-side based on category
      const filtered = influencers.filter((item) =>
        (item.profession || "").toLowerCase().includes(category.toLowerCase())
      );
      setInfluencers(filtered);
    }
  };

  return (
    <div className="main-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Book Top Celebrities & Influencers</h1>
          <p>Direct access to 10,000+ verified influencers across all platforms.</p>
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-value">10,000+</div>
              <div className="stat-label">Influencers</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">98%</div>
              <div className="stat-label">Booking Success</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">24h</div>
              <div className="stat-label">Response Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <h2>Top Influencers</h2>
        <div className="filter-options">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => handleFilterChange("all")}
          >
            All Categories
          </button>
          <button
            className={filter === "actor" ? "active" : ""}
            onClick={() => handleFilterChange("actor")}
          >
            Actors
          </button>
        </div>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading influencers...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
          <button onClick={() => fetchInfluencers("http://localhost:5000/api/profiles")}>
            Retry
          </button>
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

export default Main;
