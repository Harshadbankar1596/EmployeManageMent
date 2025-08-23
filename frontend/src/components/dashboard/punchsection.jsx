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

import { useState, useEffect } from 'react';
import Switch from './togle';
import { useAddpunchMutation, useVerifyTokenQuery } from '../../redux/apislice';
import { useSelector } from 'react-redux';

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

  const { data: user, isLoading: veryfy, refetch } = useVerifyTokenQuery();

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
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="flex flex-col w-full gap-4 justify-center items-center">
      <div className="bg-white rounded-lg shadow-2xl w-full p-4 sm:p-6 flex flex-col lg:max-w-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
          <div className="flex flex-col items-center sm:items-start">
            <p className="text-xl sm:text-2xl font-bold text-gray-700">Today's Updates</p>
            <p className="text-sm text-gray-500">{displayDate}</p>
          </div>
          <Switch onClick={handlePunch} punchs={punchs} />
        </div>

        <div data-lenis-prevent className="flex flex-col overflow-y-auto scrollbar-hide gap-2 mt-4 w-full max-h-96">
          {punchs.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              <div className="text-lg font-medium">No punches yet today</div>
              <div className="text-sm mt-1">Click the switch above to start your day</div>
            </div>
          )}
          {punchs.map((punch, index) => (
            <div
              key={index}
              className="flex justify-between bg-blue-100 px-3 sm:px-5 py-3 sm:py-5 rounded-lg items-center hover:bg-blue-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${index % 2 === 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-700 text-sm sm:text-base">
                    {index % 2 === 0 ? 'Punch In' : 'Punch Out'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Entry #{index + 1}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`${index % 2 === 0 ? 'bg-green-500' : 'bg-red-500'} px-3 py-2 rounded-lg text-white text-xs sm:text-base font-medium`}>
                  {punch}
                </p>
              </div>
            </div>
          ))}
          
          {/* Current Status Indicator */}
          {punchs.length > 0 && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center">
              <span className={`inline-flex items-center gap-2 text-sm font-medium ${isClockedIn ? 'text-green-600' : 'text-red-600'}`}>
                <div className={`w-2 h-2 rounded-full ${isClockedIn ? 'bg-green-500' : 'bg-red-500'} ${isClockedIn ? 'animate-pulse' : ''}`}></div>
                {isClockedIn ? 'Currently Clocked In' : 'Currently Clocked Out'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Punchsection;
