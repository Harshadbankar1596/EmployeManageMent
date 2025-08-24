import React, { useState, useEffect } from 'react';
import { useApplyleavesMutation } from '../../redux/leaveslice';
import { useSelector } from 'react-redux';
import { useAllleavesQuery } from '../../redux/leaveslice';
import Loader from '../loader';
const Leave = () => {
  const [applyleave, { isLoading: loadingleave }] = useApplyleavesMutation();
  const id = useSelector((state) => state.user.id);
  const [allleave, setallleave] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    leaveType: '',
  });

  const { data: allleaves, refetch, isLoading: loadingleaves, error } = useAllleavesQuery(id);

  const [openmodal, setopenmodal] = useState(false);

  useEffect(() => {
    if (allleaves && allleaves.allleavs) {
      const reversed = allleaves.allleavs.slice().reverse();
      setallleave(reversed);
    } else {
      setallleave([]);
    }
  }, [allleaves]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyleave({ id: id, formData }).unwrap();
      // console.log("apply leave posted");
      setopenmodal(false);
      if (typeof refetch === "function") {
        refetch();
      }
      setFormData({
        name: '',
        startDate: '',
        endDate: '',
        description: '',
        leaveType: '',
      });
    } catch (err) {
      console.error("Failed to apply leave:", err);
    }
  };

  if (loadingleave || loadingleaves) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen py-10 px-4  animate-fadeIn">

      {/* {loadingleave || loadingleaves && (<Loader />)} */}

      <div className="flex justify-center mb-10 animate-slideDown">
        <button
          onClick={() => setopenmodal(true)}
          className="bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-800 transition-all duration-300 font-semibold text-lg transform hover:scale-105 hover:shadow-xl active:scale-95"
        >
          Apply for Leave
        </button>
      </div>

      {openmodal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-all duration-300 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-modalSlideIn">
            <button
              onClick={() => setopenmodal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none transition-colors duration-200 hover:scale-110"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-700 tracking-tight animate-slideDown">Leave Application Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="animate-slideUp" style={{ animationDelay: '0.1s' }}>
                <label className="block text-base font-medium mb-1 text-gray-700">Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-800 transition-all duration-200 hover:border-blue-300 focus:scale-[1.02]"
                />
              </div>
              <div className="flex gap-2 animate-slideUp" style={{ animationDelay: '0.2s' }}>
                <div className="flex-1">
                  <label className="block text-base font-medium mb-1 text-gray-700">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-800 transition-all duration-200 hover:border-blue-300 focus:scale-[1.02]"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-base font-medium mb-1 text-gray-700">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-800 transition-all duration-200 hover:border-blue-300 focus:scale-[1.02]"
                  />
                </div>
              </div>
              <div className="animate-slideUp" style={{ animationDelay: '0.3s' }}>
                <label className="block text-base font-medium mb-1 text-gray-700">Leave Type</label>
                <select
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-800 transition-all duration-200 hover:border-blue-300 focus:scale-[1.02]"
                >
                  <option value="">Select Leave Type</option>
                  <option value="Sick">Sick Leave</option>
                  <option value="Casual">Casual Leave</option>
                  <option value="Paid">Paid Leave</option>
                  <option value="Maternity">Maternity Leave</option>
                </select>
              </div>
              <div className="animate-slideUp" style={{ animationDelay: '0.4s' }}>
                <label className="block text-base font-medium mb-1 text-gray-700">Description (optional)</label>
                <textarea
                  name="description"
                  placeholder="Description (optional)"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-800 transition-all duration-200 hover:border-blue-300 focus:scale-[1.02]"
                  rows={2}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-2 rounded-lg font-bold text-base hover:bg-blue-800 transition-all duration-300 shadow transform hover:scale-105 active:scale-95 animate-slideUp"
                style={{ animationDelay: '0.5s' }}
              >
                Submit Leave Request
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto mt-12 animate-slideUp" style={{ animationDelay: '0.3s' }}>
        <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center animate-slideDown">Your Leave Requests</h3>
        <div className="overflow-x-auto rounded-lg shadow animate-slideUp" style={{ animationDelay: '0.4s' }}>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-blue-100 text-blue-800">
                <th className="py-3 px-4 text-left font-semibold border-b border-gray-200">Name</th>
                <th className="py-3 px-4 text-left font-semibold border-b border-gray-200">Type</th>
                <th className="py-3 px-4 text-left font-semibold border-b border-gray-200">Description</th>
                <th className="py-3 px-4 text-left font-semibold border-b border-gray-200">Start Date</th>
                <th className="py-3 px-4 text-left font-semibold border-b border-gray-200">End Date</th>
                <th className="py-3 px-4 text-center font-semibold border-b border-gray-200">Status</th>
              </tr>
            </thead>
            <tbody>
              {loadingleaves ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-red-500">
                    Error loading leave requests.
                  </td>
                </tr>
              ) : allleave?.length === 0 ? (
                <tr className="animate-fadeIn">
                  <td colSpan={6} className="py-6 text-center text-gray-500">
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                allleave?.map((leave, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 transition-all duration-300 animate-slideUp hover:scale-[1.01] hover:shadow-sm"
                    style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
                  >
                    <td className="py-3 px-4 border-b border-gray-100 font-medium text-blue-700">{leave.name}</td>
                    <td className="py-3 px-4 border-b border-gray-100 text-gray-700">{leave.leaveType}</td>
                    <td className="py-3 px-4 border-b border-gray-100 text-gray-600">{leave.description}</td>
                    <td className="py-3 px-4 border-b border-gray-100 text-gray-500">
                      {leave.startDate ? new Date(leave.startDate).toLocaleDateString() : ''}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-100 text-gray-500">
                      {leave.endDate ? new Date(leave.endDate).toLocaleDateString() : ''}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-100 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 transform hover:scale-110 ${leave.status === "approved"
                            ? "bg-green-100 text-green-700 border border-green-300 hover:bg-green-200"
                            : leave.status === "pending"
                              ? "bg-yellow-100 text-yellow-700 border border-yellow-300 hover:bg-yellow-200"
                              : "bg-red-100 text-red-700 border border-red-300 hover:bg-red-200"
                          }`}
                      >
                        {leave.status === "pending"
                          ? "pending"
                          : leave.status === "approved"
                            ? "approved"
                            : "rejected"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }

        .animate-modalSlideIn {
          animation: modalSlideIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Leave;
