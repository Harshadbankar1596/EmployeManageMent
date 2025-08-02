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

import React from 'react';
import { Link } from 'react-router-dom';
import { FcLeave } from "react-icons/fc";
import { BiSolidNetworkChart, BiArea, BiSolidBarChartSquare, BiChat, BiSun } from "react-icons/bi";
import { FcCalendar } from "react-icons/fc";

const Quikactionbox = () => {
  // Quick actions data
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
      delay: "0.25s",
      span: 'sm:col-span-2 lg:col-span-1'
    },
    {
      to: "/dailywork",
      label: "Daily Work",
      Icon: BiSun,
      color: "yellow",
      delay: "0.3s",
      span: 'sm:col-span-2 lg:col-span-1'
    }
  ];

  return (
    <div className="mt-6 lg:mt-10 mb-5 w-full animate-fade-in">
      <div className="mb-4 lg:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800">
          Quick Actions
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 w-full">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.to}
            className={`
              ${action.span || ''}
              flex items-center justify-between
              bg-gradient-to-br from-white to-gray-50
              py-5 px-6
              rounded-xl transition-all duration-300
              transform hover:scale-[1.03] hover:shadow-xl
              border border-gray-200
              group relative overflow-hidden
              animate-fade-in-up
              before:absolute before:inset-0 
              before:bg-gradient-to-r before:from-${action.color}-500 before:to-${action.color}-600
              before:opacity-0 before:transition-opacity before:duration-300
              hover:before:opacity-10
              hover:border-${action.color}-300
              shadow-md hover:shadow-lg
            `}
            style={{
              animation: `fadeInUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) ${action.delay} both`
            }}
          >
            <div className="flex items-center">
              <div className={`bg-${action.color}-100 p-3 rounded-lg mr-4 group-hover:bg-${action.color}-200 transition-colors duration-300`}>
                <action.Icon 
                  className={`text-2xl ${
                    action.color === 'yellow' 
                      ? 'text-yellow-600' 
                      : action.color === 'pink'
                      ? 'text-pink-600'
                      : `text-${action.color}-600`
                  } transition-transform duration-300 group-hover:scale-110`} 
                />
              </div>
              <p className={`text-base font-semibold text-gray-800 transition-colors duration-300 group-hover:text-${action.color}-800`}>
                {action.label}
              </p>
            </div>
            
            <div className="text-gray-300 group-hover:text-gray-400 transition-colors duration-300">
              <div className="i-fa6-solid:arrow-right-long text-xl"></div>
            </div>
          </Link>
        ))}
      </div>
      
      <style jsx>{`
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
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Quikactionbox;