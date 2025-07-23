import React from "react";
import {BrowserRouter,Routes,Route,useLocation,} from "react-router-dom";

import Register from "./components/login/register";
import Login from "./components/login/login";
import Maindashboard from "./components/dashboard/maindashboard";
import Works from "./components/dashboard/works";
import Nav from "./components/dashboard/nav";
import Quickaction from "./components/dashboard/quickaction";
import Side from "./components/aside/side";
import CalendarComponent from "./components/calender/calender.jsx";
const App = () => {
  const location = useLocation();
  const hideNavPaths = ["/login", "/register"];
  const shouldHideNav = hideNavPaths.includes(location.pathname);

  return (
    <div className="bg-blue-50  flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/4 mb-4 md:mb-0">
        <Side />
      </div>
      <div className="w-full md:w-3/4 py-5 px-5">
        {!shouldHideNav && <Nav />}
        {!shouldHideNav && <Quickaction />}
        <Routes>
          <Route path="/" element={<Maindashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/works" element={<Works />} />
          <Route path="/calender" element={<CalendarComponent />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
