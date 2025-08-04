import { useState, useEffect } from 'react'
import { useGetallleavesQuery, useApprovedleaveMutation, useRejectleaveMutation } from '../../../redux/leaveslice'

const Adminleaves = () => {

    const { data: leaves, refetch } = useGetallleavesQuery()
    // console.log(leaves?.allleavs || [])

    const [rejectleave] = useRejectleaveMutation()
    const [approveleave] = useApprovedleaveMutation()


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
        <div className="p-6  min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">All Leave Requests</h2>
            <div className="grid gap-6">
                {leaves?.allleavs?.length === 0 && (
                    <div className="text-center text-gray-500 py-8">No leave requests found.</div>
                )}
                {leaves?.allleavs?.map((leave, idx) => (
                    <div
                        key={leave._id || idx}
                        className={`${leave.status === "reject" ? "bg-red-200" : leave.status === "approved" ? "bg-green-200" : "bg-yellow-200"}  rounded-lg  shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between transition-all duration-300 hover:shadow-lg animate-fadeIn`}
                        style={{ animationDelay: `${0.2 + idx * 0.07}s` }}
                    >
                        <div className="flex-1">
                            <p className="text-lg font-semibold text-blue-700 mb-1">{leave.name}</p>
                            <p className="text-gray-700 mb-1">{leave.description}</p>
                            <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-1">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{leave.leaveType}</span>
                                <span>
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
                                className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${leave.status === "approved"
                                        ? "bg-green-100 text-green-700 border border-green-300"
                                        : leave.status === "pending"
                                            ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                                            : "bg-red-100 text-red-700 border border-red-300"
                                    }`}
                            >
                                {leave.status === "pending"
                                    ? "Pending"
                                    : leave.status === "approved"
                                        ? "Approved"
                                        : "Rejected"}
                            </span>
                        </div>
                        <div className="flex gap-3 mt-4 md:mt-0 md:ml-6">
                            <button
                                onClick={() => {
                                    reject(leave._id)
                                }}
                                className="px-4 py-2 rounded bg-red-100 text-red-700 font-semibold border border-red-300 hover:bg-red-200 transition"
                            >
                                Reject
                            </button>
                            <button
                            onClick={() => {
                                approve(leave._id)
                            }}
                                className="px-4 py-2 rounded bg-green-100 text-green-700 font-semibold border border-green-300 hover:bg-green-200 transition"
                            >
                                Approve
                            </button>
                        </div>
                    </div>
                ))}
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
    )
}

export default Adminleaves