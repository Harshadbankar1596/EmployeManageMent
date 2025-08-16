// import React from 'react'
// import { Link } from 'react-router-dom'
// import { FcLeave } from "react-icons/fc";
// import { BiSolidNetworkChart, BiArea, BiSolidBarChartSquare , BiChat , BiSun} from "react-icons/bi";
// import { FcCalendar } from "react-icons/fc";

// const Quikactionbox = () => {
//   return (
//     <div className="mt-6 lg:mt-10 mb-5 w-full">
//       <div className="mb-4 lg:mb-6">
//         <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Quick Actions</h1>
//       </div>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 w-full">
//         {/* Dashboard */}
//         <Link
//           to={"/"}
//           className="
//             flex items-center justify-between
//             bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
//             rounded-lg transition-all duration-300
//             hover:scale-105 hover:shadow-2xl hover:bg-blue-50
//             border border-gray-200 hover:border-blue-300
//             text-center w-full
//             animate-fade-in-up
//           "
//           style={{
//             animation: "fadeInUp 0.5s ease 0s both"
//           }}
//         >
//           <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700 transition-colors duration-300 group-hover:text-blue-700">Dashboard</p>
//           <BiArea className="text-lg sm:text-xl lg:text-2xl text-blue-600 transition-transform duration-300 group-hover:scale-125" />
//         </Link>
        
        
//         <Link
//           to={"/leave"}
//           className="
//             flex items-center justify-between
//             bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
//             rounded-lg transition-all duration-300
//             hover:scale-105 hover:shadow-2xl hover:bg-green-50
//             border border-gray-200 hover:border-green-300
//             text-center w-full
//             animate-fade-in-up
//           "
//           style={{
//             animation: "fadeInUp 0.5s ease 0.05s both"
//           }}
//         >
//           <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700 transition-colors duration-300 group-hover:text-green-700">Apply For Leave</p>
//           <FcLeave className="text-lg sm:text-xl lg:text-2xl transition-transform duration-300 group-hover:scale-125" />
//         </Link>
        
//         <Link
//           to={"/works"}
//           className="
//             flex items-center justify-between
//             bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
//             rounded-lg transition-all duration-300
//             hover:scale-105 hover:shadow-2xl hover:bg-purple-50
//             border border-gray-200 hover:border-purple-300
//             text-center w-full
//             animate-fade-in-up
//           "
//           style={{
//             animation: "fadeInUp 0.5s ease 0.1s both"
//           }}
//         >
//           <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700 transition-colors duration-300 group-hover:text-purple-700">Working On</p>
//           <BiSolidNetworkChart className="text-lg sm:text-xl lg:text-2xl text-purple-600 transition-transform duration-300 group-hover:scale-125" />
//         </Link>
        
//         <Link
//           to={"/calender"}
//           className="
//             flex items-center justify-between
//             bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
//             rounded-lg transition-all duration-300
//             hover:scale-105 hover:shadow-2xl hover:bg-orange-50
//             border border-gray-200 hover:border-orange-300
//             text-center w-full
//             animate-fade-in-up
//           "
//           style={{
//             animation: "fadeInUp 0.5s ease 0.15s both"
//           }}
//         >
//           <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700 transition-colors duration-300 group-hover:text-orange-700">Calendar</p>
//           <FcCalendar className="text-lg sm:text-xl lg:text-2xl transition-transform duration-300 group-hover:scale-125" />
//         </Link>
        
//         <Link
//           to={"/summary"}
//           className="
//             flex items-center justify-between
//             bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
//             rounded-lg transition-all duration-300
//             hover:scale-105 hover:shadow-2xl hover:bg-indigo-50
//             border border-gray-200 hover:border-indigo-300
//             text-center w-full
//             animate-fade-in-up
//           "
//           style={{
//             animation: "fadeInUp 0.5s ease 0.2s both"
//           }}
//         >
//           <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700 transition-colors duration-300 group-hover:text-indigo-700">Summary</p>
//           <BiSolidBarChartSquare className="text-lg sm:text-xl lg:text-2xl text-indigo-600 transition-transform duration-300 group-hover:scale-125" />
//         </Link>

//         <Link
//           to={"/groupchat"}
//           className="
//             flex items-center justify-between
//             bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
//             rounded-lg transition-all duration-300
//             hover:scale-105 hover:shadow-2xl hover:bg-pink-50
//             border border-gray-200 hover:border-pink-300
//             text-center w-full sm:col-span-2 lg:col-span-1
//             animate-fade-in-up
//           "
//           style={{
//             animation: "fadeInUp 0.5s ease 0.25s both"
//           }}
//         >
//           <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700 transition-colors duration-300 group-hover:text-pink-700">Group Chat</p>
//           <BiChat className="text-lg sm:text-xl lg:text-2xl text-pink-600 transition-transform duration-300 group-hover:scale-125" />
//         </Link>
//         <Link
//           to={"/dailywork"}
//           className="
//             flex items-center justify-between
//             bg-white py-4 sm:py-5 lg:py-6 px-4 sm:px-5 lg:px-6
//             rounded-lg transition-all duration-300
//             hover:scale-105 hover:shadow-2xl hover:bg-yellow-50
//             border border-gray-200 hover:border-yellow-300
//             text-center w-full sm:col-span-2 lg:col-span-1
//             animate-fade-in-up
//           "
//           style={{
//             animation: "fadeInUp 0.5s ease 0.3s both"
//           }}
//         >
//           <p className="text-sm sm:text-base lg:text-lg font-bold mx-2 sm:mx-3 text-gray-700 transition-colors duration-300 group-hover:text-yellow-700">Daily Work</p>
//           <BiSun className="text-lg sm:text-xl lg:text-2xl text-yellow-600 transition-transform duration-300 group-hover:scale-125" />
//         </Link>
//       </div>
//       <style>
//         {`
//           @keyframes fadeInUp {
//             0% {
//               opacity: 0;
//               transform: translateY(30px);
//             }
//             100% {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//         `}
//       </style>
//     </div>
//   )
// }

// export default Quikactionbox

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcLeave } from "react-icons/fc";
import { BiSolidNetworkChart, BiArea, BiSolidBarChartSquare, BiChat, BiSun } from "react-icons/bi";
import { FcCalendar } from "react-icons/fc";

// Color map for tailwind classes
const colorMap = {
  blue: {
    icon: "text-blue-600",
    bg: "bg-blue-100",
    bgHover: "group-hover:bg-blue-200",
    borderHover: "hover:border-blue-300",
    text: "group-hover:text-blue-800"
  },
  green: {
    icon: "text-green-600",
    bg: "bg-green-100",
    bgHover: "group-hover:bg-green-200",
    borderHover: "hover:border-green-300",
    text: "group-hover:text-green-800"
  },
  purple: {
    icon: "text-purple-600",
    bg: "bg-purple-100",
    bgHover: "group-hover:bg-purple-200",
    borderHover: "hover:border-purple-300",
    text: "group-hover:text-purple-800"
  },
  orange: {
    icon: "text-orange-600",
    bg: "bg-orange-100",
    bgHover: "group-hover:bg-orange-200",
    borderHover: "hover:border-orange-300",
    text: "group-hover:text-orange-800"
  },
  indigo: {
    icon: "text-indigo-600",
    bg: "bg-indigo-100",
    bgHover: "group-hover:bg-indigo-200",
    borderHover: "hover:border-indigo-300",
    text: "group-hover:text-indigo-800"
  },
  pink: {
    icon: "text-pink-600",
    bg: "bg-pink-100",
    bgHover: "group-hover:bg-pink-200",
    borderHover: "hover:border-pink-300",
    text: "group-hover:text-pink-800"
  },
  yellow: {
    icon: "text-yellow-600",
    bg: "bg-yellow-100",
    bgHover: "group-hover:bg-yellow-200",
    borderHover: "hover:border-yellow-300",
    text: "group-hover:text-yellow-800"
  }
};

const quickActions = [
  {
    to: "/",
    label: "Dashboard",
    Icon: BiArea,
    color: "blue",
    delay: "0s"
  },
  {
    to: "/leave",
    label: "Apply For Leave",
    Icon: FcLeave,
    color: "green",
    delay: "0.05s"
  },
  {
    to: "/works",
    label: "Working On",
    Icon: BiSolidNetworkChart,
    color: "purple",
    delay: "0.1s"
  },
  {
    to: "/calender",
    label: "Calendar",
    Icon: FcCalendar,
    color: "orange",
    delay: "0.15s"
  },
  {
    to: "/summary",
    label: "Summary",
    Icon: BiSolidBarChartSquare,
    color: "indigo",
    delay: "0.2s"
  },
  {
    to: "/groupchat",
    label: "Group Chat",
    Icon: BiChat,
    color: "pink",
    delay: "0.25s"
  },
  {
    to: "/dailywork",
    label: "Daily Work",
    Icon: BiSun,
    color: "yellow",
    delay: "0.3s"
  }
];

const Quikactionbox = () => {
  // Track which index is hovered
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="mt-6 lg:mt-10 mb-5 w-full">
      <div className="mb-4 lg:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800">
          Quick Actions
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
      </div>
      <div
        className="
          grid grid-cols-4 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-7
          gap-2 sm:gap-3 md:gap-4 lg:gap-6
          justify-items-center
          w-full
          max-w-2xl
          mx-auto
        "
      >
        {quickActions.map((action, idx) => {
          const color = colorMap[action.color];
          // If any icon is hovered, and this is not the hovered one, add translate-x
          const isHovered = hoveredIdx === idx;
          const anyHovered = hoveredIdx !== null;
          // On hover, move the hovered icon to front (scale up and z-30), others move aside (translate-x)
          return (
            <Link
              key={idx}
              to={action.to}
              className={`
                group
                flex flex-col items-center justify-center
                relative
                rounded-full
                border border-gray-200
                bg-white
                shadow-sm
                transition-all duration-300
                ${color.borderHover}
                hover:shadow-lg
                focus:outline-none
                w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-20 lg:h-20
                p-0
                overflow-visible
                animate-fade-in-up
                ${isHovered ? 'z-30 scale-110' : ''}
                ${anyHovered && !isHovered ? 'lg:opacity-60 lg:scale-90' : ''}
              `}
              style={{
                animation: `fadeInUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) ${action.delay} both`
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div
                className={`
                  flex items-center justify-center
                  ${color.bg} ${color.bgHover}
                  rounded-full
                  w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 lg:w-16 lg:h-16
                  transition-colors duration-300
                  text-center
                `}
              >
                <action.Icon
                  className={`
                    ${color.icon}
                    text-2xl sm:text-3xl md:text-3xl lg:text-4xl
                    transition-transform duration-300
                    group-hover:scale-110
                  `}
                />
              </div>
              {/* Name label: hidden on mobile, slide in on hover for lg+ */}
              <span
                className={`
                  absolute left-1/2 top-full
                  -translate-x-1/2
                  mt-2
                  whitespace-nowrap
                  px-3 py-1
                  rounded-md
                  bg-white
                  shadow
                  text-xs sm:text-sm md:text-base
                  font-semibold
                  opacity-0
                  pointer-events-none
                  select-none
                  z-20
                  ${color.text}
                  transition-all duration-300
                  hidden lg:block
                  ${isHovered ? 'lg:opacity-100 lg:pointer-events-auto lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2 lg:-translate-x-1/2 lg:scale-110' : ''}
                `}
                style={{
                  minWidth: '90px'
                }}
              >
                {action.label}
              </span>
            </Link>
          );
        })}
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
  );
};

export default Quikactionbox;