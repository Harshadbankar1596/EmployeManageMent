import React from 'react'
import { Link } from 'react-router-dom'
import { IoPerson } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";
import { RiTaskLine } from "react-icons/ri";
import { BiSpreadsheet } from "react-icons/bi";
import { FaPen } from "react-icons/fa";
const Adminaction = (props) => {
  return (
    <div className="my-5 mx-2 sm:mx-4 md:mx-8">
      <div
        className="
          grid grid-cols-2 3 md:grid-cols-5 sm:grid-cols-4 lg:grid-cols-5
          gap-3 sm:gap-5 md:gap-6
          justify-items-center
          w-full
          max-w-4xl
          mx-auto
        "
      >
        {/* Employees */}
        <Link
          to="/admin/employee"
          className={`
            group
            flex flex-col items-center justify-center
            relative
            rounded-full
            border border-gray-200
            bg-yellow-100
            shadow-sm
            transition-all duration-300
            hover:border-yellow-400
            hover:shadow-lg
            focus:outline-none
            w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
            p-0
            overflow-visible
            animate-fade-in-up
          `}
          style={{
            animation: `fadeInUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) 0s both`
          }}
        >
          <div
            className={`
              flex items-center justify-center
              bg-yellow-200 group-hover:bg-yellow-300
              rounded-full
              w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28
              transition-colors duration-300
              text-center
            `}
          >
            <IoPerson
              className={`
                text-yellow-700
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                transition-transform duration-300
                group-hover:scale-110
              `}
            />
          </div>
          <span
            className={`
              mt-2
              px-3 py-1
              rounded-md
              bg-white
              shadow
              text-xs sm:text-sm md:text-base
              font-semibold
              text-yellow-800
              transition-all duration-300
              text-center
              select-none
            `}
            style={{
              minWidth: '90px'
            }}
          >
            Employees
          </span>
        </Link>

        {/* Leaves */}
        <Link
          to="/admin/leaves"
          className={`
            group
            flex flex-col items-center justify-center
            relative
            rounded-full
            border border-gray-200
            bg-blue-100
            shadow-sm
            transition-all duration-300
            hover:border-blue-400
            hover:shadow-lg
            focus:outline-none
            w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
            p-0
            overflow-visible
            animate-fade-in-up
          `}
          style={{
            animation: `fadeInUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) 0.05s both`
          }}
        >
          <div
            className={`
              flex items-center justify-center
              bg-blue-200 group-hover:bg-blue-300
              rounded-full
              w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28
              transition-colors duration-300
              text-center
              relative
            `}
          >
            {/* Pending leaves badge */}
            {props.pendingleaves > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow z-10">
                {props.pendingleaves}
              </span>
            )}
            <FaBookOpen
              className={`
                text-blue-700
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                transition-transform duration-300
                group-hover:scale-110
              `}
            />
          </div>
          <span
            className={`
              mt-2
              px-3 py-1
              rounded-md
              bg-white
              shadow
              text-xs sm:text-sm md:text-base
              font-semibold
              text-blue-800
              transition-all duration-300
              text-center
              select-none
            `}
            style={{
              minWidth: '90px'
            }}
          >
            Leaves
          </span>
        </Link>

        {/* Assign Task */}
        <Link
          to="/admin/assinTask"
          className={`
            group
            flex flex-col items-center justify-center
            relative
            rounded-full
            border border-gray-200
            bg-green-100
            shadow-sm
            transition-all duration-300
            hover:border-green-400
            hover:shadow-lg
            focus:outline-none
            w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
            p-0
            overflow-visible
            animate-fade-in-up
          `}
          style={{
            animation: `fadeInUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) 0.1s both`
          }}
        >
          <div
            className={`
              flex items-center justify-center
              bg-green-200 group-hover:bg-green-300
              rounded-full
              w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28
              transition-colors duration-300
              text-center
            `}
          >
            <RiTaskLine
              className={`
                text-green-700
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                transition-transform duration-300
                group-hover:scale-110
              `}
            />
          </div>
          <span
            className={`
              mt-2
              px-3 py-1
              rounded-md
              bg-white
              shadow
              text-xs sm:text-sm md:text-base
              font-semibold
              text-green-800
              transition-all duration-300
              text-center
              select-none
            `}
            style={{
              minWidth: '90px'
            }}
          >
            Assign Task
          </span>
        </Link>

        {/* Add Project */}
        <Link
          to="/admin/addProject"
          className={`
            group
            flex flex-col items-center justify-center
            relative
            rounded-full
            border border-gray-200
            bg-gray-900
            shadow-sm
            transition-all duration-300
            hover:border-gray-700
            hover:shadow-lg
            focus:outline-none
            w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
            p-0
            overflow-visible
            animate-fade-in-up
          `}
          style={{
            animation: `fadeInUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) 0.15s both`
          }}
        >
          <div
            className={`
              flex items-center justify-center
              bg-gray-800 group-hover:bg-gray-700
              rounded-full
              w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28
              transition-colors duration-300
              text-center
            `}
          >
            <FaPen
              className={`
                text-white
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                transition-transform duration-300
                group-hover:scale-110
              `}
            />
          </div>
          <span
            className={`
              mt-2
              px-3 py-1
              rounded-md
              bg-white
              shadow
              text-xs sm:text-sm md:text-base
              font-semibold
              text-gray-900
              transition-all duration-300
              text-center
              select-none
            `}
            style={{
              minWidth: '90px'
            }}
          >
            Add Project
          </span>
        </Link>
        <Link
          to="/admin/employeedailyreport"
          className={`
            group
            flex flex-col items-center justify-center
            relative
            rounded-full
            border border-gray-200
            bg-red-100
            shadow-sm
            transition-all duration-300
            hover:border-red-400
            hover:shadow-lg
            focus:outline-none
            w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
            p-0
            overflow-visible
            animate-fade-in-up
          `}
          style={{
            animation: `fadeInUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) 0.1s both`
          }}
        >
          <div
            className={`
              flex items-center justify-center
              bg-red-200 group-hover:bg-red-300
              rounded-full
              w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28
              transition-colors duration-300
              text-center
            `}
          >
            <BiSpreadsheet
              className={`
                text-red-700
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                transition-transform duration-300
                group-hover:scale-110
              `}
            />
          </div>
          <span
            className={`
              mt-2
              px-3 py-1
              rounded-md
              bg-white
              shadow
              text-xs sm:text-sm md:text-base
              font-semibold
              text-red-800
              transition-all duration-300
              text-center
              select-none
            `}
            style={{
              minWidth: '90px'
            }}
          >
            EmployeeReport
          </span>
        </Link>
      </div>
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both;
        }
      `}</style>
    </div>
  )
}

export default Adminaction