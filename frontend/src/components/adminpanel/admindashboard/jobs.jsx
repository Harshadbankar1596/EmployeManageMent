
// import React, { useState } from "react";
// import { useUploadjobMutation , useGetjobsQuery} from "../../../redux/adminapislice";

// const Jobs = () => {
//   const [openmodal, setopenmodal] = useState(false)
  
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     role: "",
//     resume: "",
//   });
//   const {data : jobss , isLoading : loadingjobs} = useGetjobsQuery()

//   console.log(jobss)

//   const [uploadJob, { isLoading, isSuccess, isError, error }] =
//     useUploadjobMutation();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       setFormData({ ...formData, resume: reader.result });
//     };
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await uploadJob({
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         role: formData.role,
//         img: formData.resume
//       }).unwrap();
//       alert("Job application submitted successfully!");
//       setFormData({ name: "", phone: "", email: "", role: "", resume: "" });
//     } catch (err) {
//       console.error("Upload failed:", err);
//     }
//   };

//   function open(){
//     setopenmodal(true)
//   }
//   function close(){
//     setopenmodal(false)
//   }



//   return (
//     <div>
//       <div>
//         <button onClick={open}>Add New Job</button>
//       </div>
//       {openmodal && (<div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
//         <h2 className="text-2xl font-bold mb-4 text-center">Job Application</h2>
//         <p onClick={close}>X</p>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//             required
//           />
//           <input
//             type="number"
//             name="phone"
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//             required
//           />
//           <input
//             type="text"
//             name="role"
//             placeholder="Job Role"
//             value={formData.role}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//             required
//           />
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx,.jpg,.png"
//             onChange={handleFileChange}
//             className="w-full"
//             required
//           />
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//           >
//             {isLoading ? "Submitting..." : "Submit Application"}
//           </button>
//         </form>

//         {isSuccess && (
//           <p className="text-green-600 mt-3 text-center">
//             ✅ Resume submitted successfully!
//           </p>
//         )}
//         {isError && (
//           <p className="text-red-600 mt-3 text-center">
//             ❌ Error: {error?.data?.message || "Something went wrong"}
//           </p>
//         )}
//       </div>)}




//     </div>
//   );
// };

// export default Jobs;


import React, { useState, useMemo } from "react";
import { useUploadjobMutation, useGetjobsQuery } from "../../../redux/adminapislice";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // Theme

const Jobs = () => {
  const [openmodal, setopenmodal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    role: "",
    resume: "",
  });

  const { data: jobss, isLoading: loadingjobs } = useGetjobsQuery();
  const [uploadJob, { isLoading, isSuccess, isError, error }] =
    useUploadjobMutation();

  // 👉 Grid columns
  const columnDefs = useMemo(
    () => [
      { headerName: "Name", field: "name", sortable: true, filter: true },
      { headerName: "Email", field: "email", sortable: true, filter: true },
      { headerName: "Phone", field: "phone", sortable: true, filter: true },
      { headerName: "Role", field: "role", sortable: true, filter: true },
      {
        headerName: "Resume",
        field: "resume",
        cellRenderer: (params) => {
          if (params.value?.contentType?.startsWith("image/")) {
            // Image Resume
            const base64String = btoa(
              new Uint8Array(params.value.data.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            return (
              <img
                src={`data:${params.value.contentType};base64,${base64String}`}
                alt="resume"
                style={{ width: "50px", height: "50px", borderRadius: "6px" }}
              />
            );
          }
          return <span className="text-blue-600 underline">Download</span>;
        },
      },
    ],
    []
  );

  // 👉 Extract rows
  const rowData = jobss?.job || [];

  // Form handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData({ ...formData, resume: reader.result });
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
        img: formData.resume,
      }).unwrap();
      alert("Job application submitted successfully!");
      setFormData({ name: "", phone: "", email: "", role: "", resume: "" });
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="p-6">
      {/* Add Job Button */}
      <div className="mb-4">
        <button
          onClick={() => setopenmodal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          Add New Job
        </button>
      </div>

      {/* Table */}
      <div
        className="ag-theme-alpine"
        style={{ height: 400, width: "100%" }}
      >
        {loadingjobs ? (
          <p>Loading jobs...</p>
        ) : (
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={5}
          />
        )}
      </div>

      {/* Modal */}
      {openmodal && (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Job Application</h2>
          <p
            onClick={() => setopenmodal(false)}
            className="cursor-pointer text-red-600 text-right font-bold"
          >
            ✖
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="role"
              placeholder="Job Role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleFileChange}
              className="w-full"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {isLoading ? "Submitting..." : "Submit Application"}
            </button>
          </form>

          {isSuccess && (
            <p className="text-green-600 mt-3 text-center">
              ✅ Resume submitted successfully!
            </p>
          )}
          {isError && (
            <p className="text-red-600 mt-3 text-center">
              ❌ Error: {error?.data?.message || "Something went wrong"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;
