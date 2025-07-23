// import React, { useState, useEffect } from 'react';
// import Switch from './togle';
// import { useAddpunchMutation, useVerifyTokenQuery } from '../../redux/apislice';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// const Punchsection = () => {
//   const [addpunch, { isLoading }] = useAddpunchMutation();
//   const id = useSelector((state) => state.user.id);
//   const [clicked, setClicked] = useState(true);
//   const [punchs, setPunchs] = useState([]);
//   const navigate = useNavigate();
//   const handlePunch = async () => {
//     setClicked(false);

//     try {
//       const res = await addpunch({ id }).unwrap();
//       console.log("Punch success:", res);
//       setPunchs(res.log.punchs);
//     } catch (err) {
//       navigate('/login');
//       console.log("Punch failed:", err);
//     }
//   };

//   const { data: user } = useVerifyTokenQuery();

//   useEffect(() => {
//     if (user && user.user && Array.isArray(user.user.logs)) {
//       const today = new Date().toLocaleDateString();
//       const todayLog = user.user.logs.find(log => log.date === today);
//       if (todayLog && Array.isArray(todayLog.punchs)) {
//         setPunchs(todayLog.punchs);
//       } else {
//         setPunchs([]);
//       }
//     }
//   }, [user]);



//   // tims manage 

//   function getTotalWorkingTime(punchs) {
//     let totalMs = 0;

//     for (let i = 0; i < punchs.length; i += 2) {
//       const start = new Date("1970-01-01 " + punchs[i]);
//       const end = punchs[i + 1] ? new Date("1970-01-01 " + punchs[i + 1]) : null;

//       if (end) {
//         totalMs += end - start;
//       }
//     }

//     let totalSeconds = Math.floor(totalMs / 1000);
//     let hours = Math.floor(totalSeconds / 3600);
//     let minutes = Math.floor((totalSeconds % 3600) / 60);
//     let seconds = totalSeconds % 60;

//     return `${hours.toString().padStart(2, '0')} : ${minutes
//       .toString()
//       .padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
//   }


//   return (

//     <div className='flex'>
//       <div className='bg-white h-96 rounded-lg shadow-lg w-full max-w-xl mx-auto p-6 flex flex-col'>
//         <div className='flex justify-between items-center text-gray-500'>
//           <p className='text-xl font-bold'>Today Activity</p>
//           <p>{new Date().toLocaleDateString()}</p>
//         </div>
//         <div  className='flex items-center justify-center m-auto'>
//           <div className='bg-green-500 rounded-full flex justify-center items-center h-56 w-56'>
//             <div className='bg-white h-48 w-48 rounded-full flex justify-center items-center text-2xl font-bold'>{getTotalWorkingTime(punchs)}</div>
//           </div>
//         </div>
//       </div>



//       {/* punch section */}
//       <div className="bg-white h-96 rounded-lg shadow-lg w-full max-w-xl mx-auto p-6 flex flex-col">
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-2xl font-bold text-gray-700">Today's Updates</p>
//           <Switch onClick={handlePunch} punchs={punchs} />
//         </div>
//         <div className="flex flex-col overflow-scroll scrollbar-hide gap-2 mt-4 w-full">
//           {punchs.map((punch, index) => (
//             <div
//               key={index}
//               className='flex justify-between bg-blue-100 px-5 py-5 rounded-sm items-center'
//               style={{ boxSizing: 'border-box', wordBreak: 'break-word' }}
//             >
//               <p className="font-semibold text-gray-700 truncate">
//                 {index % 2 === 0 ? 'Punch In' : 'Punch Out'}
//               </p>
//               <p className={`${index % 2 === 0 ? 'bg-green-500' : 'bg-red-500'} px-2 py-2 rounded-sm`}>{punch}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Punchsection;
import React, { useState, useEffect, useCallback } from 'react';
import Switch from './togle';
import { useAddpunchMutation, useVerifyTokenQuery } from '../../redux/apislice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function fixTime(timeStr) {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  return parts.map(part => part.padStart(2, '0')).join(':');
}

function calculateTotalTime(punchs) {
  let totalSeconds = 0;
  const now = new Date();

  for (let i = 0; i < punchs.length; i += 2) {
    const inTime = punchs[i];
    const outTime = punchs[i + 1] || null;

    if (!inTime) continue;

    const inDate = new Date(`${now.toDateString()} ${fixTime(inTime)}`);
    const outDate = outTime
      ? new Date(`${now.toDateString()} ${fixTime(outTime)}`)
      : new Date();

    if (outDate < inDate) {
      outDate.setDate(outDate.getDate() + 1);
    }

    totalSeconds += (outDate - inDate) / 1000;
  }

  return totalSeconds;
}

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${hours.toString().padStart(2, '0')} : ${minutes
    .toString()
    .padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
}

const Punchsection = () => {
  const [addpunch] = useAddpunchMutation();
  const id = useSelector((state) => state.user.id);
  const [punchs, setPunchs] = useState([]);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const navigate = useNavigate();

  const { data: user, isLoading, isError , refetch} = useVerifyTokenQuery();

  const calculateTime = useCallback(() => {
    return calculateTotalTime(punchs);
  }, [punchs]);

  useEffect(() => {
    if (user?.user?.logs) {
      const today = new Date().toLocaleDateString();
      const todayLog = user.user.logs.find((log) => log.date === today);
      const punches = todayLog?.punchs || [];
      setPunchs(punches);
      setIsClockedIn(punches.length % 2 !== 0);
    }
    if (isLoading) {
      console.log("loading in veryfy user ", isLoading);
    }
    else {
      setTimeout(() => {
        if (isError) navigate('/login');
      }, 5000)
    }
    refetch();
  }, [user, refetch]);

  useEffect(() => {
    setTotalSeconds(calculateTime());
    let interval;
    if (isClockedIn) {
      interval = setInterval(() => {
        setTotalSeconds(calculateTime());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isClockedIn, calculateTime , refetch , user]);

  const handlePunch = async () => {
    try {
      const res = await addpunch({ id }).unwrap();
      if (res?.log?.punchs) {
        const newPunchs = res.log.punchs;
        setPunchs(newPunchs);
        setIsClockedIn(newPunchs.length % 2 !== 0);
      }
    } catch (err) {
      navigate('/login');
    }
    finally{
      refetch();
    }
  };

  const EIGHT_HOURS = 8 * 3600;
  const percentage = Math.min(100, (totalSeconds / EIGHT_HOURS) * 100);
  const liveTime = formatTime(totalSeconds);

  return (
    <div className="flex flex-col w-full gap-4 justify-center items-center lg:flex-row lg:flex-nowrap">
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

      <div className="bg-white rounded-lg shadow-2xl w-full p-4 sm:p-6 flex flex-col h-80 sm:h-80 lg:max-w-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
          <p className="text-xl sm:text-2xl font-bold text-gray-700">Today's Updates</p>
          <Switch onClick={handlePunch} punchs={punchs} />
        </div>

        <div className="flex flex-col overflow-y-auto scrollbar-hide gap-2 mt-4 w-full flex-1">
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
                {fixTime(punch)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Punchsection;
