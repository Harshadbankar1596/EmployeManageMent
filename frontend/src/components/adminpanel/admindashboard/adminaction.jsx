import React from 'react'
import { Link } from 'react-router-dom'
import { IoPerson } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";
import { RiTaskLine } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
const Adminaction = () => {
  return (
    <div className="my-5 mx-2 sm:mx-4 md:mx-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Link to={'/admin/employee'}>
          <div className="bg-yellow-500 rounded-2xl flex flex-col sm:flex-row gap-3 sm:gap-5 items-center justify-center p-4 sm:p-8 w-full h-32 sm:h-40 shadow-lg cursor-pointer transition-transform hover:scale-105">
            <IoPerson className="text-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-2 sm:mb-0" />
            <p className="text-black text-base sm:text-xl md:text-2xl font-bold">Employes</p>
          </div>
        </Link>   

        <Link to={'/admin/Leaves'}>
          <div className="bg-blue-900 rounded-2xl flex flex-col sm:flex-row gap-3 sm:gap-5 items-center justify-center p-4 sm:p-8 w-full h-32 sm:h-40 shadow-lg cursor-pointer transition-transform hover:scale-105">
            <FaBookOpen className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-2 sm:mb-0" />
            <p className="text-white text-base sm:text-xl md:text-2xl font-bold">Leaves</p>
          </div>
        </Link>

        <Link to={'/admin/AssinTask'}>
          <div className="bg-green-500 rounded-2xl flex flex-col sm:flex-row gap-3 sm:gap-5 items-center justify-center p-4 sm:p-8 w-full h-32 sm:h-40 shadow-lg cursor-pointer transition-transform hover:scale-105">
            <RiTaskLine className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-2 sm:mb-0" />
            <p className="text-white text-base sm:text-xl md:text-2xl font-bold">Assin Task</p>
          </div>
        </Link>

        <Link to={'/admin/AddProject'}>
          <div className="bg-black rounded-2xl flex flex-col sm:flex-row gap-3 sm:gap-5 items-center justify-center p-4 sm:p-8 w-full h-32 sm:h-40 shadow-lg cursor-pointer transition-transform hover:scale-105">
            <FaPen className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-2 sm:mb-0" />
            <p className="text-white text-base sm:text-xl md:text-2xl font-bold">Add Project</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Adminaction