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
    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center rounded-lg px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-5 bg-blue-900 gap-3 sm:gap-4'>
      {/* User Info Section */}
      <div className='flex items-center gap-2 sm:gap-3 lg:gap-4 w-full sm:w-auto'>
        <div className='border border-white rounded-full p-1 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 flex-shrink-0'>
          <img
            className='bg-yellow-400 rounded-full w-full h-full object-cover'
            src={image || '/dp.svg'}
            alt='Profile'
          />
        </div>
        <div className='min-w-0 flex-1'>
          <p className='text-white font-bold text-sm sm:text-base lg:text-lg xl:text-xl truncate'>
            {user.name || 'Don'}
          </p>
          <p className='text-white text-xs sm:text-sm lg:text-base opacity-90 truncate'>
            {user.role || 'Full Stack Developer'}
          </p>
        </div>
      </div>
      
      {/* Edit Profile Button */}
      <div className='w-full sm:w-auto'>
        <Link
          to={'/profile'}
          className='w-full sm:w-auto inline-flex justify-center items-center text-black font-semibold px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-md bg-yellow-400 text-xs sm:text-sm lg:text-base hover:bg-yellow-300 transition-colors duration-200'
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
