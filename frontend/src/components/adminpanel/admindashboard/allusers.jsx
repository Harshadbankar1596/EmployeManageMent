import { useEffect } from 'react';
import { useGetAllUsersQuery } from '../../../redux/adminapislice';

const AllUsers = () => {
    const { data: users, isLoading, error } = useGetAllUsersQuery();

    useEffect(() => {
        console.log(users);
    }, [users]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading users</p>;

    return (
        <div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users?.userdata.map((user, index) => {
                    const base64Image = btoa(
                        new Uint8Array(user.img.data.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    );
                    return (
                        <div
                            key={index}
                            className="border p-4 rounded-md flex items-center justify-between gap-4"
                        >
                            <div className='flex items-center gap-5'>
                                <img
                                    src={`data:image/jpeg;base64,${base64Image}`}
                                    alt={user.name}
                                    className="w-16 h-16 object-cover rounded-full"
                                />
                                <p className="text-lg font-medium">{user.name}</p>
                            </div>
                            <div>
                                <button className='bg-yellow-500 py-2 px-5 rounded-md'>
                                    Viwe Profile
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AllUsers;
