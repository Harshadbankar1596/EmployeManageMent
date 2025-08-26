import { useState, useEffect, useCallback, memo } from 'react';
import { useWorksMutation, useTaskstatusMutation } from '../../redux/apislice';
import { useSelector } from 'react-redux';
import { FaExclamationTriangle, FaClipboardList, FaChevronDown, FaClipboard, FaCheck, FaPlus, FaSpinner } from 'react-icons/fa';
import { FcCancel } from "react-icons/fc";
import { useAddtaskMutation } from '../../redux/apislice';
import Loader from '../loader';

const Works = () => {
    const [addtask , {isLoading : addloading}] = useAddtaskMutation();
    const [taskstatus, { isLoading: isLoadingTaskStatus, isError: isErrorTaskStatus }] = useTaskstatusMutation();
    const [works, { isLoading, isError, refetch }] = useWorksMutation();
    const id = useSelector((state) => state.user.id);
    const [work, setWork] = useState([]);
    const [expandedItems, setExpandedItems] = useState({});
    const [taskModalFor, setTaskModalFor] = useState(null);
    const [inputtask, setInputtask] = useState('');
    const [currentTaskId, setCurrentTaskId] = useState(null);

    useEffect(() => {
        const fetchWorks = async () => {
            try {
                const res = await works(id);
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

    const toggleWorkItem = useCallback((objid) => {
        setExpandedItems(prev => ({
            ...prev,
            [objid]: !prev[objid]
        }));
    }, []);

    const handleTaskstatus = async (objid, taskid) => {
        try {
            setCurrentTaskId(taskid);
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
        } catch (err) {
            console.log(err);
        }
    }

    if (isLoading) {
        return (
            <Loader/>
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
        <div className="min-h-screen py-6 px-2 sm:px-4 md:px-6 flex flex-col items-center animate-fade-in">
            <div className="w-full max-w-4xl mx-auto">
                <div className="relative text-center mb-10 sm:mb-14">
                    <div className="absolute -top-10 -left-10 w-28 h-28 sm:w-40 sm:h-40 bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200 opacity-40 rounded-full blur-2xl z-0 animate-pulse-slow"></div>

                    <h1 className="relative z-10 text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-3 sm:mb-4 tracking-tight drop-shadow-2xl animate-slide-down">
                        <span className="bg-black bg-clip-text text-transparent">
                            <span className="inline-block animate-gradient-x">Your Works Dashboard</span>
                        </span>
                    </h1>
                    <p className="relative z-10 text-gray-700 max-w-xl mx-auto text-base xs:text-lg sm:text-xl font-medium animate-fade-in-slow">
                        <span className="inline-flex items-center gap-2">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                            Manage all your <span className="font-semibold text-indigo-600">assigned works</span> and <span className="font-semibold text-pink-500">tasks</span> in one place
                        </span>
                    </p>
                </div>

                <div className="space-y-6 sm:space-y-8">
                    {work.map((workItem, idx) => (
                        <div
                            key={workItem._id}
                            className={`
                                group rounded-2xl overflow-hidden shadow-xl transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] transform hover:scale-[1.015] hover:shadow-2xl
                                ${workItem.status ? "border-l-4 sm:border-l-8 border-green-400 bg-gradient-to-r from-green-100/80 to-green-50" : "border-l-4 sm:border-l-8 border-red-400 bg-gradient-to-r from-red-100/80 to-red-50"}
                                animate-fade-in-up
                            `}
                            style={{ animationDelay: `${idx * 80}ms` }}
                        >
                            <div
                                className={`
                                    flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 sm:py-6 cursor-pointer transition-colors duration-300
                                    ${workItem.status
                                        ? "bg-green-500/90 text-white"
                                        : "bg-red-500/90 text-white"
                                    }
                                    relative
                                `}
                                onClick={() => toggleWorkItem(workItem._id)}
                            >
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="bg-white/30 p-2 sm:p-3 rounded-xl shadow-inner animate-bounce-in">
                                        <FaClipboard className="h-6 w-6 sm:h-7 sm:w-7 drop-shadow" />
                                    </div>
                                    <h1 className="text-lg sm:text-xl font-bold break-words max-w-[60vw] sm:max-w-xs drop-shadow">{workItem.title}</h1>
                                </div>

                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8 w-full">
                                    <div className="flex flex-col xs:flex-row items-center gap-1 xs:gap-2 sm:gap-4 bg-white/70 px-2 py-1 xs:px-4 xs:py-2 rounded-lg shadow-inner border border-gray-200">
                                        <span className="text-xs sm:text-sm font-semibold text-gray-600">
                                            <span className="inline-block font-bold text-indigo-600">Start:</span>
                                            <span className="ml-1">{workItem.startdate ? workItem.startdate.split("T")[0] : "N/A"}</span>
                                        </span>
                                        <span className="hidden xs:inline-block h-4 w-px bg-gray-300 mx-2"></span>
                                        <span className="text-xs sm:text-sm font-semibold text-gray-600">
                                            <span className="inline-block font-bold text-pink-500">End:</span>
                                            <span className="ml-1">{workItem.enddate ? workItem.enddate.split("T")[0] : "N/A"}</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center mt-1 sm:mt-0">
                                        <span
                                            className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold shadow transition
                                                ${workItem.status
                                                    ? "bg-green-100 text-green-700 border border-green-200"
                                                    : "bg-red-100 text-red-700 border border-red-200"
                                                }`}
                                        >
                                            {workItem.status ? (
                                                <>
                                                    <FaCheck className="inline-block text-green-500" /> <span className="hidden xs:inline">Complete</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FcCancel className="inline-block" /> <span className="hidden xs:inline">Incomplete</span>
                                                </>
                                            )}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        className="ml-auto flex items-center justify-center rounded-full bg-white/80 hover:bg-indigo-50 border border-gray-200 shadow transition p-2 focus:outline-none"
                                        tabIndex={-1}
                                        aria-label={expandedItems[workItem._id] ? "Collapse details" : "Expand details"}
                                    >
                                        <FaChevronDown
                                            className={`h-5 w-5 text-indigo-400 transition-transform duration-500 ${expandedItems[workItem._id] ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                </div>
                            </div>

                            <div
                                className={`
                                    bg-white transition-all duration-700 ease-in-out overflow-hidden
                                    ${expandedItems[workItem._id] ? "h-auto opacity-100 py-4 px-2 xs:py-6 xs:px-4 sm:px-8" : "max-h-0 opacity-0 py-0 px-0"}
                                    border-t border-gray-100
                                `}
                                style={{
                                    transitionProperty: "max-height, opacity, padding ",
                                }}
                            >
                                {addloading ? <Loader/> : (<div className="transition-opacity duration-700">
                                     
                                    <div className="mb-4 xs:mb-6">
                                        <h2 className="text-base xs:text-lg font-bold text-indigo-700 mb-2 xs:mb-3 flex items-center gap-2">
                                            <FaClipboard className="inline-block text-indigo-400" />
                                            Members In Project
                                        </h2>
                                    </div>
                                    <div className=" flex flex-col xs:flex-row xs:items-center xs:justify-between mb-3 xs:mb-5 gap-2 xs:gap-0">
                                       
                                        <h3 className="font-semibold text-gray-700 flex items-center gap-2 text-base xs:text-lg">
                                            <FaClipboardList className="h-5 w-5 text-indigo-500 animate-fade-in" />
                                            Tasks
                                        </h3>
                                        <button
                                            className="cursor-pointer text-indigo-600 border border-indigo-200 hover:bg-indigo-50 p-2 rounded-full shadow transition-all duration-200 hover:scale-110"
                                            onClick={e => {
                                                e.stopPropagation();
                                                setTaskModalFor(workItem._id);
                                            }}
                                            aria-label="Add Task"
                                        >
                                            <FaPlus />
                                        </button>
                                        {taskModalFor === workItem._id && (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2 xs:px-4 sm:px-0 animate-fade-in-fast">
                                                <div className="relative bg-white w-full max-w-xs xs:max-w-sm sm:max-w-md mx-auto rounded-2xl shadow-2xl p-4 xs:p-8 flex flex-col gap-4 xs:gap-5 border border-indigo-100 animate-pop-in">
                                                    <button
                                                        className="absolute top-2 right-2 xs:top-3 xs:right-3 text-gray-400 hover:text-indigo-600 transition"
                                                        onClick={() => setTaskModalFor(null)}
                                                        aria-label="Close"
                                                        type="button"
                                                    >
                                                        <div className='p-1 rounded-full text-lg font-bold hover:bg-gray-100 transition'>×</div>
                                                    </button>
                                                    <h3 className="text-xl xs:text-2xl font-bold text-indigo-700 mb-1 xs:mb-2 text-center">Add Task</h3>
                                                    <input
                                                        name="task"
                                                        value={inputtask}
                                                        onChange={(e) => setInputtask(e.target.value)}
                                                        type="text"
                                                        placeholder="Enter Task"
                                                        className="w-full p-2 xs:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                                                    />
                                                    <button
                                                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition"
                                                        type="button"
                                                        disabled={!inputtask || !inputtask.trim()}
                                                        onClick={() => {
                                                            if (inputtask && inputtask.trim()) {
                                                                handleAddtask(workItem._id, inputtask.trim());
                                                                setInputtask('');
                                                                setTaskModalFor(null);
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
                                        <div className="grid overflow-auto grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4 animate-fade-in-slow">
                                            {workItem.task.map((task, tIdx) => (
                                                <div
                                                    key={task._id}
                                                    className={`
                                                        p-3 xs:p-4 rounded-xl border transition-all duration-400 ease-in-out hover:shadow-md
                                                        flex items-center min-w-0 gap-2 xs:gap-3
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
                                                        className={`flex-shrink-0 p-1 xs:p-2 cursor-pointer rounded-full flex items-center justify-center border-2 transition-all duration-300
                                                            ${task.status
                                                                ? "bg-green-200 text-green-700 border-green-400 hover:bg-green-300"
                                                                : "bg-red-200 text-red-700 border-red-400 hover:bg-red-300"
                                                            }
                                                            hover:scale-110
                                                        `}
                                                        title={task.status ? "Mark as Incomplete" : "Mark as Complete"}
                                                    >
                                                        {
                                                            isLoadingTaskStatus && task._id === currentTaskId ? (
                                                                <FaSpinner className="h-4 w-4 xs:h-5 xs:w-5 animate-fill-right" />
                                                            ) : (
                                                                <>
                                                                    {task.status ? (
                                                                        <FaCheck className="h-4 w-4 xs:h-5 xs:w-5" />
                                                                    ) : (
                                                                        <FcCancel className="h-4 w-4 xs:h-5 xs:w-5" />
                                                                    )}
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                    <p
                                                        className={`font-medium truncate min-w-0 text-sm xs:text-base ${task.status ? "text-green-800" : "text-red-800"
                                                            }`}
                                                        title={task.title}
                                                    >
                                                        {task.title}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center text-gray-400 italic py-2 xs:py-4 animate-fade-in">
                                            No tasks yet. Add your first task!
                                        </div>
                                    )}
                                </div>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
           
            <style>
                {`
                @media (max-width: 400px) {
                    .xs\\:text-lg { font-size: 1.125rem; }
                    .xs\\:text-xl { font-size: 1.25rem; }
                    .xs\\:mb-2 { margin-bottom: 0.5rem; }
                    .xs\\:mb-3 { margin-bottom: 0.75rem; }
                    .xs\\:mb-4 { margin-bottom: 1rem; }
                    .xs\\:mb-6 { margin-bottom: 1.5rem; }
                    .xs\\:gap-2 { gap: 0.5rem; }
                    .xs\\:gap-3 { gap: 0.75rem; }
                    .xs\\:gap-4 { gap: 1rem; }
                    .xs\\:p-2 { padding: 0.5rem; }
                    .xs\\:p-3 { padding: 0.75rem; }
                    .xs\\:p-4 { padding: 1rem; }
                    .xs\\:p-8 { padding: 2rem; }
                    .xs\\:py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
                    .xs\\:py-4 { padding-top: 1rem; padding-bottom: 1rem; }
                    .xs\\:py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
                    .xs\\:px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
                    .xs\\:px-4 { padding-left: 1rem; padding-right: 1rem; }
                    .xs\\:max-w-sm { max-width: 24rem; }
                    .xs\\:max-w-xs { max-width: 20rem; }
                    .xs\\:inline { display: inline; }
                    .xs\\:inline-block { display: inline-block; }
                    .xs\\:flex-row { flex-direction: row; }
                    .xs\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                }
                @media (min-width: 401px) {
                    .xs\\:text-lg { font-size: 1.125rem; }
                    .xs\\:text-xl { font-size: 1.25rem; }
                    .xs\\:mb-2 { margin-bottom: 0.5rem; }
                    .xs\\:mb-3 { margin-bottom: 0.75rem; }
                    .xs\\:mb-4 { margin-bottom: 1rem; }
                    .xs\\:mb-6 { margin-bottom: 1.5rem; }
                    .xs\\:gap-2 { gap: 0.5rem; }
                    .xs\\:gap-3 { gap: 0.75rem; }
                    .xs\\:gap-4 { gap: 1rem; }
                    .xs\\:p-2 { padding: 0.5rem; }
                    .xs\\:p-3 { padding: 0.75rem; }
                    .xs\\:p-4 { padding: 1rem; }
                    .xs\\:p-8 { padding: 2rem; }
                    .xs\\:py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
                    .xs\\:py-4 { padding-top: 1rem; padding-bottom: 1rem; }
                    .xs\\:py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
                    .xs\\:px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
                    .xs\\:px-4 { padding-left: 1rem; padding-right: 1rem; }
                    .xs\\:max-w-sm { max-width: 24rem; }
                    .xs\\:max-w-xs { max-width: 20rem; }
                    .xs\\:inline { display: inline; }
                    .xs\\:inline-block { display: inline-block; }
                    .xs\\:flex-row { flex-direction: row; }
                    .xs\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                }
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
