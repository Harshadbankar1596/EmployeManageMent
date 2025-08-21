import React from 'react'
import { useGetAllProjectsQuery } from '../../../redux/adminapislice'
import { Link } from 'react-router-dom'
import Loader from '../../loader'

const Superadminproject = () => {
    const { data: projects, isLoading: projectsLoading } = useGetAllProjectsQuery()

    function openproject(projectid) {
        // console.log('ids', projectid)
    }

    if (projectsLoading) {
        return (
            <Loader/>
        )
    }

    return (
        <div className="w-full min-h-screen py-12 px-2 animate-fadeIn">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-10 text-center tracking-tight drop-shadow-lg animate-slideDown">
                    <span className="inline-block  text-red-500 bg-clip-text">
                        Project Overview
                    </span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects?.allprojects?.length === 0 && (
                        <div className="col-span-full text-center text-gray-400 text-xl py-16 bg-white/60 rounded-xl shadow-inner ">
                            <svg className="mx-auto mb-3 w-10 h-10 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75h.008v.008H9.75V9.75zm4.5 0h.008v.008h-.008V9.75zm-7.5 2.25a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zm7.5 3.75v.008h.008V15.75H12z" />
                            </svg>
                            No projects found.
                        </div>
                    )}
                    {projects?.allprojects?.map((project, idx) => (
                        <Link to={`/superadmin/projects/${project._id}`}
                            // onClick={()=>openproject(project._id)}
                            key={project._id}
                            className="bg-white/90 cursor-pointer rounded-3xl shadow-xl p-8 border border-blue-200 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.025] transition-all duration-300 relative overflow-hidden group animate-fadeInUp"
                            style={{ animationDelay: `${idx * 80}ms` }}
                        >
                            <div className="absolute top-5 right-5 z-10">
                                {project.status ? (
                                    <span className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-green-200 to-green-100 text-green-800 border border-green-300 shadow animate-bounceIn">
                                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Completed
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-red-200 to-red-100 text-red-800 border border-red-300 shadow animate-pulse">
                                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2" />
                                        </svg>
                                        Active
                                    </span>
                                )}
                            </div>
                            {/* <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-30 blur-2xl z-0 animate-float"></div>
                            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-200 rounded-full opacity-20 blur-2xl z-0 animate-float2"></div> */}
                            <h3 className="text-2xl font-bold text-blue-800 mb-2 tracking-wide z-10 relative animate-slideRight">
                                {project.title}
                            </h3>
                            <div className="flex items-center gap-3 text-base text-gray-700 mb-1 z-10 relative animate-fadeIn">
                                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="font-medium text-yellow-400">Duration:</span>
                                <span>
                                    <span className="font-semibold text-gray-800">{new Date(project.startdate).toLocaleDateString()}</span>
                                    <span className="mx-1 text-gray-400">—</span>
                                    <span className="font-semibold text-gray-800">{new Date(project.enddate).toLocaleDateString()}</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-base text-gray-700 z-10 relative animate-fadeIn">
                                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4.13a4 4 0 10-8 0 4 4 0 008 0z" />
                                </svg>
                                <span className="font-medium text-black">Members:</span>
                                <span className="flex items-center gap-1">
                                    <span className="font-semibold text-gray-800">{project.members?.length || 0}</span>
                                    <svg className="w-2 h-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <circle cx="10" cy="10" r="10" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn { animation: fadeIn 0.8s ease; }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                .animate-fadeInUp { animation: fadeInUp 0.7s cubic-bezier(.4,0,.2,1) both;}
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-40px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                .animate-slideDown { animation: slideDown 0.7s cubic-bezier(.4,0,.2,1) both;}
                @keyframes slideRight {
                    from { opacity: 0; transform: translateX(-40px);}
                    to { opacity: 1; transform: translateX(0);}
                }
                .animate-slideRight { animation: slideRight 0.7s cubic-bezier(.4,0,.2,1) both;}
                @keyframes float {
                    0%, 100% { transform: translateY(0);}
                    50% { transform: translateY(-10px);}
                }
                .animate-float { animation: float 4s ease-in-out infinite;}
                @keyframes float2 {
                    0%, 100% { transform: translateY(0);}
                    50% { transform: translateY(10px);}
                }
                .animate-float2 { animation: float2 5s ease-in-out infinite;}
                @keyframes bounceIn {
                    0% { transform: scale(0.7); opacity: 0;}
                    60% { transform: scale(1.1); opacity: 1;}
                    100% { transform: scale(1); }
                }
                .animate-bounceIn { animation: bounceIn 0.7s cubic-bezier(.4,0,.2,1) both;}
                `}
            </style>
        </div>
    )
}
export default Superadminproject