import {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Nav = () => {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    useEffect(() => {
        if (user.name === "") {
            navigate("/login")
        }
    }, [user.name])
    return (
        <div className='border flex justify-between items-center border-gray-300 rounded-md px-2 sm:px-4 md:px-5 py-4 sm:py-3 md:py-5 bg-blue-500'>
            <div className='flex items-center gap-1 sm:gap-2 md:gap-4 w-fit'>
                <div className='border border-white rounded-full p-1 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20'>
                    <img className='bg-yellow-400 rounded-full w-full h-full object-cover' src="/dp.svg" alt="" />
                </div>
                <div>
                    <p className='text-white font-bold text-xs sm:text-sm md:text-lg lg:text-xl'>{user.name || "Don"}</p>
                    <p className='text-white text-xs sm:text-xs md:text-sm'>{user.role || "Full Stack Developer"}</p>
                </div>
            </div>
            <div>
                <button className='text-black font-semibold px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-md bg-yellow-400 text-xs sm:text-xs md:text-sm lg:text-base hover:bg-yellow-300 transition-colors'>
                    Edit Profile    
                </button>
            </div>
        </div>
    )
}

export default Nav