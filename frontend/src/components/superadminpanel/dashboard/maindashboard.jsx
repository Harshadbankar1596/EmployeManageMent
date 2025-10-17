import React from 'react';
import { useSuperadminveryfyQuery } from '../../../redux/superadminslice';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaUserCheck, 
  FaUserTimes, 
  FaChartLine, 
  FaCalendarAlt,
  FaClock,
  FaBuilding
} from 'react-icons/fa';
import { MdDashboard, MdTrendingUp } from 'react-icons/md';
import Loader from '../../loader';

const Maindashboard = () => {
  const { data: info, isLoading } = useSuperadminveryfyQuery();

  const statsCards = [
    {
      title: 'Total Employees',
      value: info?.totalemployee || 0,
      icon: FaUsers,
      color: 'blue',
      description: 'Registered team members',
      bgGradient: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Present Today',
      value: info?.presentemployee || 0,
      icon: FaUserCheck,
      color: 'green',
      description: 'Currently at work',
      bgGradient: 'from-green-500 to-green-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Absent Today',
      value: (info?.totalemployee || 0) - (info?.presentemployee || 0),
      icon: FaUserTimes,
      color: 'red',
      description: 'On leave or absent',
      bgGradient: 'from-red-500 to-red-600',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      title: 'Attendance Rate',
      value: info?.totalemployee ? Math.round((info.presentemployee / info.totalemployee) * 100) : 0,
      icon: MdTrendingUp,
      color: 'purple',
      description: 'Today\'s attendance percentage',
      bgGradient: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      suffix: '%'
    }
  ];

  return (
    <div className=" p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <MdDashboard className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Super Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitor your organization's performance at a glance</p>
            </div>
          </div>
        </div>

      {isLoading ? (
         
          <Loader/>
      ) : info ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsCards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                  >
                    {/* Background gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${card.bgGradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    <div className="relative p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl ${card.iconBg}`}>
                          <IconComponent className={`text-2xl ${card.iconColor}`} />
                        </div>
                        <div className={`w-3 h-3 rounded-full bg-${card.color}-500`}></div>
                      </div>
                      
                      <div className="mb-2">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-gray-800">
                            {card.value}
                          </span>
                          {card.suffix && (
                            <span className="text-lg font-semibold text-gray-600">{card.suffix}</span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-1">{card.title}</h3>
                        <p className="text-sm text-gray-500">{card.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                    <FaBuilding className="text-white text-lg" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Quick Actions</h3>
                </div>
                <div className="space-y-3">
                  <Link
                  to={"/superadmin/employees"}
                   className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <FaUsers className="text-gray-600" />
                    <span className="text-gray-700 font-medium">Manage Employees</span>
                  </Link>
                  <Link 
                  to={"/superadmin/reports"}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <FaCalendarAlt className="text-gray-600" />
                    <span className="text-gray-700 font-medium">View Daily Reports</span>
                  </Link>
                  {/* <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <FaChartLine className="text-gray-600" />
                    <span className="text-gray-700 font-medium">Analytics Dashboard</span>
                  </div> */}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                    <FaClock className="text-white text-lg" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Today's Summary</h3>
          </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Present Employees</span>
                    <span className="text-green-600 font-bold text-lg">{info.presentemployee}</span>
          </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Absent Employees</span>
                    <span className="text-red-600 font-bold text-lg">
              {info.totalemployee - info.presentemployee}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Attendance Rate</span>
                    <span className="text-blue-600 font-bold text-lg">
                      {info.totalemployee ? Math.round((info.presentemployee / info.totalemployee) * 100) : 0}%
                    </span>
                  </div>
            </div>
          </div>
        </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="p-4 bg-red-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FaUserTimes className="text-red-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Data Available</h3>
              <p className="text-gray-600">Unable to load dashboard information at this time.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maindashboard;
