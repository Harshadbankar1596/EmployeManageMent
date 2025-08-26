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

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetworkQuery, useAddworkMutation, useDeleteworkMutation } from '../../redux/apislice';
import { useGetAllProjectsQuery } from '../../redux/adminapislice';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTimes, FaCalendarAlt, FaClock, FaSpinner } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import Loader from '../loader';

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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14
    }
  }
};

const modalVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

// Custom Delete Modal for "delete work me is tarahaka modal dihao"
const DeleteWorkModal = ({ open, onClose, onDelete, loading }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="rounded-2xl shadow-2xl max-w-sm w-full p-7  bg-gray-900"
      >
        <div className="flex flex-col items-center  ">
          <div className="bg-red-100 rounded-full p-4 mb-4">
            <MdDelete className="text-3xl text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Delete Work Entry?</h2>
          <p className="text-gray-600 text-center mb-6">
            Are you sure you want to delete this work entry? <br />
            <span className="text-red-500 font-semibold">This action cannot be undone.</span>
          </p>
          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="flex-1 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-600 hover:to-red-700 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin mr-2" /> : <MdDelete className="mr-2" />}
              Delete
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Dailywork = () => {
  const [showmodal, setshowmodal] = useState(false);
  const [work, setwork] = useState("");
  const [project, setproject] = useState("")
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const id = useSelector((state) => state.user.id);
  const { data: workdata, refetch, isLoading: getwork } = useGetworkQuery(id);
  const [addwork, { isLoading: addingload }] = useAddworkMutation();
  const [deletework, { isLoading: deleteloading }] = useDeleteworkMutation()
  const { data: allproject } = useGetAllProjectsQuery()
  const worksByMonth = groupWorksByMonth(workdata?.works || []);
  const [worksid, setworksid] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState(null);

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

  function deleteWorks(workid) {
    try {
      const users = {
        workid: workid,
        userid: id
      }
      deletework(users).then(() => {
        refetch()
        setworksid("")
        setDeleteConfirm(null);
      })
    } catch (error) {
      console.log("error in delete work")
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen px-2 sm:px-4 py-6 bg-gradient-to-br from-blue-50 to-indigo-50"
    >
      <AnimatePresence>
        {showmodal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-full max-w-md mx-2 sm:mx-0"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100">
                <div className="flex justify-between items-center p-5 bg-gradient-to-r from-blue-600 to-indigo-700">
                  <h2 className="text-xl font-bold text-white">Add Daily Work</h2>
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setshowmodal(false)}
                    className="text-white hover:text-blue-200 transition"
                  >
                    <FaTimes className="text-xl" />
                  </motion.button>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Work Description</label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={work}
                        onChange={(e) => setwork(e.target.value)}
                        placeholder="What did you work on today?"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="projects"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Select Project
                      </label>
                      <select
                        id="projects"
                        onChange={(e) => setproject(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="others">Others</option>
                        {allproject?.allprojects?.map((project) => (
                          <option key={project._id} value={project.title}>
                            {project.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <div className="relative">
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="date"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-10"
                          onChange={(e) => setdate(e.target.value)}
                          required
                        />
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                        <div className="relative">
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="time"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-10"
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                        <div className="relative">
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="time"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-10"
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
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                      disabled={addingload}
                    >
                      {addingload ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Adding...
                        </>
                      ) : (
                        "Add Work Entry"
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (

<DeleteWorkModal
            open={!!deleteConfirm}
            onClose={() => setDeleteConfirm(null)}
            onDelete={() => deleteWorks(deleteConfirm)}
            loading={deleteloading && worksid === deleteConfirm}
          />
        )}
      </AnimatePresence>

      {/* Header and Add Button */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            Daily Work Tracker
          </h1>
          <p className="text-gray-600 mt-2">Track and manage your daily work activities</p>
        </div>
        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-3 px-5 rounded-xl transition-all duration-300 shadow-md mt-4 sm:mt-0 group"
          onClick={() => setshowmodal(true)}
        >
          <motion.div
            
            
            className="w-5 h-5 flex items-center justify-center animate-bounce"
          >
            <FaPlus className="text-sm" />
          </motion.div>
          <span>Add New Entry</span>
        </motion.button>
      </motion.div>

      {getwork ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden"
        >
          {Object.keys(worksByMonth).length > 0 ? (
            Object.entries(worksByMonth)
              .sort((a, b) => {
                const [monthA, yearA] = a[0].split(' ');
                const [monthB, yearB] = b[0].split(' ');
                const dateA = new Date(`${monthA} 1, ${yearA}`);
                const dateB = new Date(`${monthB} 1, ${yearB}`);
                return dateB - dateA;
              })
              .map(([monthYear, works]) => (
                <motion.div
                  key={monthYear}
                  variants={itemVariants}
                  className="mb-8 last:mb-0"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 px-6 py-4">
                    <h3 className="text-xl font-bold text-blue-800 flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {monthYear}
                    </h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                          <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                          <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Description</th>
                          <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {works
                          .sort((a, b) => b.dateObj - a.dateObj)
                          .map((work, index) => (
                            <motion.tr
                              key={work._id}
                              variants={itemVariants}
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: index * 0.05 }}
                              className="hover:bg-blue-50 transition-colors group"
                            >
                              <td className="py-5 px-6 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mr-4 shadow-sm">
                                    <span className="text-sm font-bold text-blue-700">
                                      {new Date(work.date).getDate()}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {formatDisplayDate(work.date)}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {new Date(work.date).toLocaleDateString('en-US', { weekday: 'long' })}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-5 px-6 whitespace-nowrap">
                                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                  <FaClock className="mr-1.5 text-xs" />
                                  {work.time}
                                </div>
                              </td>
                              <td className="py-5 px-6">
                                <div className="text-sm font-medium text-gray-800 bg-gray-100 px-3 py-1.5 rounded-lg inline-block">
                                  {work.project || 'Others'}
                                </div>
                              </td>
                              <td className="py-5 px-6">
                                <div className="text-sm text-gray-900 max-w-md">{work.work}</div>
                              </td>
                              <td className="py-5 px-6 whitespace-nowrap text-center">
                                <motion.button 
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => {
                                    setworksid(work._id);
                                    setDeleteConfirm(work._id);
                                  }}
                                  className="inline-flex items-center p-2.5 border border-transparent rounded-xl shadow-sm text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none transition-all duration-300 opacity-0 group-hover:opacity-100"
                                >
                                  {(worksid === work._id && deleteloading) ? (
                                    <FaSpinner className='h-4 w-4 animate-spin'/>
                                  ) : (
                                    <MdDelete className="h-4 w-4" />
                                  )}
                                </motion.button>
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 px-4 text-center"
            >
              <motion.div 
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="bg-blue-100 p-5 rounded-full mb-6"
              >
                <FaClock className="text-4xl text-blue-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Work Entries Yet</h3>
              <p className="text-gray-600 max-w-md mb-6">
                Start tracking your daily work activities by adding your first entry. Your productivity journey begins here!
              </p>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-3 px-5 rounded-xl transition-all duration-300 shadow-md"
                onClick={() => setshowmodal(true)}
              >
                <FaPlus className="text-sm" />
                <span>Add First Entry</span>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};
export default Dailywork;
