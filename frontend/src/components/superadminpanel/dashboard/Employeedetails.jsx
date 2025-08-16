import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetemployeedetailMutation } from '../../../redux/superadminslice';
import Loader from '../../loader';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const statusColors = {
  present: 'bg-green-500',
  pending: 'bg-yellow-500',
  halfday: 'bg-red-500',
  absent: 'bg-gray-200'
};

const statusLabels = {
  present: 'Present',
  pending: 'Pending Approval',
  halfday: 'Half Day',
  absent: 'Absent/Not Recorded'
};

const Employeedetails = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();
  const [getEmployee, { isLoading }] = useGetemployeedetailMutation();
  const [calendar, setCalendar] = useState([]);
  const [monthYear, setMonthYear] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Calendar generation is now dynamic
  useEffect(() => {
    if (employee && employee.logs) {
      generateCalendar(currentYear, currentMonth);
    }
  }, [employee, currentMonth, currentYear]);

  const generateCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay(); // Sunday = 0

    // Create status map from logs (date string: status)
    const statusMap = {};
    employee.logs.forEach(log => {
      const logDate = new Date(log.date);
      if (
        logDate.getFullYear() === year &&
        logDate.getMonth() === month
      ) {
        statusMap[logDate.getDate()] = log.status;
      }
    });

    setMonthYear(firstDay.toLocaleString('default', { month: 'long', year: 'numeric' }));

    const calendarDays = [];

    // Previous month padding
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = 0; i < startDay; i++) {
      calendarDays.push({
        date: prevMonthDays - startDay + i + 1,
        currentMonth: false,
        status: 'absent'
      });
    }

    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDate() === i;
      calendarDays.push({
        date: i,
        currentMonth: true,
        status: statusMap[i] || 'absent',
        isToday
      });
    }

    // Next month padding
    const totalCells = Math.ceil((calendarDays.length) / 7) * 7;
    const remaining = totalCells - calendarDays.length;
    for (let i = 1; i <= remaining; i++) {
      calendarDays.push({
        date: i,
        currentMonth: false,
        status: 'absent'
      });
    }

    // Split into weeks
    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }

    setCalendar(weeks);
  };

  // Fetch employee data
  useEffect(() => {
    getEmployee(id).unwrap().then((data) => {
      setEmployee(data.employee);
    });
    // eslint-disable-next-line
  }, [id]);

  // Month navigation handlers
  const handlePrevMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 0) {
        setCurrentYear(y => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 11) {
        setCurrentYear(y => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  console.log(employee)
  const bufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const chunkSize = 0x8000; // memory safe chunks
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, chunk);
    }
    return window.btoa(binary);
  };

  // Animated Employee Header
  const AnimatedHeader = ({ employee }) => (
    <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-lg p-4 sm:p-6 mb-6 overflow-hidden animate__animated animate__fadeInDown">
      <div className="absolute -top-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-pink-400 opacity-20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-blue-400 opacity-20 rounded-full blur-2xl animate-pulse"></div>
      <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0 z-10 relative">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 animate__animated animate__zoomIn flex items-center justify-center">
            {employee.image && employee.image.data ? (
              <img
              src={`data:${employee.image.contentType};base64,${bufferToBase64(employee.image.data.data)}`}
              alt={employee.name}
              className="w-full h-full object-cover"
            />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl text-gray-400 font-bold bg-gray-200">
                {employee.name ? employee.name.charAt(0).toUpperCase() : "?"}
              </div>
            )}
          </div>
          <span className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 border-2 border-white rounded-full animate-ping"></span>
        </div>
        <div className="flex-1 w-full">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-lg animate__animated animate__fadeInLeft text-center sm:text-left">
            {employee.name}
          </h1>
          <p className="text-base sm:text-lg font-semibold text-blue-100 mt-1 animate__animated animate__fadeInLeft text-center sm:text-left">
            {employee.role}
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 justify-center sm:justify-start">
            <span className="flex items-center text-white bg-blue-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow animate__animated animate__fadeInLeft">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 12a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0V8a4 4 0 00-8 0v4m8 0v4a4 4 0 01-8 0v-4"></path></svg>
              {employee.email}
            </span>
            <span className="flex items-center text-white bg-purple-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow animate__animated animate__fadeInLeft">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm12-12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
              {employee.phone}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-2 sm:p-4 min-h-screen">
      {isLoading && <Loader />}

      {employee && (
        <div className="max-w-4xl mx-auto">
          {/* Animated Employee Header */}
          <AnimatedHeader employee={employee} />

          {/* Calendar Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 animate__animated animate__fadeInUp">
            {/* Calendar Header */}
            <div className="bg-blue-900 py-3 sm:py-4 px-2 sm:px-6 flex items-center justify-between">
              <button
                onClick={handlePrevMonth}
                className="text-white hover:bg-blue-800 rounded-full p-2 transition-all duration-200"
                aria-label="Previous Month"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
              </button>
              <h2 className="text-lg sm:text-xl font-bold text-white text-center">
                {monthYear}
              </h2>
              <button
                onClick={handleNextMonth}
                className="text-white hover:bg-blue-800 rounded-full p-2 transition-all duration-200"
                aria-label="Next Month"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            {/* Week Days Header */}
            <div className="grid grid-cols-7 bg-gray-100 border-b">
              {weekDays.map(day => (
                <div
                  key={day}
                  className="py-2 sm:py-3 text-center font-medium text-gray-700 text-xs sm:text-base"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="divide-y">
              {calendar.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7">
                  {week.map((day, dayIndex) => {
                    const statusColor = statusColors[day.status] || 'bg-gray-200';
                    const textColor = day.currentMonth ? 'text-gray-800' : 'text-gray-400';
                    const todayBorder = day.isToday ? 'ring-2 ring-blue-900 animate-pulse' : '';

                    return (
                      <div
                        key={dayIndex}
                        className={`h-14 sm:h-20 p-1 border-r ${dayIndex === 6 ? 'border-r-0' : ''}`}
                      >
                        <div className="h-full flex flex-col">
                          <span className={`text-xs sm:text-sm font-medium ${textColor} self-end px-1 sm:px-2`}>
                            {day.date}
                          </span>
                          <div className="flex-1 flex items-center justify-center">
                            {day.currentMonth && day.status !== 'absent' && (
                              <div className={`${statusColor} ${todayBorder} rounded-full w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center text-white font-medium transition-all duration-200 text-xs sm:text-base`}>
                                {day.status.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 sm:mt-6 bg-white rounded-xl shadow-md p-2 sm:p-4 animate__animated animate__fadeIn">
            <h3 className="font-bold text-gray-800 mb-2 sm:mb-3 text-base sm:text-lg">Status Legend</h3>
            <div className="flex flex-wrap gap-3 sm:space-x-6">
              {Object.entries(statusLabels).map(([status, label]) => (
                <div key={status} className="flex items-center">
                  <div className={`w-4 h-4 rounded-full ${statusColors[status]}`}></div>
                  <span className="ml-2 text-gray-700 text-xs sm:text-base">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employeedetails;