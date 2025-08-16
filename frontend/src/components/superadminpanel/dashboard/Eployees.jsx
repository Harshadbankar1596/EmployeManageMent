import React from 'react';
import { useGetallemployeesQuery } from '../../../redux/superadminslice';
import Loader from "../../loader.jsx";
import { Link } from "react-router-dom";

// Helper to get image src
function getImageSrc(image) {
  if (!image || !image.data || !image.contentType) return null;
  let byteArray = Array.isArray(image.data.data) ? image.data.data : image.data;
  if (!Array.isArray(byteArray)) return null;
  const base64String = btoa(
    byteArray.reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
  return `data:${image.contentType};base64,${base64String}`;
}

// Animated status badge
const StatusBadge = ({ isPresent }) => (
  <span
    className={`inline-block px-4 py-1 rounded-full font-bold text-xs shadow-md border transition-all
      ${isPresent
        ? "bg-gradient-to-r from-green-300 via-green-400 to-green-500 text-white border-green-300 animate-bounceIn"
        : "bg-gradient-to-r from-red-200 via-red-300 to-red-400 text-white border-red-200 animate-fadePulse"
      }`}
  >
    {isPresent ? "Present" : "Absent"}
  </span>
);

const Employees = () => {
  const { data: employees, isLoading, isError, error } = useGetallemployeesQuery();
  const todaydate = new Date().toLocaleDateString();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm animate-shake">
          {error?.data?.message || "Failed to load employees."}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-br from-blue-50 via-white to-indigo-100 rounded-3xl shadow-2xl border border-slate-200 p-8 sm:p-12 animate-fadein">
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <span className="absolute -top-4 -left-4 w-8 h-8 bg-blue-200 rounded-full blur-lg opacity-60 animate-pulse"></span>
          <span className="absolute -bottom-4 -right-4 w-8 h-8 bg-indigo-200 rounded-full blur-lg opacity-60 animate-pulse"></span>
          <h1 className="font-extrabold text-transparent text-4xl sm:text-5xl bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-400 drop-shadow-lg tracking-wider select-none animate-titlePop">
            Employees
          </h1>
        </div>
        <div className="mt-2 text-blue-500 font-medium text-lg tracking-wide animate-fadein-slow">Today's Attendance Overview</div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full bg-white/80 rounded-2xl shadow-lg border border-slate-200 text-slate-700 text-base backdrop-blur-md">
          <thead className="bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-50">
            <tr>
              <th className="py-4 px-6 text-left font-bold border-b border-slate-200 text-indigo-700 tracking-wider">#</th>
              <th className="py-4 px-6 text-left font-bold border-b border-slate-200 text-indigo-700 tracking-wider">Photo</th>
              <th className="py-4 px-6 text-left font-bold border-b border-slate-200 text-indigo-700 tracking-wider">Name</th>
              <th className="py-4 px-6 text-left font-bold border-b border-slate-200 text-indigo-700 tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(employees?.data) && employees.data.length > 0 ? (
              employees.data.map((emp, idx) => {
                const isPresent = emp?.log?.date === todaydate;
                return (
                  <tr
                    key={emp.userid || idx}
                    className={`group transition-all duration-300 hover:scale-[1.015] hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 ${idx % 2 === 0 ? 'bg-white/90' : 'bg-slate-50/80'} animate-rowFadeIn`}
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <td className="py-4 px-6 border-b border-slate-200 font-semibold text-lg">
                      <span className="inline-block animate-popIn">{idx + 1}</span>
                    </td>
                    <td className="py-4 px-6 border-b border-slate-200">
                      <Link to={emp.userid} className="block group-hover:scale-110 transition-transform duration-300">
                        <div className="relative w-14 h-14">
                          <img
                            src={getImageSrc(emp.image) || "/dp.svg"}
                            alt={emp.name}
                            className="w-14 h-14 rounded-full border-4 border-blue-200 object-cover shadow-lg transition-all duration-300 group-hover:border-indigo-400 group-hover:shadow-indigo-200"
                          />
                          <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${isPresent ? "bg-green-400 animate-pulse" : "bg-red-300 animate-pulse-slow"}`}></span>
                        </div>
                      </Link>
                    </td>
                    <td className="py-4 px-6 border-b border-slate-200 font-semibold text-slate-800 text-lg">
                      <Link to={emp.userid} className="hover:underline hover:text-indigo-600 transition-colors duration-200">
                        <span className="animate-fadein">{emp.name}</span>
                      </Link>
                    </td>
                    <td className="py-4 px-6 border-b border-slate-200 font-semibold">
                      <StatusBadge isPresent={isPresent} />
                      
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="py-12 text-center text-slate-400 text-xl animate-fadein-slow">
                  <span className="inline-block animate-bounce">No employees found.</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Animations & Custom Styles */}
      <style>
        {`
          @keyframes fadein {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @keyframes fadein-slow {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @keyframes popIn {
            0% { transform: scale(0.7); opacity: 0; }
            80% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); }
          }
          @keyframes bounceIn {
            0% { transform: scale(0.7); opacity: 0.5; }
            60% { transform: scale(1.15); opacity: 1; }
            100% { transform: scale(1); }
          }
          @keyframes fadePulse {
            0% { opacity: 0.7; }
            50% { opacity: 1; }
            100% { opacity: 0.7; }
          }
          @keyframes rowFadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @keyframes titlePop {
            0% { letter-spacing: 0.1em; opacity: 0; transform: scale(0.9);}
            60% { letter-spacing: 0.2em; opacity: 1; transform: scale(1.08);}
            100% { letter-spacing: 0.1em; transform: scale(1);}
          }
          @keyframes shake {
            0% { transform: translateX(0);}
            20% { transform: translateX(-6px);}
            40% { transform: translateX(6px);}
            60% { transform: translateX(-4px);}
            80% { transform: translateX(4px);}
            100% { transform: translateX(0);}
          }
          .animate-fadein { animation: fadein 0.7s both; }
          .animate-fadein-slow { animation: fadein-slow 1.2s both; }
          .animate-popIn { animation: popIn 0.5s; }
          .animate-bounceIn { animation: bounceIn 0.7s; }
          .animate-fadePulse { animation: fadePulse 1.5s infinite; }
          .animate-rowFadeIn { animation: rowFadeIn 0.7s both; }
          .animate-titlePop { animation: titlePop 1.1s both; }
          .animate-shake { animation: shake 0.5s; }
          .animate-bounce { animation: bounceIn 1.2s; }
          .animate-pulse { animation: fadePulse 1.2s infinite; }
          .animate-pulse-slow { animation: fadePulse 2.2s infinite; }
        `}
      </style>
    </div>
  );
};

export default Employees;
