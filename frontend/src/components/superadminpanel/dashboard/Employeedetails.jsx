import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetemployeedetailMutation } from '../../../redux/superadminslice';
import Loader from '../../loader';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaCalendarAlt, 
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaUserTie,
  FaChartBar
} from 'react-icons/fa';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const statusConfig = {
  present: {
    color: 'green',
    bgColor: 'bg-green-500',
    textColor: 'text-green-700',
    icon: FaCheckCircle,
    label: 'Present'
  },
  pending: {
    color: 'yellow',
    bgColor: 'bg-yellow-500',
    textColor: 'text-yellow-700',
    icon: FaHourglassHalf,
    label: 'Pending Approval'
  },
  halfday: {
    color: 'orange',
    bgColor: 'bg-orange-500',
    textColor: 'text-orange-700',
    icon: FaClock,
    label: 'Half Day'
  },
  absent: {
    color: 'gray',
    bgColor: 'bg-gray-300',
    textColor: 'text-gray-600',
    icon: FaTimesCircle,
    label: 'Absent/Not Recorded'
  }
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

  // Calculate statistics
  const calculateStats = () => {
    if (!employee?.logs) return { present: 0, pending: 0, halfday: 0, absent: 0, total: 0 };
    
    const stats = { present: 0, pending: 0, halfday: 0, absent: 0, total: employee.logs.length };
    employee.logs.forEach(log => {
      if (stats.hasOwnProperty(log.status)) {
        stats[log.status]++;
      }
    });
    return stats;
  };

  const stats = calculateStats();

  // Stats Cards Component
  const StatsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Present Days</p>
            <p className="text-2xl font-bold">{stats.present}</p>
          </div>
          <FaCheckCircle className="text-3xl opacity-80" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-100 text-sm font-medium">Pending</p>
            <p className="text-2xl font-bold">{stats.pending}</p>
          </div>
          <FaHourglassHalf className="text-3xl opacity-80" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm font-medium">Half Days</p>
            <p className="text-2xl font-bold">{stats.halfday}</p>
          </div>
          <FaClock className="text-3xl opacity-80" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-100 text-sm font-medium">Absent</p>
            <p className="text-2xl font-bold">{stats.absent}</p>
          </div>
          <FaTimesCircle className="text-3xl opacity-80" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {isLoading && <Loader />}

        {employee && (
          <>
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                  <FaUser className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Employee Details</h1>
                  <p className="text-gray-600 mt-1">View employee information and attendance records</p>
                </div>
              </div>
            </div>

            {/* Employee Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-6">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-blue-200 shadow-lg overflow-hidden bg-gray-100">
                    {employee.image && employee.image.data ? (
                      <img
                        src={`data:${employee.image.contentType};base64,${bufferToBase64(employee.image.data.data)}`}
                        alt={employee.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400 font-bold bg-gray-200">
                        {employee.name ? employee.name.charAt(0).toUpperCase() : "?"}
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 border-2 border-white rounded-full"></div>
                </div>

                {/* Employee Info */}
                <div className="flex-1 text-center lg:text-left">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{employee.name}</h2>
                  <p className="text-lg text-gray-600 mb-4">{employee.role}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg">
                      <FaEnvelope className="text-sm" />
                      <span className="text-sm font-medium">{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-2 rounded-lg">
                      <FaPhone className="text-sm" />
                      <span className="text-sm font-medium">{employee.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <StatsCards />

            {/* Calendar Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                  <FaCalendarAlt className="text-white text-lg" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Attendance Calendar</h2>
              </div>

              {/* Calendar Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={handlePrevMonth}
                    className="text-white hover:bg-blue-600 rounded-full p-2 transition-all duration-200"
                    aria-label="Previous Month"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h3 className="text-lg font-bold text-white">{monthYear}</h3>
                  <button
                    onClick={handleNextMonth}
                    className="text-white hover:bg-blue-600 rounded-full p-2 transition-all duration-200"
                    aria-label="Next Month"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Week Days Header */}
              <div className="grid grid-cols-7 bg-gray-50 rounded-t-lg border">
                {weekDays.map(day => (
                  <div
                    key={day}
                    className="py-3 text-center font-semibold text-gray-700 text-sm"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="border-l border-r border-b rounded-b-lg overflow-hidden">
                {calendar.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-cols-7">
                    {week.map((day, dayIndex) => {
                      const config = statusConfig[day.status] || statusConfig.absent;
                      const textColor = day.currentMonth ? 'text-gray-800' : 'text-gray-400';
                      const todayBorder = day.isToday ? 'ring-2 ring-blue-500' : '';

                      return (
                        <div
                          key={dayIndex}
                          className={`h-16 p-1 border-r ${dayIndex === 6 ? 'border-r-0' : ''} ${day.isToday ? 'bg-blue-50' : ''}`}
                        >
                          <div className="h-full flex flex-col">
                            <span className={`text-xs font-medium ${textColor} self-end px-1`}>
                              {day.date}
                            </span>
                            <div className="flex-1 flex items-center justify-center">
                              {day.currentMonth && day.status !== 'absent' && (
                                <div className={`${config.bgColor} ${todayBorder} rounded-full w-8 h-8 flex items-center justify-center text-white font-medium transition-all duration-200 text-xs`}>
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
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg">
                  <FaChartBar className="text-white text-lg" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Status Legend</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(statusConfig).map(([status, config]) => {
                  const StatusIcon = config.icon;
                  return (
                    <div key={status} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-4 h-4 rounded-full ${config.bgColor}`}></div>
                      <StatusIcon className={`text-lg ${config.textColor}`} />
                      <span className="text-gray-700 text-sm font-medium">{config.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Employeedetails;