

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useGetprojectMutation, useGetallmembersnameQuery, useAddmemberinprojectMutation, useAddtaskMutation, useGetallmemebersadminMutation } from '../../../redux/adminapislice';

// import { HiOutlinePlus, HiX, HiUserAdd, HiCalendar, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';
// import { MdOutlineWorkOutline, MdGroups } from 'react-icons/md';
// import { FaUserPlus } from 'react-icons/fa';
// import { RiTeamLine, RiArrowRightLine } from 'react-icons/ri';
// import { IoIosAddCircleOutline } from 'react-icons/io';
// import Loader from '../../loader';

// const ShimmerProjectHeader = () => (
//   <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/50 mb-8 animate-pulse">
//     <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
//       <div className="flex-1 space-y-4">
//         <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"></div>
//         <div className="flex flex-wrap gap-6">
//           <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40"></div>
//           <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40"></div>
//           <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40"></div>
//         </div>
//       </div>
//       <div className="flex gap-3">
//         <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-40"></div>
//         <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-24"></div>
//       </div>
//     </div>
//   </div>
// );

// const ShimmerEmployeeCard = () => (
//   <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/50 mb-6 animate-pulse">
//     <div className="flex flex-col md:flex-row gap-6">
//       <div className="w-24 h-24 rounded-full bg-gradient-to-r from-gray-200 to-gray-300"></div>
//       <div className="flex-1 space-y-4">
//         <div className="h-7 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/3"></div>
//         <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/4"></div>
//         <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40"></div>
//       </div>
//     </div>
//     <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
//       <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/4"></div>
//       <div className="h-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
//     </div>
//   </div>
// );

// const Projectdetails = () => {
//   const { id: projectid } = useParams();
//   const [getproject, { isLoading: a1 }] = useGetprojectMutation();
//   const [getallmembers, { isLoading: a2, refetch: refetchMembers }] = useGetallmemebersadminMutation();
//   const { data: membersname, isLoading: a3 } = useGetallmembersnameQuery()
//   const [projectdetail, setProjectDetail] = useState(null);
//   const [employeeProject, setEmployeeProject] = useState([]);
//   const [loadingProject, setLoadingProject] = useState(true);
//   const [loadingMembers, setLoadingMembers] = useState(true);
//   const [selectedMembers, setSelectedMembers] = useState([]);
//   const [Addmemberinproject, { isLoading: addmemberloading }] = useAddmemberinprojectMutation();
//   const [addtask, { isLoading: addtaskloading }] = useAddtaskMutation();
//   const [tasktext, setTasktext] = useState("");
//   const [taskModalFor, setTaskModalFor] = useState(null);
//   const [membersRefreshKey, setMembersRefreshKey] = useState(0);

//   useEffect(() => {
//     const fetchProject = async () => {
//       setLoadingProject(true);
//       try {
//         const data = await getproject(projectid).unwrap();
//         setProjectDetail(data.project);
//       } catch (error) {
//         setProjectDetail(null);
//       }
//       setLoadingProject(false);
//     };
//     if (projectid) fetchProject();
//   }, [getproject, projectid]);

//   useEffect(() => {
//     const fetchMembers = async () => {
//       setLoadingMembers(true);
//       try {
//         if (projectdetail && Array.isArray(projectdetail.members) && projectdetail.members.length > 0) {
//           const data = await getallmembers({ userid: projectdetail.members, projectid }).unwrap();
//           setEmployeeProject(data.members);
//         } else {
//           setEmployeeProject([]);
//         }
//       } catch (error) {
//         setEmployeeProject([]);
//       }
//       setLoadingMembers(false);
//     };
//     if (projectid && projectdetail) fetchMembers();
//     // eslint-disable-next-line
//   }, [getallmembers, projectid, projectdetail, membersRefreshKey , refetchMembers]);

//   const getImageSrc = (img) => {
//     if (!img?.data) return null;
//     try {
//       return `data:${img.contentType};base64,${btoa(
//         new Uint8Array(img.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
//       )}`;
//     } catch {
//       return null;
//     }
//   };

//   function handleselect(e) {
//     const { value } = e.target;
//     if (value && !selectedMembers.includes(value)) {
//       setSelectedMembers([...selectedMembers, value]);
//     }
//   }

//   function handleadd() {
//     if (selectedMembers.length > 0) {
//       const membersToAdd = selectedMembers.map(memberId => ({ memberId, projectid }));
//       Addmemberinproject(membersToAdd)
//         .then(() => {
//           if (typeof refetchMembers === "function") refetchMembers();
//           else refetchMembers()
//           setMembersRefreshKey(prev => prev + 1);
//           setSelectedMembers([]);
//         })
//         .catch(() => {
//           setSelectedMembers([]);
//         });
//     }
//   }

//   const handleAddTask = async (userid) => {
//     if(tasktext.length === 0 ) alert("Please enter a task")
//     else{
//       try {
//         await addtask({ userid, projectid, task: tasktext }).unwrap();
//         setTasktext("");
//         setTaskModalFor(null);
//         if (typeof refetchMembers === "function") refetchMembers();
//         setMembersRefreshKey(prev => prev + 1);
//       } catch (err) {
//         setTaskModalFor(null);
//         setTasktext("");
//         if (typeof refetchMembers === "function") refetchMembers();
//         setMembersRefreshKey(prev => prev + 1);
//       }
//     };
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
//       {addmemberloading || a1 || a2 || a3 && (
//         <Loader/>
//       )}

//       {/* Project Header */}
//       {loadingProject ? (
//         <ShimmerProjectHeader />
//       ) : (
//         <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/70 mb-10 max-w-6xl mx-auto animate-slide-in">
//           <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
//             <div className="flex-1">
//               <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
//                 <MdGroups className="w-4 h-4 mr-2" />
//                 Project Overview
//               </div>
//               <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 truncate bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 {projectdetail?.title || "Project Title"}
//               </h1>

//               <div className="flex flex-wrap gap-4 mb-6">
//                 <div className="flex items-center gap-3 bg-blue-50/80 px-4 py-3 rounded-xl border border-blue-100 backdrop-blur-sm">
//                   <HiCalendar className="w-5 h-5 text-blue-600" />
//                   <div>
//                     <p className="text-sm text-gray-600 font-medium">Start Date</p>
//                     <p className="font-semibold text-gray-800">
//                       {projectdetail?.startdate ? new Date(projectdetail.startdate).toLocaleDateString() : "--"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3 bg-purple-50/80 px-4 py-3 rounded-xl border border-purple-100 backdrop-blur-sm">
//                   <HiCalendar className="w-5 h-5 text-purple-600" />
//                   <div>
//                     <p className="text-sm text-gray-600 font-medium">End Date</p>
//                     <p className="font-semibold text-gray-800">
//                       {projectdetail?.enddate ? new Date(projectdetail.enddate).toLocaleDateString() : "--"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm ${projectdetail?.status ? 'bg-green-50/80 border-green-100' : 'bg-yellow-50/80 border-yellow-100'}`}>
//                   {projectdetail?.status ? (
//                     <HiCheckCircle className="w-5 h-5 text-green-600" />
//                   ) : (
//                     <HiExclamationCircle className="w-5 h-5 text-yellow-600" />
//                   )}
//                   <div>
//                     <p className="text-sm text-gray-600 font-medium">Status</p>
//                     <p className={`font-semibold ${projectdetail?.status ? 'text-green-700' : 'text-yellow-700'}`}>
//                       {projectdetail?.status ? "Completed" : "Active"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm">
//               <div className="relative">
//                 <select
//                   onChange={handleselect}
//                   name="members"
//                   id="members"
//                   className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 w-full transition-all"
//                 >
//                   <option value="">Select Member</option>
//                   {membersname?.usersname?.map((user) => (
//                     <option key={user.id} value={user.id}>
//                       {user.name}
//                     </option>
//                   ))}
//                 </select>
//                 <RiTeamLine className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//               </div>

//               <button
//                 onClick={handleadd}
//                 className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-0.5"
//                 type="button"
//               >
//                 <HiUserAdd className="w-5 h-5" />
//                 Add Member
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Team Members Section */}
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-center gap-3 mb-8">
//           <div className="p-2 bg-blue-100 rounded-lg">
//             <RiTeamLine className="w-7 h-7 text-blue-600" />
//           </div>
//           <h2 className="text-3xl font-bold text-gray-800">Team Members</h2>
//           <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full ml-2">
//             {employeeProject.length} members
//           </span>
//         </div>

//         {loadingMembers ? (
//           Array.from({ length: 3 }).map((_, idx) => <ShimmerEmployeeCard key={idx} />)
//         ) : employeeProject && employeeProject.length > 0 ? (
//           <div className="grid gap-6">
//             {employeeProject.map((employee, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/70 hover:shadow-xl transition-all duration-300 animate-fade-in group hover:scale-[1.01]"
//                 style={{ animationDelay: `${idx * 100}ms` }}
//               >
//                 <div className="flex flex-col md:flex-row gap-6">
//                   {/* Employee Avatar and Info */}
//                   <div className="flex items-start gap-6">
//                     <div className="relative">
//                       {getImageSrc(employee.img) ? (
//                         <img
//                           src={getImageSrc(employee.img)}
//                           alt={employee.name}
//                           className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
//                         />
//                       ) : (
//                         <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-3xl font-bold text-blue-600 shadow-lg group-hover:scale-105 transition-transform duration-300">
//                           {employee.name?.[0]?.toUpperCase() || "?"}
//                         </div>
//                       )}
//                       <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-2 border-white flex items-center justify-center ${employee.projectinfo?.status ? 'bg-green-500' : 'bg-yellow-500'}`}>
//                         {employee.projectinfo?.status ? (
//                           <HiCheckCircle className="w-4 h-4 text-white" />
//                         ) : (
//                           <HiExclamationCircle className="w-4 h-4 text-white" />
//                         )}
//                       </div>
//                     </div>

//                     <div className="flex-1">
//                       <div className="flex flex-wrap items-center gap-3 mb-2">
//                         <h3 className="text-2xl font-bold text-gray-800">{employee.name}</h3>
//                         <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${employee.projectinfo?.status ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                           {employee.projectinfo?.status ? "Completed" : "Active"}
//                         </span>
//                       </div>

//                       <p className="text-gray-600 mb-4 flex items-center">
//                         <HiCalendar className="w-4 h-4 mr-2 text-gray-400" />
//                         Member since {employee.joined ? new Date(employee.joined).toLocaleDateString() : "unknown"}
//                       </p>

//                       <button
//                         onClick={() => setTaskModalFor(employee.userid)}
//                         className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-0.5 group/btn"
//                         type="button"
//                       >
//                         <IoIosAddCircleOutline className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
//                         Add Task
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Tasks Section */}
//                 <div className="mt-8 pt-6 border-t border-gray-100">
//                   <div className="flex items-center gap-2 mb-4">
//                     <MdOutlineWorkOutline className="w-6 h-6 text-blue-600" />
//                     <h4 className="text-xl font-semibold text-gray-800">Assigned Tasks</h4>
//                     <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
//                       {employee.projectinfo?.task?.length || 0} tasks
//                     </span>
//                   </div>

//                   <div className="bg-gray-50/50 rounded-2xl p-4 backdrop-blur-sm border border-gray-100">
//                     {employee.projectinfo?.task && employee.projectinfo.task.length > 0 ? (
//                       <div className="space-y-3">
//                         {employee.projectinfo.task.map((task, tIdx) => (
//                           <div key={tIdx} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group/task">
//                             <div className="flex items-center gap-3">
//                               <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-800 font-medium text-sm">
//                                 {tIdx + 1}
//                               </span>
//                               <span className="font-medium text-gray-800">{task.title}</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${task.status ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                                 {task.status ? "Completed" : "Active"}
//                               </span>
//                               <RiArrowRightLine className="w-4 h-4 text-gray-400 opacity-0 group-hover/task:opacity-100 transition-opacity" />
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-center py-8 text-gray-400">
//                         <MdOutlineWorkOutline className="w-14 h-14 mx-auto mb-3 opacity-50" />
//                         <p className="font-medium">No tasks assigned yet</p>
//                         <p className="text-sm mt-1">Add tasks to track progress</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           !loadingMembers && (
//             <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-12 text-center shadow-lg border border-white/50">
//               <RiTeamLine className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">No team members yet</h3>
//               <p className="text-gray-500 mb-6">Add members to get started with this project</p>
//               <button className="px-5 py-2.5 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors">
//                 Invite Members
//               </button>
//             </div>
//           )
//         )}
//       </div>

//       {/* Add Task Modal */}
//       {taskModalFor && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fade-in">
//           <div className="relative bg-white w-full max-w-md mx-auto rounded-3xl shadow-2xl p-6 border border-white/70 animate-scale-in">
//             <button
//               className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
//               onClick={() => {
//                 setTaskModalFor(null);
//                 setTasktext("");
//               }}
//               aria-label="Close"
//               type="button"
//             >
//               <HiX className="w-6 h-6" />
//             </button>

//             <div className="text-center mb-6">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <IoIosAddCircleOutline className="w-8 h-8 text-blue-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800 mb-1">Add New Task</h3>
//               <p className="text-gray-600">Assign a task to this team member</p>
//             </div>

//             <div className="space-y-5">
//               <div>
//                 <label htmlFor="task" className="block text-sm font-medium text-gray-700 mb-2">
//                   Task Description
//                 </label>
//                 <textarea
//                   id="task"
//                   name="task"
//                   value={tasktext}
//                   onChange={(e) => setTasktext(e.target.value)}
//                   placeholder="Enter task description..."
//                   rows="3"
//                   className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
//                 />
//               </div>

//               <button
//                 className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-purple-700 flex items-center justify-center gap-2"
//                 type="button"
//                 onClick={async () => {
//                   await handleAddTask(taskModalFor);
//                 }}
//               >
//                 <HiOutlinePlus className="w-5 h-5" />
//                 Add Task
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes slide-in {
//           from { 
//             opacity: 0; 
//             transform: translateY(20px) scale(0.98); 
//           }
//           to { 
//             opacity: 1; 
//             transform: translateY(0) scale(1); 
//           }
//         }

//         @keyframes fade-in {
//           from { 
//             opacity: 0; 
//           }
//           to { 
//             opacity: 1; 
//           }
//         }

//         @keyframes scale-in {
//           from { 
//             opacity: 0; 
//             transform: scale(0.96) translateY(10px); 
//           }
//           to { 
//             opacity: 1; 
//             transform: scale(1) translateY(0); 
//           }
//         }

//         .animate-slide-in {
//           animation: slide-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
//         }

//         .animate-fade-in {
//           opacity: 0;
//           animation: fade-in 0.5s ease-out forwards;
//         }

//         .animate-scale-in {
//           animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Projectdetails;



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetprojectMutation, useGetallmembersnameQuery, useAddmemberinprojectMutation, useAddtaskMutation, useGetallmemebersadminMutation } from '../../../redux/adminapislice';

import { HiOutlinePlus, HiX, HiUserAdd, HiCalendar, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';
import { MdOutlineWorkOutline, MdGroups } from 'react-icons/md';
import { FaUserPlus } from 'react-icons/fa';
import { RiTeamLine, RiArrowRightLine } from 'react-icons/ri';
import { IoIosAddCircleOutline } from 'react-icons/io';
import Loader from '../../loader';

const ShimmerProjectHeader = () => (
  <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/50 mb-8 animate-pulse">
    <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
      <div className="flex-1 space-y-4">
        <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"></div>
        <div className="flex flex-wrap gap-6">
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40"></div>
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40"></div>
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40"></div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-40"></div>
        <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-24"></div>
      </div>
    </div>
  </div>
);

const ShimmerEmployeeCard = () => (
  <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/50 mb-6 animate-pulse">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-gray-200 to-gray-300"></div>
      <div className="flex-1 space-y-4">
        <div className="h-7 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/3"></div>
        <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/4"></div>
        <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40"></div>
      </div>
    </div>
    <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
      <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/4"></div>
      <div className="h-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
    </div>
  </div>
);

const Projectdetails = () => {
  const { id: projectid } = useParams();
  const [getproject, { isLoading: a1 }] = useGetprojectMutation();
  const [getallmembers, { isLoading: a2, refetch: refetchMembers }] = useGetallmemebersadminMutation();
  const { data: membersname, isLoading: a3 } = useGetallmembersnameQuery()
  const [projectdetail, setProjectDetail] = useState(null);
  const [employeeProject, setEmployeeProject] = useState([]);
  const [loadingProject, setLoadingProject] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [Addmemberinproject, { isLoading: addmemberloading }] = useAddmemberinprojectMutation();
  const [addtask, { isLoading: addtaskloading }] = useAddtaskMutation();
  const [tasktext, setTasktext] = useState("");
  const [taskModalFor, setTaskModalFor] = useState(null);
  const [membersRefreshKey, setMembersRefreshKey] = useState(0);
  const [isAddingMember, setIsAddingMember] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      setLoadingProject(true);
      try {
        const data = await getproject(projectid).unwrap();
        setProjectDetail(data.project);
      } catch (error) {
        setProjectDetail(null);
      }
      setLoadingProject(false);
    };
    if (projectid) fetchProject();
  }, [getproject, projectid]);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoadingMembers(true);
      try {
        if (projectdetail && Array.isArray(projectdetail.members) && projectdetail.members.length > 0) {
          const data = await getallmembers({ userid: projectdetail.members, projectid }).unwrap();
          setEmployeeProject(data.members);
        } else {
          setEmployeeProject([]);
        }
      } catch (error) {
        setEmployeeProject([]);
      }
      setLoadingMembers(false);
    };
    if (projectid && projectdetail) fetchMembers();
    // eslint-disable-next-line
  }, [getallmembers, projectid, projectdetail, membersRefreshKey, refetchMembers]);

  const getImageSrc = (img) => {
    if (!img?.data) return null;
    try {
      return `data:${img.contentType};base64,${btoa(
        new Uint8Array(img.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
      )}`;
    } catch {
      return null;
    }
  };

  function handleselect(e) {
    const { value } = e.target;
    if (value && !selectedMembers.includes(value)) {
      setSelectedMembers([...selectedMembers, value]);
    }
  }

  function handleadd() {
    if (selectedMembers.length > 0) {
      setIsAddingMember(true);
      const membersToAdd = selectedMembers.map(memberId => ({ memberId, projectid }));
      Addmemberinproject(membersToAdd)
        .then(() => {
          if (typeof refetchMembers === "function") refetchMembers();
          else refetchMembers()
          setMembersRefreshKey(prev => prev + 1);
          setSelectedMembers([]);
          setIsAddingMember(false);
        })
        .catch(() => {
          setSelectedMembers([]);
          setIsAddingMember(false);
        });
    }
  }

  const handleAddTask = async (userid) => {
    if (tasktext.length === 0) alert("Please enter a task")
    else {
      try {
        await addtask({ userid, projectid, task: tasktext }).unwrap();
        setTasktext("");
        setTaskModalFor(null);
        if (typeof refetchMembers === "function") refetchMembers();
        setMembersRefreshKey(prev => prev + 1);
      } catch (err) {
        setTaskModalFor(null);
        setTasktext("");
        if (typeof refetchMembers === "function") refetchMembers();
        setMembersRefreshKey(prev => prev + 1);
      }
    };
  }

  return (
    <div className=" py-8 px-4 relative overflow-hidden">
      {addmemberloading || a1 || a2 || a3 && (
        <Loader />
      )}

      {loadingProject ? (
        <ShimmerProjectHeader />
      ) : (
        <div className="rounded-3xl p-8  mb-10 max-w-6xl mx-auto relative z-10 transform transition-all duration-500  ">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm font-medium mb-4 shadow-sm">
                <MdGroups className="w-4 h-4 mr-2" />
                Project Overview
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                {projectdetail?.title || "Project Title"}
              </h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-3 bg-blue-50/80 px-4 py-3 rounded-xl border border-blue-100 backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                  <HiCalendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Start Date</p>
                    <p className="font-semibold text-gray-800">
                      {projectdetail?.startdate ? new Date(projectdetail.startdate).toLocaleDateString() : "--"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-purple-50/80 px-4 py-3 rounded-xl border border-purple-100 backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                  <HiCalendar className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">End Date</p>
                    <p className="font-semibold text-gray-800">
                      {projectdetail?.enddate ? new Date(projectdetail.enddate).toLocaleDateString() : "--"}
                    </p>
                  </div>
                </div>

                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${projectdetail?.status ? 'bg-green-50/80 border-green-100' : 'bg-yellow-50/80 border-yellow-100'}`}>
                  {projectdetail?.status ? (
                    <HiCheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <HiExclamationCircle className="w-5 h-5 text-yellow-600" />
                  )}
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Status</p>
                    <p className={`font-semibold ${projectdetail?.status ? 'text-green-700' : 'text-yellow-700'}`}>
                      {projectdetail?.status ? "Completed" : "Active"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm transform transition-all duration-300 hover:shadow-lg">
              <div className="relative">
                <select
                  onChange={handleselect}
                  name="members"
                  id="members"
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 w-full transition-all"
                  disabled={isAddingMember}
                >
                  <option value="">Select Member</option>
                  {membersname?.usersname?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                <RiTeamLine className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              </div>

              <button
                onClick={handleadd}
                disabled={isAddingMember || selectedMembers.length === 0}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-0.5 ${(isAddingMember || selectedMembers.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                type="button"
              >
                {isAddingMember ? (
                  <>
                    <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <HiUserAdd className="w-5 h-5" />
                    Add Member
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Team Members Section */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg shadow-sm">
            <RiTeamLine className="w-7 h-7 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Team Members</h2>
          <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full ml-2 shadow-sm">
            {employeeProject.length} members
          </span>
        </div>

        {loadingMembers ? (
          <div className="grid gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <ShimmerEmployeeCard key={idx} />
            ))}
          </div>
        ) : employeeProject && employeeProject.length > 0 ? (
          <div className="grid gap-6">
            {employeeProject.map((employee, idx) => (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/70 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] group relative overflow-hidden"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Subtle hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Employee Avatar and Info */}
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      {getImageSrc(employee.img) ? (
                        <img
                          src={getImageSrc(employee.img)}
                          alt={employee.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300 group-hover:border-blue-100"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-3xl font-bold text-blue-600 shadow-lg group-hover:scale-105 transition-transform duration-300">
                          {employee.name?.[0]?.toUpperCase() || "?"}
                        </div>
                      )}
                      <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-2 border-white flex items-center justify-center ${employee.projectinfo?.status ? 'bg-green-500' : 'bg-yellow-500'} shadow-sm`}>
                        {employee.projectinfo?.status ? (
                          <HiCheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <HiExclamationCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{employee.name}</h3>
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${employee.projectinfo?.status ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} shadow-sm`}>
                          {employee.projectinfo?.status ? "Completed" : "Active"}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4 flex items-center transition-colors group-hover:text-gray-700">
                        <HiCalendar className="w-4 h-4 mr-2 text-gray-400" />
                        Member since {employee.joined ? new Date(employee.joined).toLocaleDateString() : "unknown"}
                      </p>

                      <button
                        onClick={() => setTaskModalFor(employee.userid)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-0.5 group/btn"
                        type="button"
                      >
                        <IoIosAddCircleOutline className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                        Add Task
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tasks Section */}
                <div className="mt-8 pt-6 border-t border-gray-100 group-hover:border-blue-100 transition-colors">
                  <div className="flex items-center gap-2 mb-4">
                    <MdOutlineWorkOutline className="w-6 h-6 text-blue-600" />
                    <h4 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">Assigned Tasks</h4>
                    <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                      {employee.projectinfo?.task?.length || 0} tasks
                    </span>
                  </div>

                  <div className="bg-gray-50/50 rounded-2xl p-4 backdrop-blur-sm border border-gray-100 group-hover:border-blue-100 transition-colors">
                    {employee.projectinfo?.task && employee.projectinfo.task.length > 0 ? (
                      <div className="space-y-3">
                        {employee.projectinfo.task.map((task, tIdx) => (
                          <div key={tIdx} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group/task hover:border-blue-200">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 font-medium text-sm shadow-sm">
                                {tIdx + 1}
                              </span>
                              <span className="font-medium text-gray-800 group-hover/task:text-blue-700 transition-colors">{task.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${task.status ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} shadow-sm`}>
                                {task.status ? "Completed" : "Active"}
                              </span>
                              <RiArrowRightLine className="w-4 h-4 text-gray-400 opacity-0 group-hover/task:opacity-100 transition-opacity transform group-hover/task:translate-x-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400 group-hover:text-gray-500 transition-colors">
                        <MdOutlineWorkOutline className="w-14 h-14 mx-auto mb-3 opacity-50" />
                        <p className="font-medium">No tasks assigned yet</p>
                        <p className="text-sm mt-1">Add tasks to track progress</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loadingMembers && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-12 text-center shadow-lg border border-white/50 transform hover:scale-[1.01] transition-all duration-300">
              <RiTeamLine className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No team members yet</h3>
              <p className="text-gray-500 mb-6">Add members to get started with this project</p>
              <button className="px-5 py-2.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-lg font-medium hover:from-blue-200 hover:to-indigo-200 transition-all duration-300 shadow-sm hover:shadow-md">
                Invite Members
              </button>
            </div>
          )
        )}
      </div>

      {/* Add Task Modal */}
      {taskModalFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fade-in">
          <div className="relative bg-white w-full max-w-md mx-auto rounded-3xl shadow-2xl p-6 border border-white/70 animate-scale-in transform transition-all duration-300">
            <button
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 transform hover:rotate-90 transition-transform"
              onClick={() => {
                setTaskModalFor(null);
                setTasktext("");
              }}
              aria-label="Close"
              type="button"
            >
              <HiX className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <IoIosAddCircleOutline className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">Add New Task</h3>
              <p className="text-gray-600">Assign a task to this team member</p>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="task" className="block text-sm font-medium text-gray-700 mb-2">
                  Task Description
                </label>
                <textarea
                  id="task"
                  name="task"
                  value={tasktext}
                  onChange={(e) => setTasktext(e.target.value)}
                  placeholder="Enter task description..."
                  rows="3"
                  className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>

              <button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-purple-700 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                onClick={async () => {
                  await handleAddTask(taskModalFor);
                }}
                disabled={addtaskloading}
              >
                {addtaskloading ? (
                  <>
                    <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <HiOutlinePlus className="w-5 h-5" />
                    Add Task
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.98); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes fade-in {
          from { 
            opacity: 0; 
          }
          to { 
            opacity: 1; 
          }
        }
        
        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.96) translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-slide-in {
          animation: slide-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.5s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Projectdetails;