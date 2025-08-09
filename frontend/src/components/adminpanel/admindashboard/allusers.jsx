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
            <div className="py-6 px-2 md:px-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-purple-700 drop-shadow-lg">All Users</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, idx) => (
                        <div
                            key={idx}
                            className="bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center"
                        >
                            <div className="relative mb-4">
                                <div className="w-24 h-24 rounded-full bg-purple-100"></div>
                                <span className="absolute bottom-0 right-0 w-5 h-5 bg-green-200 border-2 border-white rounded-full"></span>
                            </div>
                            <div className="h-6 w-32 bg-purple-100 rounded mb-2"></div>
                            <div className="h-4 w-24 bg-purple-100 rounded mb-4"></div>
                            <div className="h-10 w-32 bg-blue-100 rounded-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    if (error) return <p>Error loading users</p>;

    return (
        <div className="py-6 px-2 md:px-8 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-8 text-purple-700 drop-shadow-lg">All Users</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {users?.userdata.map((user, index) => {
                    const base64Image = btoa(
                        new Uint8Array(user?.img?.data?.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    );
                    return (
                        <div
                            key={index}
                            className="bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl duration-300"
                        >
                            <div className="relative mb-4">
                                <img
                                    src={`data:image/jpeg;base64,${base64Image}`}
                                    alt={user.name}
                                    className="w-24 h-24 object-cover rounded-full border-4 border-purple-300 shadow-md"
                                />
                                <span className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></span>
                            </div>
                            <p className="text-xl font-semibold text-gray-800 mb-2">{user.name}</p>
                            <p className="text-sm text-gray-500 mb-4">{user.email}</p>
                            <Link to={`/admin/employee/${user.userid}`} className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-6 rounded-full font-medium shadow hover:from-blue-500 hover:to-purple-500 transition-colors duration-200">
                                View Profile
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AllUsers;
