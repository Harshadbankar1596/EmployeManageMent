import React, { use, useEffect, useState, memo } from 'react';
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
      <div className="h-10 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 rounded w-2/3 mb-4  "></div>
      <div className="flex gap-6 mt-4">
        <div className="h-6 w-32 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 rounded "></div>
        <div className="h-6 w-32 bg-gradient-to-r from-green-100 via-green-50 to-green-100 rounded "></div>
        <div className="h-6 w-32 bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 rounded "></div>
      </div>
    </div>
    <div>
      <div className="h-12 w-36 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl "></div>
    </div>
  </div>
);

const ShimmerEmployeeCard = () => (
  <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 ">
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 via-blue-50 to-blue-100"></div>
    <div className="flex-1 w-full">
      <div className="h-6 w-1/3 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 rounded mb-2"></div>
      <div className="h-4 w-1/4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mb-2"></div>
      <div className="h-4 w-2/3 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded mb-1"></div>
      <div className="h-4 w-1/2 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded"></div>
    </div>
  </div>
);

const Projectdetails = () => {
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

      <nav className="relative bg-white rounded-xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-8 mt-8 w-full max-w-4xl mx-auto shadow-sm border border-gray-200">
        {loadingProject ? (
          <ShimmerProjectHeader />
        ) : (
          <>
            <div className="flex flex-col gap-4 flex-1 z-10 min-w-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 truncate">
                {projectdetail?.title || "Project Title"}
              </h1>
              <div className="flex flex-wrap gap-6 text-gray-700 mt-2 text-base md:text-lg">
                <span className="flex items-center gap-2 min-w-[150px]">
                  <MdOutlineCalendarToday className="w-5 h-5 text-gray-500" />
                  <span>
                    <span className="font-semibold text-gray-800">Start:</span>{" "}
                    {projectdetail?.startdate ? new Date(projectdetail.startdate).toLocaleDateString() : "--"}
                  </span>
                </span>
                <span className="flex items-center gap-2 min-w-[150px]">
                  <MdOutlineCalendarMonth className="w-5 h-5 text-gray-500" />
                  <span>
                    <span className="font-semibold text-gray-800">End:</span>{" "}
                    {projectdetail?.enddate ? new Date(projectdetail.enddate).toLocaleDateString() : "--"}
                  </span>
                </span>
                <span className="flex items-center gap-2 min-w-[150px]">
                  {projectdetail?.staus ? (
                    <span className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full bg-green-100 text-green-800 border border-green-200">
                      <FaRegCheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                      <BsExclamationCircle className="w-4 h-4 mr-2 text-yellow-600" />
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
                  className="px-4 py-2 rounded-md border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
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
                className="ml-2 px-5 py-2 rounded-md bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 transition-colors"
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
                className="flex flex-col gap-6 md:gap-8 bg-white rounded-xl shadow-sm p-6 md:p-7 border border-gray-200 hover:shadow-md transition-shadow duration-200 w-full"
              >

                <div className="flex flex-col md:flex-row items-center md:items-start w-full gap-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">

                  {/* Employee Image */}
                  <div className="relative flex-shrink-0">
                    {getImageSrc(employee.img) ? (
                      <img
                        src={getImageSrc(employee.img)}
                        alt={employee.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-gray-300 shadow"
                      />
                    ) : (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 flex items-center justify-center text-2xl sm:text-3xl text-gray-500 font-bold shadow">
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
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                          Completed
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200">
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
                      className="mt-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                      type="button"
                      style={{ minWidth: 100 }}
                    >
                      <HiOutlinePlus className=" h-5" />
                      Add Task
                    </button>
                  </div>

                  {/* Modal */}
                  {taskModalFor === employee.userid && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
                      <div className="relative bg-white w-full max-w-sm mx-auto rounded-xl shadow-lg p-6 flex flex-col gap-4 border border-gray-200">
                        {/* Close Button */}
                        <button
                          className="absolute top-3 right-3 text-gray-400 hover:text-indigo-600 transition"
                          onClick={() => setTaskModalFor(null)}
                          aria-label="Close"
                          type="button"
                        >
                          <div className='p-1 rounded-full text-lg font-bold hover:bg-gray-100 transition'>×</div>
                        </button>

                        <h3 className="text-lg font-semibold text-gray-800 text-center">Add Task</h3>

                        {/* Input */}
                        <input
                          name="task"
                          value={tasktext}
                          onChange={(e) => setTasktext(e.target.value)}
                          type="text"
                          placeholder="Enter Task"
                          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />

                        {/* Add Button */}
                        <button
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md shadow-sm transition-colors duration-200"
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
                    <table className="min-w-full border border-gray-200 rounded-lg shadow-sm bg-white">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">#</th>
                          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Title</th>
                          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employee.projectinfo?.task && employee.projectinfo.task.length > 0 ? (
                          employee.projectinfo.task.map((task, tIdx) => (
                            <tr key={tIdx} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-2 border-b text-gray-700">{tIdx + 1}</td>
                              <td className="px-4 py-2 border-b font-medium text-gray-800">{task.title}</td>
                              <td className="px-4 py-2 border-b">
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${task.status ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} border ${task.status ? 'border-green-200' : 'border-yellow-200'}`}>
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

export default Projectdetails;