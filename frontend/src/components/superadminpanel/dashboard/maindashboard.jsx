import React from 'react';
import { useSuperadminveryfyQuery } from '../../../redux/superadminslice';
import { FaUserCheck, FaUsers, FaUserTimes } from 'react-icons/fa';

const Maindashboard = () => {
  const { data: info, isLoading } = useSuperadminveryfyQuery();

  // Animation classes (TailwindCSS + animate.css or custom)
  const cardBase =
    'flex flex-col items-center justify-center rounded-xl shadow-lg p-6 m-2 min-w-[180px] min-h-[140px] transition-transform transform hover:scale-105 animate__animated animate__fadeInUp';
  const iconBase = 'text-5xl mb-3 drop-shadow-lg animate-bounce';

  return (
    <div className="my-10 flex flex-col items-center justify-center ">
      {/* <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-gray-800 animate__animated animate__fadeInDown">
        Main Dashboard
      </h1> */}
      {isLoading ? (
        <div className="text-lg text-gray-600">Loading...</div>
      ) : info ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center items-center w-full max-w-md">
          {/* Total Employees */}
          <div className="flex flex-col items-center justify-center rounded-lg shadow-md p-3 m-1 min-w-[90px] min-h-[80px] bg-yellow-100 border-2 border-yellow-400 animate__animated animate__zoomIn">
            <FaUsers className="text-2xl mb-1 drop-shadow-lg text-yellow-500" />
            <div className="text-lg font-bold text-yellow-700 animate__animated animate__fadeIn">{info.totalemployee}</div>
            <div className="text-xs font-semibold text-yellow-600 mt-0.5 text-center">Total Employees</div>
          </div>
          {/* Present Employees */}
          <div className="flex flex-col items-center justify-center rounded-lg shadow-md p-3 m-1 min-w-[90px] min-h-[80px] bg-green-100 border-2 border-green-400 animate__animated animate__zoomIn animate__delay-1s">
            <FaUserCheck className="text-2xl mb-1 drop-shadow-lg text-green-500" />
            <div className="text-lg font-bold text-green-700 animate__animated animate__fadeIn">{info.presentemployee}</div>
            <div className="text-xs font-semibold text-green-600 mt-0.5 text-center">Present Today</div>
          </div>
          {/* Absent Employees */}
          <div className="flex flex-col items-center justify-center rounded-lg shadow-md p-3 m-1 min-w-[90px] min-h-[80px] bg-red-100 border-2 border-red-400 animate__animated animate__zoomIn animate__delay-2s">
            <FaUserTimes className="text-2xl mb-1 drop-shadow-lg text-red-500" />
            <div className="text-lg font-bold text-red-700 animate__animated animate__fadeIn">
              {info.totalemployee - info.presentemployee}
            </div>
            <div className="text-xs font-semibold text-red-600 mt-0.5 text-center">Absent Today</div>
          </div>
        </div>
      ) : (
        <div className="text-red-500 text-lg font-semibold">No data available</div>
      )}
      
    </div>
  );
};

export default Maindashboard;
