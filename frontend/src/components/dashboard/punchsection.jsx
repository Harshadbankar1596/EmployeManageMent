// import { useState, useEffect, useCallback } from 'react';
// import Switch from './togle';
// import { useAddpunchMutation, useVerifyTokenQuery } from '../../redux/apislice';
// import { useSelector } from 'react-redux';

// function fixTime(timeStr) {
//   if (!timeStr) return '';
//   const parts = timeStr.split(':');
//   return parts.map(part => part.padStart(2, '0')).join(':');
// }

// function calculateTotalTime(punchs) {
//   let totalSeconds = 0;
//   const now = new Date();

//   for (let i = 0; i < punchs.length; i += 2) {
//     const inTime = punchs[i];
//     const outTime = punchs[i + 1] || null;

//     if (!inTime) continue;

//     const inDate = new Date(`${now.toDateString()} ${fixTime(inTime)}`);

//     const outDate = outTime ? new Date(`${now.toDateString()} ${fixTime(outTime)}`) : new Date();

//     if (outDate < inDate) {
//       outDate.setDate(outDate.getDate() + 1);
//     }

//     totalSeconds += (outDate - inDate) / 1000;
//   }

//   return totalSeconds;
// }


// let currentHours = 0
// function formatTime(totalSeconds) {
//   const hours = Math.floor(totalSeconds / 3600);
//   const minutes = Math.floor((totalSeconds % 3600) / 60);
//   const seconds = Math.floor(totalSeconds % 60);
//   currentHours = hours
//   return `${hours.toString().padStart(2, '0')} : ${minutes
//     .toString()
//     .padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
// }

// const Punchsection = () => {
//   const [addpunch, { isLoading: punchveryfy }] = useAddpunchMutation();
//   const id = useSelector((state) => state.user.id);
//   const [punchs, setPunchs] = useState([]);
//   const [totalSeconds, setTotalSeconds] = useState(0);
//   const [isClockedIn, setIsClockedIn] = useState(false);

//   const { data: user, isLoading: veryfy, refetch } = useVerifyTokenQuery();

//   const calculateTime = useCallback(() => {
//     return calculateTotalTime(punchs);
//   }, [punchs]);

//   useEffect(() => {
//     if (veryfy || punchveryfy) {
//       console.log("loading in veryfy user ", veryfy);
//     }

//     if (user?.user?.logs) {
//       const today = new Date().toLocaleDateString();
//       // console.log(today)
//       const todayLog = user?.user?.logs?.find((log) => log?.date === today) || [];

//       const punches = todayLog?.punchs || [];
//       setPunchs(punches);
//       setIsClockedIn(punches.length % 2 !== 0);
//     }
//   }, [user, refetch]);

//   useEffect(()=>{
//     refetch()
//   },[])

//   useEffect(() => {
//     setTotalSeconds(calculateTime());
//     let interval;
//     if (isClockedIn) {
//       interval = setInterval(() => {
//         setTotalSeconds(calculateTime());
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [isClockedIn, calculateTime, refetch, user]);

//   const handlePunch = async () => {
//     try {
//       const res = await addpunch(id).unwrap();
//       if (res?.log?.punchs) {
//         // const newPunchs = res?.log?.punchs;
//         setPunchs(res?.log?.punchs);
//         setIsClockedIn(res?.log?.punchs.length % 2 !== 0);
//       }
//       await refetch();
//     } catch (err) {
//       // alert("Error in Punching");
//       // navigate('/login');
//     }

//   };

//   const EIGHT_HOURS = 8 * 3600;
//   const percentage = Math.min(100, (totalSeconds / EIGHT_HOURS) * 100);
//   const liveTime = formatTime(totalSeconds);


//   if (veryfy || punchveryfy) return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
//     </div>
//   )


//   return (
//     <div className="flex flex-col w-full gap-4 justify-center items-center lg:flex-row lg:flex-nowrap">

//       <div className="bg-white rounded-lg shadow-2xl w-full p-4 sm:p-6 flex flex-col h-80 sm:h-80 mb-4 lg:mb-0 lg:max-w-xl">
//         <div className="flex justify-between items-center text-gray-500">
//           <p className="text-lg sm:text-xl font-bold">Today Activity</p>
//           <p className="text-sm sm:text-base">{new Date().toLocaleDateString()}</p>
//         </div>

//         <div className="flex items-center justify-center m-auto relative flex-1">
//           <div className="relative h-40 w-40 sm:h-56 sm:w-56 mx-auto">
//             <div className="absolute inset-0 rounded-full bg-gray-200"></div>
//             <div
//               className="absolute inset-0 rounded-full"
//               style={{
//                 background: `conic-gradient(
//                   #10B981 0%, 
//                   #10B981 ${percentage}%, 
//                   #E5E7EB ${percentage}%, 
//                   #E5E7EB 100%
//                 )`
//               }}
//             ></div>
//             <div className="absolute top-3 left-3 right-3 bottom-3 sm:top-4 sm:left-4 sm:right-4 sm:bottom-4 bg-white rounded-full flex flex-col justify-center items-center text-xl sm:text-2xl font-bold z-10">
//               <span className="text-2xl sm:text-3xl">{liveTime}</span>
//               <span className="text-xs sm:text-sm text-gray-500 mt-2">
//                 {isClockedIn ? 'Currently Clocked In' : 'Clocked Out'}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-2xl w-full p-4 sm:p-6 flex flex-col h-80 sm:h-80 lg:max-w-xl">
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
//           <p className="text-xl sm:text-2xl font-bold text-gray-700">Today's Updates</p>
//           <Switch onClick={handlePunch} punchs={punchs} />
//         </div>

//         <div data-lenis-prevent className="flex flex-col overflow-y-auto scrollbar-hide gap-2 mt-4 w-full flex-1">

//           {punchs.length === 0 && (
//             <div className="text-center text-gray-400">No punches yet today.</div>
//           )}
//           {punchs?.map((punch, index) => (
//             <div
//               key={index}
//               className="flex justify-between bg-blue-100 px-3 sm:px-5 py-3 sm:py-5 rounded-sm items-center"
//             >
//               <p className="font-semibold text-gray-700 text-sm sm:text-base">
//                 {index % 2 === 0 ? 'Punch In' : 'Punch Out'}
//               </p>
//               <p className={`${index % 2 === 0 ? 'bg-green-500' : 'bg-red-500'} px-2 py-2 rounded-sm text-white text-xs sm:text-base`}>
//                 {fixTime(punch)}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Punchsection;

// import { useState, useEffect } from 'react';
// import Switch from './togle';
// import { useAddpunchMutation, useVerifyTokenQuery } from '../../redux/apislice';
// import { useSelector } from 'react-redux';
// import Loader from '../loader';

// // Get today's date in the exact format used by backend: "8/23/2025"
// function getTodayDateString() {
//   const today = new Date();
//   const month = today.getMonth() + 1;  // 1-12
//   const day = today.getDate();         // 1-31
//   const year = today.getFullYear();    // 2025

//   // Backend uses format: "M/D/YYYY" (no leading zeros)
//   return `${month}/${day}/${year}`;
// }

// const Punchsection = () => {
//   const [addpunch, { isLoading: punchveryfy }] = useAddpunchMutation();
//   const id = useSelector((state) => state.user.id);
//   const [punchs, setPunchs] = useState([]);
//   const [isClockedIn, setIsClockedIn] = useState(false);

//   const { data: user, isLoading: veryfy, refetch } = useVerifyTokenQuery();

//   useEffect(() => {
//     if (user?.user?.logs && Array.isArray(user.user.logs)) {
//       const todayDate = getTodayDateString(); 
//       const todayLog = user.user.logs.find((log) => log.date === todayDate);

//       if (todayLog) {
//         const punches = todayLog.punchs || [];
//         setPunchs(punches);
//         setIsClockedIn(punches.length % 2 !== 0);
//       } else {
//         setPunchs([]);
//         setIsClockedIn(false);
//       }
//     } else {
//       setPunchs([]);
//       setIsClockedIn(false);
//     }
//   }, [user]);

//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   const handlePunch = async () => {
//     try {
//       const res = await addpunch(id).unwrap();
//       if (res?.log?.punchs) {
//         setPunchs(res.log.punchs);
//         setIsClockedIn(res.log.punchs.length % 2 !== 0);
//       }
//       await refetch();
//     } catch (err) {
//       console.error("Error in Punching:", err);
//     }
//   };

//   // Get display date
//   const displayDate = (() => {
//     try {
//       return new Date().toLocaleDateString();
//     } catch (e) {
//       const today = new Date();
//       return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
//     }
//   })();

//   console.log(punchs)

//   if (veryfy || punchveryfy) return (
//     <Loader />
//   );

//   return (
//     <div className="flex flex-col w-full gap-4 justify-center items-center">
//       <div className="bg-white rounded-lg shadow-2xl w-full p-4 sm:p-6 flex flex-col lg:max-w-2xl">
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
//           <div className="flex flex-col items-center sm:items-start">
//             <p className="text-xl sm:text-2xl font-bold text-gray-700">Today's Updates</p>
//             <p className="text-sm text-gray-500">{displayDate}</p>
//           </div>
//           <Switch onClick={handlePunch} punchs={punchs} />
//         </div>

//         <div data-lenis-prevent className="flex flex-col overflow-y-auto scrollbar-hide gap-2 mt-4 w-full max-h-96">
//           {punchs.length === 0 && (
//             <div className="text-center text-gray-400 py-8">
//               <div className="text-lg font-medium">No punches yet today</div>
//               <div className="text-sm mt-1">Click the switch above to start your day</div>
//             </div>
//           )}
//           {punchs.map((punch, index) => (
//             <div
//               key={index}
//               className="flex justify-between bg-blue-100 px-3 sm:px-5 py-3 sm:py-5 rounded-lg items-center hover:bg-blue-200 transition-colors"
//             >
//               <div className="flex items-center gap-3">
//                 <div className={`w-3 h-3 rounded-full ${index % 2 === 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
//                 <div className="flex flex-col">
//                   <p className="font-semibold text-gray-700 text-sm sm:text-base">
//                     {index % 2 === 0 ? 'Punch In' : 'Punch Out'}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     Entry #{index + 1}
//                   </p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className={`${index % 2 === 0 ? 'bg-green-500' : 'bg-red-500'} px-3 py-2 rounded-lg text-white text-xs sm:text-base font-medium`}>
//                   {punch}
//                 </p>
//               </div>
//             </div>
//           ))}

//           {/* Current Status Indicator */}
//           {punchs.length > 0 && (
//             <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center">
//               <span className={`inline-flex items-center gap-2 text-sm font-medium ${isClockedIn ? 'text-green-600' : 'text-red-600'}`}>
//                 <div className={`w-2 h-2 rounded-full ${isClockedIn ? 'bg-green-500' : 'bg-red-500'} ${isClockedIn ? 'animate-pulse' : ''}`}></div>
//                 {isClockedIn ? 'Currently Clocked In' : 'Currently Clocked Out'}
//               </span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Punchsection;


// import { useState, useEffect, useCallback } from 'react';
// import Switch from './togle';
// import { useAddpunchMutation, useVerifyTokenQuery } from '../../redux/apislice';
// import { useSelector } from 'react-redux';
// import Loader from '../loader';

// // Parse time string like "9:11:3 AM" or "2:12:11 PM"
// function parseTime(timeStr) {
//   if (!timeStr) return null;

//   let time = timeStr.trim().toUpperCase();
//   let isPM = time.includes('PM');
//   let isAM = time.includes('AM');

//   // Remove AM/PM indicator
//   time = time.replace(/(AM|PM)/gi, '').trim();

//   const parts = time.split(':').map(part => parseInt(part) || 0);

//   let hours = parts[0] || 0;
//   const minutes = parts[1] || 0;
//   const seconds = parts[2] || 0;

//   // Convert to 24-hour format
//   if (isPM && hours < 12) hours += 12;
//   if (isAM && hours === 12) hours = 0;

//   return { hours, minutes, seconds };
// }

// // Format seconds to HH:MM:SS display
// function formatTimeForDisplay(totalSeconds) {
//   const hours = Math.floor(totalSeconds / 3600);
//   const minutes = Math.floor((totalSeconds % 3600) / 60);
//   const seconds = Math.floor(totalSeconds % 60);

//   return `${hours.toString().padStart(2, '0')}:${minutes
//     .toString()
//     .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
// }

// // Create date object from time parts
// function createTimeDate(hours, minutes, seconds) {
//   const date = new Date();
//   date.setHours(hours, minutes, seconds, 0);
//   return date;
// }

// // Calculate total working time from punches
// function calculateTotalTime(punchs) {
//   if (!punchs || punchs.length === 0) return 0;

//   let totalSeconds = 0;

//   for (let i = 0; i < punchs.length; i += 2) {
//     const inTimeStr = punchs[i];
//     const outTimeStr = punchs[i + 1] || null;

//     if (!inTimeStr) continue;

//     const inTime = parseTime(inTimeStr);
//     if (!inTime) continue;

//     const inDate = createTimeDate(inTime.hours, inTime.minutes, inTime.seconds);

//     let outDate;
//     if (outTimeStr) {
//       const outTime = parseTime(outTimeStr);
//       if (outTime) {
//         outDate = createTimeDate(outTime.hours, outTime.minutes, outTime.seconds);

//         // If out time is earlier than in time, assume it's the next day
//         if (outDate.getTime() < inDate.getTime()) {
//           outDate.setTime(outDate.getTime() + (24 * 60 * 60 * 1000));
//         }
//       } else {
//         outDate = new Date();
//       }
//     } else {
//       // If no out time, use current time (for live calculation)
//       outDate = new Date();
//     }

//     const diffInSeconds = (outDate.getTime() - inDate.getTime()) / 1000;
//     totalSeconds += Math.max(0, diffInSeconds);
//   }

//   return totalSeconds;
// }

// // Get today's date in the exact format used by backend: "8/23/2025"
// function getTodayDateString() {
//   const today = new Date();
//   const month = today.getMonth() + 1;  // 1-12
//   const day = today.getDate();         // 1-31
//   const year = today.getFullYear();    // 2025

//   // Backend uses format: "M/D/YYYY" (no leading zeros)
//   return `${month}/${day}/${year}`;
// }

// const Punchsection = () => {
//   const [addpunch, { isLoading: punchveryfy }] = useAddpunchMutation();
//   const id = useSelector((state) => state.user.id);
//   const [punchs, setPunchs] = useState([]);
//   const [isClockedIn, setIsClockedIn] = useState(false);
//   const [totalSeconds, setTotalSeconds] = useState(0);

//   const { data: user, isLoading: veryfy, refetch } = useVerifyTokenQuery();

//   const calculateTime = useCallback(() => {
//     return calculateTotalTime(punchs);
//   }, [punchs]);

//   useEffect(() => {
//     if (user?.user?.logs && Array.isArray(user.user.logs)) {
//       const todayDate = getTodayDateString(); 
//       const todayLog = user.user.logs.find((log) => log.date === todayDate);

//       if (todayLog) {
//         const punches = todayLog.punchs || [];
//         setPunchs(punches);
//         setIsClockedIn(punches.length % 2 !== 0);
//       } else {
//         setPunchs([]);
//         setIsClockedIn(false);
//       }
//     } else {
//       setPunchs([]);
//       setIsClockedIn(false);
//     }
//   }, [user]);

//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   // Calculate time and update every second if clocked in
//   useEffect(() => {
//     setTotalSeconds(calculateTime());

//     let interval;
//     if (isClockedIn) {
//       interval = setInterval(() => {
//         setTotalSeconds(calculateTime());
//       }, 1000);
//     }

//     return () => {
//       if (interval) {
//         clearInterval(interval);
//       }
//     };
//   }, [isClockedIn, calculateTime]);

//   const handlePunch = async () => {
//     try {
//       const res = await addpunch(id).unwrap();
//       if (res?.log?.punchs) {
//         setPunchs(res.log.punchs);
//         setIsClockedIn(res.log.punchs.length % 2 !== 0);
//       }
//       await refetch();
//     } catch (err) {
//       console.error("Error in Punching:", err);
//     }
//   };

//   // Calculate percentage for 8 hours (28800 seconds)
//   const EIGHT_HOURS = 8 * 3600;
//   const percentage = Math.min(100, (totalSeconds / EIGHT_HOURS) * 100);
//   const liveTime = formatTimeForDisplay(totalSeconds);

//   // Get display date
//   const displayDate = (() => {
//     try {
//       return new Date().toLocaleDateString();
//     } catch (e) {
//       const today = new Date();
//       return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
//     }
//   })();

//   if (veryfy || punchveryfy) return (
//     <Loader />
//   );

//   return (
//     <div className="flex flex-col w-full gap-4 justify-center items-center lg:flex-row lg:flex-nowrap">
//       {/* Time Circle Section */}
//       <div className="bg-white rounded-lg shadow-2xl w-full p-4 sm:p-6 flex flex-col h-80 sm:h-80 mb-4 lg:mb-0 lg:max-w-xl">
//         <div className="flex justify-between items-center text-gray-500">
//           <p className="text-lg sm:text-xl font-bold">Today Activity</p>
//           <p className="text-sm sm:text-base">{displayDate}</p>
//         </div>

//         <div className="flex items-center justify-center m-auto relative flex-1">
//           <div className="relative h-40 w-40 sm:h-56 sm:w-56 mx-auto">
//             {/* Background Circle */}
//             <div className="absolute inset-0 rounded-full bg-gray-200"></div>

//             {/* Progress Circle */}
//             <div
//               className="absolute inset-0 rounded-full transition-all duration-1000 ease-out"
//               style={{
//                 background: `conic-gradient(
//                   #10B981 0%, 
//                   #10B981 ${percentage}%, 
//                   #E5E7EB ${percentage}%, 
//                   #E5E7EB 100%
//                 )`
//               }}
//             ></div>

//             {/* Inner Circle with Time Display */}
//             <div className="absolute top-3 left-3 right-3 bottom-3 sm:top-4 sm:left-4 sm:right-4 sm:bottom-4 bg-white rounded-full flex flex-col justify-center items-center text-xl sm:text-2xl font-bold z-10 shadow-inner">
//               <span className="text-2xl sm:text-3xl font-mono text-gray-800">
//                 {liveTime}
//               </span>
//               <span className="text-xs sm:text-sm text-gray-500 mt-2 text-center">
//                 {isClockedIn ? 'Currently Clocked In' : 'Clocked Out'}
//               </span>
//               <span className="text-xs text-gray-400 mt-1">
//                 {Math.round(percentage)}% of 8 hours
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Punches List Section */}
//       <div className="bg-white rounded-lg shadow-2xl w-full p-4 sm:p-6 flex flex-col h-80 sm:h-80 lg:max-w-xl">
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
//           <div className="flex flex-col items-center sm:items-start">
//             <p className="text-xl sm:text-2xl font-bold text-gray-700">Today's Updates</p>
//             <p className="text-sm text-gray-500">Total entries: {punchs.length}</p>
//           </div>
//           <Switch onClick={handlePunch} punchs={punchs} />
//         </div>

//         <div data-lenis-prevent className="flex flex-col overflow-y-auto scrollbar-hide gap-2 mt-4 w-full flex-1">
//           {punchs.length === 0 && (
//             <div className="text-center text-gray-400 py-8">
//               <div className="text-lg font-medium">No punches yet today</div>
//               <div className="text-sm mt-1">Click the switch above to start your day</div>
//             </div>
//           )}

//           {punchs.map((punch, index) => (
//             <div
//               key={index}
//               className="flex justify-between bg-blue-100 px-3 sm:px-5 py-3 sm:py-5 rounded-lg items-center hover:bg-blue-200 transition-colors"
//             >
//               <div className="flex items-center gap-3">
//                 <div className={`w-3 h-3 rounded-full ${index % 2 === 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
//                 <div className="flex flex-col">
//                   <p className="font-semibold text-gray-700 text-sm sm:text-base">
//                     {index % 2 === 0 ? 'Punch In' : 'Punch Out'}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     Entry #{index + 1}
//                   </p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className={`${index % 2 === 0 ? 'bg-green-500' : 'bg-red-500'} px-3 py-2 rounded-lg text-white text-xs sm:text-base font-medium font-mono`}>
//                   {punch}
//                 </p>
//               </div>
//             </div>
//           ))}

//           {/* Current Status Indicator */}
//           {punchs.length > 0 && (
//             <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center">
//               <span className={`inline-flex items-center gap-2 text-sm font-medium ${isClockedIn ? 'text-green-600' : 'text-red-600'}`}>
//                 <div className={`w-2 h-2 rounded-full ${isClockedIn ? 'bg-green-500' : 'bg-red-500'} ${isClockedIn ? 'animate-pulse' : ''}`}></div>
//                 {isClockedIn ? 'Currently Clocked In' : 'Currently Clocked Out'}
//               </span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Punchsection;


import { useState, useEffect, useCallback } from 'react';
import Switch from './togle';
import { useAddpunchMutation, useVerifyTokenQuery } from '../../redux/apislice';
import { useSelector } from 'react-redux';
import Loader from '../loader';
import { FcOk, FcCancel } from "react-icons/fc";

// Parse time string like "9:11:3 AM" or "2:12:11 PM"
function parseTime(timeStr) {
  if (!timeStr) return null;

  let time = timeStr.trim().toUpperCase();
  let isPM = time.includes('PM');
  let isAM = time.includes('AM');

  // Remove AM/PM indicator
  time = time.replace(/(AM|PM)/gi, '').trim();

  const parts = time.split(':').map(part => parseInt(part) || 0);

  let hours = parts[0] || 0;
  const minutes = parts[1] || 0;
  const seconds = parts[2] || 0;

  // Convert to 24-hour format
  if (isPM && hours < 12) hours += 12;
  if (isAM && hours === 12) hours = 0;

  return { hours, minutes, seconds };
}


function formatTimeForDisplay(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Create date object from time parts
function createTimeDate(hours, minutes, seconds) {
  const date = new Date();
  date.setHours(hours, minutes, seconds, 0);
  return date;
}

// Calculate total working time from punches
function calculateTotalTime(punchs) {
  if (!punchs || punchs.length === 0) return 0;

  let totalSeconds = 0;

  for (let i = 0; i < punchs.length; i += 2) {
    const inTimeStr = punchs[i];
    const outTimeStr = punchs[i + 1] || null;

    if (!inTimeStr) continue;

    const inTime = parseTime(inTimeStr);
    if (!inTime) continue;

    const inDate = createTimeDate(inTime.hours, inTime.minutes, inTime.seconds);

    let outDate;
    if (outTimeStr) {
      const outTime = parseTime(outTimeStr);
      if (outTime) {
        outDate = createTimeDate(outTime.hours, outTime.minutes, outTime.seconds);

        // If out time is earlier than in time, assume it's the next day
        if (outDate.getTime() < inDate.getTime()) {
          outDate.setTime(outDate.getTime() + (24 * 60 * 60 * 1000));
        }
      } else {
        outDate = new Date();
      }
    } else {
      // If no out time, use current time (for live calculation)
      outDate = new Date();
    }

    const diffInSeconds = (outDate.getTime() - inDate.getTime()) / 1000;
    totalSeconds += Math.max(0, diffInSeconds);
  }

  return totalSeconds;
}

// Get today's date in the exact format used by backend: "8/23/2025"
function getTodayDateString() {
  const today = new Date();
  const month = today.getMonth() + 1;  // 1-12
  const day = today.getDate();         // 1-31
  const year = today.getFullYear();    // 2025

  // Backend uses format: "M/D/YYYY" (no leading zeros)
  return `${month}/${day}/${year}`;
}

const Punchsection = () => {
  const [addpunch, { isLoading: punchveryfy }] = useAddpunchMutation();
  const id = useSelector((state) => state.user.id);
  const [punchs, setPunchs] = useState([]);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);

  const { data: user, isLoading: veryfy, refetch } = useVerifyTokenQuery();

  const calculateTime = useCallback(() => {
    return calculateTotalTime(punchs);
  }, [punchs]);

  useEffect(() => {
    if (user?.user?.logs && Array.isArray(user.user.logs)) {
      const todayDate = getTodayDateString();
      const todayLog = user.user.logs.find((log) => log.date === todayDate);

      if (todayLog) {
        const punches = todayLog.punchs || [];
        setPunchs(punches);
        setIsClockedIn(punches.length % 2 !== 0);
      } else {
        setPunchs([]);
        setIsClockedIn(false);
      }
    } else {
      setPunchs([]);
      setIsClockedIn(false);
    }
  }, [user]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Calculate time and update every second if clocked in
  useEffect(() => {
    setTotalSeconds(calculateTime());

    let interval;
    if (isClockedIn) {
      interval = setInterval(() => {
        setTotalSeconds(calculateTime());
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isClockedIn, calculateTime]);

  const handlePunch = async () => {
    try {
      // Add pulse animation effect
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 300);

      const res = await addpunch(id).unwrap();
      if (res?.log?.punchs) {
        setPunchs(res.log.punchs);
        setIsClockedIn(res.log.punchs.length % 2 !== 0);
      }
      await refetch();
    } catch (err) {
      console.error("Error in Punching:", err);
    }
  };

  // Calculate percentage for 8 hours (28800 seconds)
  const EIGHT_HOURS = 8 * 3600;
  const percentage = Math.min(100, (totalSeconds / EIGHT_HOURS) * 100);
  const liveTime = formatTimeForDisplay(totalSeconds);

  // Get display date
  const displayDate = (() => {
    try {
      return new Date().toLocaleDateString();
    } catch (e) {
      const today = new Date();
      return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    }
  })();

  if (veryfy || punchveryfy) return (
    <Loader />
  );

  return (
    <div className="flex flex-col w-full gap-6 justify-center items-center lg:flex-row lg:flex-nowrap">
      {/* Time Circle Section */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full p-6 sm:p-8 flex flex-col h-96 mb-4 lg:mb-0 lg:max-w-xl border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex justify-between items-center text-gray-600 mb-4">
          <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Today's Activity</p>
          <p className="text-sm sm:text-base bg-gray-100 py-1 px-3 rounded-full">{displayDate}</p>
        </div>

        <div className="flex items-center justify-center m-auto relative flex-1">
          <div className="relative h-48 w-48 sm:h-64 sm:w-64 mx-auto">
            {/* Animated outer ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-200 to-purple-200 animate-pulse"></div>

            {/* Background Circle */}
            <div className="absolute inset-2 rounded-full bg-white shadow-inner"></div>

            {/* Progress Circle */}
            <div
              className="absolute inset-2 rounded-full transition-all duration-1000 ease-out"
              style={{
                background: `conic-gradient(
                  #4F46E5 0%, 
                  #7C3AED ${percentage}%, 
                  #E5E7EB ${percentage}%, 
                  #E5E7EB 100%
                )`
              }}
            ></div>

            {/* Inner Circle with Time Display */}
            <div className="absolute top-4 left-4 right-4 bottom-4 sm:top-5 sm:left-5 sm:right-5 sm:bottom-5 bg-white rounded-full flex flex-col justify-center items-center text-xl sm:text-2xl font-bold z-10 shadow-lg">
              <span className="text-3xl sm:text-4xl font-mono text-gray-800 font-extrabold">
                {liveTime}
              </span>
              <span className={`text-xs sm:text-sm mt-2 text-center font-medium ${isClockedIn ? 'text-green-600' : 'text-gray-500'}`}>
                {isClockedIn ? (
                  <span className="flex items-center justify-center gap-1">
                    <FcOk />
                    <span>Clocked In</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1">
                    <FcCancel />
                    <span>Clocked Out</span>
                  </span>
                )}
              </span>
              <span className="text-xs text-gray-400 mt-1">
                {Math.round(percentage)}% of 8 hours
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Punches List Section */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full p-6 sm:p-8 flex flex-col h-96 lg:max-w-xl border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex flex-col items-center sm:items-start">
            <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Today's Updates</p>
            <p className="text-sm text-gray-500 mt-1 bg-gray-100 py-1 px-3 rounded-full">Total entries: {punchs.length}</p>
          </div>
          <div className={isPulsing ? 'animate-pulse' : ''}>
            <Switch onClick={handlePunch} punchs={punchs} />
          </div>
        </div>

        <div data-lenis-prevent className="flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 scrollbar-track-gray-100 gap-3 mt-2 w-full flex-1 pr-2">
          {punchs.length === 0 && (
            <div className="text-center text-gray-400 py-10 animate-fade-in">
              <div className="text-lg font-medium mb-2">No punches yet today</div>
              <div className="text-sm">Click the switch above to start your day</div>
            </div>
          )}

          {punchs.map((punch, index) => (
            <div
              key={index}
              className="flex justify-between bg-gradient-to-r from-blue-50 to-indigo-50 px-4 sm:px-5 py-4 rounded-xl items-center hover:shadow-md transition-all duration-300 border border-blue-100 transform hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${index % 2 === 0 ? 'bg-green-500 shadow-lg shadow-green-200' : 'bg-red-500 shadow-lg shadow-red-200'}`}></div>
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">
                    {index % 2 === 0 ? 'Punch In' : 'Punch Out'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Entry #{index + 1}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`${index % 2 === 0 ? 'bg-green-500 shadow-md shadow-green-200' : 'bg-red-500 shadow-md shadow-red-200'} px-3 py-2 rounded-lg text-white text-xs sm:text-sm font-medium font-mono`}>
                  {punch}
                </p>
              </div>
            </div>
          ))}

          {/* Current Status Indicator */}
          {punchs.length > 0 && (
            <div className="mt-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl text-center border border-gray-200 animate-fade-in">
              <span className={`inline-flex items-center gap-2 text-sm font-medium ${isClockedIn ? 'text-green-600' : 'text-red-600'}`}>
                <div className={`w-3 h-3 rounded-full ${isClockedIn ? 'bg-green-500 animate-ping' : 'bg-red-500'} ${isClockedIn ? 'animate-pulse' : ''}`}></div>
                {isClockedIn ? 'Currently Clocked In - Working' : 'Currently Clocked Out'}
              </span>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-pulse {
          animation: pulse 0.3s ease-in-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Punchsection;