import React from 'react'
import { useGetAllProjectsQuery } from '../../../redux/adminapislice'
import { Link } from 'react-router-dom'
import Loader from '../../loader'

const Assinproject = () => {
    const { data: projects, isLoading: projectsLoading } = useGetAllProjectsQuery()

    if (projectsLoading) {
        return <Loader/>
    }

    return (
        <div className="py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-blue-900 mb-4">
                        Project Dashboard
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Manage and assign tasks across all your projects in one place
                    </p>
                </div>

                {projects?.allprojects?.length === 0 ? (
                    <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-12 text-center shadow-xl border border-white/50">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6">
                            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">No projects yet</h3>
                        <p className="text-gray-600 mb-6">Get started by creating your first project</p>
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            Create Project
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects?.allprojects?.map((project, idx) => (
                            <Link 
                                to={`/superadmin/projects/${project._id}`}
                                key={project._id}
                                className="group"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-white/50 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 animate-card-in">
                                    {/* Project header with gradient */}
                                    <div className="h-3 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                                    
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{project.title}</h3>
                                            <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${project.status ? 'bg-green-100' : 'bg-orange-100'}`}>
                                                {project.status ? (
                                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                                            {project.description || "No description provided for this project."}
                                        </p>
                                        
                                        <div className="space-y-4">
                                            {/* Date info */}
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Timeline</p>
                                                    <p className="text-sm font-medium text-gray-800">
                                                        {new Date(project.startdate).toLocaleDateString()} - {new Date(project.enddate).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            {/* Members info */}
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4.13a4 4 0 10-8 0 4 4 0 008 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Team Members</p>
                                                    <p className="text-sm font-medium text-gray-800">
                                                        {project.members?.length || 0} {project.members?.length === 1 ? 'member' : 'members'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                                                {project.status ? 'Completed' : 'In Progress'}
                                            </span>
                                            <span className="text-blue-600 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform duration-300">
                                                View Details
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes card-in {
                    from { 
                        opacity: 0;
                        transform: scale(0.9) translateY(30px);
                    }
                    to { 
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
                
                .animate-card-in {
                    opacity: 0;
                    animation: card-in 0.6s ease-out forwards;
                }
                
                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    )
}

export default Assinproject