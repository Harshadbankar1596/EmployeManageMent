import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.user.token);

  if (!token) {
    console.log("No token, redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  try {
    const user = jwtDecode(token);
    const exp = user.exp * 1000; 
    const now = Date.now();

    console.log("Token expiration time (ms):", exp);
    console.log("Current time (ms):", now);

    if (now >= exp) {
      console.log("Token expired, redirecting...");
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (err) {
    console.log("Invalid token:", err);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
