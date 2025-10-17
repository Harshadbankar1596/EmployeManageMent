
import React, { useState } from 'react';
import { useGetallemployeesQuery, useSetadminMutation } from '../../../redux/superadminslice';
import Loader from "../../loader.jsx";
import { Link } from "react-router-dom";
import { PiShieldPlus, PiShieldCheckFill } from "react-icons/pi";
import { FcCancel, FcOk } from "react-icons/fc";
import { ImSpinner7 } from "react-icons/im";
import {
  FaUsers,
  FaSearch,
  FaEye,
  FaUserCheck,
  FaUserTimes,
  FaChartBar,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaBars
} from 'react-icons/fa';
import { MdWork } from 'react-icons/md';

function getImageSrc(image) {
  if (!image || !image.data) return null;
  let byteArray = Array.isArray(image.data.data) ? image.data.data : image.data;
  if (!Array.isArray(byteArray)) return null;
  const base64String = btoa(
    byteArray.reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
  return `data:${image.contentType};base64,${base64String}`;
}

const isToday = (dateString) => {
  if (!dateString) return false;
  try {
    const inputDate = new Date(dateString);
    const today = new Date();
    return inputDate.getDate() === today.getDate() &&
      inputDate.getMonth() === today.getMonth() &&
      inputDate.getFullYear() === today.getFullYear();
  } catch (error) {
    console.error("Error parsing date:", error);
    return false;
  }
};

const Employees = () => {
  const [setadmin, { isLoading: loadingSetAdmin }] = useSetadminMutation();
  const { data: employees, isLoading: loadingEmployees, isError, error, refetch } = useGetallemployeesQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [modal, setModal] = useState({ open: false, type: null, userid: null });

  // Modal logic: type = 'admin' (give admin), 'employee' (remove admin)
  const openModal = (type, userid) => setModal({ open: true, type, userid });
  const closeModal = () => setModal({ open: false, type: null, userid: null });

  const handlesetadmin = () => {
    setadmin(modal.userid).unwrap().then(() => {
      closeModal();
      refetch();
    }).catch((error) => {
      closeModal();
      console.log("err", error);
    });
  };

  const filteredEmployees = employees?.data?.filter(emp => {
    const matchesSearch = emp.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const isPresent = isToday(emp?.log?.date);
    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'present' && isPresent) ||
      (filterStatus === 'absent' && !isPresent);
    return matchesSearch && matchesStatus;
  }) || [];

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    if (sortField === 'status') {
      aValue = isToday(a?.log?.date);
      bValue = isToday(b?.log?.date);
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

  // Status badge
  const StatusBadge = ({ isPresent }) => (
    <div className="relative">
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-xs shadow-lg border-2 transition-all duration-300
        ${isPresent
            ? "bg-green-500 text-white border-green-300 "
            : "bg-red-500 text-white border-red-300 "
          }`}
      >
        {isPresent ? (
          <>
            <FaUserCheck className="text-xs" />
            Present
          </>
        ) : (
          <>
            <FaUserTimes className="text-xs" />
            Absent
          </>
        )}
      </span>
    </div>
  );

  // Search and filter
  const SearchFilter = () => (
    <div className="rounded-xl shadow-lg p-4 mb-6 border border-gray-100">
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
            className="px-4 py-3 border-none rounded-lg focus:bg-blue-100 transition-all duration-500"
          >
            <option value="all">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
        </div>
      </div>
    </div>
  );

  const StatsSummary = () => {
    const presentCount = employees?.data?.filter(emp => isToday(emp?.log?.date)).length || 0;
    const totalCount = employees?.data?.length || 0;
    const absentCount = totalCount - presentCount;
    const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-blue-900 text-white rounded-xl p-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-xs font-medium">Total Employees</p>
              <p className="text-lg font-bold">{totalCount}</p>
            </div>
            <FaUsers className="text-xl opacity-80" />
          </div>
        </div>
        <div className="bg-green-500 text-white rounded-xl p-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-xs font-medium">Present Today</p>
              <p className="text-lg font-bold">{presentCount}</p>
            </div>
            <FaUserCheck className="text-xl opacity-80" />
          </div>
        </div>
        <div className="bg-red-500 text-white rounded-xl p-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-xs font-medium">Absent Today</p>
              <p className="text-lg font-bold">{absentCount}</p>
            </div>
            <FaUserTimes className="text-xl opacity-80" />
          </div>
        </div>
        <div className="bg-yellow-500 text-white rounded-xl p-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-xs font-medium">Attendance Rate</p>
              <p className="text-lg font-bold">{attendanceRate}%</p>
            </div>
            <FaChartBar className="text-xl opacity-80" />
          </div>
        </div>
      </div>
    );
  };

  // Employee card (mobile)
  const EmployeeCard = ({ emp, idx }) => {
    const isPresent = isToday(emp?.log?.date);
    const [showDetails, setShowDetails] = useState(false);
    if (emp.isadmin !== "superadmin") return (
      <div className="bg-white rounded-xl shadow-md border border-gray-100 mb-4 overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold text-sm mr-3">
              {idx + 1}
            </span>
            <div className="relative mr-3">
              <img
                src={emp?.image?.data || "/dp.svg"}  
                alt={emp.name}
                className="w-12 h-12 rounded-full border-2 border-gray-200 object-cover shadow-md"
              />
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${isPresent ? "bg-green-400" : "bg-red-400"}`}></div>
            </div>
            <div>
              <div className="font-semibold text-gray-800">{emp.name}</div>
              <div className="text-xs text-gray-500">ID: {emp.userid}</div>
            </div>
          </div>
          <StatusBadge isPresent={isPresent} />
        </div>
        <div className="px-4 pb-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-600 text-sm font-medium flex items-center"
            >
              <FaBars className="mr-1" /> {showDetails ? 'Hide' : 'Show'} Details
            </button>
            <div className="flex items-center gap-2">
              <Link
                to={emp.userid}
                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                title="View Details"
              >
                <FaEye className="text-sm" />
              </Link>
              {(loadingEmployees || (loadingSetAdmin && modal.userid === emp.userid && modal.open)) ?
                <div className="flex items-center justify-center w-8 h-8">
                  <ImSpinner7 className='animate-spin text-xl' />
                </div>
                : emp?.isadmin === "admin" ?
                  <PiShieldCheckFill
                    onClick={() => openModal('employee', emp.userid)}
                    className='text-xl cursor-pointer'
                    title='Admin'
                  /> :
                  <PiShieldPlus
                    onClick={() => openModal('admin', emp.userid)}
                    className='text-xl cursor-pointer'
                    title='Employee'
                  />
              }
            </div>
          </div>
          {showDetails && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Employee ID</p>
                  <p className="text-sm font-medium">{emp.userid}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <StatusBadge isPresent={isPresent} />
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <Link
                  to={`/superadmin/reports/${emp.userid}`}
                  className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors duration-200 flex items-center"
                  title="Work History"
                >
                  <MdWork className="mr-2" /> View Work History
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Employees table (desktop)
  const EmployeesTable = () => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hidden md:block">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <tr>
            <th className="py-4 px-4 text-left">
              <button
                onClick={() => handleSort('id')}
                className="flex items-center gap-2 font-semibold text-gray-700 hover:text-blue-600 transition-colors"
              >
                # {getSortIcon('id')}
              </button>
            </th>
            <th className="py-4 px-4 text-left font-semibold text-gray-700">Photo</th>
            <th className="py-4 px-4 text-left">
              <button
                onClick={() => handleSort('name')}
                className="flex items-center gap-2 font-semibold text-gray-700 hover:text-blue-600 transition-colors"
              >
                Name {getSortIcon('name')}
              </button>
            </th>
            <th className="py-4 px-4 text-left">
              <button
                onClick={() => handleSort('status')}
                className="flex items-center gap-2 font-semibold text-gray-700 hover:text-blue-600 transition-colors"
              >
                Status {getSortIcon('status')}
              </button>
            </th>
            <th className="py-4 px-4 text-left font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((emp, idx) => {
            const isPresent = isToday(emp?.log?.date);
            if (emp.isadmin !== "superadmin") return (
              <tr
                key={emp.userid || idx}
                className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border-b border-gray-100"
              >
                <td className="py-4 px-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold text-sm">
                    {idx + 1}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <Link to={emp.userid} className="block group-hover:scale-110 transition-transform duration-300">
                    <div className="relative w-12 h-12">
                      <img
                        src={emp?.image?.data || "/dp.svg"}
                        alt={emp.name}
                        className="w-12 h-12 rounded-full border-2 border-gray-200 object-cover shadow-md transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-lg"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${isPresent ? "bg-green-400" : "bg-red-400"}`}></div>
                    </div>
                  </Link>
                </td>
                <td className="py-4 px-4">
                  <Link to={emp.userid} className="hover:text-blue-600 transition-colors duration-200">
                    <div className="font-semibold text-gray-800">{emp.name}</div>
                    <div className="text-sm text-gray-500">Employee ID: {emp.userid}</div>
                  </Link>
                </td>
                <td className="py-4 px-4">
                  <StatusBadge isPresent={isPresent} />
                </td>
                <td className="py-4 px-4">
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

                    {(loadingEmployees ||
                      (loadingSetAdmin && modal.userid === emp.userid && modal.open)) ? (
                      <div className="p-2 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                        <ImSpinner7 className="relative self-center -bottom-2 -right-2 animate-spin text-lg" />
                      </div>
                    ) : emp?.isadmin === "admin" ? (
                      <div className='p-1 rounded-md bg-green-200 hover:bg-green-300'>
                        <PiShieldCheckFill
                          onClick={() => openModal("employee", emp.userid)}
                          className="text-xl cursor-pointer text-green-600"
                          title="Admin"
                        />
                      </div>
                    ) : (
                      <div className='p-1 rounded-md bg-gray-200 hover:bg-gray-300'>
                        <PiShieldPlus
                          onClick={() => openModal("admin", emp.userid)}
                          className="text-xl cursor-pointer text-gray-600"
                          title="Employee"
                        />
                      </div>
                    )}
                  </div>

                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  // Modal (single component for both actions)
  const Modal = () => {
    if (!modal.open) return null;
    const isAdmin = modal.type === 'admin';
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8 text-center animate-fadeIn">
          <div className="flex justify-center mb-4">
            {isAdmin ? <FcOk className="w-16 h-16" /> : <FcCancel className="w-16 h-16" />}
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
            Are you sure?
          </h2>
          <p className="text-gray-300 mb-6">
            {isAdmin
              ? "Do you really want to Give Admin authority?"
              : "Do you really want to Set Employee authority?"}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handlesetadmin}
              className={`px-5 py-2 ${isAdmin ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"} text-white rounded-lg shadow-md transition`}
            >
              {loadingSetAdmin || loadingEmployees ? (
                <ImSpinner7 className="relative self-center -bottom-2 -right-2 animate-spin text-lg" />
              ) : isAdmin ? "Yes, Give Admin" : "Yes, Give Employee"}

            </button>
            <button
              onClick={closeModal}
              className="px-5 py-2 bg-gray-700 hover:bg-gray-800 text-gray-200 rounded-lg shadow-md transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loadingEmployees) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
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
    <div>
      <Modal />
      <div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-900 rounded-xl shadow-lg">
                <FaUsers className="text-white text-xl md:text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Employee Management</h1>
                <p className="text-gray-600 mt-1 text-sm md:text-base">Monitor and manage your team's attendance</p>
              </div>
            </div>
          </div>
          <StatsSummary />
          <SearchFilter />
          <div className="block md:hidden">
            {sortedEmployees.length > 0 ? (
              sortedEmployees.map((emp, idx) => (
                <EmployeeCard
                  key={emp.userid || idx}
                  emp={emp}
                  idx={idx}
                />
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="flex flex-col items-center">
                  <FaUsers className="text-4xl text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No employees found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              </div>
            )}
          </div>
          {sortedEmployees.length > 0 ? (
            <EmployeesTable />
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hidden md:block">
              <div className="py-12 text-center">
                <div className="flex flex-col items-center">
                  <FaUsers className="text-4xl text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No employees found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              </div>
            </div>
          )}
          {sortedEmployees.length > 0 && (
            <div className="mt-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
                <span className="mb-2 md:mb-0">Showing {sortedEmployees.length} of {employees?.data?.length || 0} employees</span>
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employees;