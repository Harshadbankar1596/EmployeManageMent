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

import { useState, useEffect, useCallback } from 'react';
import Switch from './togle';
import { useAddpunchMutation, useVerifyTokenQuery } from '../../redux/apislice';
import { useSelector } from 'react-redux';

function parseTime(timeStr) {
  if (!timeStr) return null;
  
  // Handle both 12-hour and 24-hour formats
  let time = timeStr.trim().toUpperCase();
  let isPM = time.includes('PM');
  let isAM = time.includes('AM');
  
  // Remove AM/PM indicator
  time = time.replace(/(AM|PM)/gi, '').trim();
  
  const parts = time.split(':').map(part => parseInt(part) || 0);
  
  let hours = parts[0] || 0;
  const minutes = parts[1] || 0;
  const seconds = parts[2] || 0;
  
  // Convert to 24-hour format if needed
  if (isPM && hours < 12) hours += 12;
  if (isAM && hours === 12) hours = 0;
  
  return { hours, minutes, seconds };
}

function formatTimeForDisplay(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  
  return `${hours.toString().padStart(2, '0')} : ${minutes
    .toString()
    .padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
}

// Cross-platform date creation function (PC + Mobile compatible)
function createDateFromTime(hours, minutes, seconds) {
  try {
    const now = new Date();
    const result = new Date();
    result.setHours(hours, minutes, seconds, 0);
    return result;
  } catch (error) {
    // Fallback for problematic browsers
    const now = Date.now();
    const currentDate = new Date(now);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    return new Date(year, month, day, hours, minutes, seconds);
  }
}

// Cross-platform date string function
function getCurrentDateString() {
  try {
    // Try standard approach first (works on PC)
    return new Date().toLocaleDateString();
  } catch (error) {
    // Fallback for mobile or problematic browsers
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
  }
}

function calculateTotalTime(punchs) {
  let totalSeconds = 0;

  for (let i = 0; i < punchs.length; i += 2) {
    const inTimeStr = punchs[i];
    const outTimeStr = punchs[i + 1] || null;

    if (!inTimeStr) continue;

    const inTime = parseTime(inTimeStr);
    if (!inTime) continue;

    // Create date objects with today's date - cross-platform approach
    const inDate = createDateFromTime(inTime.hours, inTime.minutes, inTime.seconds);

    let outDate;
    if (outTimeStr) {
      const outTime = parseTime(outTimeStr);
      if (outTime) {
        outDate = createDateFromTime(outTime.hours, outTime.minutes, outTime.seconds);
        
        // If out time is earlier than in time, assume it's the next day
        if (outDate < inDate) {
          outDate.setDate(outDate.getDate() + 1);
        }
      } else {
        outDate = new Date(); // Current time if parsing failed
      }
    } else {
      outDate = new Date(); // Current time if no out time
    }

    totalSeconds += (outDate - inDate) / 1000;
  }

  return totalSeconds;
}

const Punchsection = () => {
  const [addpunch, { isLoading: punchveryfy }] = useAddpunchMutation();
  const id = useSelector((state) => state.user.id);
  const [punchs, setPunchs] = useState([]);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isClockedIn, setIsClockedIn] = useState(false);

  const { data: user, isLoading: veryfy, refetch } = useVerifyTokenQuery();

  const calculateTime = useCallback(() => {
    return calculateTotalTime(punchs);
  }, [punchs]);

  useEffect(() => {
    if (user?.user?.logs) {
      const today = getCurrentDateString();
      const todayLog = user.user.logs.find((log) => log.date === today) || {};
      
      const punches = todayLog.punchs || [];
      setPunchs(punches);
      setIsClockedIn(punches.length % 2 !== 0);
    }
  }, [user]);

  useEffect(() => {
    refetch();
  }, [refetch]);

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

  const EIGHT_HOURS = 8 * 3600;
  const percentage = Math.min(100, (totalSeconds / EIGHT_HOURS) * 100);
  const liveTime = formatTimeForDisplay(totalSeconds);

  if (veryfy || punchveryfy) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="flex flex-col w-full gap-4 justify-center items-center lg:flex-row lg:flex-nowrap">
      <div className="bg-white rounded-lg shadow-2xl w-full p-4 sm:p-6 flex flex-col h-80 sm:h-80 mb-4 lg:mb-0 lg:max-w-xl">
        <div className="flex justify-between items-center text-gray-500">
          <p className="text-lg sm:text-xl font-bold">Today Activity</p>
          <p className="text-sm sm:text-base">{getCurrentDateString()}</p>
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

      <div className="bg-white rounded-lg shadow-2xl w-full p-4 sm:p-6 flex flex-col h-80 sm:h-80 lg:max-w-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
          <p className="text-xl sm:text-2xl font-bold text-gray-700">Today's Updates</p>
          <Switch onClick={handlePunch} punchs={punchs} />
        </div>

        <div data-lenis-prevent className="flex flex-col overflow-y-auto scrollbar-hide gap-2 mt-4 w-full flex-1">
          {punchs.length === 0 && (
            <div className="text-center text-gray-400">No punches yet today.</div>
          )}
          {punchs.map((punch, index) => (
            <div
              key={index}
              className="flex justify-between bg-blue-100 px-3 sm:px-5 py-3 sm:py-5 rounded-sm items-center"
            >
              <p className="font-semibold text-gray-700 text-sm sm:text-base">
                {index % 2 === 0 ? 'Punch In' : 'Punch Out'}
              </p>
              <p className={`${index % 2 === 0 ? 'bg-green-500' : 'bg-red-500'} px-2 py-2 rounded-sm text-white text-xs sm:text-base`}>
                {punch}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Punchsection;