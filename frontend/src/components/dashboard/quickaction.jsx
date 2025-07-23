import React from 'react'
import { Link } from 'react-router-dom'
import { FcLeave } from "react-icons/fc";
import { BiSolidNetworkChart } from "react-icons/bi";
const Quikactionbox = () => {
  return (
    <div className="mt-10 my-5">
      <div>
        <h1 className="text-xl font-bold">Quick Actions</h1>
      </div>
      <div className="rounded-md py-2 my-5 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Link to={"/leave"}
          className="flex items-center justify-between bg-white py-5 px-5 rounded-md transition duration-700 hover:scale-105 hover:shadow-lg flex-shrink-0 text-center w-full sm:w-auto"
        >
          <p className='text-lg font-bold mx-3'>Apply For Leave</p>
          <FcLeave className='text-2xl' />
        </Link>
        <Link to={"/works"}
          className="flex items-center justify-between bg-white py-5 px-5 rounded-md transition duration-700 hover:scale-105 hover:shadow-lg flex-shrink-0 text-center w-full sm:w-auto"
        >
          <p className='text-lg font-bold mx-3'>Working On</p>
          <BiSolidNetworkChart />

        </Link>

      </div>
    </div>
  )
}

export default Quikactionbox