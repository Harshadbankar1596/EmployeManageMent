import React, { useEffect, useState } from 'react';
import { useWorksMutation, useWorkstatusMutation } from '../../redux/apislice';
import { useSelector } from 'react-redux';
import { FiCheck, FiLoader, FiClipboard } from 'react-icons/fi';

const Works = () => {
    const id = useSelector((state) => state.user.id);
    const [fetchWorks, { isLoading }] = useWorksMutation();
    const [worksData, setWorksData] = useState([]);
    const [workstatus, { isLoading: isWorkStatusLoading }] = useWorkstatusMutation();
    const [updatingIndex, setUpdatingIndex] = useState(null);

    useEffect(() => {
        if (id) {
            fetchWorks(id)
                .unwrap()
                .then((res) => {
                    setWorksData(res.works || []);
                })
                .catch(console.error);
        }
    }, [id, fetchWorks]);

    const handleStatusChange = (index) => {
        setUpdatingIndex(index);
        workstatus({ id, index })
            .unwrap()
            .then((res) => {
                setWorksData(res.workstatus || []);
            })
            .catch(console.error)
            .finally(() => setUpdatingIndex(null));
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <FiLoader className="animate-spin text-3xl text-blue-500 mb-3" />
                <p className="text-gray-600">Loading your tasks...</p>
            </div>
        );
    }

    if (!worksData || worksData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-xl p-6 text-center">
                <FiClipboard className="text-4xl text-gray-400 mb-3" />
                <h3 className="text-xl font-medium text-gray-700 mb-1">No tasks found</h3>
                <p className="text-gray-500">Add new tasks to get started</p>
            </div>
        );
    }

    return (
        <div className="space-y-3 h-96 overflow-y-auto scrollbar-hide">
            {worksData.map((work, index) => (
                <div
                    key={work._id || index}
                    className={`
                        flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                          shadow-sm hover:shadow-md
                        ${work.status ? 'bg-green-200 ' : 'bg-white'}
                    `}
                >
                    <button
                        onClick={() => handleStatusChange(index)}
                        disabled={isWorkStatusLoading && updatingIndex === index}
                        className={`
                            w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0
                            border-2 transition-colors duration-300 focus:outline-none
                            ${work.status 
                                ? 'bg-green-500 border-green-500 text-white' 
                                : 'border-gray-300 hover:border-blue-400'}
                        `}
                    >
                        {updatingIndex === index ? (
                            <FiLoader className="animate-spin" />
                        ) : work.status ? (
                            <FiCheck className="font-bold" />
                        ) : null}
                    </button>

                    <div className="flex-1 min-w-0">
                        <p className={`
                            font-medium truncate transition-all
                            ${work.status ? 'text-green-700 line-through' : 'text-gray-800'}
                        `}>
                            {work.work}
                        </p>
                    </div>

                    <span className={`
                        px-3 py-1 rounded-full text-xs font-semibold
                        ${work.status 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'}
                    `}>
                        {work.status ? "Completed" : "Pending"}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Works;