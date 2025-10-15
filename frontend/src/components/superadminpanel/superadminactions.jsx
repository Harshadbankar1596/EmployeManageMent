import React from "react";
import { FaTachometerAlt, FaUsers, FaCalendarCheck, FaProjectDiagram, FaChartBar, FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";
const actions = [
  {
    name: "Dashboard",
    icon: <FaTachometerAlt size={20} />,
    path: "/superadmin/dashboard",
    color: "text-black",
    hoverColor: "",
    iconBg: "bg-purple-500/20"
  },
  {
    name: "Employees",
    icon: <FaUsers size={20} />,
    path: "/superadmin/employees",
    color: "from-blue-500 to-cyan-600",
    hoverColor: "hover:shadow-blue-500/30",
    iconBg: "bg-blue-500/20"
  },
  {
    name: "Projects",
    icon: <FaProjectDiagram size={20} />,
    path: "/superadmin/projects",
    color: "from-emerald-500 to-green-600",
    hoverColor: "hover:shadow-emerald-500/30",
    iconBg: "bg-emerald-500/20"
  },
  {
    name: "Reports",
    icon: <FaChartBar size={20} />,
    path: "/superadmin/reports",
    color: "from-orange-500 to-red-600",
    hoverColor: "hover:shadow-orange-500/30",
    iconBg: "bg-orange-500/20"
  },
  {
    name: "Leaves",
    icon: <FaCalendarCheck size={20} />,
    path: "/superadmin/leaves",
    color: "from-pink-500 to-rose-600",
    hoverColor: "hover:shadow-pink-500/30",
    iconBg: "bg-pink-500/20"
  },
  {
    name: "Jobs",
    icon: <FaBriefcase size={20} />,
    path: "/superadmin/jobs",
    color: "from-amber-500 to-yellow-600",
    hoverColor: "hover:shadow-amber-500/30",
    iconBg: "bg-amber-500/20"
  }
];

const Superadminactions = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl " style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 left-3/4 w-48 h-48  rounded-full blur-3xl " style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 p-3 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Simple Horizontal Navigation */}
          <div className="mb-4">
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-2 sm:p-3">
              <div className="flex items-center justify-between overflow-x-auto scrollbar-hide">
                {/* Logo */}
                <div className="flex items-center space-x-2 flex-shrink-0 mr-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <FaTachometerAlt className="text-white text-sm" />
                  </div>
                  <span className="text-white font-semibold text-sm hidden sm:block">Admin</span>
                </div>

                <div className="flex items-center space-x-1 sm:space-x-2 flex-1">
                  {actions.map((action) => (
                    <Link
                      to={action.path}
                      key={action.name}
                      className="flex items-center space-x-1 text-black rounded-lg px-2 sm:px-3 py-2 cursor-pointer transition-all duration-200 flex-shrink-0 group"
                    >
                      <div className="text-black">
                        {React.cloneElement(action.icon, { size: 14 })}
                      </div>
                      <span className="text-black text-xs font-medium hidden sm:block">
                        {action.name}
                      </span>
                    </Link>
                  ))}

                </div>

                <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-slate-400 text-xs font-medium hidden md:block">Online</span>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>

      <style>
        {`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

// Demo wrapper component
const DemoApp = () => {
  return (
    <div>
      <Superadminactions />
    </div>
  );
};

export default DemoApp;