import React, { useState } from 'react';
import { useUploadprofileimgMutation, useUpdateprofileMutation, useLogoutUserMutation } from '../../redux/apislice';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/userslice/userslice';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaCamera, FaUpload, FaEdit, FaEnvelope, FaPhone, FaSignOutAlt, FaCheck, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { HiSparkles, HiPhotograph } from 'react-icons/hi';
import { MdCloudUpload } from 'react-icons/md';
import Loader from "../loader.jsx";

const EmployeProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file) => {
    if (file) {
      // Check file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        setMessage("File size must be less than 1.5MB. Please choose a smaller image.");
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setMessage("Please select a valid image file.");
        return;
      }

      setSelectedFile(file);
      setMessage(""); // Clear any previous error messages
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return setMessage("Please select an image file.");
    if (!user?.id) return setMessage("User not found.");

    try {
      await uploadProfileImg({ id: user.id, img: preview }).unwrap();
      setMessage("Profile image uploaded successfully!");
      setSelectedFile(null);
      setPreview(null);
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
      dispatch(setUser(res.user));
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
      navigate('/login');
    } catch {
      setMessage("Failed to log out.");
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      {(isUpdateLoading || isUploading) && <Loader />}

      {/* Background */}
      <div className="min-h-screen relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl"></div>
        
        <div className='flex flex-col items-center justify-center py-8 px-4 relative z-10'>
          <motion.div 
            className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <motion.div 
              className="bg-blue-900 p-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <HiSparkles className="text-2xl text-white" />
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Employee Profile</h1>
                  <p className="text-white/80 mt-1">Manage your profile information</p>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col lg:flex-row">
              {/* Profile Image Section */}
              <motion.div 
                className="w-full lg:w-2/5 flex flex-col items-center justify-center bg-blue-50 p-8 border-b lg:border-b-0 lg:border-r border-blue-100"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.h2 
                  className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <FaCamera className="text-blue-900" />
                  Profile Image
                </motion.h2>

                {/* Image Display */}
                <motion.div 
                  className="relative mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {preview || user?.img ? (
                    <div className="relative">
                      <img
                        src={preview || user?.img}
                        alt="Profile"
                        className="w-40 h-40 object-cover rounded-full border-4 border-blue-900 shadow-2xl"
                      />
                      <motion.div 
                        className="absolute -bottom-2 -right-2 bg-blue-900 p-2 rounded-full shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        <FaCheck className="text-white text-sm" />
                      </motion.div>
                    </div>
                  ) : (
                    <motion.div 
                      className="bg-blue-100 border-4 border-dashed border-blue-900 rounded-full w-40 h-40 flex items-center justify-center"
                      animate={{ 
                        borderColor: ["#1e3a8a", "#1e40af", "#1e3a8a"] 
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <HiPhotograph className="w-16 h-16 text-blue-900" />
                    </motion.div>
                  )}
                </motion.div>

                <motion.div
                  className={`w-full max-w-sm p-6 border-2 border-dashed rounded-2xl transition-all duration-300 ${
                    dragActive 
                      ? 'border-blue-900 bg-blue-50' 
                      : 'border-blue-900 hover:border-blue-900 hover:bg-blue-50/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <MdCloudUpload className="mx-auto h-12 w-12 text-blue-900 mb-3" />
                    </motion.div>
                    <p className="text-sm text-blue-900 font-semibold mb-2">
                      Drag & drop your image here
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                      or click to browse (Max: 1.5MB)
                    </p>
                    
                    <label className="cursor-pointer">
                      <motion.div
                        className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-full shadow-md font-semibold transition-all duration-300 inline-flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaUpload className="text-sm" />
                        Choose Image
                      </motion.div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {selectedFile && (
                    <motion.div 
                      className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 w-full max-w-sm"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <HiPhotograph className="text-blue-900" />
                        <span className="font-medium text-blue-900 truncate flex-1">
                          {selectedFile.name}
                        </span>
                      </div>
                      <p className="text-xs text-blue-900 mt-1">
                        Size: {formatFileSize(selectedFile.size)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.form 
                  onSubmit={handleUpload} 
                  className="w-full max-w-sm mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isUploading || !selectedFile}
                    className={`w-full py-3 rounded-full text-white font-semibold shadow-lg transition-all duration-300 ${
                      isUploading || !selectedFile
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-900 hover:bg-blue-800 hover:shadow-xl'
                    }`}
                    whileHover={!isUploading && selectedFile ? { scale: 1.02 } : {}}
                    whileTap={!isUploading && selectedFile ? { scale: 0.98 } : {}}
                  >
                    {isUploading ? (
                      <div className="flex items-center justify-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Uploading...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <FaUpload />
                        Upload Image
                      </div>
                    )}
                  </motion.button>
                </motion.form>
              </motion.div>

              {/* Profile Update Section */}
              <motion.div 
                className="w-full lg:w-3/5 flex flex-col justify-center p-8"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.h2 
                  className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <FaEdit className="text-blue-900" />
                  Update Information
                </motion.h2>

                <motion.form 
                  onSubmit={handleUpdate} 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className="block text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <FaUser className="text-blue-900" />
                      Full Name
                    </label>
                    <input 
                      name="name" 
                      type="text" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-900/20 focus:border-blue-900 transition-all duration-300 bg-blue-50/50 hover:bg-white/80 text-blue-900"
                      placeholder="Enter your full name" 
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <label className="block text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <FaEnvelope className="text-blue-900" />
                      Email Address
                    </label>
                    <input 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-900/20 focus:border-blue-900 transition-all duration-300 bg-blue-50/50 hover:bg-white/80 text-blue-900"
                      placeholder="Enter your email address" 
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <label className="block text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <FaPhone className="text-blue-900" />
                      Phone Number
                    </label>
                    <input 
                      name="phone" 
                      type="tel" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      required
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-900/20 focus:border-blue-900 transition-all duration-300 bg-blue-50/50 hover:bg-white/80 text-blue-900"
                      placeholder="Enter your phone number" 
                    />
                  </motion.div>

                  <motion.button 
                    type="submit" 
                    disabled={isUpdateLoading}
                    className={`w-full py-4 rounded-xl text-white font-bold shadow-lg transition-all duration-300 ${
                      isUpdateLoading
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-900 hover:bg-blue-800 hover:shadow-xl'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    whileHover={!isUpdateLoading ? { scale: 1.02 } : {}}
                    whileTap={!isUpdateLoading ? { scale: 0.98 } : {}}
                  >
                    {isUpdateLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Updating Profile...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <FaCheck />
                        Update Profile
                      </div>
                    )}
                  </motion.button>
                </motion.form>
              </motion.div>
            </div>

            <AnimatePresence>
              {message && (
                <motion.div 
                  className={`mx-8 mb-8 p-4 rounded-2xl text-center font-semibold shadow-lg border ${
                    message.includes("success") || message.includes("successfully") 
                      ? "bg-blue-50 text-blue-900 border-blue-200" 
                      : "bg-red-50 text-red-800 border-red-200"
                  }`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  <div className="flex items-center justify-center gap-2">
                    {message.includes("success") || message.includes("successfully") ? (
                      <FaCheck className="text-blue-900" />
                    ) : (
                      <FaExclamationTriangle className="text-red-600" />
                    )}
                    {message}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Logout Section */}
          <motion.div 
            className="mt-8 w-full max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              onClick={() => setShowLogoutModal(true)}
              className='w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <FaSignOutAlt className="text-xl relative z-10" />
              <span className="text-xl relative z-10">Logout</span>
            </motion.button>
          </motion.div>
        </div>

        <AnimatePresence>
          {showLogoutModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              >
                <div className="text-center">
                  <motion.div 
                    className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaSignOutAlt className="text-blue-900" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Confirm Logout</h3>
                  <p className="text-blue-900 mb-6">Are you sure you want to logout?</p>
                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => setShowLogoutModal(false)}
                      className="flex-1 py-2 px-4 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-xl font-semibold transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setShowLogoutModal(false);
                        Logout();
                      }}
                      className="flex-1 py-2 px-4 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-semibold transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Logout
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default EmployeProfile;