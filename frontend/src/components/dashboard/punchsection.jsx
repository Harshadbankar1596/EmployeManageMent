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

  const { data: user, isLoading, isError } = useVerifyTokenQuery();

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
        setTimeout(()=>{
         if(isError) navigate('/login');
        },5000)
    }
  }, [user, isLoading]);

  useEffect(() => {
    setTotalSeconds(calculateTime());
    let interval;
    if (isClockedIn) {
      interval = setInterval(() => {
        setTotalSeconds(calculateTime());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isClockedIn, calculateTime]);

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
  };

  const EIGHT_HOURS = 8 * 3600;
  const percentage = Math.min(100, (totalSeconds / EIGHT_HOURS) * 100);
  const liveTime = formatTime(totalSeconds);

  return (
    <div className='flex flex-wrap gap-4 justify-center items-center'>
      <div className='bg-white h-96 rounded-lg shadow-lg w-full max-w-xl p-6 flex flex-col'>
        <div className='flex justify-between items-center text-gray-500'>
          <p className='text-xl font-bold'>Today Activity</p>
          <p>{new Date().toLocaleDateString()}</p>
        </div>

        <div className='flex items-center justify-center m-auto relative'>
          <div className='relative h-56 w-56'>
            <div className='absolute inset-0 rounded-full bg-gray-200'></div>
            <div
              className='absolute inset-0 rounded-full'
              style={{
                background: `conic-gradient(
                  #10B981 0%, 
                  #10B981 ${percentage}%, 
                  #E5E7EB ${percentage}%, 
                  #E5E7EB 100%
                )`
              }}
            ></div>
            <div className='absolute top-4 left-4 right-4 bottom-4 bg-white rounded-full flex flex-col justify-center items-center text-2xl font-bold z-10'>
              <span className="text-3xl">{liveTime}</span>
              <span className="text-sm text-gray-500 mt-2">
                {isClockedIn ? 'Currently Clocked In' : 'Clocked Out'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white h-96 rounded-lg shadow-lg w-full max-w-xl p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-bold text-gray-700">Today's Updates</p>
          <Switch onClick={handlePunch} punchs={punchs} />
        </div>

        <div className="flex flex-col overflow-scroll scrollbar-hide gap-2 mt-4 w-full">
          {punchs.length === 0 && (
            <div className="text-center text-gray-400">No punches yet today.</div>
          )}
          {punchs.map((punch, index) => (
            <div
              key={index}
              className='flex justify-between bg-blue-100 px-5 py-5 rounded-sm items-center'
            >
              <p className="font-semibold text-gray-700">
                {index % 2 === 0 ? 'Punch In' : 'Punch Out'}
              </p>
              <p className={`${index % 2 === 0 ? 'bg-green-500' : 'bg-red-500'} px-2 py-2 rounded-sm text-white`}>
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
