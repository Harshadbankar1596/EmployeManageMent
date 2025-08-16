import React from 'react'
import { Link } from 'react-router-dom'
import { useLogoutUserMutation } from '../../redux/apislice'
import { logoutuser } from '../../redux/userslice/userslice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const side = () => {
  const navigate = useNavigate();
  const [logoutUser, { refetch }] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logoutUser().unwrap();
    dispatch(logoutuser());
    navigate('/login')
  }

  return (
    <div className="hidden lg:block">
      <div
        className="bg-blue-950 text-white shadow-lg transition-all duration-300 z-30 flex flex-col"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '18rem', // Tailwind's w-72
          minWidth: '16rem', // fallback for lg:w-72
          maxWidth: '20rem',
          overflow: 'hidden',
        }}
      >
        {/* Logo Section */}
        <div className="py-6 lg:py-8 px-3 lg:px-6 flex flex-col items-center border-b border-gray-100">
          <img src="/techsuryalogo.svg" alt="TechSurya Logo" className="w-16 h-16 lg:w-20 lg:h-20" />
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-2 lg:px-4 py-6 lg:py-8 mt-6 lg:mt-10 flex flex-col">
          <ul className="space-y-3 lg:space-y-4">
            <li>
              <Link 
                to={"/"} 
                className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg hover:bg-yellow-500 transition-colors duration-200 text-sm lg:text-base font-medium"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                </svg>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                to={"/admin"}
                className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg hover:bg-yellow-500 transition-colors duration-200 text-sm lg:text-base font-medium"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span>Admin Panel</span>
              </Link>
            </li>
            <li>
              <Link 
                to={"/superadmin"} 
                className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg hover:bg-yellow-500 transition-colors duration-200 text-sm lg:text-base font-medium"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Super Admin Panel</span>
              </Link>
            </li>
            <li>
              <Link 
                to={"/groupchat" }
                className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg hover:bg-yellow-500 transition-colors duration-200 text-sm lg:text-base font-medium"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Group Chat</span>
              </Link>
            </li>
          </ul>
          
          {/* Logout Button */}
          <div className="px-2 lg:px-4 py-4 lg:py-6 mt-auto">
            <button 
              onClick={() => handleLogout()} 
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
  )
}

export default side