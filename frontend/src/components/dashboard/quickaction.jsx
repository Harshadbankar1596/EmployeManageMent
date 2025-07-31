import React from 'react'
import { Link } from 'react-router-dom'
import { FcLeave } from "react-icons/fc";
import { BiSolidNetworkChart, BiArea, BiSolidBarChartSquare , BiChat , BiSun} from "react-icons/bi";
import { FcCalendar } from "react-icons/fc";

const Quikactionbox = () => {
  return (
    <div className="mt-6 lg:mt-10 mb-5 w-full">
      <div className="mb-4 lg:mb-6">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Quick Actions</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 w-full">
        <Link
          to={"/"}
          className="
            flex items-center justify-between
            bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
            rounded-lg transition-all duration-300
            hover:scale-105 hover:shadow-lg hover:bg-blue-50
            border border-gray-200 hover:border-blue-300
            text-center w-full
          "
        >
          <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700">Dashboard</p>
          <BiArea className="text-lg sm:text-xl lg:text-2xl text-blue-600" />
        </Link>
        
        <Link
          to={"/leave"}
          className="
            flex items-center justify-between
            bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
            rounded-lg transition-all duration-300
            hover:scale-105 hover:shadow-lg hover:bg-green-50
            border border-gray-200 hover:border-green-300
            text-center w-full
          "
        >
          <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700">Apply For Leave</p>
          <FcLeave className="text-lg sm:text-xl lg:text-2xl" />
        </Link>
        
        <Link
          to={"/works"}
          className="
            flex items-center justify-between
            bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
            rounded-lg transition-all duration-300
            hover:scale-105 hover:shadow-lg hover:bg-purple-50
            border border-gray-200 hover:border-purple-300
            text-center w-full
          "
        >
          <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700">Working On</p>
          <BiSolidNetworkChart className="text-lg sm:text-xl lg:text-2xl text-purple-600" />
        </Link>
        
        <Link
          to={"/calender"}
          className="
            flex items-center justify-between
            bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
            rounded-lg transition-all duration-300
            hover:scale-105 hover:shadow-lg hover:bg-orange-50
            border border-gray-200 hover:border-orange-300
            text-center w-full
          "
        >
          <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700">Calendar</p>
          <FcCalendar className="text-lg sm:text-xl lg:text-2xl" />
        </Link>
        
        <Link
          to={"/summary"}
          className="
            flex items-center justify-between
            bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
            rounded-lg transition-all duration-300
            hover:scale-105 hover:shadow-lg hover:bg-indigo-50
            border border-gray-200 hover:border-indigo-300
            text-center w-full
          "
        >
          <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700">Summary</p>
          <BiSolidBarChartSquare className="text-lg sm:text-xl lg:text-2xl text-indigo-600" />
        </Link>

        
        <Link
          to={"/groupchat"}
          className="
            flex items-center justify-between
            bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
            rounded-lg transition-all duration-300
            hover:scale-105 hover:shadow-lg hover:bg-pink-50
            border border-gray-200 hover:border-pink-300
            text-center w-full sm:col-span-2 lg:col-span-1
          "
        >
          <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700">Group Chat</p>
          <BiChat className="text-lg sm:text-xl lg:text-2xl text-pink-600" />
        </Link>
        <Link
          to={"/dailywork"}
          className="
            flex items-center justify-between
            bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
            rounded-lg transition-all duration-300
            hover:scale-105 hover:shadow-lg hover:bg-yellow-50
            border border-gray-200 hover:border-yellow-300
            text-center w-full sm:col-span-2 lg:col-span-1
          "
        >
          <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700">Daily Work</p>
          <BiSun className="text-lg sm:text-xl lg:text-2xl text-yellow-600" />
        </Link>
      </div>
    </div>
  )
}

export default Quikactionbox