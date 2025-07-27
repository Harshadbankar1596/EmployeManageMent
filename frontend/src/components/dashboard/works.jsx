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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Works Dashboard</h1>
                    <p className="text-gray-600 max-w-md mx-auto">
                        Manage all your assigned works and tasks in one place
                    </p>
                </div>

                <div className="space-y-6">
                    {work.map((workItem, idx) => (
                        <div
                            key={workItem._id}
                            className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.01] ${workItem.status ? "border-l-4 border-green-500" : "border-l-4 border-red-500"
                                }`}
                        >
                            <div
                                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 py-5 sm:px-6 cursor-pointer transition-colors duration-300 ${workItem.status
                                    ? "bg-green-500 text-white"
                                    : "bg-red-500 text-white"
                                    }`}
                                onClick={() => toggleWorkItem(workItem._id)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        <FaClipboard className="h-6 w-6" />
                                    </div>
                                    <h1 className="text-lg font-bold break-words max-w-xs">{workItem.title}</h1>
                                </div>

                                <div className="flex items-center gap-6">

                                    <p className="text-sm sm:text-base bg-black/10 px-3 py-1 rounded-md">
                                        {workItem.startdate ? workItem.startdate.split("T")[0] : "N/A"}
                                    </p>

                                    <div className="flex items-center">
                                        <label htmlFor={`complete-${workItem._id}`} className="mr-2 text-sm font-medium">{workItem.status ? "Complete" : "InComplete"}</label>

                                    </div>

                                    <div className="transform transition-transform duration-300">
                                        <FaChevronDown
                                            className={`h-5 w-5 transition-transform duration-300 ${expandedItems[workItem._id] ? "rotate-180" : ""}`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`bg-white transition-all duration-500 ease-in-out overflow-hidden ${expandedItems[workItem._id] ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="p-4 sm:p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-medium text-gray-700 flex items-center gap-2">
                                            <FaClipboardList className="h-5 w-5 text-indigo-500" />
                                            Tasks
                                        </h3>
                                        <div className='cursor-pointer text-gray-500 border p-1 rounded-full' onClick={() => setTaskmodal(true)}>
                                            <FaPlus />
                                        </div>
                                        {taskmodal && (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 sm:px-0">
                                                <div className="relative bg-white w-full max-w-md mx-auto rounded-xl shadow-lg p-6 sm:p-8 flex flex-col gap-4">
                                                    <button
                                                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition"
                                                        onClick={() => setTaskmodal(false)}
                                                        aria-label="Close"
                                                        type="button"
                                                    >
                                                        <div className='p-1 rounded-full text-gray-500 font-bold'>
                                                            X
                                                        </div>
                                                    </button>
                                                    <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Add Task</h3>
                                                    <input
                                                        name="task"
                                                        value={inputtask}
                                                        onChange={(e) => setInputtask(e.target.value)}
                                                        type="text"
                                                        placeholder="Enter Task"
                                                        className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                                                    />
                                                    <button
                                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition"
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
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                        {workItem.task.map((task) => (
                                          <div
                                            key={task._id}
                                            className={`
                                              p-3 sm:p-4 rounded-lg border transition-all duration-300 ease-in-out hover:shadow-md 
                                              flex items-center min-w-0 ${task.status 
                                                ? "border-green-200 bg-green-50" 
                                                : "border-red-200 bg-red-50"
                                              }`}
                                          >
                                            <div className="flex items-center min-w-0 flex-1 gap-3">
                                              <div
                                                onClick={() => handleTaskstatus(workItem._id, task._id)}
                                                className={`flex-shrink-0 p-1.5 sm:p-2 cursor-pointer rounded-full ${
                                                  task.status 
                                                    ? "bg-green-200 text-green-700" 
                                                    : "bg-red-200 text-red-700"
                                                }`}
                                              >
                                                {task.status ? (
                                                  <FaCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                                                ) : (
                                                  <FcCancel className="h-4 w-4 sm:h-5 sm:w-5" />
                                                )}
                                              </div>
                                              <p 
                                                className={`font-medium truncate min-w-0 ${
                                                  task.status ? "text-green-800" : "text-red-800"
                                                }`}
                                                title={task.title} 
                                              >
                                                {task.title}
                                              </p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Works;

{/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {workItem.task.map((task) => (
                                                <div
                                                    key={task._id}
                                                    className={`p-4 rounded-lg border transition-all duration-300 ease-in-out hover:shadow-md flex items-center justify-between gap-3 ${task.status ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            onClick={() => handleTaskstatus(workItem._id, task._id)}
                                                            className={`p-2 cursor-pointer rounded-full ${task.status ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
                                                                }`}>
                                                            {task.status ? (
                                                                <FaCheck className="h-5 w-5" />
                                                            ) : (
                                                                <FcCancel className="h-5 w-5" />
                                                            )}
                                                        </div>
                                                        <p className={`font-medium ${task.status ? "text-green-800" : "text-red-800"}`}>
                                                            {task.title}
                                                        </p>
                                                    </div>


                                                </div>
                                            ))}
                                        </div> */}