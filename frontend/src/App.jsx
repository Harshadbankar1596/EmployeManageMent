import React from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import Dailywork from "./components/dailyworks/dailywork.jsx";
import Leave from "./components/leaves/leave.jsx";
import SmoothScroll from "./lenis.jsx";
import ProtectedRoute from "./components/protectedrout.jsx";
import MainDashboard from "./components/adminpanel/maindashboard.jsx";
import AllUsers from "./components/adminpanel/admindashboard/allusers.jsx";
// import ProjectSummary from "./components/adminpanel/admindashboard/projectsummary.jsx";
import Adminleaves from "./components/adminpanel/admindashboard/adminleaves.jsx";
import Addproject from "./components/adminpanel/admindashboard/addproject.jsx";
import Assinproject from "./components/adminpanel/admindashboard/assinproject.jsx";
import Projectdetails from "./components/adminpanel/admindashboard/projectdetails.jsx";
import Employee from "./components/adminpanel/admindashboard/Employee.jsx";


const App = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const hideQuickActionPaths = ["/login", "/register"];
  const shouldHideQuickAction = hideQuickActionPaths.includes(pathname) || pathname.startsWith("/admin");

  const hideNavPaths = ["/login", "/register"];
  const shouldHideNav = hideNavPaths.includes(pathname);

  return (
    <div className="bg-blue-50 flex flex-col lg:flex-row min-h-screen">
      <SmoothScroll />
      <div className="w-full lg:w-1/4 xl:w-1/5 mb-4 lg:mb-0">
        <Side />
      </div>

      <div className="w-full lg:w-3/4 xl:w-4/5 sm:py-4 lg:py-5 px-3 sm:px-4 lg:px-10">
        {!shouldHideNav && <Nav />}
        {!shouldHideQuickAction && <Quickaction />}

        <Routes>
          <Route path="/" element={<Maindashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/works" element={<Works />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/calender" element={<CalendarComponent />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/profile" element={<Employeprofile />} />
          <Route path="/groupchat" element={<Chat />} />
          <Route path="/dailywork" element={<Dailywork />} />

          <Route path="/admin/*" element={<MainDashboard />}>
            <Route path="employee" element={<AllUsers />} />
            {/* <Route path="projects" element={<ProjectSummary />} /> */}
            <Route path="calenderadmin" element={<CalendarComponent />} />
            <Route path="chat" element={<Chat />} />
            <Route path="leaves" element={<Adminleaves/>}/>
            <Route path="addproject" element={<Addproject/>}/>
            <Route path="assinTask" element={<Assinproject/>}/>
            <Route path="assinTask/:id" element={<Projectdetails/>}/>
            <Route path="employee/:id" element={<Employee />} />
            <Route path="*" element={<Navigate to="" />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
