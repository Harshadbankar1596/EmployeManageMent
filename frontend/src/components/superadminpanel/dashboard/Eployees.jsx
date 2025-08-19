import React, { useState } from 'react';
import { useGetallemployeesQuery } from '../../../redux/superadminslice';
import Loader from "../../loader.jsx";
import { Link } from "react-router-dom";
import { 
  FaUsers, 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaUserCheck, 
  FaUserTimes,
  FaCalendarAlt,
  FaChartBar,
  FaSort,
  FaSortUp,
  FaSortDown
} from 'react-icons/fa';
import { MdDashboard, MdPerson, MdWork } from 'react-icons/md';

function getImageSrc(image) {
  if (!image || !image.data || !image.contentType) return null;
  let byteArray = Array.isArray(image.data.data) ? image.data.data : image.data;
  if (!Array.isArray(byteArray)) return null;
  const base64String = btoa(
    byteArray.reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
  return `data:${image.contentType};base64,${base64String}`;
}

const StatusBadge = ({ isPresent }) => (
  <div className="relative">
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm shadow-lg border-2 transition-all duration-300 transform hover:scale-105
        ${isPresent
          ? "bg-gradient-to-r from-green-400 to-green-600 text-white border-green-300 shadow-green-200"
          : "bg-gradient-to-r from-red-400 to-red-600 text-white border-red-300 shadow-red-200"
        }`}
    >
      {isPresent ? (
        <>
          <FaUserCheck className="text-sm animate-pulse" />
          Present
        </>
      ) : (
        <>
          <FaUserTimes className="text-sm animate-pulse" />
          Absent
        </>
      )}
    </span>
    <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${isPresent ? 'bg-green-400' : 'bg-red-400'} animate-ping`}></div>
  </div>
);

const SearchFilter = ({ searchTerm, setSearchTerm, filterStatus, setFilterStatus }) => (
  <div className=" rounded-xl shadow-lg p-4 mb-6 border border-gray-100">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search employees by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
      <div className="flex gap-2">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          <option value="all">All Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>
        <button className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2">
          <FaFilter />
          Filter
        </button>
      </div>
    </div>
  </div>
);

// Stats summary component
const StatsSummary = ({ employees, todaydate }) => {
  const presentCount = employees?.data?.filter(emp => emp?.log?.date === todaydate).length || 0;
  const totalCount = employees?.data?.length || 0;
  const absentCount = totalCount - presentCount;
  const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Employees</p>
            <p className="text-2xl font-bold">{totalCount}</p>
          </div>
          <FaUsers className="text-3xl opacity-80" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Present Today</p>
            <p className="text-2xl font-bold">{presentCount}</p>
          </div>
          <FaUserCheck className="text-3xl opacity-80" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-100 text-sm font-medium">Absent Today</p>
            <p className="text-2xl font-bold">{absentCount}</p>
          </div>
          <FaUserTimes className="text-3xl opacity-80" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Attendance Rate</p>
            <p className="text-2xl font-bold">{attendanceRate}%</p>
          </div>
          <FaChartBar className="text-3xl opacity-80" />
        </div>
      </div>
    </div>
  );
};

const Employees = () => {
  const { data: employees, isLoading, isError, error } = useGetallemployeesQuery();
  const todaydate = new Date().toLocaleDateString();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const filteredEmployees = employees?.data?.filter(emp => {
    const matchesSearch = emp.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const isPresent = emp?.log?.date === todaydate;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'present' && isPresent) || 
      (filterStatus === 'absent' && !isPresent);
    return matchesSearch && matchesStatus;
  }) || [];

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'status') {
      aValue = a?.log?.date === todaydate;
      bValue = b?.log?.date === todaydate;
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="text-gray-400" />;
    return sortDirection === 'asc' ? <FaSortUp className="text-blue-600" /> : <FaSortDown className="text-blue-600" />;
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading employee data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className=" p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="p-4 bg-red-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FaUserTimes className="text-red-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Data</h3>
              <p className="text-gray-600">{error?.data?.message || "Failed to load employees."}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <FaUsers className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Employee Management</h1>
              <p className="text-gray-600 mt-1">Monitor and manage your team's attendance</p>
            </div>
          </div>
        </div>

     <StatsSummary employees={employees} todaydate={todaydate} />

        <SearchFilter 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left">
                    <button 
                      onClick={() => handleSort('id')}
                      className="flex items-center gap-2 font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      # {getSortIcon('id')}
                    </button>
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Photo</th>
                  <th className="py-4 px-6 text-left">
                    <button 
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-2 font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Name {getSortIcon('name')}
                    </button>
                  </th>
                  <th className="py-4 px-6 text-left">
                    <button 
                      onClick={() => handleSort('status')}
                      className="flex items-center gap-2 font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Status {getSortIcon('status')}
                    </button>
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedEmployees.length > 0 ? (
                  sortedEmployees.map((emp, idx) => {
                    const isPresent = emp?.log?.date === todaydate;
                    return (
                      <tr
                        key={emp.userid || idx}
                        className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border-b border-gray-100"
                      >
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold text-sm">
                            {idx + 1}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <Link to={emp.userid} className="block group-hover:scale-110 transition-transform duration-300">
                            <div className="relative w-12 h-12">
                              <img
                                src={getImageSrc(emp.image) || "/dp.svg"}
                                alt={emp.name}
                                className="w-12 h-12 rounded-full border-3 border-gray-200 object-cover shadow-md transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-lg"
                              />
                              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${isPresent ? "bg-green-400" : "bg-red-400"}`}></div>
                            </div>
                          </Link>
                        </td>
                        <td className="py-4 px-6">
                          <Link to={emp.userid} className="hover:text-blue-600 transition-colors duration-200">
                            <div className="font-semibold text-gray-800">{emp.name}</div>
                            <div className="text-sm text-gray-500">Employee ID: {emp.userid}</div>
                          </Link>
                        </td>
                        <td className="py-4 px-6">
                          <StatusBadge isPresent={isPresent} />
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <Link 
                              to={emp.userid}
                              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                              title="View Details"
                            >
                              <FaEye className="text-sm" />
                            </Link>
                            
                            <Link
                              to={`/superadmin/reports/${emp.userid}`}
                              className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors duration-200"
                              title="Work History"
                            >
                              <MdWork className="text-sm" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      <div className="flex flex-col items-center">
                        <FaUsers className="text-4xl text-gray-300 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">No employees found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {sortedEmployees.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Showing {sortedEmployees.length} of {employees?.data?.length || 0} employees</span>
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;
