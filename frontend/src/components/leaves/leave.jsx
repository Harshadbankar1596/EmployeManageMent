import React, { useState } from 'react';
import { useApplyleavesMutation } from '../../redux/leaveslice';
import { useSelector } from 'react-redux';
const Leave = () => {
  const [applyleave] = useApplyleavesMutation()
  const id = useSelector((state) => state.user.id)
  const [formData, setFormData] = useState({

    name: '',
    startDate: '',
    endDate: '',
    description: '',
    leaveType: ''

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyleave({id:id , formData}).unwrap().then((v)=>{
      console.log("apply leave posted")
    })
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold mb-4">Leave Application Form</h2>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded"
      />

      

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
      </div>

      <select
        name="leaveType"
        value={formData.leaveType}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded"
      >
        <option value="">Select Leave Type</option>
        <option value="Sick">Sick Leave</option>
        <option value="Casual">Casual Leave</option>
        <option value="Paid">Paid Leave</option>
        <option value="Maternity">Maternity Leave</option>
      </select>

      <textarea
        name="description"
        placeholder="Description (optional)"
        value={formData.description}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Submit Leave Request
      </button>
    </form>
  );
};

export default Leave;
