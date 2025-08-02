import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AllUsers from './admindashboard/allusers'
import Punchsection from '../dashboard/punchsection'

const MainDashboard = () => {
  return (
    <div className='py-5'>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Routes>
        <Route path='' element={<Punchsection />} />        
        <Route path='users' element={<AllUsers />} />      
      </Routes>
    </div>
  )
}

export default MainDashboard
