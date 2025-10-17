// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import {  Link , useNavigate} from 'react-router-dom';
// import { useGetimageMutation } from '../../redux/apislice';
// import { useScreenshotMutation } from '../../redux/apislice';

// const Nav = () => {
//   const user = useSelector((state) => state.user);
//   const Navigate = useNavigate();
//   const [getimage] = useGetimageMutation();
//   const [image, setImage] = useState(null);

//   useEffect(()=>{
//     setTimeout(() => {
//       if(user.id === ""){
//         Navigate("/login")
//       }
//     }, 1);
//   }, []);




//   return (
//     <div
//       className='flex flex-col sm:flex-row justify-between items-start sm:items-center rounded-lg px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-5 bg-blue-900 gap-3 sm:gap-4 nav-animated-container'
//       style={{
//         animation: 'navFadeIn 1.1s cubic-bezier(0.4,0,0.2,1) both'
//       }}
//     >
//       {/* User Info Section */}
//       <div
//         className='flex items-center gap-2 sm:gap-3 lg:gap-4 w-full sm:w-auto nav-animated-user'
//         style={{
//           animation: 'navSlideInLeft 1.2s cubic-bezier(0.4,0,0.2,1) 0.1s both'
//         }}
//       >
//         <div
//           className='border border-white rounded-full p-1 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 flex-shrink-0 nav-animated-avatar'
//           style={{
//             animation: 'navAvatarPop 1.2s cubic-bezier(0.4,0,0.2,1) 0.2s both'
//           }}
//         >
//           <img
//             className='bg-yellow-400 rounded-full w-full h-full object-cover'
//             src={image || '/dp.svg'}
//             alt='Profile'
//             style={{
//               animation: 'navImgFadeIn 1.2s cubic-bezier(0.4,0,0.2,1) 0.3s both'
//             }}
//           />
//         </div>
//         <div className='min-w-0 flex-1'>
//           <p
//             className='text-white font-bold text-sm sm:text-base lg:text-lg xl:text-xl truncate'
//             style={{
//               animation: 'navTextFadeIn 1.2s cubic-bezier(0.4,0,0.2,1) 0.35s both'
//             }}
//           >
//             {user.name || 'None'}
//           </p>
//           <p
//             className='text-white text-xs sm:text-sm lg:text-base opacity-90 truncate'
//             style={{
//               animation: 'navTextFadeIn 1.2s cubic-bezier(0.4,0,0.2,1) 0.4s both'
//             }}
//           >
//             {user.role || 'Full Stack Developer'}
//           </p>
//         </div>
//       </div>

//       {/* Edit Profile Button */}
//       <div
//         className='w-full sm:w-auto nav-animated-btn'
//         style={{
//           animation: 'navSlideInRight 1.2s cubic-bezier(0.4,0,0.2,1) 0.2s both'
//         }}
//       >
//         <Link
//           to={'/profile'}
//           className='w-full sm:w-auto inline-flex justify-center items-center text-black font-semibold px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-md bg-yellow-400 text-xs sm:text-sm lg:text-base hover:bg-yellow-300 transition-colors duration-200'
//           style={{
//             animation: 'navBtnPop 1.2s cubic-bezier(0.4,0,0.2,1) 0.45s both'
//           }}
//         >
//           <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//           </svg>
//           Edit Profile
//         </Link>
//       </div>
//       <style>
//         {`
//           @keyframes navFadeIn {
//             0% { opacity: 0; transform: scale(0.98) translateY(20px);}
//             100% { opacity: 1; transform: scale(1) translateY(0);}
//           }
//           @keyframes navSlideInLeft {
//             0% { opacity: 0; transform: translateX(-40px);}
//             100% { opacity: 1; transform: translateX(0);}
//           }
//           @keyframes navSlideInRight {
//             0% { opacity: 0; transform: translateX(40px);}
//             100% { opacity: 1; transform: translateX(0);}
//           }
//           @keyframes navAvatarPop {
//             0% { opacity: 0; transform: scale(0.7);}
//             80% { opacity: 1; transform: scale(1.08);}
//             100% { opacity: 1; transform: scale(1);}
//           }
//           @keyframes navImgFadeIn {
//             0% { opacity: 0;}
//             100% { opacity: 1;}
//           }
//           @keyframes navTextFadeIn {
//             0% { opacity: 0; transform: translateY(10px);}
//             100% { opacity: 1; transform: translateY(0);}
//           }
//           @keyframes navBtnPop {
//             0% { opacity: 0; transform: scale(0.8);}
//             80% { opacity: 1; transform: scale(1.05);}
//             100% { opacity: 1; transform: scale(1);}
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Nav;


import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGetimageQuery } from '../../redux/apislice'; // mutation nahi, query import karo
import { useEffect } from 'react';

const Nav = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Get image from backend
  const { data, isLoading } = useGetimageQuery(user.id, { skip: !user.id });

  useEffect(() => {
    if (!user.id) {
      setTimeout(() => navigate("/login"), 1);
    }
  }, [user.id, navigate]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center rounded-lg px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-5 bg-blue-900 gap-3 sm:gap-4">
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 w-full sm:w-auto">
        <div className="border border-white rounded-full p-1 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 flex-shrink-0">
          <img
            className="bg-yellow-400 rounded-full w-full h-full object-cover"
            src={data?.imageUrl || "/dp.svg"}
            alt="Profile"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-white font-bold text-sm sm:text-base lg:text-lg xl:text-xl truncate">
            {user.name || "None"}
          </p>
          <p className="text-white text-xs sm:text-sm lg:text-base opacity-90 truncate">
            {user.role || "Full Stack Developer"}
          </p>
        </div>
      </div>

      <div className="w-full sm:w-auto">
        <Link
          to="/profile"
          className="w-full sm:w-auto inline-flex justify-center items-center text-black font-semibold px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-md bg-yellow-400 text-xs sm:text-sm lg:text-base hover:bg-yellow-300 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default Nav;
