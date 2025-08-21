import React, { useState } from "react";
import { useUploadjobMutation, useGetjobsQuery, useDeletejobsMutation } from "../../../redux/adminapislice";
import { FiX, FiUpload , FiPlus , FiTrash2 } from "react-icons/fi";
import { FcCancel } from "react-icons/fc";

import { UploadJobFail, Successmodal } from "../../modals/modal";
import { FaSpinner } from "react-icons/fa";
const Jobs = () => {
  const [openmodal, setopenmodal] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [uploadError, setUploadError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [deletejob, { isLoading: loadingdelete }] = useDeletejobsMutation();
  const [deleteid, setdeleteid] = useState(null);
  const [deletemodal, setdeletemodal] = useState(false);
  const [deletetrue, setdeletetrue] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    role: "",
    resume: "",
  });

  const { data: jobss, isLoading: loadingjobs, refetch } = useGetjobsQuery();
  const [uploadJob, { isLoading }] = useUploadjobMutation();

  const rowData = jobss?.job || [];

  const handleResumeClick = (resumeData, jobData) => {
    setSelectedResume(resumeData);
    // console.log(selectedResume)
    setSelectedJob(jobData);
    setResumeModalOpen(true);
  };

  const downloadResume = () => {
    if (!selectedResume) return;

    const base64String = btoa(
      new Uint8Array(selectedResume.data?.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );

    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: selectedResume.contentType });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `resume.${selectedResume.contentType.includes("pdf")
      ? "pdf"
      : selectedResume.contentType.includes("image")
        ? "png"
        : "doc"
      }`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };




  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64Data = reader.result.split(",")[1];
      setFormData({
        ...formData,
        resume: {
          data: base64Data,
          contentType: file.type,
        },
      });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await uploadJob({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        resume: formData.resume,
      }).unwrap();
      setFormData({ name: "", phone: "", email: "", role: "", resume: "" });
      setopenmodal(false);
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 1000);
      refetch()
    } catch (err) {
      setUploadError(true);
      setTimeout(() => {
        setUploadError(false);
      }, 1000);
    }
  };

  function deletejobrequirements(jobid) {
    deletejob(jobid).unwrap().then(() => {
      refetch();
    });
  }

  return (
    <div>

      {deletemodal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8 text-center animate-fadeIn">
            <div className="flex justify-center mb-4">
              <FcCancel className="w-16 h-16" />
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              Are you sure?
            </h2>

            <p className="text-gray-300 mb-6">
              Do you really want to delete this job requirement?
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setdeletetrue(true);
                  setdeletemodal(false);
                  deletejobrequirements(deleteid);
                }}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => {
                  setdeletetrue(false);
                  setdeletemodal(false);
                }}
                className="px-5 py-2 bg-gray-700 hover:bg-gray-800 text-gray-200 rounded-lg shadow-md transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="z-50">
        {uploadError && <UploadJobFail errorMessage="Failed to upload job." />}
      </div>
      <div className="z-50">
        {successMessage && <Successmodal successMessage="Job uploaded successfully." />}
      </div>
      <div className="p-6 ">
        <div className="mb-6 flex justify-between items-center flex-wrap gap-3">
          <h1 className="text-2xl font-bold text-gray-800">Job requirements Applications</h1>
          <button
            onClick={() => setopenmodal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FiPlus /> Add New Job requirements
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
          {loadingjobs ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
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
                {rowData.map((job, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-medium">{job.name}</td>
                    <td className="p-3">{job.email}</td>
                    <td className="p-3">{job.phone}</td>
                    <td className="p-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {job.role}
                      </span>
                    </td>
                    <td className="p-3">
                      {job.resume ? (
                        <button
                          onClick={() => handleResumeClick(job.resume, job)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium text-sm flex items-center gap-2"
                        >
                          <FiUpload /> View Resume
                        </button>
                      ) : (
                        <span className="text-gray-400">No Resume</span>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-3">

                        <button
                          onClick={() => {
                            setdeletemodal(true);
                            setdeleteid(job._id)
                          }}
                          className="text-red-600 hover:text-red-800">
                          {loadingdelete && job._id === deleteid ? <FaSpinner className="animate-spin" /> : <FiTrash2 size={18} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {openmodal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-bold text-gray-800">Add Job Application</h2>
                <button onClick={() => setopenmodal(false)} className="text-gray-500 hover:text-gray-700">
                  <FiX size={22} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-4 space-y-3">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-2 border rounded-lg" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded-lg" required />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded-lg" required />
                <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Job Role" className="w-full p-2 border rounded-lg" required />
                <input type="file" accept=".pdf,.doc,.docx,.jpg,.png" onChange={handleFileChange} className="w-full border p-2 rounded-lg" required />
                <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center gap-2">
                  {isLoading ? "Processing..." : "Submit Application"}
                </button>
              </form>
            </div>
          </div>
        )}


        {resumeModalOpen && selectedResume && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6">
              <h2 className="text-xl font-bold mb-4 text-center">Resume Preview</h2>

              <div className="p-4">
                {(() => {
                  if (!selectedResume) return null;


                  const base64String = btoa(
                    new Uint8Array(selectedResume.data?.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ""
                    )
                  );

                  if (selectedResume.contentType.startsWith("image/")) {
                    return (
                      <img
                        src={`data:${selectedResume.contentType};base64,${base64String}`}
                        alt="Resume"
                        className="max-h-80 mx-auto rounded-lg shadow"
                      />
                    );
                  } else if (selectedResume.contentType === "application/pdf") {
                    return (
                      <iframe
                        src={`data:${selectedResume.contentType};base64,${base64String}`}
                        title="Resume PDF"
                        className="w-full h-80 rounded-lg shadow"
                      />
                    );
                  } else {
                    return (
                      <p className="text-center text-gray-600 py-6">
                        Preview not supported. Please download to view.
                      </p>
                    );
                  }
                })()}

                <div className="flex justify-center gap-3 mt-4">
                  <button
                    onClick={downloadResume}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => setResumeModalOpen(false)}
                    className="border px-4 py-2 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
};

export default Jobs;


