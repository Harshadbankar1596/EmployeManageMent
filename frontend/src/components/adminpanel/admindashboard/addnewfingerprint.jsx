import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint, User, CheckCircle, Plus } from "lucide-react";
import { useGetallmembersnameQuery } from "../../../redux/adminapislice.js";
import Loader from "../../loader.jsx";

const AddFingerprint = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [savedEmployee, setSavedEmployee] = useState(null);

  const { data: users, isLoading } = useGetallmembersnameQuery();

  const handleAddFingerprint = () => {
    if (!selectedEmployeeId) {
      alert("Please select an employee!");
      return;
    }

    const employee = users?.usersname?.find(
      (user) => user.id === selectedEmployeeId
    );
    setSavedEmployee(employee);
    setSelectedEmployeeId("");
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <motion.div
        className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 max-w-md w-full border border-white/60"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-4"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Fingerprint className="text-white w-8 h-8" />
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Add Fingerprint
          </h1>
          <p className="text-gray-500 mt-2">Register biometric data for employees</p>
        </div>

        {/* Select Input */}
        <div className="space-y-2 mb-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <User className="w-4 h-4" />
            Select Employee
          </label>
          <motion.select
            value={selectedEmployeeId}
            onChange={(e) => setSelectedEmployeeId(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="w-full border border-gray-200/80 bg-white/50 rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-sm text-gray-700 backdrop-blur-sm"
          >
            <option value="" className="text-gray-400">-- Choose an employee --</option>
            {users?.usersname?.map((user) => (
              <option key={user.id} value={user.id} className="py-2">
                {user.name}
              </option>
            ))}
          </motion.select>
        </div>

        {/* Action Button */}
        <motion.button
          onClick={handleAddFingerprint}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.5)"
          }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 rounded-2xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Register Fingerprint
        </motion.button>

        {/* Success Message */}
        <AnimatePresence>
          {savedEmployee && (
            <motion.div
              className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/60 shadow-lg"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-green-600 w-6 h-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-green-800 text-center mb-1">
                Successfully Registered!
              </h3>
              <p className="text-green-700 text-center">
                <span className="font-bold">{savedEmployee.name}</span>
                <span className="text-green-600 block text-sm mt-1">
                  Employee ID: {savedEmployee.id}
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-200/30 rounded-full blur-sm"></div>
        <div className="absolute -bottom-2 -left-4 w-6 h-6 bg-purple-200/30 rounded-full blur-sm"></div>
      </motion.div>
    </div>
  );
};

export default AddFingerprint;