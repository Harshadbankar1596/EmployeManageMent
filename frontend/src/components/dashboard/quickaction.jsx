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
        {/* Dashboard */}
        <Link
          to={"/"}
          className="
            flex items-center justify-between
            bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
            rounded-lg transition-all duration-300
            hover:scale-105 hover:shadow-2xl hover:bg-blue-50
            border border-gray-200 hover:border-blue-300
            text-center w-full
            animate-fade-in-up
          "
          style={{
            animation: "fadeInUp 0.5s ease 0s both"
          }}
        >
          <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700 transition-colors duration-300 group-hover:text-blue-700">Dashboard</p>
          <BiArea className="text-lg sm:text-xl lg:text-2xl text-blue-600 transition-transform duration-300 group-hover:scale-125" />
        </Link>
        
        
        <Link
          to={"/leave"}
          className="
            flex items-center justify-between
            bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
            rounded-lg transition-all duration-300
            hover:scale-105 hover:shadow-2xl hover:bg-green-50
            border border-gray-200 hover:border-green-300
            text-center w-full
            animate-fade-in-up
          "
          style={{
            animation: "fadeInUp 0.5s ease 0.05s both"
          }}
        >
          <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700 transition-colors duration-300 group-hover:text-green-700">Apply For Leave</p>
          <FcLeave className="text-lg sm:text-xl lg:text-2xl transition-transform duration-300 group-hover:scale-125" />
        </Link>
        
        <Link
          to={"/works"}
          className="
            flex items-center justify-between
            bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
            rounded-lg transition-all duration-300
            hover:scale-105 hover:shadow-2xl hover:bg-purple-50
            border border-gray-200 hover:border-purple-300
            text-center w-full
            animate-fade-in-up
          "
          style={{
            animation: "fadeInUp 0.5s ease 0.1s both"
          }}
        >
          <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700 transition-colors duration-300 group-hover:text-purple-700">Working On</p>
          <BiSolidNetworkChart className="text-lg sm:text-xl lg:text-2xl text-purple-600 transition-transform duration-300 group-hover:scale-125" />
        </Link>
        
        <Link
          to={"/calender"}
          className="
            flex items-center justify-between
            bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
            rounded-lg transition-all duration-300
            hover:scale-105 hover:shadow-2xl hover:bg-orange-50
            border border-gray-200 hover:border-orange-300
            text-center w-full
            animate-fade-in-up
          "
          style={{
            animation: "fadeInUp 0.5s ease 0.15s both"
          }}
        >
          <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700 transition-colors duration-300 group-hover:text-orange-700">Calendar</p>
          <FcCalendar className="text-lg sm:text-xl lg:text-2xl transition-transform duration-300 group-hover:scale-125" />
        </Link>
        
        <Link
          to={"/summary"}
          className="
            flex items-center justify-between
            bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
            rounded-lg transition-all duration-300
            hover:scale-105 hover:shadow-2xl hover:bg-indigo-50
            border border-gray-200 hover:border-indigo-300
            text-center w-full
            animate-fade-in-up
          "
          style={{
            animation: "fadeInUp 0.5s ease 0.2s both"
          }}
        >
          <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700 transition-colors duration-300 group-hover:text-indigo-700">Summary</p>
          <BiSolidBarChartSquare className="text-lg sm:text-xl lg:text-2xl text-indigo-600 transition-transform duration-300 group-hover:scale-125" />
        </Link>

        <Link
          to={"/groupchat"}
          className="
            flex items-center justify-between
            bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
            rounded-lg transition-all duration-300
            hover:scale-105 hover:shadow-2xl hover:bg-pink-50
            border border-gray-200 hover:border-pink-300
            text-center w-full sm:col-span-2 lg:col-span-1
            animate-fade-in-up
          "
          style={{
            animation: "fadeInUp 0.5s ease 0.25s both"
          }}
        >
          <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700 transition-colors duration-300 group-hover:text-pink-700">Group Chat</p>
          <BiChat className="text-lg sm:text-xl lg:text-2xl text-pink-600 transition-transform duration-300 group-hover:scale-125" />
        </Link>
        <Link
          to={"/dailywork"}
          className="
            flex items-center justify-between
            bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
            rounded-lg transition-all duration-300
            hover:scale-105 hover:shadow-2xl hover:bg-yellow-50
            border border-gray-200 hover:border-yellow-300
            text-center w-full sm:col-span-2 lg:col-span-1
            animate-fade-in-up
          "
          style={{
            animation: "fadeInUp 0.5s ease 0.3s both"
          }}
        >
          <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700 transition-colors duration-300 group-hover:text-yellow-700">Daily Work</p>
          <BiSun className="text-lg sm:text-xl lg:text-2xl text-yellow-600 transition-transform duration-300 group-hover:scale-125" />
        </Link>
      </div>
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  )
}

export default Quikactionbox