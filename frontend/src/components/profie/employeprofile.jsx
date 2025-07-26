import React, { useState } from 'react';
import { useUploadprofileimgMutation, useUpdateprofileMutation } from '../../redux/apislice';
import { useSelector } from 'react-redux';
import { setUser } from '../../redux/userslice/userslice';
import { useDispatch } from 'react-redux';

const EmployeProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadProfileImg, { isLoading, isSuccess, isError, error }] = useUploadprofileimgMutation();
  const [updateprofile, { isLoading: isUpdateLoading }] = useUpdateprofileMutation();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || ''
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage("Please select an image file.");
      return;
    }
    if (!user?.id) {
      setMessage("User not found.");
      return;
    }
    try {
      await uploadProfileImg({ id: user.id, img: preview }).unwrap();
      setMessage("Profile image uploaded successfully!");
    } catch (err) {
      setMessage("Failed to upload image.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user?.id) {
      setMessage("User not found.");
      return;
    }
    try {
      const res = await updateprofile({ id: user.id, data: formData }).unwrap();
      dispatch(setUser(res.user));
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
        Employee Profile
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Image Section */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Profile Image</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                {preview ? (
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32 flex items-center justify-center">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}
              </div>
              
              <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
                <span>Choose Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !selectedFile}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                isLoading || !selectedFile 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } transition duration-300`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : "Upload Image"}
            </button>
          </form>
        </div>

        {/* Profile Update Section */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Profile Information</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input
                name="role"
                type="text"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your role"
              />
            </div>
            
            <button
              type="submit"
              disabled={isUpdateLoading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                isUpdateLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              } transition duration-300 ease-in-out`}
            >
              {isUpdateLoading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>

      {/* Status Messages */}
      {message && (
        <div className={`mt-6 p-3 rounded-lg text-center ${
          message.includes("success") 
            ? "bg-green-100 text-green-700" 
            : "bg-red-100 text-red-700"
        }`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default EmployeProfile;