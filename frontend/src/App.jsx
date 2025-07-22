import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/login/register";
import Login from "./components/login/login";
import CalendarGrid from "./components/login/o1";
import Maindashboard from "./components/dashboard/maindashboard";
import Works from "./components/dashboard/works";
import Nav from "./components/dashboard/nav";
import Quickaction from "./components/dashboard/quickaction";
const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-blue-50 px-2 sm:px-8 md:px-16 lg:px-20 py-5">
        <Nav />
        <Quickaction />
        <Routes>
          <Route path="/" element={<Maindashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/calender" element={<CalendarGrid />} />
          <Route path="/works" element={<Works />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
