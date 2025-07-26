import React from 'react'
import { Link } from 'react-router-dom'
import { FcLeave } from "react-icons/fc";
import { BiSolidNetworkChart, BiArea, BiSolidBarChartSquare , BiChat} from "react-icons/bi";
import { FcCalendar } from "react-icons/fc";
const Quikactionbox = () => {
  return (
    <div className="mt-10 my-5 w-full">
      <div>
        <h1 className="text-xl font-bold">Quick Actions</h1>
      </div>
      <div
        className="
          rounded-md py-2 my-5
          grid grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
          gap-3 sm:gap-4
          w-full
        "
      >
        <Link
          to={"/"}
          className="
            flex items-center justify-between
            bg-white py-4 px-4
            rounded-md transition duration-700
            hover:scale-105 hover:shadow-lg
            flex-shrink-0 text-center
            w-full
          "
        >
          <p className="text-base sm:text-lg font-bold mx-2 sm:mx-3">Dashboard</p>
          <BiArea className="text-xl sm:text-2xl" />
        </Link>
        <Link
          to={"/leave"}
          className="
            flex items-center justify-between
            bg-white py-4 px-4
            rounded-md transition duration-700
            hover:scale-105 hover:shadow-lg
            flex-shrink-0 text-center
            w-full
          "
        >
          <p className="text-base sm:text-lg font-bold mx-2 sm:mx-3">Apply For Leave</p>
          <FcLeave className="text-xl sm:text-2xl" />
        </Link>
        <Link
          to={"/works"}
          className="
            flex items-center justify-between
            bg-white py-4 px-4
            rounded-md transition duration-700
            hover:scale-105 hover:shadow-lg
            flex-shrink-0 text-center
            w-full
          "
        >
          <p className="text-base sm:text-lg font-bold mx-2 sm:mx-3">Working On</p>
          <BiSolidNetworkChart className="text-xl sm:text-2xl" />
        </Link>
        <Link
          to={"/calender"}
          className="
            flex items-center justify-between
            bg-white py-4 px-4
            rounded-md transition duration-700
            hover:scale-105 hover:shadow-lg
            flex-shrink-0 text-center
            w-full
          "
        >
          <p className="text-base sm:text-lg font-bold mx-2 sm:mx-3">Calendar</p>
          <FcCalendar className="text-xl sm:text-2xl" />
        </Link>
        <Link
          to={"/summary"}
          className="
            flex items-center justify-between
            bg-white py-4 px-4
            rounded-md transition duration-700
            hover:scale-105 hover:shadow-lg
            flex-shrink-0 text-center
            w-full
          "
        >
          <p className="text-base sm:text-lg font-bold mx-2 sm:mx-3">Summary</p>
          <BiSolidBarChartSquare className="text-xl sm:text-2xl" />
        </Link>
        <Link
          to={"/groupchat"}
          className="
            flex items-center justify-between
            bg-white py-4 px-4
            rounded-md transition duration-700
            hover:scale-105 hover:shadow-lg
            flex-shrink-0 text-center
            w-full
          "
        >
          <p className="text-base sm:text-lg font-bold mx-2 sm:mx-3">Group Chat</p>
          <BiChat className="text-xl sm:text-2xl" />
        </Link>


      </div>
    </div>
  )
}

export default Quikactionbox