import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useGetprojectMutation } from '../../../redux/adminapislice'
import { useGetallmemebersMutation } from '../../../redux/apislice';

// React Icons imports
import { HiOutlineCalendar, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlinePlus } from 'react-icons/hi';
import { MdOutlineCalendarToday, MdOutlineCalendarMonth } from 'react-icons/md';
import { FaRegCheckCircle } from 'react-icons/fa';
import { BsExclamationCircle } from 'react-icons/bs';

const ShimmerProjectHeader = () => (
  <div className="  flex flex-col sm:flex-row items-center justify-between gap-10 mt-12 w-full max-w-4xl mx-auto">
    <div className="flex-1 w-full">
      <div className="h-10 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 rounded w-2/3 mb-4"></div>
      <div className="flex gap-6 mt-4">
        <div className="h-6 w-32 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 rounded"></div>
        <div className="h-6 w-32 bg-gradient-to-r from-green-100 via-green-50 to-green-100 rounded"></div>
        <div className="h-6 w-32 bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 rounded"></div>
      </div>
    </div>
    <div>
      <div className="h-12 w-36 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl"></div>
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
  const [getproject] = useGetprojectMutation();
  const [getallmembers] = useGetallmemebersMutation();

  const [projectdetail, setProjectDetail] = useState(null);
  const [employeeProject, setEmployeeProject] = useState([]);
  const [loadingProject, setLoadingProject] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(true);

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
  }, [getallmembers, projectid, projectdetail]);

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

 

  return (
    <div className="min-h-screen py-10">
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
                  {/* Start Date Icon */}
                  <MdOutlineCalendarToday className="w-6 h-6 text-blue-400" />
                  <span>
                    <span className="font-semibold text-blue-800">Start:</span>{" "}
                    {projectdetail?.startdate ? new Date(projectdetail.startdate).toLocaleDateString() : "--"}
                  </span>
                </span>
                <span className="flex items-center gap-2 min-w-[150px]">
                  {/* End Date Icon */}
                  <MdOutlineCalendarMonth className="w-6 h-6 text-green-400" />
                  <span>
                    <span className="font-semibold text-green-800">End:</span>{" "}
                    {projectdetail?.enddate ? new Date(projectdetail.enddate).toLocaleDateString() : "--"}
                  </span>
                </span>
                <span className="flex items-center gap-2 min-w-[150px]">
                  {projectdetail?.staus ? (
                    <span className="inline-flex items-center px-4 py-2 text-base font-semibold rounded-full bg-green-100 text-green-800 border border-green-300 shadow ">
                      {/* Completed Icon */}
                      <FaRegCheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-4 py-2 text-base font-semibold rounded-full bg-red-100 text-red-800 border border-red-300 shadow ">
                      {/* Active Icon */}
                      <BsExclamationCircle className="w-5 h-5 mr-2 text-red-500" />
                      Active
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className="flex items-center z-10">
              <button
                className="px-7 py-3 bg-gradient-to-r from-blue-700 via-blue-500 to-green-500 text-white font-bold rounded-xl shadow-lg transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 hover:scale-105 hover:shadow-2xl"
                onClick={() => alert("Add Members functionality coming soon!")}
              >
                <span className="flex items-center gap-2">
                  {/* Add Members Icon */}
                  <HiOutlinePlus className="w-5 h-5" />
                  Add Members
                </span>
              </button>
            </div>
          </>
        )}
      </nav>

      <div className="space-y-8 mt-12 max-w-4xl mx-auto">
        {loadingMembers
          ? Array.from({ length: 3 }).map((_, idx) => <ShimmerEmployeeCard key={idx} />)
          : employeeProject && employeeProject.length > 0 ? (
            employeeProject.map((employee, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8 border border-blue-100 hover:shadow-2xl transition-shadow duration-200 group"
              >
                <div className="relative">
                  {getImageSrc(employee.img) ? (
                    <img
                      src={getImageSrc(employee.img)}
                      alt={employee.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-blue-400 shadow-lg group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 via-blue-50 to-blue-100 flex items-center justify-center text-3xl text-blue-400 font-bold shadow-lg">
                      {employee.name?.[0] || "?"}
                    </div>
                  )}
                </div>
                <div className="flex-1 w-full">
                  <div className="text-2xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                    {employee.name}
                    {employee.projectinfo?.status ? (
                      <span className="ml-2 px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-700 border border-green-200">Completed</span>
                    ) : (
                      <span className="ml-2 px-2 py-0.5 rounded text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200">Active</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-gray-700 text-base mb-2">
                    <span>
                      <span className="font-semibold">Status:</span>{" "}
                      {employee.projectinfo?.status ? (
                        <span className="text-green-600 font-semibold">Completed</span>
                      ) : (
                        <span className="text-yellow-600 font-semibold">Active</span>
                      )}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 mb-1">Tasks:</div>
                    <ul className="list-disc pl-6 space-y-1">
                      {employee.projectinfo?.task && employee.projectinfo.task.length > 0 ? (
                        employee.projectinfo.task.map((task, tIdx) => (
                          <li key={tIdx} className="flex items-center gap-2">
                            <span className="font-medium text-blue-800">{task.title}</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${task.status ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} border ${task.status ? 'border-green-200' : 'border-yellow-200'}`}>
                              {task.status ? "Completed" : "Active"}
                            </span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-400 italic">No tasks assigned.</li>
                      )}
                    </ul>
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