import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Register from "./components/login/register";
import Login from "./components/login/login";
import CalendarGrid from "./components/login/o1";
import Maindashboard from "./components/dashboard/maindashboard";
import Works from "./components/dashboard/works";
import Nav from "./components/dashboard/nav";
import Quickaction from "./components/dashboard/quickaction";

const App = () => {
  const location = useLocation();
  const hideNavPaths = ["/login", "/register"];
  const shouldHideNav = hideNavPaths.includes(location.pathname);

  return (
    <div className="bg-blue-50 px-2 sm:px-8 md:px-16 lg:px-20 py-5">
      {!shouldHideNav && <Nav />}
      {!shouldHideNav && <Quickaction />}
      <Routes>
        <Route path="/" element={<Maindashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calender" element={<CalendarGrid />} />
        <Route path="/works" element={<Works />} />
      </Routes>
    </div>
  );
};

export default App;
