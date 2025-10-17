// import React, { useState } from "react";
// import { useUploadjobMutation, useGetjobsQuery, useDeletejobsMutation } from "../../../redux/adminapislice";
// import { FiX, FiUpload, FiPlus, FiTrash2 } from "react-icons/fi";
// import { FcCancel } from "react-icons/fc";

// import { UploadJobFail, Successmodal } from "../../modals/modal";
// import { FaSpinner } from "react-icons/fa";
// import Loader from "../../loader";

// const Jobs = () => {
//   const [openmodal, setopenmodal] = useState(false);
//   const [resumeModalOpen, setResumeModalOpen] = useState(false);
//   const [selectedResumeUrl, setSelectedResumeUrl] = useState("");
//   const [selectedResumeType, setSelectedResumeType] = useState("");
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [uploadError, setUploadError] = useState(false);
//   const [successMessage, setSuccessMessage] = useState(false);
//   const [deletejob, { isLoading: loadingdelete }] = useDeletejobsMutation();
//   const [deleteid, setdeleteid] = useState(null);
//   const [deletemodal, setdeletemodal] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     role: "",
//     resumeFile: null,
//   });

//   const { data: jobss, isLoading: loadingjobs, refetch } = useGetjobsQuery();
//   const [uploadJob, { isLoading }] = useUploadjobMutation();

//   const handleResumeClick = (resumeUrl, contentType, jobData) => {
//     setSelectedResumeUrl(resumeUrl);
//     setSelectedResumeType(contentType);
//     setSelectedJob(jobData);
//     setResumeModalOpen(true);
//   };

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, resumeFile: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const form = new FormData();
//       form.append("name", formData.name);
//       form.append("email", formData.email);
//       form.append("phone", formData.phone);
//       form.append("role", formData.role);
//       if (formData.resumeFile) form.append("resume", formData.resumeFile);

//       await uploadJob(form).unwrap();

//       setFormData({ name: "", phone: "", email: "", role: "", resumeFile: null });
//       setopenmodal(false);
//       setSuccessMessage(true);
//       setTimeout(() => setSuccessMessage(false), 1000);
//       refetch();
//     } catch (err) {
//       setUploadError(true);
//       setTimeout(() => setUploadError(false), 1000);
//     }
//   };

//   const deletejobrequirements = (jobid) => {
//     deletejob(jobid).unwrap().then(() => refetch());
//   };

//   console.log("selected " , selectedResumeUrl)
//   console.log("jobss" , jobss)

//   return (
//     <div>
//       {/* Delete Modal */}
//       {deletemodal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8 text-center animate-fadeIn">
//             <FcCancel className="w-16 h-16 mx-auto mb-4" />
//             <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">Are you sure?</h2>
//             <p className="text-gray-300 mb-6">Do you really want to delete this job requirement? This action cannot be undone.</p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={() => { deletejobrequirements(deleteid); setdeletemodal(false); }}
//                 className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition"
//               >
//                 Yes, Delete
//               </button>
//               <button
//                 onClick={() => setdeletemodal(false)}
//                 className="px-5 py-2 bg-gray-700 hover:bg-gray-800 text-gray-200 rounded-lg shadow-md transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success / Error Modals */}
//       {uploadError && <UploadJobFail errorMessage="Failed to upload job." />}
//       {successMessage && <Successmodal successMessage="Job uploaded successfully." />}

//       {/* Jobs Table */}
//       <div className="p-6">
//         <div className="mb-6 flex justify-between items-center flex-wrap gap-3">
//           <h1 className="text-2xl font-bold text-gray-800">Job Applications</h1>
//           <button onClick={() => setopenmodal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center gap-2">
//             <FiPlus /> Add New Job
//           </button>
//         </div>

//         <div className={`${loadingjobs ? "bg-none" : "bg-white"} p-4 rounded-xl shadow overflow-x-auto`}>
//           {loadingjobs ? <Loader /> : (
//             <table className="w-full border-collapse">
//               <thead className="bg-gray-100 text-left">
//                 <tr>
//                   <th className="p-3">Name</th>
//                   <th className="p-3">Email</th>
//                   <th className="p-3">Phone</th>
//                   <th className="p-3">Role</th>
//                   <th className="p-3">Resume</th>
//                   <th className="p-3">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {jobss?.job.map((job, i) => (
//                   <tr key={i} className="border-t hover:bg-gray-50">
//                     <td className="p-3 font-medium">{job.name}</td>
//                     <td className="p-3">{job.email}</td>
//                     <td className="p-3">{job.phone}</td>
//                     <td className="p-3"><span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{job.role}</span></td>
//                     <td className="p-3">
//                       {job.resume?.data ? (
//                         <button
//                           onClick={() => handleResumeClick(job?.resume?.data, job?.resume?.contentType, job)}
//                           className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium text-sm flex items-center gap-2"
//                         >
//                           <FiUpload /> View Resume
//                         </button>
//                       ) : <span className="text-gray-400">No Resume</span>}
//                     </td>
//                     <td className="p-3">
//                       <button
//                         onClick={() => { setdeletemodal(true); setdeleteid(job._id); }}
//                         className="text-red-600 hover:text-red-800">
//                         {loadingdelete && job._id === deleteid ? <FaSpinner className="animate-spin" /> : <FiTrash2 size={18} />}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* Add Job Modal */}
//         {openmodal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
//             <div className="bg-white rounded-xl shadow-lg w-full max-w-lg">
//               <div className="flex justify-between items-center p-4 border-b">
//                 <h2 className="text-lg font-bold text-gray-800">Add Job Application</h2>
//                 <button onClick={() => setopenmodal(false)} className="text-gray-500 hover:text-gray-700"><FiX size={22} /></button>
//               </div>
//               <form onSubmit={handleSubmit} className="p-4 space-y-3">
//                 <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-2 border rounded-lg" required />
//                 <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded-lg" required />
//                 <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded-lg" required />
//                 <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Job Role" className="w-full p-2 border rounded-lg" required />
//                 <input type="file" accept=".pdf,.doc,.docx,.jpg,.png" onChange={handleFileChange} className="w-full border p-2 rounded-lg" required />
//                 <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center gap-2">
//                   {isLoading ? "Processing..." : "Submit Application"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Resume Preview Modal */}
//         {resumeModalOpen && selectedResumeUrl && (
//           <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20">
//             <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6">
//               <h2 className="text-xl font-bold mb-4 text-center">Resume Preview</h2>
//               <div className="p-4">
//                 {selectedResumeType.startsWith("image/") ? (
//                   <img src={selectedResumeUrl} alt="Resume" className="max-h-80 mx-auto rounded-lg shadow" />
//                 ) : selectedResumeType === "application/pdf" ? (
//                   <iframe src={selectedResumeUrl} title="Resume PDF" className="w-full h-80 rounded-lg shadow" />
//                 ) : (
//                   <p className="text-center text-gray-600 py-6">Preview not supported. Please download to view.</p>
//                 )}
//                 <div className="flex justify-center gap-3 mt-4">
//                   <a href={selectedResumeUrl} download className="bg-blue-600 text-white px-4 py-2 rounded-lg">Download</a>
//                   <button onClick={() => setResumeModalOpen(false)} className="border px-4 py-2 rounded-lg">Close</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Jobs;


import React, { useState } from "react";
import { useUploadjobMutation, useGetjobsQuery, useDeletejobsMutation } from "../../../redux/adminapislice";
import { FiX, FiUpload, FiPlus, FiTrash2 } from "react-icons/fi";
import { FcCancel } from "react-icons/fc";
import { FaSpinner } from "react-icons/fa";

import { UploadJobFail, Successmodal } from "../../modals/modal";
import Loader from "../../loader";

const Jobs = () => {
  const [openModal, setOpenModal] = useState(false);
  const [resumeModal, setResumeModal] = useState({ open: false, url: "", type: "" });
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", role: "", resumeFile: null });
  const [uploadError, setUploadError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const { data: jobData, isLoading: loadingJobs, refetch } = useGetjobsQuery();
  const [uploadJob, { isLoading: uploading }] = useUploadjobMutation();
  const [deleteJob, { isLoading: deleting }] = useDeletejobsMutation();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFormData({ ...formData, resumeFile: e.target.files[0] });

  const handleResumeClick = (url, type) => setResumeModal({ open: true, url, type });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) form.append(key === "resumeFile" ? "resume" : key, value);
      });

      await uploadJob(form).unwrap();
      setFormData({ name: "", phone: "", email: "", role: "", resumeFile: null });
      setOpenModal(false);
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 1500);
      refetch();
    } catch (err) {
      setUploadError(true);
      setTimeout(() => setUploadError(false), 1500);
    }
  };

  const handleDelete = async () => {
    await deleteJob(deleteModal.id).unwrap();
    setDeleteModal({ open: false, id: null });
    refetch();
  };

  return (
    <div className="p-6">
      {/* Delete Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6 text-center animate-fadeIn">
            <FcCancel className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">Are you sure?</h2>
            <p className="text-gray-300 mb-6">This action cannot be undone.</p>
            <div className="flex justify-center gap-4">
              <button onClick={handleDelete} className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md">
                {deleting ? <FaSpinner className="animate-spin" /> : "Yes, Delete"}
              </button>
              <button onClick={() => setDeleteModal({ open: false, id: null })} className="px-5 py-2 bg-gray-700 text-gray-200 rounded-lg shadow-md hover:bg-gray-800">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success / Error Modals */}
      {uploadError && <UploadJobFail errorMessage="Failed to upload job." />}
      {successMessage && <Successmodal successMessage="Job uploaded successfully." />}

      {/* Header */}
      <div className="mb-6 flex justify-between items-center flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Job Applications</h1>
        <button onClick={() => setOpenModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <FiPlus /> Add New Job
        </button>
      </div>

      {/* Jobs Table */}
      <div className={`${loadingJobs ? "" : "bg-white"} p-4 rounded-xl shadow overflow-x-auto`}>
        {loadingJobs ? (
          <Loader />
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Role</th>
                <th className="p-3">Resume</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobData?.job.map((job) => (
                <tr key={job._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{job.name}</td>
                  <td className="p-3">{job.email}</td>
                  <td className="p-3">{job.phone}</td>
                  <td className="p-3"><span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{job.role}</span></td>
                  <td className="p-3">
                    {job.resume?.data ? (
                      <button onClick={() => handleResumeClick(job.resume.data, job.resume.contentType)} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg flex items-center gap-2 hover:bg-blue-200">
                        <FiUpload /> View
                      </button>
                    ) : <span className="text-gray-400">No Resume</span>}
                  </td>
                  <td className="p-3">
                    <button onClick={() => setDeleteModal({ open: true, id: job._id })} className="text-red-600 hover:text-red-800">
                      {deleting && deleteModal.id === job._id ? <FaSpinner className="animate-spin" /> : <FiTrash2 size={18} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Job Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">Add Job Application</h2>
              <button onClick={() => setOpenModal(false)} className="text-gray-500 hover:text-gray-700"><FiX size={22} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-2 border rounded-lg" required />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded-lg" required />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded-lg" required />
              <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Job Role" className="w-full p-2 border rounded-lg" required />
              <input type="file" accept=".pdf,.doc,.docx,.jpg,.png" onChange={handleFileChange} className="w-full border p-2 rounded-lg" required />
              <button type="submit" disabled={uploading} className="w-full bg-blue-600 text-white py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-700">
                {uploading ? "Processing..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Resume Preview Modal */}
      {resumeModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Resume Preview</h2>
            <div className="p-4">
              {resumeModal.type.startsWith("image/") ? (
                <img src={resumeModal.url} alt="Resume" className="max-h-80 mx-auto rounded-lg shadow" />
              ) : resumeModal.type === "application/pdf" ? (
                <iframe src={resumeModal.url} title="Resume PDF" className="w-full h-80 rounded-lg shadow" />
              ) : (
                <p className="text-center text-gray-600 py-6">Preview not supported. Please download to view.</p>
              )}
              <div className="flex justify-center gap-3 mt-4">
                <a href={resumeModal.url} download className="bg-blue-600 text-white px-4 py-2 rounded-lg">Download</a>
                <button onClick={() => setResumeModal({ open: false, url: "", type: "" })} className="border px-4 py-2 rounded-lg">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
