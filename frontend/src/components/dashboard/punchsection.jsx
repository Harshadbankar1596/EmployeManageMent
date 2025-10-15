import { useState, useEffect, useCallback } from 'react';
import Switch from './togle';
import { useAddpunchMutation, useVerifyTokenQuery } from '../../redux/apislice';
import { useSelector } from 'react-redux';
import Loader from '../loader';
import { FcOk, FcCancel } from "react-icons/fc";

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

function getTodayDateString() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const year = today.getFullYear();

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
      const todayLog = user.user.logs.find((log) => log?.date === todayDate);

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

  function getLatLong() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            resolve({ lat, lon });
          },
          (error) => {
            reject(error.message);
          }
        );
      } else {
        reject("Geolocation not supported by this browser");
      }
    });
  }


  const handlePunch = async () => {
    try {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 300);

      const coords = await getLatLong();
      console.log("Latitude:", coords.lat, "Longitude:", coords.lon);

      const res = await addpunch({ id, lat: coords.lat, long: coords.lon }).unwrap();

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
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full p-6 sm:p-8 flex flex-col h-96 mb-4 lg:mb-0 lg:max-w-xl border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex justify-between items-center text-gray-600 mb-4">
          <p className="text-xl sm:text-2xl font-bold bg-blue-900 bg-clip-text text-transparent">Today's Activity</p>
          <p className="text-sm sm:text-base bg-gray-100 py-1 px-3 rounded-full">{displayDate}</p>
        </div>

        <div className="flex items-center justify-center m-auto relative flex-1">
          <div className="relative h-48 w-48 sm:h-64 sm:w-64 mx-auto">

            <div className="absolute -inset-2 rounded-full bg-gray-300 "></div>


            <div
              className="absolute inset-1 rounded-full transition-all duration-1000 ease-out"
              style={{
                background: `conic-gradient(
                  #1E3A8A 0%, 
                  #1E3A8A ${percentage}%, 
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

      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full p-6 sm:p-8 flex flex-col h-96 lg:max-w-xl border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex flex-col items-center sm:items-start">
            <p className="text-xl sm:text-2xl font-bold bg-blue-900 bg-clip-text text-transparent">Today's Updates</p>
            <p className="text-sm text-gray-500 mt-1 bg-gray-100 py-1 px-3 rounded-full">Total entries: {punchs.length}</p>
          </div>
          {/* <div className={isPulsing ? 'animate-pulse' : ''}>
            <Switch onClick={handlePunch} punchs={punchs} />
          </div> */}
          <div className={isPulsing ? 'animate-pulse' : ''}>
            {punchveryfy ? (
              <Loader />
            ) : (
              <Switch onClick={handlePunch} punchs={punchs} />
            )}
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