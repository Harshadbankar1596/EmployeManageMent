import { useWorksMutation, useWorkstatusMutation, useTaskstatusMutation } from '../../redux/apislice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Works = () => {
    const [workstatus] = useWorkstatusMutation();
    const [taskstatus] = useTaskstatusMutation();
    const [works, { isLoading, isError, refetch }] = useWorksMutation();
    const id = useSelector((state) => state.user.id);
    const [work, setWork] = useState([]);
    useEffect(() => {
        works(id).then((res) => {
            setWork(res.data.works);
            console.log("res", res);
        }).catch((err) => {
            console.log(err);
        });
    }, [refetch]);

    const handleWorkstatus = (objid) => {
        workstatus({ userid: id, objid: objid }).then((res) => {
            console.log("res 2 ", res.data);
            setWork(res.data.workstatus);
        }).catch((err) => {
            console.log(err);
        })
    };

    const handleTaskstatus = (objid, taskid) => {
        taskstatus({ userid: id, objid: objid, taskid: taskid }).then((res) => {
            console.log("res 3 ", res.data);
            setWork(res.data.taskstatus);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className=''>
            {work?.map((workItem, idx) => (
                <details className="mb-4 shadow-2xl  rounded-xl " key={idx}>
                    <summary className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 py-4 sm:px-5 sm:py-5 rounded-xl ${workItem.status ? "bg-blue-500 text-white" : "bg-yellow-500 text-white"} cursor-pointer`}>
                        <h1 className="text-base sm:text-lg font-semibold break-words">{workItem.title}</h1>
                        <p className="text-sm sm:text-base">
                            {workItem.startdate ? workItem.startdate.split("T")[0] : ""}
                        </p>
                        <div className="flex items-center">
                            <label htmlFor={`complete-${idx}`} className="mr-2 text-sm sm:text-base"></label>
                            <input
                                onChange={() => handleWorkstatus(workItem._id)}
                                type="checkbox"
                                id={`complete-${idx}`}
                                name="complete"
                                checked={workItem.status}
                                readOnly
                                className="w-4 h-4"
                            />
                        </div>
                    </summary>
                    <div>
                        {workItem.task && workItem.task.length > 0 ? (
                            workItem.task.map((task, tIdx) => (
                                <div
                                    key={workItem._id}
                                    className={`justify-between px-5 py-5 my-2 rounded-lg shadow-sm bg-blue-100 flex items-center gap-2 ${task.status ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                                >

                                    <p>{task.title}</p>
                                    <div>
                                        <label htmlFor={`task-${tIdx}`} className="mr-2 text-sm sm:text-base">Task {tIdx + 1}:</label>
                                        <input
                                            type="checkbox"
                                            id={`task-${tIdx}`}
                                            name="task"
                                            checked={task.status}
                                            onChange={() => handleTaskstatus(workItem._id, task._id)}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="pl-6 py-1 text-gray-500">No tasks available.</div>
                        )}
                    </div>
                </details>
            ))}
        </div>
    );
}
export default Works;