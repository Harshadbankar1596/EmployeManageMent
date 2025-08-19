import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useLogoutUserMutation } from '../../redux/apislice';
import { logoutuser } from '../../redux/userslice/userslice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaCalendarAlt,
  FaComments,
  FaCalendarCheck,
  FaPlusSquare,
  FaTasks,
  FaClipboardList,
} from "react-icons/fa";

const navItems = [
  // { label: "Dashboard", icon: FaTachometerAlt, to: "/admin" },
  { label: "Employees", icon: FaUsers, to: "/admin/employees" },
  { label: "Chat", icon: FaComments, to: "/admin/chat" },
  { label: "Leaves", icon: FaCalendarCheck, to: "/admin/leaves" },
  { label: "Add Project", icon: FaPlusSquare, to: "/admin/addproject" },
  { label: "Assign Task", icon: FaTasks, to: "/admin/assinTask" },
  { label: "Reports", icon: FaClipboardList, to: "/admin/employeedailyreport" },
  { label: "Job's", icon: FaClipboardList, to: "/admin/Jobs" },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logoutUser().unwrap();
    dispatch(logoutuser());
    navigate('/login');
  };

  return (
    <div className="hidden lg:block">
      <div
      data-lenis-prevent
        className="bg-blue-950 text-white shadow-lg transition-all duration-300 z-30 flex flex-col scrollbar-hide"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '18rem',
          minWidth: '16rem',
          maxWidth: '20rem',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <div className="py-6 lg:py-8 px-3 lg:px-6 flex flex-col items-center border-b border-gray-100">
          <img src="/techsuryalogo.svg" alt="TechSurya Logo" className="w-16 h-16 lg:w-20 lg:h-20" />
        </div>

        <nav className="flex-1 px-2 lg:px-4 mt-6 lg:mt-10 flex flex-col">
          <ul className="space-y-3 lg:space-y-4">
            {navItems.map(({ label, icon: Icon, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-colors duration-200 text-sm lg:text-base font-medium ${
                      isActive ? 'bg-yellow-500 text-blue-950' : 'hover:bg-yellow-500'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="px-2 lg:px-4 py-4 lg:py-6 mt-auto">
            <button
              onClick={async () => {
                try { await logoutUser().unwrap(); } catch (e) {}
                dispatch(logoutuser());
                navigate('/login');
              }}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 lg:py-3 px-3 lg:px-4 rounded-lg transition-colors duration-200 text-sm lg:text-base flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;


