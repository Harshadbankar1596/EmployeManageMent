import { useEffect } from 'react';
import { useGetAllUsersQuery } from '../../../redux/adminapislice';
import { Link } from 'react-router-dom';

const AllUsers = () => {
    const { data: users, isLoading, error } = useGetAllUsersQuery();

    useEffect(() => {
        console.log(users);
    }, [users]);

    if (isLoading) {
        return (
            <div className="py-6 px-2 md:px-8 min-h-screen">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">All Users</h2>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Photo</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[...Array(6)].map((_, idx) => (
                                    <tr key={idx} className="animate-pulse">
                                        <td className="px-4 py-4 text-sm text-gray-400">{idx + 1}</td>
                                        <td className="px-4 py-4">
                                            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-40 bg-gray-200 rounded"></div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-56 bg-gray-200 rounded"></div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-9 w-28 bg-gray-200 rounded"></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
    if (error) return <p>Error loading users</p>;

    return (
        <div className="py-6 px-2 md:px-8 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">All Users</h2>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Photo</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {Array.isArray(users?.userdata) && users.userdata.length > 0 ? (
                                users.userdata.map((user, index) => {
                                    const base64Image = btoa(
                                        new Uint8Array(user?.img?.data?.data).reduce(
                                            (data, byte) => data + String.fromCharCode(byte),
                                            ''
                                        )
                                    );
                                    return (
                                        <tr key={user.userid || index} className="hover:bg-gray-50">
                                            <td className="px-4 py-4 text-sm text-gray-700">{index + 1}</td>
                                            <td className="px-4 py-4">
                                                <div className="relative w-10 h-10">
                                                    <img
                                                        src={`data:image/jpeg;base64,${base64Image}`}
                                                        alt={user.name}
                                                        className="w-10 h-10 object-cover rounded-full border-2 border-gray-300 shadow"
                                                    />
                                                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-800">{user.name}</td>
                                            
                                            <td className="px-4 py-4">
                                                <Link
                                                    to={`/admin/employee/${user.userid}`}
                                                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-4 rounded-md text-sm font-medium shadow-sm transition-colors"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
