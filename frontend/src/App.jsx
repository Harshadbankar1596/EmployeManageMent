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
import Summary from "./components/summary/summary.jsx";
import Employeprofile from "./components/profie/employeprofile.jsx";
import Chat from "./components/groupchats/chat.jsx";
const App = () => {
  const location = useLocation();
  const hideNavPaths = ["/login", "/register"];
  const shouldHideNav = hideNavPaths.includes(location.pathname);

  return (
    <div className="bg-blue-50 flex flex-col lg:flex-row min-h-screen">
      <div className="w-full lg:w-1/4 xl:w-1/5 mb-4 lg:mb-0">
        <Side />
      </div>
      
      <div className="w-full lg:w-3/4 xl:w-4/5 py-3 sm:py-4 lg:py-5 px-3 sm:px-4 lg:px-5">
        {!shouldHideNav && <Nav />}
        {!shouldHideNav && <Quickaction />}
        <Routes>
          <Route path="/" element={<Maindashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/works" element={<Works />} />
          <Route path="/calender" element={<CalendarComponent />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/profile" element={<Employeprofile />} />
          <Route path="/groupchat" element={<Chat />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
