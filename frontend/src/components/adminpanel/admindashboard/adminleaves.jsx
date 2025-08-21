import { useState, useEffect } from 'react'
import { useGetallleavesQuery, useApprovedleaveMutation, useRejectleaveMutation } from '../../../redux/leaveslice'
import Loader from '../../loader'
import { 
  FaCalendarAlt, 
  FaUser, 
  FaClock, 
  FaCheckCircle, 
  FaTimesCircle,
  FaHourglassHalf,
  FaFileAlt,
  FaCalendarCheck
} from 'react-icons/fa';
import { MdDashboard, MdPendingActions } from 'react-icons/md';

const Adminleaves = () => {

    const { data: leaves, refetch, isLoading: fetchloading } = useGetallleavesQuery()
    // console.log(leaves)
    const [rejectleave, { isLoading: mutationloading }] = useRejectleaveMutation()
    const [approveleave, { isLoading: amutationloading }] = useApprovedleaveMutation()

    function reject(id) {
        rejectleave(id).unwrap().then((v) => {
            // console.log("rejected leave")
            refetch()
        })
    }

    function approve(id) {
        approveleave(id).unwrap().then((v) => {
            // console.log("approved leave")
            refetch()
        })
    }

    const totalLeaves = leaves?.allleavs?.length || 0;
    const pendingLeaves = leaves?.allleavs?.filter(leave => leave.status === "pending").length || 0;
    const approvedLeaves = leaves?.allleavs?.filter(leave => leave.status === "approved").length || 0;
    const rejectedLeaves = leaves?.allleavs?.filter(leave => leave.status === "reject").length || 0;


    const StatsCards = () => (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-blue-100 text-sm font-medium">Total Requests</p>
                        <p className="text-2xl font-bold">{totalLeaves}</p>
                    </div>
                    <FaFileAlt className="text-3xl opacity-80" />
                </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-yellow-100 text-sm font-medium">Pending</p>
                        <p className="text-2xl font-bold">{pendingLeaves}</p>
                    </div>
                    <FaHourglassHalf className="text-3xl opacity-80" />
                </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-green-100 text-sm font-medium">Approved</p>
                        <p className="text-2xl font-bold">{approvedLeaves}</p>
                    </div>
                    <FaCheckCircle className="text-3xl opacity-80" />
                </div>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-red-100 text-sm font-medium">Rejected</p>
                        <p className="text-2xl font-bold">{rejectedLeaves}</p>
                    </div>
                    <FaTimesCircle className="text-3xl opacity-80" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
        {(mutationloading || amutationloading || fetchloading) && (
                    <Loader />
                )}

                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                            <FaCalendarCheck className="text-white text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Leave Management</h1>
                            <p className="text-gray-600 mt-1">Review and manage employee leave requests</p>
                        </div>
                    </div>
                </div>

                <StatsCards />

                {/* Leave Requests Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                            <MdPendingActions className="text-white text-lg" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Leave Requests</h2>
                    </div>

                    {leaves?.allleavs?.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <FaCalendarAlt className="text-gray-400 text-2xl" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Leave Requests</h3>
                            <p className="text-gray-500">There are no pending leave requests at the moment.</p>
                    </div>
                    ) : (
                        <div className="space-y-4">
                            {(leaves?.allleavs ?? []).slice().reverse().map((leave, idx) => {
                                const statusConfig = {
                                    approved: {
                                        color: "green",
                                        bgColor: "bg-green-50",
                                        borderColor: "border-green-200",
                                        textColor: "text-green-700",
                                        icon: FaCheckCircle,
                                        label: "Approved"
                                    },
                                    pending: {
                                        color: "yellow",
                                        bgColor: "bg-yellow-50",
                                        borderColor: "border-yellow-200",
                                        textColor: "text-yellow-700",
                                        icon: FaHourglassHalf,
                                        label: "Pending"
                                    },
                                    reject: {
                                        color: "red",
                                        bgColor: "bg-red-50",
                                        borderColor: "border-red-200",
                                        textColor: "text-red-700",
                                        icon: FaTimesCircle,
                                        label: "Rejected"
                                    }
                                };

                                const config = statusConfig[leave.status] || statusConfig.pending;
                                const StatusIcon = config.icon;

                    return (
                        <div
                            key={leave._id || idx}
                                        className={`group relative ${config.bgColor} ${config.borderColor} border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
                                        style={{ animationDelay: `${idx * 0.1}s` }}
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                            {/* Leave Details */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className={`p-2 bg-${config.color}-100 rounded-lg`}>
                                                        <StatusIcon className={`text-${config.color}-600 text-lg`} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-800">{leave.name}</h3>
                                                        <p className="text-sm text-gray-500">Employee ID: {leave._id}</p>
                                                    </div>
                                </div>

                                                <p className="text-gray-700 mb-4 italic">"{leave.description}"</p>

                                                <div className="flex flex-wrap gap-3 mb-3">
                                                    <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                                        <FaFileAlt className="text-sm" />
                                        {leave.leaveType}
                                    </span>
                                                    <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                                        <FaCalendarAlt className="text-sm" />
                                                        {leave.startDate ? new Date(leave.startDate).toLocaleDateString() : ""} - {leave.endDate ? new Date(leave.endDate).toLocaleDateString() : ""}
                                    </span>
                                </div>

                                                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${config.textColor} bg-${config.color}-100`}>
                                                    <StatusIcon className="text-sm" />
                                                    {config.label}
                                </span>
                            </div>

                                            {/* Action Buttons */}
                                            {leave.status === "pending" && (
                                                <div className="flex gap-3 lg:flex-col">
                                                    <button
                                                        onClick={() => approve(leave._id)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
                                                    >
                                                        <FaCheckCircle className="text-sm" />
                                                        Approve
                                                    </button>
                                <button
                                    onClick={() => reject(leave._id)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
                                                    >
                                                        <FaTimesCircle className="text-sm" />
                                    Reject
                                </button>
                                                </div>
                                            )}

                                            {leave.status !== "pending" && (
                                                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium">
                                                    <StatusIcon className="text-sm" />
                                                    {config.label}
                                                </div>
                                            )}
                            </div>
                        </div>
                    );
                })}
            </div>
                    )}
                </div>
            </div>

            <style>
                {`
                    @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
                    
                    .group {
                        animation: fadeInUp 0.6s ease-out both;
        }
                `}
            </style>
        </div>
    )
}

export default Adminleaves