import { useState, useEffect } from 'react';
import { useWorksMutation, useWorkstatusMutation, useTaskstatusMutation } from '../../redux/apislice';
import { useSelector } from 'react-redux';
import { CircleFadingPlus } from "lucide-react";
import { FaExclamationTriangle, FaClipboardList, FaChevronDown, FaClipboard, FaCheck, FaPlus } from 'react-icons/fa';
import { FcCancel } from "react-icons/fc";
import { useAddtaskMutation } from '../../redux/apislice';
const Works = () => {
    const [addtask] = useAddtaskMutation();
    const [workstatus] = useWorkstatusMutation();
    const [taskstatus] = useTaskstatusMutation();
    const [works, { isLoading, isError, refetch }] = useWorksMutation();
    const id = useSelector((state) => state.user.id);
    const [work, setWork] = useState([]);
    const [expandedItems, setExpandedItems] = useState({});
    const [taskmodal, setTaskmodal] = useState(false);
    const [inputtask, setInputtask] = useState('');
    useEffect(() => {
        const fetchWorks = async () => {
            try {
                const res = await works(id);
                console.log("res main ", res.data.works)
                setWork(res.data.works);
                const initialExpandedState = {};
                res.data.works.forEach((workItem, idx) => {
                    initialExpandedState[workItem._id] = idx === 0;
                });
                setExpandedItems(initialExpandedState);
            } catch (err) {
                console.log(err);
            }
        };

        fetchWorks();
    }, [id]);

    const toggleWorkItem = (objid) => {
        setExpandedItems(prev => ({
            ...prev,
            [objid]: !prev[objid]
        }));
    };



    const handleTaskstatus = async (objid, taskid) => {
        try {
            const res = await taskstatus({ userid: id, objid: objid, taskid: taskid });
            setWork(res.data.taskstatus);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddtask = async (objid, task) => {
        try {
            const res = await addtask({ userid: id, objid: objid, task: task })
            setWork(res.data.works)
            console.log("res", res.data.works)
        } catch (err) {
            console.log(err);
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-lg font-medium text-gray-700">Loading your works...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                    <div className="text-red-500 mb-4 flex justify-center">
                        <FaExclamationTriangle className="h-16 w-16 mx-auto" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
                    <p className="text-gray-600 mb-6">We encountered an issue while loading your works. Please try again later.</p>
                    <button
                        onClick={() => refetch()}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!work || work.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                    <div className="text-indigo-500 mb-4 flex justify-center">
                        <FaClipboardList className="h-16 w-16 mx-auto" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No Works Found</h2>
                    <p className="text-gray-600 mb-6">It looks like you don't have any works assigned yet. Start by creating a new work item.</p>
                    <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                        Create New Work
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen  py-10 px-2 sm:px-6 flex flex-col items-center animate-fade-in">
            <div className="max-w-4xl w-full mx-auto">
                <div className="relative text-center mb-14">
                    {/* Decorative background blobs */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200 opacity-40 rounded-full blur-2xl z-0 animate-pulse-slow"></div>
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-tr from-pink-300 via-purple-200 to-indigo-200 opacity-30 rounded-full blur-2xl z-0 animate-pulse-slow"></div>
                    
                    <h1 className="relative z-10 text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight drop-shadow-2xl animate-slide-down">
                        <span className="bg-black bg-clip-text text-transparent">
                            <span className="inline-block animate-gradient-x">Your Works Dashboard</span>
                        </span>
                    </h1>
                    <p className="relative z-10 text-gray-700 max-w-xl mx-auto text-lg sm:text-xl font-medium animate-fade-in-slow">
                        <span className="inline-flex items-center gap-2">
                            <svg className="w-6 h-6 text-indigo-400 animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                            Manage all your <span className="font-semibold text-indigo-600">assigned works</span> and <span className="font-semibold text-pink-500">tasks</span> in one place
                        </span>
                    </p>
                </div>

                <div className="space-y-8">
                    {work.map((workItem, idx) => (
                        <div
                            key={workItem._id}
                            className={`
                                group rounded-2xl overflow-hidden shadow-xl transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] transform hover:scale-[1.025] hover:shadow-2xl
                                ${workItem.status ? "border-l-8 border-green-400 bg-gradient-to-r from-green-100/80 to-green-50" : "border-l-8 border-red-400 bg-gradient-to-r from-red-100/80 to-red-50"}
                                animate-fade-in-up
                            `}
                            style={{ animationDelay: `${idx * 80}ms` }}
                        >
                            <div
                                className={`
                                    flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-6 cursor-pointer transition-colors duration-300
                                    ${workItem.status
                                        ? "bg-green-500/90 text-white"
                                        : "bg-red-500/90 text-white"
                                    }
                                    relative
                                `}
                                onClick={() => toggleWorkItem(workItem._id)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-white/30 p-3 rounded-xl shadow-inner animate-bounce-in">
                                        <FaClipboard className="h-7 w-7 drop-shadow" />
                                    </div>
                                    <h1 className="text-xl font-bold break-words max-w-xs drop-shadow">{workItem.title}</h1>
                                </div>

                                <div className="flex items-center gap-6">
                                    <p className="text-sm sm:text-base bg-black/20 px-4 py-1 rounded-lg font-semibold shadow-inner">
                                        {workItem.startdate ? workItem.startdate.split("T")[0] : "N/A"}
                                    </p>
                                    <div className="flex items-center">
                                        <label htmlFor={`complete-${workItem._id}`} className="mr-2 text-sm font-semibold tracking-wide">
                                            {workItem.status ? (
                                                <span className="inline-flex items-center gap-1 text-green-100">
                                                    <FaCheck className="inline-block" /> Complete
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-red-100">
                                                    <FcCancel className="inline-block" /> Incomplete
                                                </span>
                                            )}
                                        </label>
                                    </div>
                                    <div className="transform transition-transform duration-500">
                                        <FaChevronDown
                                            className={`h-6 w-6 transition-transform duration-500 ${expandedItems[workItem._id] ? "rotate-180" : ""} group-hover:scale-125`}
                                        />
                                    </div>
                                </div>
                                <div className={`absolute left-0 top-0 h-full w-2 rounded-r-lg ${workItem.status ? "bg-green-400" : "bg-red-400"} animate-pulse`} />
                            </div>

                            <div
                                className={`
                                    bg-white transition-all duration-700 ease-in-out overflow-hidden
                                    ${expandedItems[workItem._id] ? "max-h-[600px] opacity-100 py-6 px-4 sm:px-8" : "max-h-0 opacity-0 py-0 px-0"}
                                    border-t border-gray-100
                                `}
                                style={{
                                    transitionProperty: "max-height, opacity, padding",
                                }}
                            >
                                <div className="transition-opacity duration-700">
                                    <div className="flex items-center justify-between mb-5">
                                        <h3 className="font-semibold text-gray-700 flex items-center gap-2 text-lg">
                                            <FaClipboardList className="h-5 w-5 text-indigo-500 animate-fade-in" />
                                            Tasks
                                        </h3>
                                        <button
                                            className="cursor-pointer text-indigo-600 border border-indigo-200 hover:bg-indigo-50 p-2 rounded-full shadow transition-all duration-200 hover:scale-110"
                                            onClick={e => {
                                                e.stopPropagation();
                                                setTaskmodal(true);
                                            }}
                                            aria-label="Add Task"
                                        >
                                            <FaPlus />
                                        </button>
                                        {taskmodal && (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 sm:px-0 animate-fade-in-fast">
                                                <div className="relative bg-white w-full max-w-md mx-auto rounded-2xl shadow-2xl p-8 flex flex-col gap-5 border border-indigo-100 animate-pop-in">
                                                    <button
                                                        className="absolute top-3 right-3 text-gray-400 hover:text-indigo-600 transition"
                                                        onClick={() => setTaskmodal(false)}
                                                        aria-label="Close"
                                                        type="button"
                                                    >
                                                        <div className='p-1 rounded-full text-lg font-bold hover:bg-gray-100 transition'>×</div>
                                                    </button>
                                                    <h3 className="text-2xl font-bold text-indigo-700 mb-2 text-center">Add Task</h3>
                                                    <input
                                                        name="task"
                                                        value={inputtask}
                                                        onChange={(e) => setInputtask(e.target.value)}
                                                        type="text"
                                                        placeholder="Enter Task"
                                                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                                                    />
                                                    <button
                                                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition"
                                                        type="button"
                                                        disabled={!inputtask || !inputtask.trim()}
                                                        onClick={() => {
                                                            if (inputtask && inputtask.trim()) {
                                                                handleAddtask(workItem._id, inputtask.trim());
                                                                setInputtask('');
                                                                setTaskmodal(false);
                                                            }
                                                        }}
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {workItem.task && workItem.task.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-slow">
                                            {workItem.task.map((task, tIdx) => (
                                                <div
                                                    key={task._id}
                                                    className={`
                                                        p-4 rounded-xl border transition-all duration-400 ease-in-out hover:shadow-lg
                                                        flex items-center min-w-0 gap-3
                                                        ${task.status
                                                            ? "border-green-200 bg-gradient-to-r from-green-50 to-green-100"
                                                            : "border-red-200 bg-gradient-to-r from-red-50 to-red-100"
                                                        }
                                                        animate-fade-in-up
                                                    `}
                                                    style={{ animationDelay: `${tIdx * 60}ms` }}
                                                >
                                                    <div
                                                        onClick={() => handleTaskstatus(workItem._id, task._id)}
                                                        className={`flex-shrink-0 p-2 cursor-pointer rounded-full border-2 transition-all duration-300
                                                            ${task.status
                                                                ? "bg-green-200 text-green-700 border-green-400 hover:bg-green-300"
                                                                : "bg-red-200 text-red-700 border-red-400 hover:bg-red-300"
                                                            }
                                                            hover:scale-110
                                                        `}
                                                        title={task.status ? "Mark as Incomplete" : "Mark as Complete"}
                                                    >
                                                        {task.status ? (
                                                            <FaCheck className="h-5 w-5" />
                                                        ) : (
                                                            <FcCancel className="h-5 w-5" />
                                                        )}
                                                    </div>
                                                    <p
                                                        className={`font-medium truncate min-w-0 text-base ${task.status ? "text-green-800" : "text-red-800"
                                                            }`}
                                                        title={task.title}
                                                    >
                                                        {task.title}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center text-gray-400 italic py-4 animate-fade-in">
                                            No tasks yet. Add your first task!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Animations */}
            <style>
                {`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                @keyframes slide-down {
                    from { opacity: 0; transform: translateY(-30px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                @keyframes pop-in {
                    0% { opacity: 0; transform: scale(0.95);}
                    100% { opacity: 1; transform: scale(1);}
                }
                @keyframes bounce-in {
                    0% { transform: scale(0.7);}
                    60% { transform: scale(1.1);}
                    100% { transform: scale(1);}
                }
                .animate-fade-in { animation: fade-in 0.7s both; }
                .animate-fade-in-slow { animation: fade-in 1.2s both; }
                .animate-fade-in-up { animation: fade-in-up 0.7s both; }
                .animate-slide-down { animation: slide-down 0.7s both; }
                .animate-pop-in { animation: pop-in 0.4s both; }
                .animate-bounce-in { animation: bounce-in 0.7s both; }
                .animate-fade-in-fast { animation: fade-in 0.3s both; }
                `}
            </style>
        </div>
    );
};

export default Works;

