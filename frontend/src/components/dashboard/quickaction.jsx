import React from 'react'
import { Link } from 'react-router-dom'
const Quikactionbox = () => {
  return (
    <div className='mt-10 my-5'>
      <div>
        <h1 className='text-xl font-bold'>Quick Actions</h1>
      </div>
      <div className='rounded-md py-2 my-5 flex gap-4'>
        <Link to={'/'} className='bg-white py-2 px-4 rounded-full transition duration-700  hover:scale-105 hover:shadow-lg flex-shrink-0'>DashBoard</Link>
        <button className='bg-white py-2 px-4 rounded-full transition duration-700  hover:scale-105 hover:shadow-lg flex-shrink-0'>Apply For Leave</button>
        <Link to={'/works'} className='bg-white py-2 px-4 rounded-full transition duration-700  hover:scale-105 hover:shadow-lg flex-shrink-0'>Working On</Link>
      </div>
    </div>
  )
}

export default Quikactionbox