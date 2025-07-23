import React from 'react'
import { useLogoutUserMutation } from '../../redux/apislice'
import { logoutuser } from '../../redux/userslice/userslice'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
const side = () => {
  const navigate = useNavigate();
  const [logoutUser, {refetch}] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logoutUser().unwrap();
    dispatch(logoutuser());
    navigate('/login')
  }

  return (
    <div className="hidden md:block h-full">
      <div className="bg-blue-950 h-full text-white shadow-lg transition-all duration-300 fixed md:static z-30 flex flex-col">
        <div className="py-8 px-2 md:px-6 flex flex-col items-center border-b border-gray-100">
          <img src="/techsuryalogo.svg" alt="" />
        </div>
        <nav className="flex-1 px-1 md:px-4 py-6 mt-10 items-center justify-center">
          <ul className="space-y-2 md:space-y-4">
            <li>
              <a href="/" className="flex items-center gap-0 md:gap-3 px-2 md:px-3 py-2 rounded-lg hover:bg-blue-800 transition text-xs md:text-base">
                <span className="hidden md:inline">Dashboard</span>
              </a>
            </li>
            <li>
              <a  href="/" className="flex items-center gap-0 md:gap-3 px-2 md:px-3 py-2 rounded-lg hover:bg-blue-800 transition text-xs md:text-base">
                <span className="hidden md:inline">Admin Panel</span>
              </a>
            </li>
            <li>
              <a href="/superadmin" className="flex items-center gap-0 md:gap-3 px-2 md:px-3 py-2 rounded-lg hover:bg-blue-800 transition text-xs md:text-base">
                <span className="hidden md:inline">Super Admin Panel</span>
              </a>
            </li>
          </ul>
        <div  className="px-2  py-4 mt-auto">
          <button onClick={() => handleLogout()} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-2 md:px-4 rounded-lg transition text-xs md:text-base">
            Logout
          </button>
        </div>
        </nav>
      </div>  
    </div>
  )
}

export default side