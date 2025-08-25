// import { useEffect, useState } from 'react';
// import { useGetlogsMutation } from '../../redux/apislice';
// import { useSelector } from 'react-redux';
// import { motion, AnimatePresence } from 'framer-motion';

// function CalendarComponent() {
//   const [getlogs] = useGetlogsMutation();
//   const id = useSelector((state) => state.user.id);
//   const [logs, setLogs] = useState([]);
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [view, setView] = useState('month');

//   useEffect(() => {
//     const fetchlogs = async () => {
//       try {
//         setIsLoading(true);
//         const response = await getlogs(id);
//         setLogs(response.data.logs || []);
//       } catch (error) {
//         console.error("Error fetching logs:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchlogs();
//   }, [getlogs, id]);

//   const getStatusForDate = (date) => {
//     const dateStr = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
//     const log = logs.find(log => log.date === dateStr);
//     if (date.getDay() === 0) return 'sunday';
//     return log ? log.status : 'absent';
//   };

//   const getPunchesForDate = (date) => {
//     const dateStr = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
//     const log = logs.find(log => log.date === dateStr);
//     return log ? log.punchs : [];
//   };

//   const goToPreviousMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   };

//   const goToNextMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
//   };

//   const goToToday = () => {
//     setCurrentDate(new Date());
//     setSelectedDate(new Date());
//   };

//   const getDaysInMonth = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const days = [];

//     const prevMonthLastDay = new Date(year, month, 0).getDate();
//     const firstDayIndex = firstDay.getDay();

//     for (let i = firstDayIndex - 1; i >= 0; i--) {
//       const date = new Date(year, month - 1, prevMonthLastDay - i);
//       days.push({ date, isCurrentMonth: false, status: getStatusForDate(date) });
//     }

//     for (let i = 1; i <= lastDay.getDate(); i++) {
//       const date = new Date(year, month, i);
//       days.push({ date, isCurrentMonth: true, status: getStatusForDate(date) });
//     }

//     const daysNeeded = 42 - days.length;
//     for (let i = 1; i <= daysNeeded; i++) {
//       const date = new Date(year, month + 1, i);
//       days.push({ date, isCurrentMonth: false, status: getStatusForDate(date) });
//     }

//     return days;
//   };

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'present': return 'bg-green-500';
//       case 'halfday': return 'bg-yellow-400';
//       case 'pending': return 'bg-orange-500';
//       case 'sunday': return 'bg-blue-300';
//       case 'absent': return 'bg-red-500';
//       default: return 'bg-gray-300';
//     }
//   };

//   const getStatusText = (status) => {
//     switch(status) {
//       case 'present': return 'Present';
//       case 'halfday': return 'Half Day';
//       case 'pending': return 'Pending';
//       case 'sunday': return 'Holiday';
//       case 'absent': return 'Absent';
//       default: return 'No Data';
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="bg-white rounded-2xl shadow-xl p-6 my-5 animate-pulse">
//         <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
//         <div className="h-96 bg-gray-100 rounded-xl"></div>
//       </div>
//     );
//   }

//   const days = getDaysInMonth();
//   const monthName = currentDate.toLocaleString('default', { month: 'long' });
//   const year = currentDate.getFullYear();

//   return (
//     <motion.div 
//       className="bg-white rounded-2xl shadow-xl p-6 my-5"
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.4 }}
//     >
//       <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3 flex items-center">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//         </svg>
//         Attendance Calendar
//       </h2>

//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <button onClick={goToToday} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow hover:scale-105 transition-transform">
//           Today
//         </button>

//         <div className="flex items-center space-x-4">
//           <button onClick={goToPreviousMonth} className="p-2 rounded-full hover:bg-gray-100 transition">
//             ◀
//           </button>
//           <h3 className="text-xl font-bold text-gray-800">{monthName} {year}</h3>
//           <button onClick={goToNextMonth} className="p-2 rounded-full hover:bg-gray-100 transition">
//             ▶
//           </button>
//         </div>

//         <div className="flex space-x-2">
//           <button onClick={() => setView('month')} className={`px-4 py-2 rounded-lg ${view === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}>Month</button>
//           <button onClick={() => setView('week')} className={`px-4 py-2 rounded-lg ${view === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}>Week</button>
//         </div>
//       </div>

//       {/* Week Days */}
//       <div className="grid grid-cols-7 gap-2 mb-4 text-center font-medium text-gray-500">
//         {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day => <div key={day}>{day}</div>)}
//       </div>

//       {/* Calendar Grid */}
//       <div className="grid grid-cols-7 gap-2">
//         {days.map((day, index) => {
//           const isToday = day.date.toDateString() === new Date().toDateString();
//           const isSelected = selectedDate && day.date.toDateString() === selectedDate.toDateString();
//           const punches = getPunchesForDate(day.date);

//           return (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className={`relative p-2 h-24 border rounded-xl cursor-pointer transition-all 
//                 ${isSelected ? 'ring-2 ring-blue-500' : ''}
//                 ${isToday ? 'bg-blue-50' : 'bg-white'}
//                 ${day.isCurrentMonth ? '' : 'opacity-40'}`}
//               onClick={() => setSelectedDate(day.date)}
//             >
//               <div className="flex justify-between items-start">
//                 <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
//                   {day.date.getDate()}
//                 </span>
//                 {punches.length > 0 && (
//                   <span className="text-xs bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full shadow-sm">
//                     {punches.length/2}
//                   </span>
//                 )}
//               </div>

//               <div className="mt-2">
//                 <div className={`px-2 py-1 text-xs rounded-full text-white w-fit ${getStatusColor(day.status)}`}>
//                   {getStatusText(day.status)}
//                 </div>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* Selected Date Details */}
//       <AnimatePresence>
//         {selectedDate && (
//           <motion.div
//             key="details"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             transition={{ duration: 0.4 }}
//             className="mt-6 p-4 bg-gray-50 rounded-xl shadow-inner"
//           >
//             <h3 className="text-lg font-semibold mb-2">
//               {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
//             </h3>

//             <div className="flex items-center mb-4">
//               <div className={`w-4 h-4 rounded-full mr-2 ${getStatusColor(getStatusForDate(selectedDate))}`}></div>
//               <span className="font-medium">{getStatusText(getStatusForDate(selectedDate))}</span>
//             </div>

//             {getPunchesForDate(selectedDate).length > 0 ? (
//               <div>
//                 <h4 className="font-medium mb-2">Punch Records:</h4>
//                 <div className="grid grid-cols-2 gap-2">
//                   {getPunchesForDate(selectedDate).map((punch, index) => (
//                     <div key={index} className={`p-2 rounded ${index % 2 === 0 ? 'bg-blue-100' : 'bg-green-100'}`}>
//                       {index % 2 === 0 ? 'In' : 'Out'}: {punch}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <p className="text-gray-500">No punch records for this day.</p>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Legend */}
//       <div className="flex flex-wrap gap-4 mt-8 justify-center p-4 bg-slate-50 rounded-xl shadow-inner">
//         {[['bg-green-500','Present'],['bg-yellow-400','Half Day'],['bg-orange-500','Pending'],['bg-red-500','Absent'],['bg-blue-300','Sunday/Holiday']]
//           .map(([color,label]) => (
//             <div key={label} className="flex items-center">
//               <div className={`w-4 h-4 ${color} rounded mr-2`}></div>
//               <span className="text-sm font-medium">{label}</span>
//             </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }

// export default CalendarComponent;


import { useEffect, useState } from 'react';
import { useGetlogsMutation } from '../../redux/apislice';
import { useSelector } from 'react-redux';
import Loader from '../loader';

function CalendarComponent() {
  const [getlogs] = useGetlogsMutation();
  const id = useSelector((state) => state.user.id);
  const [logs, setLogs] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState('month');
  const [calendarAnimation, setCalendarAnimation] = useState(false);
  const [statsAnimation, setStatsAnimation] = useState(false);

  useEffect(() => {
    const fetchlogs = async () => {
      try {
        setIsLoading(true);
        const response = await getlogs(id);
        setLogs(response.data?.logs || []);
        setTimeout(() => setStatsAnimation(true), 500);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchlogs();
    }
  }, [getlogs, id]);

  const getStatusForDate = (date) => {
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    const log = logs.find(log => log.date === dateStr);

    if (log) {
      return log.status;
    }

    if (date.getDay() === 0) {
      return 'sunday';
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);

    if (compareDate > today) {
      return 'future';
    }
    return 'absent';
  };

  const getPunchesForDate = (date) => {
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    const log = logs.find(log => log.date === dateStr);
    return log ? (log.punchs || []) : [];
  };

  const getWorkingHours = (punches) => {
    if (!punches || punches.length < 2) return '0h 0m';

    let totalMinutes = 0;
    for (let i = 0; i < punches.length; i += 2) {
      if (punches[i] && punches[i + 1]) {
        const inTime = new Date(`1970-01-01 ${punches[i]}`);
        const outTime = new Date(`1970-01-01 ${punches[i + 1]}`);
        if (!isNaN(inTime) && !isNaN(outTime)) {
          totalMinutes += (outTime - inTime) / (1000 * 60);
        }
      }
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    return `${hours}h ${minutes}m`;
  };

  const goToPreviousMonth = () => {
    setCalendarAnimation(true);
    setTimeout(() => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
      setCalendarAnimation(false);
    }, 150);
  };

  const goToNextMonth = () => {
    setCalendarAnimation(true);
    setTimeout(() => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
      setCalendarAnimation(false);
    }, 150);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
    console.log(selectedDate)
    setCalendarAnimation(true);
    setTimeout(() => setCalendarAnimation(false), 300);
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];

    const firstDayIndex = firstDay.getDay();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, new Date(year, month, 0).getDate() - i);
      days.push({
        date,
        isCurrentMonth: false,
        status: getStatusForDate(date)
      });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        status: getStatusForDate(date)
      });
    }

    const totalCells = Math.ceil((days.length) / 7) * 7;
    for (let i = 1; days.length < totalCells; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        status: getStatusForDate(date)
      });
    }

    return days;
  };

  const getStatusStyling = (status, isCurrentMonth = true) => {
    switch (status) {
      case 'present':
        return {
          bg: 'bg-gradient-to-br from-green-100 to-emerald-200',
          indicator: 'bg-gradient-to-r from-green-400 to-emerald-500',
          text: 'text-green-800',
          ring: 'ring-green-200',
          hover: 'hover:from-green-200 hover:to-emerald-300',
          glow: 'shadow-green-200/50'
        };
      case 'halfday':
        return {
          bg: 'bg-gradient-to-br from-yellow-100 to-orange-200',
          indicator: 'bg-gradient-to-r from-yellow-400 to-orange-500',
          text: 'text-yellow-800',
          ring: 'ring-yellow-200',
          hover: 'hover:from-yellow-200 hover:to-orange-300',
          glow: 'shadow-yellow-200/50'
        };
      case 'pending':
        return {
          bg: 'bg-gradient-to-br from-orange-100 to-red-200',
          indicator: 'bg-gradient-to-r from-orange-400 to-red-500',
          text: 'text-orange-800',
          ring: 'ring-orange-200',
          hover: 'hover:from-orange-200 hover:to-red-300',
          glow: 'shadow-orange-200/50'
        };
      case 'sunday':
        return {
          bg: 'bg-gradient-to-br from-blue-100 to-sky-200',
          indicator: 'bg-gradient-to-r from-blue-400 to-sky-500',
          text: 'text-blue-800',
          ring: 'ring-blue-200',
          hover: 'hover:from-blue-200 hover:to-sky-300',
          glow: 'shadow-blue-200/50'
        };
      case 'absent':
        return {
          bg: 'bg-gradient-to-br from-red-100 to-rose-200',
          indicator: 'bg-gradient-to-r from-red-400 to-rose-500',
          text: 'text-red-800',
          ring: 'ring-red-200',
          hover: 'hover:from-red-200 hover:to-rose-300',
          glow: 'shadow-red-200/50'
        };
      case 'future':
        return {
          bg: 'bg-gradient-to-br from-gray-50 to-gray-100',
          indicator: 'bg-gradient-to-r from-gray-300 to-gray-400',
          text: 'text-gray-500',
          ring: 'ring-gray-200',
          hover: 'hover:from-gray-100 hover:to-gray-200',
          glow: 'shadow-gray-200/50'
        };
      default:
        return {
          bg: 'bg-white',
          indicator: 'bg-gray-300',
          text: 'text-gray-600',
          ring: 'ring-gray-200',
          hover: 'hover:bg-gray-50',
          glow: 'shadow-gray-200/50'
        };
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch (status) {
      case 'present': return 'Present';
      case 'halfday': return 'Half Day';
      case 'pending': return 'Pending';
      case 'sunday': return 'Holiday';
      case 'absent': return 'Absent';
      case 'future': return 'Future';
      default: return 'No Data';
    }
  };

  // Calculate monthly stats
  const getMonthlyStats = () => {
    const currentMonthDays = getDaysInMonth().filter(day => day.isCurrentMonth);
    const stats = {
      present: 0,
      absent: 0,
      halfday: 0,
      pending: 0,
      totalWorkingDays: 0
    };

    currentMonthDays.forEach(day => {
      if (day.status !== 'sunday' && day.status !== 'future') {
        stats.totalWorkingDays++;
        if (stats[day.status] !== undefined) {
          stats[day.status]++;
        }
      }
    });

    return stats;
  };

  if (isLoading) {
    return (
      <Loader />
    );
  }

  const days = getDaysInMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const monthlyStats = getMonthlyStats();

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-3xl shadow-2xl p-2 sm:p-4 md:p-8 my-4 sm:my-8 border border-white/20 backdrop-blur-sm animate-slideIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4 md:gap-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Attendance Calendar
            </h1>
            <p className="text-gray-600 mt-1 text-xs sm:text-sm">Track your daily presence and work patterns</p>
          </div>
        </div>

        {/* Monthly Stats */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 transition-all duration-1000 ${statsAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {[
            { label: 'Present', value: monthlyStats.present, color: 'from-green-400 to-emerald-500', icon: '✓' },
            { label: 'Absent', value: monthlyStats.absent, color: 'from-red-400 to-rose-500', icon: '✗' },
            { label: 'Half Day', value: monthlyStats.halfday, color: 'from-yellow-400 to-orange-500', icon: '⚡' },
            { label: 'Pending', value: monthlyStats.pending, color: 'from-orange-400 to-red-500', icon: '⏳' }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 sm:p-4 shadow-lg border border-white/40 transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <span className="text-xl sm:text-2xl">{stat.icon}</span>
                <div className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 sm:p-6 shadow-lg border border-white/40 mb-4 sm:mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          {/* Month/Year Display */}
          <div className=" flex items-center gap-3 sm:gap-6">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-800">{monthName} {year}</h2>
            <div className="flex gap-1 sm:gap-2 flex-wrap">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => {
                const isCurrentMonth = index === currentDate.getMonth();
                return (
                  <button
                    key={month}
                    onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setMonth(index);
                      setCurrentDate(newDate);
                    }}
                    className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg text-xs font-medium transition-all duration-300 ${isCurrentMonth
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-110'
                      : 'text-gray-600 hover:bg-gray-100 hover:scale-105'
                      }`}
                  >
                    {month}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={goToToday}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium text-xs sm:text-base"
            >
              Today
            </button>

            <div className="flex gap-1 sm:gap-2">
              <button
                onClick={goToPreviousMonth}
                className="p-2 sm:p-3 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-gray-600 hover:text-gray-800"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goToNextMonth}
                className="p-2 sm:p-3 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-gray-600 hover:text-gray-800"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>


          </div>
        </div>
      </div>

      <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-2 sm:p-6 shadow-lg border border-white/40 transition-all duration-300 ${calendarAnimation ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}>
        <div className="grid grid-cols-7 gap-1 sm:gap-3 mb-3 sm:mb-6">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div
              key={day}
              className={`p-2 sm:p-4 text-center font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl ${index === 0
                ? 'bg-gradient-to-br from-blue-100 to-sky-200 text-blue-700'
                : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700'
                }`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-3">
          {days.map((day, index) => {
            const isToday = day.date.toDateString() === new Date().toDateString();
            const isSelected = selectedDate && day.date.toDateString() === selectedDate.toDateString();
            const punches = getPunchesForDate(day.date);
            const styling = getStatusStyling(day.status, day.isCurrentMonth);

            return (
              <div
                key={index}
                onClick={() => setSelectedDate(day.date)}
                className={`
                  relative p-2 sm:p-4 h-20 sm:h-28 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 group
                  ${styling.bg} ${styling.hover} ${styling.text}
                  ${!day.isCurrentMonth ? 'opacity-50' : 'opacity-100'}
                  ${isToday ? 'ring-2 ring-blue-500 ring-offset-2 shadow-lg' : ''}
                  ${isSelected ? 'ring-2 ring-purple-500 ring-offset-2 shadow-lg' : ''}
                  hover:shadow-lg ${styling.glow}
                  animate-fadeInUp
                `}
                style={{
                  animationDelay: `${index * 20}ms`,
                  animationFillMode: 'both'
                }}
              >
                <div className="flex justify-between items-start mb-1 sm:mb-2">
                  <span className={`text-base sm:text-lg font-bold ${isToday ? 'text-blue-600' : ''}`}>
                    {day.date.getDate()}
                  </span>

                  {punches.length > 0 && (
                    <div className="bg-white/80 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold text-purple-600 shadow-sm">
                      {Math.ceil(punches.length / 2)}
                    </div>
                  )}
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <div className={`h-1.5 sm:h-2 w-full rounded-full ${styling.indicator} shadow-sm`}></div>
                  <p className="text-[10px] sm:text-xs font-medium truncate">{getStatusText(day.status)}</p>
                </div>


                {isToday && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full animate-ping"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 rounded-full"></div>
                  </div>
                )}

                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="mt-4 sm:mt-6 bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-6 shadow-lg border border-white/40 animate-slideInLeft">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
            <div>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </h3>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${getStatusStyling(getStatusForDate(selectedDate)).indicator}`}></div>
                <span className="font-semibold text-base sm:text-lg">{getStatusText(getStatusForDate(selectedDate))}</span>
                {getPunchesForDate(selectedDate).length > 0 && (
                  <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                    {getWorkingHours(getPunchesForDate(selectedDate))}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => setSelectedDate(null)}
              className="p-2 sm:p-3 hover:bg-gray-100 rounded-xl transition-colors duration-200 group"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {getPunchesForDate(selectedDate).length > 0 ? (
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 flex items-center gap-1 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Punch Records
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {getPunchesForDate(selectedDate).map((punch, index) => (
                  <div
                    key={index}
                    className={`p-2 sm:p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${index % 2 === 0
                      ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 text-green-800'
                      : 'bg-gradient-to-br from-red-50 to-rose-100 border-red-200 text-red-800'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${index % 2 === 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="font-semibold text-xs sm:text-base">
                          {index % 2 === 0 ? 'Punch In' : 'Punch Out'}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-base sm:text-lg">{punch}</div>
                        <div className="text-[10px] sm:text-xs opacity-75">Session #{Math.floor(index / 2) + 1}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-7 h-7 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-600 mb-1 sm:mb-2">No Records Found</h4>
              <p className="text-gray-500 text-xs sm:text-base">No punch data available for this date.</p>
            </div>
          )}
        </div>
      )}

      {/* Enhanced Legend */}
      <div className="mt-6 sm:mt-8 bg-white/70 backdrop-blur-sm rounded-2xl p-3 sm:p-6 border border-white/40">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-4 flex items-center gap-1 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          Status Legend
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
          {[
            { label: 'Present', status: 'present', icon: '✓' },
            { label: 'Half Day', status: 'halfday', icon: '⚡' },
            { label: 'Absent', status: 'absent', icon: '✗' },
            { label: 'Pending', status: 'pending', icon: '⏳' },
            { label: 'Holiday', status: 'sunday', icon: '🏖️' },
            { label: 'Future', status: 'future', icon: '🕒' }
          ].map((item) => (
            <div key={item.status} className="flex items-center gap-1 sm:gap-2">
              <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${getStatusStyling(item.status).indicator}`}></div>
              <span className="text-xs sm:text-sm font-medium">{item.icon} {item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CalendarComponent;