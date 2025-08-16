import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useGetprojectMutation, useGetallmembersnameQuery, useAddmemberinprojectMutation, useAddtaskMutation , useGetallmemebersadminMutation } from '../../../redux/adminapislice'
// import { useGetallmemebersMutation } from '../../../redux/apislice';

import { HiOutlinePlus } from 'react-icons/hi';
import { MdOutlineCalendarToday, MdOutlineCalendarMonth } from 'react-icons/md';
import { FaRegCheckCircle } from 'react-icons/fa';
import { BsExclamationCircle } from 'react-icons/bs';
import Loader from '../../loader';

const ShimmerProjectHeader = () => (
  <div className="flex flex-col sm:flex-row items-center justify-between gap-10 mt-12 w-full max-w-4xl mx-auto">
    <div className="flex-1 w-full">
      <div className="h-10 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 rounded w-2/3 mb-4 animate-pulse"></div>
      <div className="flex gap-6 mt-4">
        <div className="h-6 w-32 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 rounded animate-pulse"></div>
        <div className="h-6 w-32 bg-gradient-to-r from-green-100 via-green-50 to-green-100 rounded animate-pulse"></div>
        <div className="h-6 w-32 bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 rounded animate-pulse"></div>
      </div>
    </div>
    <div>
      <div className="h-12 w-36 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-pulse"></div>
    </div>
  </div>
);

const ShimmerEmployeeCard = () => (
  <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 animate-pulse">
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 via-blue-50 to-blue-100"></div>
    <div className="flex-1 w-full">
      <div className="h-6 w-1/3 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 rounded mb-2"></div>
      <div className="h-4 w-1/4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mb-2"></div>
      <div className="h-4 w-2/3 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded mb-1"></div>
      <div className="h-4 w-1/2 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded"></div>
    </div>
  </div>
);

const superadminprojectdetails = () => {
  const { id: projectid } = useParams();
  const [getproject, { isLoading: a1 }] = useGetprojectMutation();
  const [getallmembers, { isLoading: a2, refetch: refetchMembers }] = useGetallmemebersadminMutation();
  const { data: membersname, isLoading: a3 } = useGetallmembersnameQuery()
  const [projectdetail, setProjectDetail] = useState(null);
  const [employeeProject, setEmployeeProject] = useState([]);
  const [loadingProject, setLoadingProject] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [Addmemberinproject, { isLoading: addmemberloading }] = useAddmemberinprojectMutation();
  const [addtask, { isLoading: addtaskloading }] = useAddtaskMutation();
  const [tasktext, setTasktext] = useState("");
  const [taskModalFor, setTaskModalFor] = useState(null);
  const [membersRefreshKey, setMembersRefreshKey] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      setLoadingProject(true);
      try {
        const data = await getproject(projectid).unwrap();
        setProjectDetail(data.project);
      } catch (error) {
        setProjectDetail(null);
      }
      setLoadingProject(false);
    };
    if (projectid) fetchProject();
  }, [getproject, projectid]);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoadingMembers(true);
      try {
        if (projectdetail && Array.isArray(projectdetail.members) && projectdetail.members.length > 0) {
          const data = await getallmembers({ userid: projectdetail.members, projectid }).unwrap();
          setEmployeeProject(data.members);
        } else {
          setEmployeeProject([]);
        }
      } catch (error) {
        setEmployeeProject([]);
      }
      setLoadingMembers(false);
    };
    if (projectid && projectdetail) fetchMembers();
    // eslint-disable-next-line
  }, [getallmembers, projectid, projectdetail, membersRefreshKey , refetchMembers]);

  const getImageSrc = (img) => {
    if (!img?.data) return null;
    try {
      return `data:${img.contentType};base64,${btoa(
        new Uint8Array(img.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
      )}`;
    } catch {
      return null;
    }
  };

  function handleselect(e) {
    const { value } = e.target;
    if (value && !selectedMembers.includes(value)) {
      setSelectedMembers([...selectedMembers, value]);
    }
  }

  function handleadd() {
    if (selectedMembers.length > 0) {
      const membersToAdd = selectedMembers.map(memberId => ({ memberId, projectid }));
      Addmemberinproject(membersToAdd)
        .then(() => {
          if (typeof refetchMembers === "function") refetchMembers();
          else refetchMembers()
          setMembersRefreshKey(prev => prev + 1);
          setSelectedMembers([]);
        })
        .catch(() => {
          setSelectedMembers([]);
        });
    }
  }

  const handleAddTask = async (userid) => {
  if(tasktext.length === 0 ) alert("task length is 0")
  else{
    try {
      await addtask({ userid, projectid, task: tasktext }).unwrap();
      setTasktext("");
      setTaskModalFor(null);
      if (typeof refetchMembers === "function") refetchMembers();
      setMembersRefreshKey(prev => prev + 1);
    } catch (err) {
      setTaskModalFor(null);
      setTasktext("");
      if (typeof refetchMembers === "function") refetchMembers();
      setMembersRefreshKey(prev => prev + 1);
    }
  };
}
  return (
    <div className="min-h-screen py-10 ">

      {addmemberloading || a1 || a2 || a3 && (
        <Loader/>
      )}

      <nav className="relative bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-50 rounded-3xl px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-10 mt-8 w-full max-w-4xl mx-auto shadow-2xl border border-yellow-300">
        {loadingProject ? (
          <ShimmerProjectHeader />
        ) : (
          <>
            <div className="flex flex-col gap-4 flex-1 z-10 min-w-0">
              <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-green-500 animate-gradient-x truncate drop-shadow-lg">
                {projectdetail?.title || "Project Title"}
              </h1>
              <div className="flex flex-wrap gap-6 text-gray-700 mt-4 text-base md:text-lg">
                <span className="flex items-center gap-2 min-w-[150px]">
                  <MdOutlineCalendarToday className="w-6 h-6 text-blue-400" />
                  <span>
                    <span className="font-semibold text-blue-800">Start:</span>{" "}
                    {projectdetail?.startdate ? new Date(projectdetail.startdate).toLocaleDateString() : "--"}
                  </span>
                </span>
                <span className="flex items-center gap-2 min-w-[150px]">
                  <MdOutlineCalendarMonth className="w-6 h-6 text-green-400" />
                  <span>
                    <span className="font-semibold text-green-800">End:</span>{" "}
                    {projectdetail?.enddate ? new Date(projectdetail.enddate).toLocaleDateString() : "--"}
                  </span>
                </span>
                <span className="flex items-center gap-2 min-w-[150px]">
                  {projectdetail?.staus ? (
                    <span className="inline-flex items-center px-4 py-2 text-base font-semibold rounded-full bg-green-100 text-green-800 border border-green-300 shadow ">
                      <FaRegCheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-4 py-2 text-base font-semibold rounded-full bg-red-100 text-red-800 border border-red-300 shadow ">
                      <BsExclamationCircle className="w-5 h-5 mr-2 text-red-500" />
                      Active
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className="flex items-center z-10 gap-4 mt-4">
              <div>
                <select
                  onChange={handleselect}
                  name="members"
                  id="members"
                  className="px-4 py-2 rounded-lg border border-blue-300 bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 font-semibold"
                >
                  <option value="">Add Member</option>
                  {membersname?.usersname?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleadd}
                className="ml-2 px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold shadow hover:scale-105 hover:from-blue-600 hover:to-green-500 transition-transform duration-200"
                type="button"
              >
                Add
              </button>
            </div>
          </>
        )}
      </nav>

      <div className="space-y-8 mt-12 max-w-5xl mx-auto w-full">
        {loadingMembers
          ? Array.from({ length: 3 }).map((_, idx) => <ShimmerEmployeeCard key={idx} />)
          : employeeProject && employeeProject.length > 0 ? (
            employeeProject.map((employee, idx) => (
              <div
                key={idx}
                className="flex flex-col  gap-6 md:gap-10 bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-blue-100 hover:shadow-2xl transition-shadow duration-200 group w-full animate-fade-in"
              >

                <div className="flex flex-col md:flex-row items-center md:items-start w-full gap-6 p-4 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative group">

                  {/* Employee Image */}
                  <div className="relative flex-shrink-0">
                    {getImageSrc(employee.img) ? (
                      <img
                        src={getImageSrc(employee.img)}
                        alt={employee.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-indigo-400 shadow-md group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-indigo-100 via-white to-indigo-100 flex items-center justify-center text-2xl sm:text-3xl text-indigo-500 font-bold shadow-md">
                        {employee.name?.[0] || "?"}
                      </div>
                    )}
                  </div>

                  {/* Employee Details */}
                  <div className="flex-1 flex flex-col gap-3 w-full">
                    {/* Name & Status Badge */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xl sm:text-2xl font-bold text-gray-800">{employee.name}</span>
                      {employee.projectinfo?.status ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200 animate-pulse">
                          Completed
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200 animate-pulse">
                          Active
                        </span>
                      )}
                    </div>

                    {/* Status Text */}
                    <div className="text-gray-600 text-sm">
                      <span className="font-medium">Status:</span>{" "}
                      {employee.projectinfo?.status ? (
                        <span className="text-green-600 font-semibold">Completed</span>
                      ) : (
                        <span className="text-yellow-600 font-semibold">Active</span>
                      )}
                    </div>

                    {/* Add Task Button */}
                    <button
                      onClick={() => setTaskModalFor(employee.userid)}
                      className="mt-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-2 animate-bounce"
                      type="button"
                      style={{ minWidth: 100 }}
                    >
                      <HiOutlinePlus className=" h-5" />
                      Add Task
                    </button>
                  </div>

                  {/* Modal */}
                  {taskModalFor === employee.userid && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2 animate-fade-in-fast">
                      <div className="relative bg-white w-full max-w-sm mx-auto rounded-2xl shadow-2xl p-6 flex flex-col gap-4 border border-indigo-100 animate-pop-in">
                        {/* Close Button */}
                        <button
                          className="absolute top-3 right-3 text-gray-400 hover:text-indigo-600 transition"
                          onClick={() => setTaskModalFor(null)}
                          aria-label="Close"
                          type="button"
                        >
                          <div className='p-1 rounded-full text-lg font-bold hover:bg-gray-100 transition'>×</div>
                        </button>

                        <h3 className="text-xl font-bold text-indigo-700 text-center">Add Task</h3>

                        {/* Input */}
                        <input
                          name="task"
                          value={tasktext}
                          onChange={(e) => setTasktext(e.target.value)}
                          type="text"
                          placeholder="Enter Task"
                          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />

                        {/* Add Button */}
                        <button
                          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300"
                          type="button"
                          onClick={async () => {
                            await handleAddTask(employee.userid);
                            setTasktext('');
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Second Div: Task Table */}
                <div className="flex-1 w-full">
                  <div className="font-semibold text-gray-800 mb-2 text-lg">Tasks</div>
                  <div className="overflow-x-auto w-full">
                    <table className="min-w-full border border-gray-200 rounded-lg shadow-sm bg-white animate-fade-in">
                      <thead>
                        <tr className="bg-blue-50">
                          <th className="px-4 py-2 text-left text-sm font-semibold text-blue-900 border-b">#</th>
                          <th className="px-4 py-2 text-left text-sm font-semibold text-blue-900 border-b">Title</th>
                          <th className="px-4 py-2 text-left text-sm font-semibold text-blue-900 border-b">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employee.projectinfo?.task && employee.projectinfo.task.length > 0 ? (
                          employee.projectinfo.task.map((task, tIdx) => (
                            <tr key={tIdx} className="hover:bg-blue-50 transition animate-fade-in">
                              <td className="px-4 py-2 border-b text-gray-700">{tIdx + 1}</td>
                              <td className="px-4 py-2 border-b font-medium text-blue-800">{task.title}</td>
                              <td className="px-4 py-2 border-b">
                                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${task.status ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} border ${task.status ? 'border-green-200' : 'border-yellow-200'} animate-pulse`}>
                                  {task.status ? "Completed" : "Active"}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3} className="px-4 py-2 text-gray-400 italic text-center">No tasks assigned.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loadingMembers && (
              <div className="text-center text-gray-400 text-lg py-12">
                No members found for this project.
              </div>
            )
          )
        }
      </div>
    </div>
  );
};

export default superadminprojectdetails;