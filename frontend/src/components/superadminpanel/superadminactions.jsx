

import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaCalendarCheck, FaProjectDiagram, FaChartBar } from "react-icons/fa";

const actions = [
  { name: "Dashboard", icon: <FaTachometerAlt size={28} />, path: "/superadmin/dashboard" },
  { name: "Employees", icon: <FaUsers size={28} />, path: "/superadmin/employees" },
  { name: "Projects", icon: <FaProjectDiagram size={28} />, path: "/superadmin/projects" },
  { name: "Reports", icon: <FaChartBar size={28} />, path: "/superadmin/reports" },
  { name: "Leaves", icon: <FaCalendarCheck size={28} />, path: "/superadmin/leaves" }

];

const Superadminactions = () => {
  return (
    <div>
      <div>
        <h1
          className="
          text-4xl
          md:text-5xl
          font-extrabold
          mb-10
          text-black          text-center
          bg-gradient-to-r from-black via-black to-black
          bg-clip-text
          text-transparent
          drop-shadow-lg
          animate-superadmin-title
        "
          style={{
            letterSpacing: "0.04em",
            animation: "superadmin-title-pop 1s cubic-bezier(0.22, 0.61, 0.36, 1) 0.1s both"
          }}
        >
          Super Admin Panel
        </h1>
        <style>
          {`
          @keyframes superadmin-title-pop {
            0% {
              opacity: 0;
              transform: scale(0.8) translateY(-30px);
              filter: blur(4px);
            }
            60% {
              opacity: 1;
              transform: scale(1.08) translateY(4px);
              filter: blur(0);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
              filter: blur(0);
            }
          }
          .animate-superadmin-title {
            animation: superadmin-title-pop 1s cubic-bezier(0.22, 0.61, 0.36, 1) 0.1s both;
          }
        `}
        </style>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mx-auto">
          {actions.map((action, idx) => (
            <Link
              key={action.name}
              to={action.path}
              className={`
              group
              rounded-xl
              shadow-lg
              bg-white
              flex flex-col items-center justify-center
              py-6 px-4
              transition
              duration-300
              hover:scale-105
              hover:shadow-2xl
              focus:outline-none
              focus:ring-2 focus:ring-yellow-400
              relative
              overflow-hidden
              animate-fade-in-up
            `}
              style={{
                animationDelay: `${0.1 + idx * 0.07}s`,
                animationFillMode: "both"
              }}
            >
              <span className="mb-2 text-yellow-400 group-hover:scale-110 group-hover:text-yellow-500 transition-transform duration-300">
                {/* Make icon smaller by overriding size */}
                {React.cloneElement(action.icon, { size: 20 })}
              </span>
              <span className="text-base font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors duration-300">
                {action.name}
              </span>
              <span
                className="absolute inset-0 pointer-events-none rounded-xl border-2 border-transparent group-hover:border-yellow-300 transition-all duration-300"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
        <style>
          {`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(24px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.7s cubic-bezier(0.22, 0.61, 0.36, 1);
          }
        `}
        </style>
      </div>
    </div>
  );
}

export default Superadminactions
