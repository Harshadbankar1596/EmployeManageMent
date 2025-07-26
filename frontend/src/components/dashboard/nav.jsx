// import {useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate , Link } from 'react-router-dom'
// import { useGetimageMutation } from '../../redux/apislice'
// const Nav = () => {
//     const user = useSelector((state) => state.user)
//     const navigate = useNavigate()
//     const [getimage] = useGetimageMutation()
//     const [image , setImage] = useState(null)
    

//     useEffect(() => {
//         const fetchImage = async () => {
//             const res = await getimage(user.id).unwrap()
//             setImage(res.image.data)
//             console.log(res.image.data)
//         }
//         fetchImage()
//     }, [user.id])
//     return (
//         <div className=' flex justify-between items-center  rounded-md px-2 sm:px-4 md:px-5 py-4 sm:py-3 md:py-5 bg-blue-900'>
//             <div className='flex items-center gap-1 sm:gap-2 md:gap-4 w-fit'>
//                 <div className='border border-white rounded-full p-1 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20'>
//                     <img className='bg-yellow-400 rounded-full w-full h-full object-cover' src={image || "/dp.svg"} alt="" />
//                 </div>
//                 <div>
//                     <p className='text-white font-bold text-xs sm:text-sm md:text-lg lg:text-xl'>{user.name || "Don"}</p>
//                     <p className='text-white text-xs sm:text-xs md:text-sm'>{user.role || "Full Stack Developer"}</p>
//                 </div>
//             </div>
//             <div>
//                 <Link to={"/profile"} className='text-black font-semibold px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-md bg-yellow-400 text-xs sm:text-xs md:text-sm lg:text-base hover:bg-yellow-300 transition-colors'>
//                     Edit Profile    
//                 </Link>
//             </div>
//         </div>
//     )
// }

// export default Nav


import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {  Link } from 'react-router-dom';
import { useGetimageMutation } from '../../redux/apislice';

const Nav = () => {
  const user = useSelector((state) => state.user);
  const [getimage] = useGetimageMutation();
  const [image, setImage] = useState(null);

  const bufferToBase64 = (buffer) => {
    if (!buffer) return '';
    let bytes;
    if (Array.isArray(buffer)) {
      bytes = new Uint8Array(buffer);
    } else if (buffer && buffer.type === 'Buffer' && Array.isArray(buffer.data)) {
      bytes = new Uint8Array(buffer.data);
    } else {
      bytes = buffer;
    }
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await getimage(user.id).unwrap();

        
        if (res && res.image) {
          if (typeof res.image === 'string') {
            
            setImage(`data:image/jpeg;base64,${res.image}`);
          } else if (res.image.data) {
            
            const contentType = res.image.contentType || 'image/jpeg';
            const base64String = bufferToBase64(res.image.data);
            setImage(`data:${contentType};base64,${base64String}`);
          } else {
            setImage(null);
          }
        } else {
          setImage(null);
        }
      } catch (error) {
        setImage(null);
      }
    };

    if (user.id) {
      fetchImage();
    }
  }, [user.id, getimage]);

  return (
    <div className='flex justify-between items-center rounded-md px-2 sm:px-4 md:px-5 py-4 sm:py-3 md:py-5 bg-blue-900'>
      <div className='flex items-center gap-1 sm:gap-2 md:gap-4 w-fit'>
        <div className='border border-white rounded-full p-1 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20'>
          <img
            className='bg-yellow-400 rounded-full w-full h-full object-cover'
            src={image || '/dp.svg'}
            alt='Profile'
          />
        </div>
        <div>
          <p className='text-white font-bold text-xs sm:text-sm md:text-lg lg:text-xl'>
            {user.name || 'Don'}
          </p>
          <p className='text-white text-xs sm:text-xs md:text-sm'>
            {user.role || 'Full Stack Developer'}
          </p>
        </div>
      </div>
      <div>
        <Link
          to={'/profile'}
          className='text-black font-semibold px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-md bg-yellow-400 text-xs sm:text-xs md:text-sm lg:text-base hover:bg-yellow-300 transition-colors'
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default Nav;
