import React, { useState } from "react";
import { motion } from "framer-motion";
import { Fingerprint } from "lucide-react";

const Addfingerprint = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [savedId, setSavedId] = useState(null);

  const handleAddFingerprint = () => {
    if (employeeId.trim() === "") {
      alert("कृपया ID डालें!");
      return;
    }
    setSavedId(employeeId);
    setEmployeeId("");
  };

  return (
    <div className="m-auto flex items-center justify-center p-6 my-10">
      <motion.div
        className="bg-white shadow-2xl rounded-3xl p-8 max-w-lg w-full border border-gray-200"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* हेडर */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-100 rounded-full">
            <Fingerprint className="text-blue-600 w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            नया फिंगरप्रिंट जोड़ें
          </h1>
        </div>

        {/* ID इनपुट */}
        <motion.input
          type="text"
          placeholder="Employee ID डालें"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-700 placeholder-gray-400"
        />

        {/* बटन */}
        <motion.button
          onClick={handleAddFingerprint}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition"
        >
          ➕ Add New Fingerprint
        </motion.button>

        {/* प्रीव्यू सेक्शन */}
        {savedId && (
          <motion.div
            className="mt-8 text-center bg-blue-50 rounded-2xl py-6 shadow-inner"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              ✅ फिंगरप्रिंट सेव हुआ
            </h2>
            <p className="text-gray-700">
              Employee ID:{" "}
              <span className="font-bold text-blue-800">{savedId}</span>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Addfingerprint;
