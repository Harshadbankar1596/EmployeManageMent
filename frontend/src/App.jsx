import React from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

// Auth
import Register from "./components/login/register";
import Login from "./components/login/login";

// Dashboard
import Maindashboard from "./components/dashboard/maindashboard";
import Works from "./components/dashboard/works";
import Nav from "./components/dashboard/nav";
import Quickaction from "./components/dashboard/quickaction";
import Side from "./components/aside/side";
import AdminSidebar from "./components/adminpanel/AdminSidebar.jsx";
import SuperAdminSidebar from "./components/superadminpanel/SuperAdminSidebar.jsx";
import CalendarComponent from "./components/calender/calender.jsx";
import Summary from "./components/summary/summary.jsx";
import Employeprofile from "./components/profie/employeprofile.jsx";
import Chat from "./components/groupchats/chat.jsx";
import Dailywork from "./components/dailyworks/dailywork.jsx";
import Leave from "./components/leaves/leave.jsx";
import EmployeeSidebar from "./components/dashboard/employeesidebar.jsx";
// Admin Panel
import MainDashboard from "./components/adminpanel/maindashboard.jsx";
import AllUsers from "./components/adminpanel/admindashboard/allusers.jsx";
import Adminleaves from "./components/adminpanel/admindashboard/adminleaves.jsx";
import Addproject from "./components/adminpanel/admindashboard/addproject.jsx";
import Assinproject from "./components/adminpanel/admindashboard/assinproject.jsx";
import Projectdetails from "./components/adminpanel/admindashboard/projectdetails.jsx";
import Employeedailyreport from "./components/adminpanel/admindashboard/employeedailyreport.jsx";
import Jobs from "./components/adminpanel/admindashboard/jobs.jsx";

// Super Admin Panel
import Superadminactions from "./components/superadminpanel/superadminactions.jsx";
import Employees from "./components/superadminpanel/dashboard/Eployees.jsx";
import Superadminmain from "./components/superadminpanel/dashboard/superadminmain.jsx";
import Employeedetails from "./components/superadminpanel/dashboard/Employeedetails.jsx";
import Superdashboard from "./components/superadminpanel/dashboard/maindashboard.jsx"
import Superadminproject from "./components/superadminpanel/dashboard/superadminproject.jsx";
import Superadminprojectdetails from "./components/superadminpanel/dashboard/superadminprojectdetails.jsx";
// Utils
import SmoothScroll from "./lenis.jsx";
import ProtectedRoute from "./components/protectedrout.jsx";

const App = () => {
  const { pathname } = useLocation();

  const hideQuickActionPaths = ["/login", "/register", "/superadmin"];
  const shouldHideQuickAction =
    hideQuickActionPaths.includes(pathname) ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/superadmin");

  const hideNavPaths = ["/login", "/register", "/superadmin"];
  const shouldHideNav =
    hideNavPaths.includes(pathname) || pathname.startsWith("/superadmin");

  const isAdminRoute = pathname.startsWith("/admin");
  const isSuperAdminRoute = pathname.startsWith("/superadmin");
  const loginRoute = pathname.startsWith("/login");
  const registerRoute = pathname.startsWith("/register");

  return (
    <div className="bg-blue-50 flex flex-col lg:flex-row min-h-screen scrollbar-hide bg-no-repeat bg-cover bg-fixed bg-[url('')]">
      <SmoothScroll />

      
      <div className="w-full lg:w-1/4 xl:w-1/5 mb-4 lg:mb-0">
        {isAdminRoute ? (
          <AdminSidebar />
        ) : isSuperAdminRoute ? (
          <SuperAdminSidebar />
        ) : loginRoute || registerRoute ? (
          <Side />
        ) : (
          <EmployeeSidebar />
        )}
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/4 xl:w-4/5 sm:py-4 lg:py-5 px-3 sm:px-4 lg:px-10">
        {!shouldHideNav && <Nav />}
        {!shouldHideQuickAction && <Quickaction />}

        <Routes>
          {/* Employee Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Maindashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/works"
            element={
              <ProtectedRoute>
                <Works />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leave"
            element={
              <ProtectedRoute>
                <Leave />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calender"
            element={
              <ProtectedRoute>
                <CalendarComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/summary"
            element={
              <ProtectedRoute>
                <Summary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Employeprofile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/groupchat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dailywork"
            element={
              <ProtectedRoute>
                <Dailywork />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}


          
          <Route
            path="/admin/*"
            element={
                <ProtectedRoute>
                  <MainDashboard />
                </ProtectedRoute>
            }
          >

          <Route
            path="employees"
            element={
              <ProtectedRoute>
                  <AllUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="calenderadmin"
              element={
                <ProtectedRoute>
                  <CalendarComponent />
                </ProtectedRoute>
              }
            />
            <Route
              path="chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="leaves"
              element={
                <ProtectedRoute>
                  <Adminleaves />
                </ProtectedRoute>
              }
            />
            <Route
              path="addproject"
              element={
                <ProtectedRoute>
                  <Addproject />
                </ProtectedRoute>
              }
            />
            <Route
              path="assinTask"
              element={
                <ProtectedRoute>
                  <Assinproject />
                </ProtectedRoute>
              }
            />
            <Route
              path="assinTask/:id"
              element={
                <ProtectedRoute>
                  <Projectdetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="employee/:id"
              element={
                <ProtectedRoute>
                  <Employeedetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="employeedailyreport"
              element={
                <ProtectedRoute>
                  <Employeedailyreport />
                </ProtectedRoute>
              }
            />
            <Route
              path="jobs"
              element={
                <ProtectedRoute>
                  <Jobs />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="" />} />
          </Route>







          {/* Super Admin Routes */}
          <Route
            path="/superadmin/*"
            element={
              <ProtectedRoute>
                <Superadminmain />
              </ProtectedRoute>
            }
          >
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Superdashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="employees"
              element={
                <ProtectedRoute>
                  <Employees />
                </ProtectedRoute>
              }
            />
            <Route
              path="employees/:id"
              element={
                <ProtectedRoute>
                  <Employeedetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="projects"
              element={
                <ProtectedRoute>
                  <Superadminproject />
                </ProtectedRoute>
              }
            />
            <Route
              path="projects/:id"
              element={
                <ProtectedRoute>
                  <Superadminprojectdetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="reports"
              element={
                <ProtectedRoute>
                  <Employeedailyreport />
                </ProtectedRoute>
              }
            />
            <Route
              path="reports/:id"
              element={
                <ProtectedRoute>
                  <Employeedailyreport />
                </ProtectedRoute>
              }
            />
            <Route
              path="leaves"
              element={
                <ProtectedRoute>
                  <Adminleaves />
                </ProtectedRoute>
              }
            />
            <Route
              path="jobs"
              element={
                <ProtectedRoute>
                  <Jobs />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
