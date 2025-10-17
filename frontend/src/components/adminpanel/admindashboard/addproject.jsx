import { useState, useMemo, useCallback } from 'react'
import { useGetAllUsersQuery, useAddprojectMutation } from '../../../redux/adminapislice.js'
import { Addprojectmodal } from '../../modals/modal.jsx';
const bufferToBase64 = (buffer) => {
    
    if (!buffer) return '';
    let binary = '';
    const bytes = Array.isArray(buffer) ? buffer : Array.from(buffer);
    const len = bytes.length;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

const UserSkeleton = () => (
    <div className="flex items-center px-3 py-2 rounded-lg">
        <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
        <div className="h-4 bg-gray-300 rounded flex-1"></div>
    </div>

);

const Addproject = () => {
    const [openmodal , setopenmodal] = useState(false)
    const [addproject , {isLoading : mutationloading}] = useAddprojectMutation()
    const { data: users, isLoading } = useGetAllUsersQuery()
    const [members, setmembers] = useState([])
    const [form, setForm] = useState({
        title: '',
        startDate: '',
        endDate: ''
    })

    const userList = useMemo(() => {
        if (!users?.userdata) return [];
        return users.userdata.map(user => ({
            ...user,
            base64Image: user.img?.data?.data
                ? bufferToBase64(user.img.data.data)
                : ''
        }));
    }, [users]);

    // Memoize selected members for chips
    const selectedMembers = useMemo(() => {
        if (!members.length) return [];
        return userList.filter(u => members.includes(u.userid));
    }, [userList, members]);

    const handleInputChange = useCallback((e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }, []);

    const handleMemberClick = useCallback((userid) => {
        setmembers(prev =>
            prev.includes(userid)
                ? prev.filter(id => id !== userid)
                : [...prev, userid]
        )
    }, []);

    async function handlesubmit(e) {
        e.preventDefault()
        const obj = {
            membersid: members,
            details: form
        }
        addproject(obj).unwrap().then((v) => {
            // console.log(v)
            setForm({
                title: '',
                startDate: '',
                endDate: ''
            })
            setmembers([])
            setopenmodal(true)
            setTimeout(() => {
                setopenmodal(false)
            }, 1000);
        })
        // console.log(obj)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center py-8 px-4 bg-gray-50">
                <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6 md:p-8 w-full max-w-lg flex flex-col items-center">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900 text-center">
                        Add new project
                    </h2>
                    <div className="w-full">
                        <div className="space-y-2">
                            {[...Array(6)].map((_, index) => (
                                <UserSkeleton key={index} />
                            ))}
                        </div>
                        <div className="mt-4 text-center text-gray-500 text-sm">Loading users…</div>
                    </div>
                </div>
                <style jsx>{`
                    @keyframes fade-in {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in {
                        animation: fade-in 0.6s ease-out;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <>
        {openmodal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <Addprojectmodal />
            </div>
        )}

        {mutationloading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 flex flex-col items-center animate-fade-in">
                    <svg className="animate-spin h-12 w-12 text-[#1a73e8] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <div className="text-gray-800 font-medium text-base">Adding project…</div>
                </div>
                <style jsx>{`
                    @keyframes fade-in {
                        from { opacity: 0; transform: scale(0.95);}
                        to { opacity: 1; transform: scale(1);}
                    }
                    .animate-fade-in {
                        animation: fade-in 0.4s ease;
                    }
                `}</style>
            </div>
        )}
        <div className="min-h-screen flex items-center justify-center py-8 px-4 bg-gray-50">
            <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6 md:p-8 w-full max-w-lg">
                <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900 text-center">
                    Add new project
                </h2>
                <form onSubmit={handlesubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                            Project Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter Project Title..."
                            value={form.title}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#1a73e8] focus:border-[#1a73e8] bg-white text-gray-900"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="startDate">
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={form.startDate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#1a73e8] focus:border-[#1a73e8] bg-white text-gray-900"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="endDate">
                                End Date
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={form.endDate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#1a73e8] focus:border-[#1a73e8] bg-white text-gray-900"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="members">
                            Select Members
                        </label>
                        <div className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-within:ring-1 focus-within:ring-[#1a73e8] focus-within:border-[#1a73e8] transition-all duration-200 h-48 overflow-y-auto bg-white">
                            <div data-lenis-prevent className="space-y-2">
                                {userList.map((user) => {
                                    const isSelected = members.includes(user.userid)
                                    return (
                                        <button
                                            type="button"
                                            key={user.userid}
                                            onClick={() => handleMemberClick(user.userid)}
                                            className={`flex items-center px-3 py-2 rounded-md text-left transition-colors duration-150 ${isSelected
                                                    ? 'bg-[#E8F0FE] border border-[#1a73e8] text-[#1a73e8] font-medium'
                                                    : 'bg-gray-50 hover:bg-gray-100 text-gray-800 border border-transparent'
                                                }`}
                                        >
                                            <div className="relative">
                                                <img
                                                    src={user?.img?.data || '/dp.svg'}
                                                    alt={user.name}
                                                    className="w-8 h-8 rounded-full mr-3 object-cover"
                                                    onError={(e) => {
                                                        e.target.src = '/default-avatar.png';
                                                    }}
                                                />
                                                {isSelected && (
                                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#1a73e8] rounded-full flex items-center justify-center">
                                                        <span className="text-white text-[10px] font-bold">✓</span>
                                                    </div>
                                                )}
                                            </div>
                                            <span className="font-medium">{user.name}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        
                        {selectedMembers.length > 0 && (
                            <div className="mt-4 animate-fade-in">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Selected Members ({selectedMembers.length})
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {selectedMembers.map((user, index) => (
                                        <span
                                            key={user.userid}
                                            className="flex items-center bg-[#E8F0FE] rounded-full px-3 py-1.5 text-sm font-medium text-[#1a73e8] animate-slide-in"
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            <img
                                                src={ user?.img?.data ||'/dp.svg'}
                                                alt={user.name}
                                                className="w-5 h-5 rounded-full mr-2 object-cover"
                                                onError={(e) => {
                                                    e.target.src = '/default-avatar.png';
                                                }}
                                            />
                                            {user.name}
                                            <button
                                                type="button"
                                                onClick={() => handleMemberClick(user.userid)}
                                                className="ml-2 text-[#1a73e8] hover:text-[#1558d6] transition-colors duration-200"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white py-3 rounded-lg font-medium transition-colors duration-150 shadow-sm bg-[#1a73e8] hover:bg-[#1558d6] active:bg-[#1558d6]"
                    >
                        Add project
                    </button>
                </form>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slide-in {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
                
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out forwards;
                }
            `}</style>
        </div>
        </>
    )
}

export default Addproject