import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import AllUsers from './admindashboard/allusers'
import ProjectSummary from './admindashboard/projectsummary'
import Adminaction from './admindashboard/adminaction.jsx'

const MainDashboard = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === `/admin${path}`;
  };

  return (
    <div>
      <Adminaction/>
      <Routes>
        <Route path='Employee' element={<AllUsers />} />
        <Route path='projects' element={<ProjectSummary />} />
      </Routes>
    </div>
  )
}

export default MainDashboard
