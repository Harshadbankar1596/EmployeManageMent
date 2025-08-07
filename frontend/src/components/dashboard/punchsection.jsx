// import React, { useState, useEffect, useCallback } from 'react';
// import Switch from './togle';
// import { useAddpunchMutation, useVerifyTokenQuery } from '../../redux/apislice';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import SmoothScroll from '../../lenis';

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
//     const outDate = outTime
//       ? new Date(`${now.toDateString()} ${fixTime(outTime)}`)
//       : new Date();

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
//   const [addpunch] = useAddpunchMutation();
//   const id = useSelector((state) => state.user.id);
//   const [punchs, setPunchs] = useState([]);
//   const [totalSeconds, setTotalSeconds] = useState(0);
//   const [isClockedIn, setIsClockedIn] = useState(false);
//   const navigate = useNavigate();
//   const { data: user, isLoading, isError , refetch} = useVerifyTokenQuery();

//   const calculateTime = useCallback(() => {
//     return calculateTotalTime(punchs);
//   }, [punchs]);

//   useEffect(() => {
//     if (user?.user?.logs) {
//       const today = new Date().toLocaleDateString();
//       const todayLog = user.user.logs.find((log) => log.date === today);
//       const punches = todayLog?.punchs || [];
//       setPunchs(punches);
//       setIsClockedIn(punches.length % 2 !== 0);
//     }

//     if (isLoading) {
//       console.log("loading in veryfy user ", isLoading);
//     }

//     else {
//       setTimeout(() => {
//         if (isError) navigate('/login');
//       }, 5000)
//     }
//     refetch();
//   }, [user, refetch]);
  
//   console.log(punchs)
//   useEffect(() => {
//     setTotalSeconds(calculateTime());
//     let interval;
//     if (isClockedIn) {
//       interval = setInterval(() => {
//         setTotalSeconds(calculateTime());
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [isClockedIn, calculateTime , refetch , user]);

//   const handlePunch = async () => {
//     try {
//       const res = await addpunch({ id , currentHours }).unwrap();
//       if (res?.log?.punchs) {
//         const newPunchs = res.log.punchs;
//         setPunchs(newPunchs);
//         setIsClockedIn(newPunchs.length % 2 !== 0);
//       }
//     } catch (err) {
//       navigate('/login');
//     }
//     finally{
//       refetch();
//     }
//   };
  
//   const EIGHT_HOURS = 8 * 3600;
//   const percentage = Math.min(100, (totalSeconds / EIGHT_HOURS) * 100);
//   const liveTime = formatTime(totalSeconds);
  
//   {isLoading && (
//     <div className="flex justify-center items-center h-screen">
//       <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500">Loa</div>
//     </div>
//   )}

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
//           <SmoothScroll/>
//           {punchs.length === 0 && (
//             <div className="text-center text-gray-400">No punches yet today.</div>
//           )}
//           {punchs.map((punch, index) => (
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

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Switch from './togle';
import { useAddpunchMutation, useVerifyTokenQuery } from '../../redux/apislice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SmoothScroll from '../../lenis';

// Utility functions moved outside component
function fixTime(timeStr) {
  return timeStr ? timeStr.split(':').map(part => part.padStart(2, '0')).join(':') : '';
}

function calculateTotalTime(punchs) {
  let totalSeconds = 0;
  const now = new Date();
  const todayStr = now.toDateString();

  for (let i = 0; i < punchs.length; i += 2) {
    const inTime = punchs[i];
    const outTime = punchs[i + 1] || null;

    if (!inTime) continue;

    const inDate = new Date(`${todayStr} ${fixTime(inTime)}`);
    let outDate = outTime ? 
      new Date(`${todayStr} ${fixTime(outTime)}`) : 
      new Date();

    // Handle overnight shifts
    if (outDate < inDate) outDate.setDate(outDate.getDate() + 1);

    totalSeconds += Math.floor((outDate - inDate) / 1000);
  }

  return totalSeconds;
}

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
}

const Punchsection = () => {
  const [addpunch] = useAddpunchMutation();
  const id = useSelector((state) => state.user.id);
  const [punchs, setPunchs] = useState([]);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const navigate = useNavigate();
  const { data: user, isLoading, isError, refetch } = useVerifyTokenQuery();
  const errorTimeoutRef = useRef(null);

  // Memoized calculation
  const calculateTime = useCallback(() => {
    return calculateTotalTime(punchs);
  }, [punchs]);

  useEffect(() => {
    // Clear any existing timeout
    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);

    if (isError) {
      errorTimeoutRef.current = setTimeout(() => {
        navigate('/login');
      }, 5000);
    }

    return () => {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    };
  }, [isError, navigate]);

  useEffect(() => {
    if (user?.user?.logs) {
      const today = new Date().toLocaleDateString();
      const todayLog = user.user.logs.find(log => log.date === today);
      const punches = todayLog?.punchs || [];
      setPunchs(punches);
      setIsClockedIn(punches.length % 2 !== 0);
    }
  }, [user]);

  useEffect(() => {
    setTotalSeconds(calculateTime());
    
    let interval;
    if (isClockedIn) {
      interval = setInterval(() => {
        setTotalSeconds(prev => prev + 1); // Increment by 1 second
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isClockedIn, calculateTime]);

  const handlePunch = async () => {
    try {
      const hoursWorked = Math.floor(totalSeconds / 3600);
      const res = await addpunch({ id, currentHours: hoursWorked }).unwrap();
      
      if (res?.log?.punchs) {
        setPunchs(res.log.punchs);
        setIsClockedIn(res.log.punchs.length % 2 !== 0);
      }
    } catch (err) {
      navigate('/login');
    } finally {
      refetch();
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Redirecting to login...</p>
      </div>
    );
  }

  const EIGHT_HOURS = 8 * 3600;
  const percentage = Math.min(100, (totalSeconds / EIGHT_HOURS) * 100);
  const liveTime = formatTime(totalSeconds);

  return (
    <div className="flex flex-col w-full gap-4 justify-center items-center lg:flex-row lg:flex-nowrap">
      
      {/* Progress Circle Card */}
      <div className="bg-white rounded-lg shadow-2xl w-full p-4 sm:p-6 flex flex-col h-80 sm:h-80 mb-4 lg:mb-0 lg:max-w-xl">
        <div className="flex justify-between items-center text-gray-500">
          <p className="text-lg sm:text-xl font-bold">Today Activity</p>
          <p className="text-sm sm:text-base">{new Date().toLocaleDateString()}</p>
        </div>

        <div className="flex items-center justify-center m-auto relative flex-1">
          <div className="relative h-40 w-40 sm:h-56 sm:w-56 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gray-200"></div>
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(
                  #10B981 0%, 
                  #10B981 ${percentage}%, 
                  #E5E7EB ${percentage}%, 
                  #E5E7EB 100%
                )`
              }}
            ></div>
            <div className="absolute top-3 left-3 right-3 bottom-3 sm:top-4 sm:left-4 sm:right-4 sm:bottom-4 bg-white rounded-full flex flex-col justify-center items-center text-xl sm:text-2xl font-bold z-10">
              <span className="text-2xl sm:text-3xl">{liveTime}</span>
              <span className="text-xs sm:text-sm text-gray-500 mt-2">
                {isClockedIn ? 'Currently Clocked In' : 'Clocked Out'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Punch Updates Card */}
      <div className="bg-white rounded-lg shadow-2xl w-full p-4 sm:p-6 flex flex-col h-80 sm:h-80 lg:max-w-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
          <p className="text-xl sm:text-2xl font-bold text-gray-700">Today's Updates</p>
          <Switch onClick={handlePunch} isActive={isClockedIn} />
        </div>

        <div 
          data-lenis-prevent 
          className="flex flex-col overflow-y-auto scrollbar-hide gap-2 mt-4 w-full flex-1"
        >
          <SmoothScroll />
          
          {punchs.length === 0 ? (
            <div className="text-center text-gray-400 my-auto">No punches yet today.</div>
          ) : (
            punchs.map((punch, index) => (
              <div
                key={`${punch}-${index}`}
                className="flex justify-between bg-blue-100 px-3 sm:px-5 py-3 sm:py-5 rounded-sm items-center"
              >
                <p className="font-semibold text-gray-700 text-sm sm:text-base">
                  {index % 2 === 0 ? 'Punch In' : 'Punch Out'}
                </p>
                <p className={`${index % 2 === 0 ? 'bg-green-500' : 'bg-red-500'} px-2 py-2 rounded-sm text-white text-xs sm:text-base`}>
                  {fixTime(punch)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Punchsection;