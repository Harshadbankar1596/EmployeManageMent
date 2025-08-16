import { useState, useEffect } from 'react'
import { useGetallleavesQuery, useApprovedleaveMutation, useRejectleaveMutation } from '../../../redux/leaveslice'
import Loader from '../../loader'
const Adminleaves = () => {

    const { data: leaves, refetch , isLoading : fetchloading } = useGetallleavesQuery()
    // console.log(leaves?.allleavs || [])

    const [rejectleave , {isLoading : mutationloading}] = useRejectleaveMutation()
    const [approveleave , {isLoading : amutationloading}] = useApprovedleaveMutation()


    function reject(id) {
        rejectleave(id).unwrap().then((v)=>{
            console.log("rejected leave")
            refetch()
        })
    }

    function approve(id) {
        approveleave(id).unwrap().then((v)=>{
            console.log("approved leave")
            refetch()
        })
    }

    return (
        <div>
        {(mutationloading || amutationloading || fetchloading) && (
            <Loader/>
        )}

        <div className="p-6  min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">All Leave Requests</h2>
            <div className="grid gap-8">
                {leaves?.allleavs?.length === 0 && (
                    <div className="text-center text-gray-400 py-12 text-lg font-medium">
                        <svg className="mx-auto mb-2 w-12 h-12 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        No leave requests found.
                    </div>
                )}
                {leaves?.allleavs?.map((leave, idx) => {
                    const statusColor = leave.status === "approved"
                        ? "bg-green-50 border-green-400"
                        : leave.status === "pending"
                            ? "bg-yellow-50 border-yellow-400"
                            : "bg-red-50 border-red-400";
                    const statusTextColor = leave.status === "approved"
                        ? "text-green-700"
                        : leave.status === "pending"
                            ? "text-yellow-700"
                            : "text-red-700";
                    const statusLabel = leave.status === "pending"
                        ? "Pending"
                        : leave.status === "approved"
                            ? "Approved"
                            : "Rejected";
                    const statusDotColor = leave.status === "approved"
                        ? "bg-green-400"
                        : leave.status === "pending"
                            ? "bg-yellow-400"
                            : "bg-red-400";
                    return (
                        <div
                            key={leave._id || idx}
                            className={`relative border-l-8 ${statusColor} rounded-xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between transition-all duration-300 hover:shadow-xl animate-fadeIn`}
                            style={{ animationDelay: `${0.2 + idx * 0.07}s` }}
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`inline-block w-3 h-3 rounded-full ${statusDotColor}`}></span>
                                    <p className="text-xl font-bold text-gray-800 truncate">{leave.name}</p>
                                </div>
                                <p className="text-gray-600 mb-2 italic">{leave.description}</p>
                                <div className="flex flex-wrap gap-3 text-sm mb-2">
                                    <span className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                                        <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 11h.01" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 15h.01" />
                                        </svg>
                                        {leave.leaveType}
                                    </span>
                                    <span className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {leave.startDate
                                            ? new Date(leave.startDate).toLocaleDateString()
                                            : ""}{" "}
                                        -{" "}
                                        {leave.endDate
                                            ? new Date(leave.endDate).toLocaleDateString()
                                            : ""}
                                    </span>
                                </div>
                                <span
                                    className={`inline-block mt-1 px-4 py-1 rounded-full text-xs font-bold border ${statusTextColor} ${statusColor} border-opacity-60 shadow-sm`}
                                >
                                    {statusLabel}
                                </span>
                            </div>
                            <div className="flex gap-3 mt-6 md:mt-0 md:ml-8">
                                <button
                                    onClick={() => reject(leave._id)}
                                    disabled={leave.status !== "pending"}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold border transition focus:outline-none focus:ring-2 focus:ring-red-300
                                        ${leave.status !== "pending"
                                            ? "bg-red-100 text-red-300 border-red-100 cursor-not-allowed"
                                            : "bg-red-50 text-red-700 border-red-300 hover:bg-red-200 hover:text-red-800"}
                                    `}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Reject
                                </button>
                                <button
                                    onClick={() => approve(leave._id)}
                                    disabled={leave.status !== "pending"}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold border transition focus:outline-none focus:ring-2 focus:ring-green-300
                                        ${leave.status !== "pending"
                                            ? "bg-green-100 text-green-300 border-green-100 cursor-not-allowed"
                                            : "bg-green-50 text-green-700 border-green-300 hover:bg-green-200 hover:text-green-800"}
                                    `}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Approve
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease both;
        }
      `}</style>
        </div>
        </div>
    )
}

export default Adminleaves