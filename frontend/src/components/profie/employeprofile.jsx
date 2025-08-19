// import React, { useState } from 'react';
// import { useUploadprofileimgMutation, useUpdateprofileMutation } from '../../redux/apislice';
// import { useSelector } from 'react-redux';
// import { setUser } from '../../redux/userslice/userslice';
// import { useDispatch } from 'react-redux';
// import { useLogoutUserMutation } from '../../redux/apislice';
// import { useNavigate } from "react-router-dom"
// import Loader from "../loader.jsx"
// const EmployeProfile = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [uploadProfileImg, { isloadingup: isloadingup, isSuccess, isError, error }] = useUploadprofileimgMutation();
//   const [updateprofile, { isloadingup: isUpdateLoading }] = useUpdateprofileMutation();
//   const [message, setMessage] = useState("");
//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     phone: user?.phone || ''
//     // role removed
//   });

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!selectedFile) {
//       setMessage("Please select an image file.");
//       return;
//     }
//     if (!user?.id) {
//       setMessage("User not found.");
//       return;
//     }
//     try {
//       await uploadProfileImg({ id: user.id, img: preview }).unwrap();
//       setMessage("Profile image uploaded successfully!");
//     } catch (err) {
//       setMessage("Failed to upload image.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!user?.id) {
//       setMessage("User not found.");
//       return;
//     }
//     try {
//       const res = await updateprofile({ id: user.id, data: formData }).unwrap();
//       dispatch(setUser(res.user));
//       console.log(user)
//       setMessage("Profile updated successfully!");
//     } catch (err) {
//       console.log("error => ", err)
//       setMessage("Failed to update profile.");
//     }
//   };

//   const [logoutLoading, setLogoutLoading] = useState(false);
//   const [logoutUser] = useLogoutUserMutation();
//   const navigate = useNavigate();

//   function Logout() {
//     setLogoutLoading(true);
//     navigate('/login');
//     logoutUser().then(() => {
//       dispatch(setUser(null))
//       setLogoutLoading(false);
//     })
//       .catch((err) => {
//         setMessage("Failed to log out.");
//       });
//   }


//   return (
//     <>

//       {(isUpdateLoading || isloadingup) && (<Loader />)}

//       <div className='flex flex-col items-center justify-center'>
//         <div className="max-w-3xl mx-auto p-0 sm:p-0 lg:p-0 bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-3xl shadow-2xl my-14 border border-blue-100">
//           <div className="flex flex-col md:flex-row">
//             {/* Profile Image Section */}
//             <div className="w-full md:w-2/5 flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-50 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none p-8 border-b md:border-b-0 md:border-r border-blue-200">
//               <div className="mb-6">
//                 <h2 className="text-xl font-bold text-blue-800 mb-2 tracking-wide">Profile Image</h2>
//                 <div className="relative mb-4">
//                   {preview ? (
//                     <img
//                       src={preview}
//                       alt="Preview"
//                       className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-full border-4 border-blue-300 shadow-xl"
//                     />
//                   ) : (
//                     <div className="bg-blue-200 border-4 border-dashed border-blue-300 rounded-full w-32 h-32 md:w-36 md:h-36 flex items-center justify-center">
//                       <svg className="w-14 h-14 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                       </svg>
//                     </div>
//                   )}
//                 </div>
//                 <form onSubmit={handleUpload} className="flex flex-col items-center gap-3">
//                   <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow-md font-semibold transition-all duration-200">
//                     <span>Choose Image</span>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleFileChange}
//                       className="hidden"
//                     />
//                   </label>
//                   <button
//                     type="submit"
//                     disabled={isloadingup || !selectedFile}
//                     className={`w-40 py-2 rounded-full text-white font-semibold shadow-md ${isloadingup || !selectedFile
//                       ? 'bg-gray-300 cursor-not-allowed'
//                       : 'bg-blue-600 hover:bg-blue-700'
//                       } transition-all duration-200`}
//                   >
//                     {isloadingup ? (
//                       <span className="flex items-center justify-center">
//                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Uploading...
//                       </span>
//                     ) : "Upload Image"}
//                   </button>
//                 </form>
//               </div>
//             </div>

//             {/* Profile Update Section */}
//             <div className="w-full md:w-3/5 flex flex-col justify-center p-8">
//               <h1 className="text-3xl font-extrabold text-green-800 mb-6 text-center md:text-left tracking-tight">Employee Profile</h1>
//               <form onSubmit={handleUpdate} className="space-y-5">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
//                   <input
//                     name="name"
//                     type="text"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
//                     placeholder="Enter your full name"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
//                   <input
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     required
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
//                     placeholder="Enter your email address"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
//                   <input
//                     name="phone"
//                     type="text"
//                     required
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
//                     placeholder="Enter your phone number"
//                   />
//                 </div>
//                 {/* Role field removed */}
//                 <button
//                   type="submit"
//                   disabled={isUpdateLoading}
//                   className={`w-full py-2 rounded-full text-white font-bold shadow-md ${isUpdateLoading
//                     ? 'bg-gray-300 cursor-not-allowed'
//                     : 'bg-green-600 hover:bg-green-700'
//                     } transition-all duration-200`}
//                 >
//                   {isUpdateLoading ? (
//                     <span className="flex items-center justify-center">
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Updating...
//                     </span>
//                   ) : "Update Profile"}
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Status Messages */}
//           {message && (
//             <div className={`mt-8 mx-8 p-4 rounded-xl text-center font-semibold shadow ${message.includes("success")
//               ? "bg-green-50 text-green-800 border border-green-200"
//               : "bg-red-50 text-red-800 border border-red-200"
//               }`}>
//               {message}
//             </div>
//           )}
//         </div>

//         <div
//           onClick={() => Logout()}
//           className='border bg-black px-10 py-5 w-1/2 cursor-pointer my-5 flex items-center justify-center rounded-full'>
//           <button className='text-white font-bold text-2xl'>Logout</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EmployeProfile;


import React, { useState } from 'react';
import { useUploadprofileimgMutation, useUpdateprofileMutation, useLogoutUserMutation } from '../../redux/apislice';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/userslice/userslice';
import { useNavigate } from "react-router-dom";
import Loader from "../loader.jsx";

const EmployeProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  // ✅ Correct RTK Query destructuring
  const [uploadProfileImg, { isLoading: isUploading }] = useUploadprofileimgMutation();
  const [updateProfile, { isLoading: isUpdateLoading }] = useUpdateprofileMutation();
  const [logoutUser] = useLogoutUserMutation();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return setMessage("Please select an image file.");
    if (!user?.id) return setMessage("User not found.");

    try {
      await uploadProfileImg({ id: user.id, img: preview }).unwrap();
      setMessage("Profile image uploaded successfully!");
    } catch {
      setMessage("Failed to upload image.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user?.id) return setMessage("User not found.");

    try {
      const res = await updateProfile({ id: user.id, data: formData }).unwrap();
      dispatch(setUser(res.user)); // ✅ use returned user
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("error => ", err);
      setMessage("Failed to update profile.");
    }
  };

  const Logout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(setUser(null));
      navigate('/login'); // ✅ navigate only after logout success
    } catch {
      setMessage("Failed to log out.");
    }
  };

  return (
    <>
      {(isUpdateLoading || isUploading) && <Loader />}

      <div className='flex flex-col items-center justify-center'>
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-3xl shadow-2xl my-14 border border-blue-100">
          <div className="flex flex-col md:flex-row">

            {/* Profile Image Section */}
            <div className="w-full md:w-2/5 flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-50 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none p-8 border-b md:border-b-0 md:border-r border-blue-200">
              <h2 className="text-xl font-bold text-blue-800 mb-2 tracking-wide">Profile Image</h2>
              <div className="relative mb-4">
                {preview || user?.img ? (
                  <img
                    src={preview || user?.img}
                    alt="Profile"
                    className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-full border-4 border-blue-300 shadow-xl"
                  />
                ) : (
                  <div className="bg-blue-200 border-4 border-dashed border-blue-300 rounded-full w-32 h-32 flex items-center justify-center">
                    <svg className="w-14 h-14 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <form onSubmit={handleUpload} className="flex flex-col items-center gap-3">
                <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow-md font-semibold transition-all duration-200">
                  <span>Choose Image</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
                <button
                  type="submit"
                  disabled={isUploading || !selectedFile}
                  className={`w-40 py-2 rounded-full text-white font-semibold shadow-md ${isUploading || !selectedFile
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'} transition-all duration-200`}
                >
                  {isUploading ? "Uploading..." : "Upload Image"}
                </button>
              </form>
            </div>

            {/* Profile Update Section */}
            <div className="w-full md:w-3/5 flex flex-col justify-center p-8">
              <h1 className="text-3xl font-extrabold text-green-800 mb-6">Employee Profile</h1>
              <form onSubmit={handleUpdate} className="space-y-5">
                <input name="name" type="text" value={formData.name} onChange={handleChange} required
                  className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400" placeholder="Enter your full name" />
                <input name="email" type="email" value={formData.email} onChange={handleChange} required
                  className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400" placeholder="Enter your email" />
                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required
                  className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400" placeholder="Enter your phone number" />

                <button type="submit" disabled={isUpdateLoading}
                  className={`w-full py-2 rounded-full text-white font-bold shadow-md ${isUpdateLoading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'}`}>
                  {isUpdateLoading ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </div>
          </div>

          {/* Status Messages */}
          {message && (
            <div className={`mt-8 mx-8 p-4 rounded-xl text-center font-semibold shadow 
              ${message.includes("success") ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
              {message}
            </div>
          )}
        </div>

        {/* Logout */}
        <div onClick={Logout}
          className='border bg-black px-10 py-5 w-1/2 cursor-pointer my-5 flex items-center justify-center rounded-full'>
          <button className='text-white font-bold text-2xl'>Logout</button>
        </div>
      </div>
    </>
  );
};

export default EmployeProfile;
