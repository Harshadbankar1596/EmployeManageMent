import { useEffect, useState } from 'react';
import { useGetAllUsersQuery } from '../../../redux/adminapislice';
import { Link } from 'react-router-dom';

const AllUsers = () => {
    const { data: users, isLoading, error } = useGetAllUsersQuery();
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Small delay for initial animation
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="py-6 px-2 md:px-8 min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Loading Users</h2>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {[...Array(6)].map((_, idx) => (
                                        <tr key={idx} className="">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{idx + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-200 to-gray-300"></div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="h-4 w-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="h-4 w-56 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="h-9 w-28 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    if (error) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center animate-bounce-in">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Users</h3>
                <p className="text-gray-600 mb-6">Please try again later</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                    Retry
                </button>
            </div>
        </div>
    );

    return (
        <div className={`py-8 px-4 md:px-8 min-h-screen  transition-all duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Employee Management
                    </h2>
                    <p className="text-gray-600">Manage all registered users in the system</p>
                </div>
                
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-800">All Users</h3>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {users?.userdata?.length || 0} users
                        </span>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {Array.isArray(users?.userdata) && users.userdata.length > 0 ? (
                                    users.userdata.map((user, index) => {
                                        const base64Image = user?.img?.data?.data 
                                            ? btoa(new Uint8Array(user.img.data.data).reduce(
                                                (data, byte) => data + String.fromCharCode(byte), ''
                                            ))
                                            : null;
                                        
                                        return (
                                            <tr 
                                                key={user.userid || index} 
                                                className="transition-all duration-300 hover:bg-gray-50 transform hover:scale-[1.01]"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-12 w-12 relative">
                                                            <img
                                                                src={base64Image ? `data:image/jpeg;base64,${base64Image}` : '/dp.svg'}
                                                                alt={user.name}
                                                                className="h-12 w-12 rounded-full object-cover border-2 border-white shadow"
                                                            />
                                                            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-500"></span>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                            <div className="text-sm text-gray-500">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Active
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link
                                                        to={`/admin/employee/${user.userid}`}
                                                        className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium shadow-sm transition-all duration-300 transform hover:-translate-y-1 mr-2"
                                                    >
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                                        </svg>
                                                        View
                                                    </Link>
                                                    
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                                <h3 className="text-lg font-medium text-gray-700 mb-1">No users found</h3>
                                                <p className="text-gray-500">There are currently no users in the system.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;