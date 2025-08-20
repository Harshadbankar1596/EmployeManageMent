
import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaCalendarCheck, FaProjectDiagram, FaChartBar } from "react-icons/fa";

const actions = [
  { name: "Dashboard", icon: <FaTachometerAlt size={28} />, path: "/superadmin/dashboard" },
  { name: "Employees", icon: <FaUsers size={28} />, path: "/superadmin/employees" },
  { name: "Projects", icon: <FaProjectDiagram size={28} />, path: "/superadmin/projects" },
  { name: "Reports", icon: <FaChartBar size={28} />, path: "/superadmin/reports" },
  { name: "Leaves", icon: <FaCalendarCheck size={28} />, path: "/superadmin/leaves" },
  { name: "Job requirements", icon: <FaChartBar size={28} />, path: "/superadmin/jobs" }
];

const Superadminactions = () => {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-red-500 to-green-500 mb-4">
            Super Admin Panel
          </h1>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {actions.map((action, idx) => (
            <Link
              key={action.name}
              to={action.path}
              className="group relative overflow-hidden"
              style={{
                animationDelay: `${idx * 0.1}s`,
                animationFillMode: "both"
              }}
            >
              <div className="relative bg-gradient-to-br from-blue-900/80 to-blue-900/60 backdrop-blur-xl rounded-3xl border border-blue-200/20 p-8 h-48 flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-red-500/50 group-hover:shadow-2xl group-hover:shadow-green-500/25">
                
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-blue-900/40 to-blue-900/20 backdrop-blur-sm rounded-2xl p-4 border border-blue-200/30 group-hover:border-red-500/50 transition-all duration-300">
                    <div className="text-yellow-500 group-hover:text-green-500 transition-colors duration-300 transform group-hover:scale-110">
                      {React.cloneElement(action.icon, { size: 32 })}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-yellow-500 transition-colors duration-300 text-center tracking-wide">
                  {action.name}
                </h3>

                {/* Hover Indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-green-500 rounded-full"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { 
              opacity: 0; 
              transform: translateY(20px);
            }
            to { 
              opacity: 1; 
              transform: translateY(0);
            }
          }
          
          .group {
            animation: fadeIn 0.6s ease-out both;
          }
        `}
      </style>
    </div>
  );
}

export default Superadminactions
