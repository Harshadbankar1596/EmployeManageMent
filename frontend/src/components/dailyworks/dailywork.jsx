import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetworkQuery, useAddworkMutation } from '../../redux/apislice';

const Dailywork = () => {
  const [showmodal, setshowmodal] = useState(false);
  const [work, setwork] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const id = useSelector((state) => state.user.id);
  const { data: workdata, refetch } = useGetworkQuery(id);

  return (
    <div className="w-full min-h-screen px-2 sm:px-4 animate-fadeIn">
      {/* Modal */}
      {showmodal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fadeIn">
          <div className="w-full max-w-sm sm:max-w-md mx-2 sm:mx-0 animate-scaleIn">
            <form
              className="flex flex-col gap-4 bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full animate-slideInUp"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!work || !date || !time) return;
                await addwork({ id, work, date, time });
                setshowmodal(false);
                setwork("");
                setdate("");
                settime("");
                refetch();
                alert("Work Added Successfully");
              }}
            >
              <div className="flex justify-end animate-slideInDown">
                <button
                  type="button"
                  onClick={() => setshowmodal(false)}
                  className="text-gray-400 hover:text-gray-700 text-lg font-bold px-2 py-1 rounded transition cursor-pointer hover:scale-110"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <label className="flex flex-col gap-1 animate-slideInLeft">
                <span className="font-semibold text-gray-700">Work</span>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 hover:border-yellow-300"
                  value={work}
                  onChange={(e) => setwork(e.target.value)}
                  placeholder="Enter your work"
                  required
                />
              </label>
              <label className="flex flex-col gap-1 animate-slideInRight">
                <span className="font-semibold text-gray-700">Date</span>
                <input
                  type="date"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 hover:border-yellow-300"
                  onChange={(e) => {
                    const localDate = new Date(e.target.value);
                    setdate(localDate.toLocaleDateString());
                  }}
                  required
                />
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 animate-slideInUp">
                <label className="flex flex-col gap-1 flex-1">
                  <span className="font-semibold text-gray-700">Start Time</span>
                  <input
                    type="time"
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 hover:border-yellow-300"
                    onChange={(e) => {
                      const start = e.target.value;
                      const [hour, minute] = start.split(":");
                      let hourNum = parseInt(hour, 10);
                      let ampm = "AM";
                      if (hourNum >= 12) {
                        ampm = "PM";
                        if (hourNum > 12) hourNum -= 12;
                      } else if (hourNum === 0) {
                        hourNum = 12;
                      }
                      const formattedStart = `${hourNum}:${minute} ${ampm}`;
                      settime((prev) => {
                        const [_, end] = prev ? prev.split(" - ") : ["", ""];
                        return formattedStart + (end ? ` - ${end}` : "");
                      });
                    }}
                    required
                  />
                </label>
                <label className="flex flex-col gap-1 flex-1">
                  <span className="font-semibold text-gray-700">End Time</span>
                  <input
                    type="time"
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 hover:border-yellow-300"
                    onChange={(e) => {
                      const end = e.target.value;
                      const [hour, minute] = end.split(":");
                      let hourNum = parseInt(hour, 10);
                      let ampm = "AM";
                      if (hourNum >= 12) {
                        ampm = "PM";
                        if (hourNum > 12) hourNum -= 12;
                      } else if (hourNum === 0) {
                        hourNum = 12;
                      }
                      const formattedEnd = `${hourNum}:${minute} ${ampm}`;
                      settime((prev) => {
                        const [start] = prev ? prev.split(" - ") : ["", ""];
                        return (start ? start : "") + (start ? ` - ${formattedEnd}` : formattedEnd ? ` - ${formattedEnd}` : "");
                      });
                    }}
                    required
                  />
                </label>
              </div>
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition-all duration-300 hover:scale-105 hover:shadow-lg animate-pulse"
              >
                Add Work
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-end animate-slideInDown">
        <button 
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition-all duration-300 hover:scale-105 hover:shadow-lg animate-bounce"
          onClick={() => setshowmodal(true)}
        >
          Add Work
        </button>
      </div>
      <div className="mt-8 space-y-4 max-w-2xl mx-auto animate-fadeIn">
        {workdata && workdata.works.length > 0 ? (
          workdata.works.map((work, index) => (
            <div
              key={work._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border border-gray-200 animate-slideInUp transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-yellow-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="animate-fadeIn">
                <h2 className="text-lg font-semibold text-gray-800 break-words transition-colors duration-300 hover:text-yellow-600">{work.work}</h2>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded animate-pulse">
                    {work.time}
                  </span>
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded animate-pulse">
                    {work.date}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8 animate-pulse">No work entries found.</div>
        )}
      </div>
      
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          
          @keyframes slideInUp {
            0% { 
              opacity: 0; 
              transform: translateY(30px); 
            }
            100% { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          @keyframes slideInDown {
            0% { 
              opacity: 0; 
              transform: translateY(-30px); 
            }
            100% { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          @keyframes slideInLeft {
            0% { 
              opacity: 0; 
              transform: translateX(-30px); 
            }
            100% { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }
          
          @keyframes slideInRight {
            0% { 
              opacity: 0; 
              transform: translateX(30px); 
            }
            100% { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }
          
          @keyframes scaleIn {
            0% { 
              opacity: 0; 
              transform: scale(0.8); 
            }
            100% { 
              opacity: 1; 
              transform: scale(1); 
            }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }
          
          .animate-slideInUp {
            animation: slideInUp 0.6s ease-out;
          }
          
          .animate-slideInDown {
            animation: slideInDown 0.6s ease-out;
          }
          
          .animate-slideInLeft {
            animation: slideInLeft 0.6s ease-out;
          }
          
          .animate-slideInRight {
            animation: slideInRight 0.6s ease-out;
          }
          
          .animate-scaleIn {
            animation: scaleIn 0.6s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Dailywork;