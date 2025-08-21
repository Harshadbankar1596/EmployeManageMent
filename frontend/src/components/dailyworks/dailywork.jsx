// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useGetworkQuery, useAddworkMutation } from '../../redux/apislice';

// // Helper to group works by month and year
// function groupWorksByMonth(works) {
//   if (!Array.isArray(works)) return {};
//   return works.reduce((acc, work) => {
//     let dateObj;
//     if (work.date) {
//       dateObj = new Date(work.date);
//       if (isNaN(dateObj.getTime())) {
//         const parts = work.date.split(/[\/\-]/);
//         if (parts.length === 3) {
//           dateObj = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
//         }
//       }
//     }
//     if (!dateObj || isNaN(dateObj.getTime())) return acc;
//     const month = dateObj.toLocaleString('default', { month: 'long' });
//     const year = dateObj.getFullYear();
//     const key = `${month} ${year}`;
//     if (!acc[key]) acc[key] = [];
//     acc[key].push(work);
//     return acc;
//   }, {});
// }

// const Dailywork = () => {
//   const [showmodal, setshowmodal] = useState(false);
//   const [work, setwork] = useState("");
//   const [date, setdate] = useState("");
//   const [time, settime] = useState("");
//   const id = useSelector((state) => state.user.id);
//   const { data: workdata, refetch } = useGetworkQuery(id);
//   const [addwork] = useAddworkMutation();

//   // Group works by month
//   const worksByMonth = groupWorksByMonth(workdata && workdata.works ? workdata.works : []);

//   return (
//     <div className="w-full min-h-screen px-2 sm:px-4 animate-fadeIn">
//       {/* Modal */}
//       {showmodal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fadeIn">
//           <div className="w-full max-w-sm sm:max-w-md mx-2 sm:mx-0 animate-scaleIn">
//             <form
//               className="flex flex-col gap-4 bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full animate-slideInUp"
//               onSubmit={async (e) => {
//                 e.preventDefault();
//                 if (!work || !date || !time) return;
//                 await addwork({ id, work, date, time });
//                 setshowmodal(false);
//                 setwork("");
//                 setdate("");
//                 settime("");
//                 refetch();
//                 alert("Work Added Successfully");
//               }}
//             >
//               <div className="flex justify-end animate-slideInDown">
//                 <button
//                   type="button"
//                   onClick={() => setshowmodal(false)}
//                   className="text-gray-400 hover:text-gray-700 text-lg font-bold px-2 py-1 rounded transition cursor-pointer hover:scale-110"
//                   aria-label="Close"
//                 >
//                   ×
//                 </button>
//               </div>
//               <label className="flex flex-col gap-1 animate-slideInLeft">
//                 <span className="font-semibold text-gray-700">Work</span>
//                 <input
//                   type="text"
//                   className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 hover:border-yellow-300"
//                   value={work}
//                   onChange={(e) => setwork(e.target.value)}
//                   placeholder="Enter your work"
//                   required
//                 />
//               </label>
//               <label className="flex flex-col gap-1 animate-slideInRight">
//                 <span className="font-semibold text-gray-700">Date</span>
//                 <input
//                   type="date"
//                   className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 hover:border-yellow-300"
//                   onChange={(e) => {
//                     const localDate = new Date(e.target.value);
//                     setdate(localDate.toLocaleDateString());
//                   }}
//                   required
//                 />
//               </label>
//               <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
//                 <label className="flex flex-col gap-1 flex-1">
//                   <span className="font-semibold text-gray-700">Start Time</span>
//                   <input
//                     type="time"
//                     className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 hover:border-yellow-300"
//                     onChange={(e) => {
//                       const start = e.target.value;
//                       const [hour, minute] = start.split(":");
//                       let hourNum = parseInt(hour, 10);
//                       let ampm = "AM";
//                       if (hourNum >= 12) {
//                         ampm = "PM";
//                         if (hourNum > 12) hourNum -= 12;
//                       } else if (hourNum === 0) {
//                         hourNum = 12;
//                       }
//                       const formattedStart = `${hourNum}:${minute} ${ampm}`;
//                       settime((prev) => {
//                         const [_, end] = prev ? prev.split(" - ") : ["", ""];
//                         return formattedStart + (end ? ` - ${end}` : "");
//                       });
//                     }}
//                     required
//                   />
//                 </label>
//                 <label className="flex flex-col gap-1 flex-1">
//                   <span className="font-semibold text-gray-700">End Time</span>
//                   <input
//                     type="time"
//                     className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 hover:border-yellow-300"
//                     onChange={(e) => {
//                       const end = e.target.value;
//                       const [hour, minute] = end.split(":");
//                       let hourNum = parseInt(hour, 10);
//                       let ampm = "AM";
//                       if (hourNum >= 12) {
//                         ampm = "PM";
//                         if (hourNum > 12) hourNum -= 12;
//                       } else if (hourNum === 0) {
//                         hourNum = 12;
//                       }
//                       const formattedEnd = `${hourNum}:${minute} ${ampm}`;
//                       settime((prev) => {
//                         const [start] = prev ? prev.split(" - ") : ["", ""];
//                         return (start ? start : "") + (start ? ` - ${formattedEnd}` : formattedEnd ? ` - ${formattedEnd}` : "");
//                       });
//                     }}
//                     required
//                   />
//                 </label>
//               </div>
//               <button
//                 type="submit"
//                 className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition-all duration-300 hover:scale-105 hover:shadow-lg animate-pulse"
//               >
//                 Add Work
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="flex justify-end animate-slideInDown">
//         <button 
//           className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition-all duration-300 hover:scale-105 hover:shadow-lg animate-bounce"
//           onClick={() => setshowmodal(true)}
//         >
//           Add Work
//         </button>
//       </div>
//       <div className="mt-8 space-y-8 max-w-4xl mx-auto animate-fadeIn">
//         {Object.keys(worksByMonth).length > 0 ? (
//           Object.entries(worksByMonth)
//             .sort((a, b) => {
//               // Sort months descending (latest first)
//               const [monthA, yearA] = a[0].split(' ');
//               const [monthB, yearB] = b[0].split(' ');
//               const dateA = new Date(`${monthA} 1, ${yearA}`);
//               const dateB = new Date(`${monthB} 1, ${yearB}`);
//               return dateB - dateA;
//             })
//             .map(([monthYear, works]) => (
//               <div key={monthYear} className="mb-8">
//                 <h3 className="text-xl font-bold text-yellow-700 mb-4 border-b border-yellow-200 pb-1">{monthYear}</h3>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
//                     <thead>
//                       <tr>
//                         <th className="px-4 py-2 border-b text-left text-gray-700 font-semibold bg-yellow-100">#</th>
//                         <th className="px-4 py-2 border-b text-left text-gray-700 font-semibold bg-yellow-100">Work</th>
//                         <th className="px-4 py-2 border-b text-left text-gray-700 font-semibold bg-yellow-100">Date</th>
//                         <th className="px-4 py-2 border-b text-left text-gray-700 font-semibold bg-yellow-100">Time</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {works
//                         .sort((a, b) => {
//                           // Sort by date descending
//                           const dateA = new Date(a.date);
//                           const dateB = new Date(b.date);
//                           return dateB - dateA;
//                         })
//                         .map((work, index) => (
//                           <tr
//                             key={work._id}
//                             className={`transition-all duration-300 hover:bg-yellow-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
//                           >
//                             <td className="px-4 py-2 border-b text-gray-600">{index + 1}</td>
//                             <td className="px-4 py-2 border-b text-gray-800 break-words">{work.work}</td>
//                             <td className="px-4 py-2 border-b text-gray-700">{work.date}</td>
//                             <td className="px-4 py-2 border-b text-yellow-800">{work.time}</td>
//                           </tr>
//                         ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             ))
//         ) : (
//           <div className="text-center text-gray-500 py-8 animate-pulse">No work entries found.</div>
//         )}
//       </div>

//       <style>
//         {`
//           @keyframes fadeIn {
//             0% { opacity: 0; }
//             100% { opacity: 1; }
//           }

//           @keyframes slideInUp {
//             0% { 
//               opacity: 0; 
//               transform: translateY(30px); 
//             }
//             100% { 
//               opacity: 1; 
//               transform: translateY(0); 
//             }
//           }

//           @keyframes slideInDown {
//             0% { 
//               opacity: 0; 
//               transform: translateY(-30px); 
//             }
//             100% { 
//               opacity: 1; 
//               transform: translateY(0); 
//             }
//           }

//           @keyframes slideInLeft {
//             0% { 
//               opacity: 0; 
//               transform: translateX(-30px); 
//             }
//             100% { 
//               opacity: 1; 
//               transform: translateX(0); 
//             }
//           }

//           @keyframes slideInRight {
//             0% { 
//               opacity: 0; 
//               transform: translateX(30px); 
//             }
//             100% { 
//               opacity: 1; 
//               transform: translateX(0); 
//             }
//           }

//           @keyframes scaleIn {
//             0% { 
//               opacity: 0; 
//               transform: scale(0.8); 
//             }
//             100% { 
//               opacity: 1; 
//               transform: scale(1); 
//             }
//           }

//           .animate-fadeIn {
//             animation: fadeIn 0.6s ease-out;
//           }

//           .animate-slideInUp {
//             animation: slideInUp 0.6s ease-out;
//           }

//           .animate-slideInDown {
//             animation: slideInDown 0.6s ease-out;
//           }

//           .animate-slideInLeft {
//             animation: slideInLeft 0.6s ease-out;
//           }

//           .animate-slideInRight {
//             animation: slideInRight 0.6s ease-out;
//           }

//           .animate-scaleIn {
//             animation: scaleIn 0.6s ease-out;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Dailywork;


import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetworkQuery, useAddworkMutation } from '../../redux/apislice';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTimes, FaCalendarAlt, FaClock, FaEdit } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import Loader from '../loader';
import { useDeleteworkMutation } from '../../redux/apislice';
import { useGetAllProjectsQuery } from '../../redux/adminapislice';


function groupWorksByMonth(works) {
  if (!Array.isArray(works)) return {};
  return works.reduce((acc, work) => {
    if (!work.date) return acc;

    let dateObj = new Date(work.date);
    if (isNaN(dateObj.getTime())) {
      const parts = work.date.split(/[\/\-]/);
      if (parts.length === 3) {
        dateObj = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      }
    }

    if (!dateObj || isNaN(dateObj.getTime())) return acc;

    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    const key = `${month} ${year}`;

    if (!acc[key]) acc[key] = [];
    acc[key].push({ ...work, dateObj });
    return acc;
  }, {});
}

const Dailywork = () => {
  const [showmodal, setshowmodal] = useState(false);
  const [work, setwork] = useState("");
  const [project, setproject] = useState("")
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const id = useSelector((state) => state.user.id);
  const { data: workdata, refetch, isLoading: getwork } = useGetworkQuery(id);
  const [addwork, { isLoading: addingload }] = useAddworkMutation();
  const [deletework] = useDeleteworkMutation()
  const { data: allproject } = useGetAllProjectsQuery()
  const worksByMonth = groupWorksByMonth(workdata?.works || []);

  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  function deleteworks(workid) {
    try {
      const users = {
        workid: workid,
        userid: id
      }
      deletework(users).then(() => {
        refetch()
      })
    } catch (error) {
      // console.log("error in delete work")
    }
  }

  return (
    <div className="w-full min-h-screen px-2 sm:px-4 py-6">
      <AnimatePresence>
        {showmodal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-md mx-2 sm:mx-0"
            >
              <div className="bg-green-300 rounded-xl shadow-2xl overflow-hidden">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-900 to-blue-800">
                  <h2 className="text-xl font-bold text-white">Add Daily Work</h2>
                  <button
                    onClick={() => setshowmodal(false)}
                    className="text-white hover:text-yellow-100 transition"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                <form
                  className="flex flex-col gap-4 p-6"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!work || !date || !time) return;
                    await addwork({ id, work, date, time, project });
                    setshowmodal(false);
                    setwork("");
                    setdate("");
                    settime("");
                    setproject("");
                    refetch();
                  }}
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Work Description</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                        value={work}
                        onChange={(e) => setwork(e.target.value)}
                        placeholder="What did you work on today?"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="projects"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Select Project
                      </label>


                      <select
                        id="projects"
                        onChange={(e) => setproject(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                      >
                        <option value="others">others</option>
                        {allproject?.allprojects?.map((project) => (
                          <option key={project._id} value={project.title}>
                            {project.title}
                          </option>
                        ))}
                      </select>
                    </div>


                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all pl-10"
                          onChange={(e) => setdate(e.target.value)}
                          required
                        />
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                        <div className="relative">
                          <input
                            type="time"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all pl-10"
                            onChange={(e) => {
                              const start = e.target.value;
                              settime(prev => {
                                const end = prev?.split(" - ")[1] || "";
                                return `${start}${end ? ` - ${end}` : ''}`;
                              });
                            }}
                            required
                          />
                          <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                        <div className="relative">
                          <input
                            type="time"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all pl-10"
                            onChange={(e) => {
                              const end = e.target.value;
                              settime(prev => {
                                const start = prev?.split(" - ")[0] || "";
                                return start ? `${start} - ${end}` : ` - ${end}`;
                              });
                            }}
                            required
                          />
                          <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                    >
                      Add Work Entry
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Daily Work Tracker</h1>
          <p className="text-gray-600 mt-1">Track and manage your daily work activities</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg mt-4 sm:mt-0"
          onClick={() => setshowmodal(true)}
        >
          <FaPlus className="text-sm" />
          <span>Add New Entry</span>
        </motion.button>
      </div>

      {/* Work Entries Table */}
      {getwork ? <Loader /> : addingload ? <Loader /> : (<div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {Object.keys(worksByMonth).length > 0 ? (
          Object.entries(worksByMonth)
            .sort((a, b) => {
              // Sort months descending (latest first)
              const [monthA, yearA] = a[0].split(' ');
              const [monthB, yearB] = b[0].split(' ');
              const dateA = new Date(`${monthA} 1, ${yearA}`);
              const dateB = new Date(`${monthB} 1, ${yearB}`);
              return dateB - dateA;
            })
            .map(([monthYear, works]) => (
              <motion.div
                key={monthYear}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 last:mb-0"
              >
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-b border-yellow-200 px-6 py-3">
                  <h3 className="text-lg font-bold text-yellow-800">{monthYear}</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Description</th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {works
                        .sort((a, b) => b.dateObj - a.dateObj) // Sort by date descending
                        .map((work, index) => (
                          <motion.tr
                            key={work._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-yellow-50 transition-colors"
                          >
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                                  <span className="text-sm font-bold text-yellow-700">
                                    {new Date(work.date).getDate()}
                                  </span>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {formatDisplayDate(work.date)}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {new Date(work.date).toLocaleDateString('en-US', { weekday: 'short' })}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                {work.time}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="text-sm text-gray-900 max-w-md">{work.work}</div>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap text-center">
                              <button onClick={() => deleteworks(work._id)} className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-black bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 focus:outline-none">
                                <MdDelete className="h-4 w-4" />
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 px-4 text-center"
          >
            <div className="bg-yellow-100 p-4 rounded-full mb-4">
              <FaClock className="text-3xl text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Work Entries Yet</h3>
            <p className="text-gray-600 max-w-md">
              Start tracking your daily work activities by adding your first entry
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => setshowmodal(true)}
            >
              <FaPlus className="text-sm" />
              <span>Add First Entry</span>
            </motion.button>
          </motion.div>
        )}
      </div>)}
    </div>
  );
};
export default Dailywork;