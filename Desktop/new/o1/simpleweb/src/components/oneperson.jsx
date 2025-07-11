import { useParams , useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import "./oneperson.css";

const Oneperson = () => {
  const navigate = useNavigate();

  const { name } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/profiles");
        const data = await response.json();
        const influencers = Array.isArray(data) ? data : data.data;

        const matchedUser = influencers.find(
          (item) => item.name.toLowerCase() === decodeURIComponent(name).toLowerCase()
        );

        setUser(matchedUser || null);
        if (!matchedUser) setError("User not found");
      } catch (err) {
        console.error("Error fetching influencers:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  return (
    <div className="profile-page">
      <h1 className="title">Influencer Profile</h1>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : user ? (
        <div className="profile-card">
          <div className="profile-left">
            <img src={user.img} alt={user.name} className="profile-img" />
            <h2>{user.name}</h2>
            <p className="category">{user.category || "Influencer"}</p>
            <p>Followers: {user.followers}</p>
            <p>Profession: {user.profession}</p>
            <p>Experience: {user.experience} years</p>
            <p>Price per Post: ₹{user.price || "5000"}</p>
            <h3>About Me</h3>
            <p>{user.about || "Influencer details not available."}</p>
            <button
              className="contact-btn"
              onClick={() => {
                navigate("/contact");
              }}
            >
              Contact for Collaboration
            </button>
          </div>

          
          
        </div>
      ) : null}
    </div>
  );
};

export default Oneperson;
