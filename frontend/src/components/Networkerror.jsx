import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WifiOff, Home, RefreshCw, LifeBuoy } from "lucide-react";

const NetworkError = ({ children }) => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const handleNetworkStatusChange = () => {
            setIsConnected(window.navigator.onLine);
            console.log("Network status changed:", window.navigator.onLine);
        };

        handleNetworkStatusChange();

        window.addEventListener("online", handleNetworkStatusChange);
        window.addEventListener("offline", handleNetworkStatusChange);


        return () => {
            window.removeEventListener("online", handleNetworkStatusChange);
            window.removeEventListener("offline", handleNetworkStatusChange);
        };
    }, []);

    if (!isConnected) {
        return (
            <div className="flex items-center justify-center my-10">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                        className="flex justify-center mb-6"
                    >
                        <WifiOff className="w-16 h-16 text-red-500" />
                    </motion.div>

                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Oops! Connection Lost
                    </h1>
                    <p className="text-gray-600 mb-6">
                        We’re having trouble reaching the Employee Management server.
                        Please check your internet connection and try again.
                    </p>


                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => window.location.reload()}
                            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition-all"
                        >
                            <RefreshCw className="w-5 h-5" /> Retry
                        </button>

                        <button
                            onClick={() => (window.location.href = "/")}
                            className="flex items-center gap-2 px-5 py-2 bg-gray-100 text-gray-700 rounded-xl shadow hover:bg-gray-200 transition-all"
                        >
                            <Home className="w-5 h-5" /> Homepage
                        </button>

                        <button
                            onClick={() =>
                                (window.location.href = "mailto:support@example.com")
                            }
                            className="flex items-center gap-2 px-5 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition-all"
                        >
                            <LifeBuoy className="w-5 h-5" /> Support
                        </button>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-sm text-gray-500 mt-6"
                    >
                        Tip: This may also occur if cookies or VPN settings are blocking the
                        connection.
                    </motion.p>
                </motion.div>
            </div>
        );
    }

    return children;
};

export default NetworkError;

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { WifiOff, Home, RefreshCw, LifeBuoy, Server, Shield, Users, Briefcase } from "lucide-react";

// const NetworkError = ({ children }) => {
//     const [isConnected, setIsConnected] = useState(true);

//     useEffect(() => {
//         const handleNetworkStatusChange = () => {
//             setIsConnected(window.navigator.onLine);
//         };

//         handleNetworkStatusChange();

//         window.addEventListener("online", handleNetworkStatusChange);
//         window.addEventListener("offline", handleNetworkStatusChange);

//         return () => {
//             window.removeEventListener("online", handleNetworkStatusChange);
//             window.removeEventListener("offline", handleNetworkStatusChange);
//         };
//     }, []);

//     if (!isConnected) {
//         return (
//             <div className=" flex items-center justify-center p-4 relative overflow-hidden">
//                 {/* Animated background elements */}
//                 <div className="absolute inset-0 overflow-hidden">
//                     {[...Array(5)].map((_, i) => (
//                         <motion.div
//                             key={i}
//                             className="absolute rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10"
//                             style={{
//                                 width: Math.random() * 300 + 100,
//                                 height: Math.random() * 300 + 100,
//                                 top: `${Math.random() * 100}%`,
//                                 left: `${Math.random() * 100}%`,
//                             }}
//                             animate={{
//                                 scale: [1, 1.2, 1],
//                                 rotate: [0, 180, 360],
//                             }}
//                             transition={{
//                                 duration: Math.random() * 10 + 10,
//                                 repeat: Infinity,
//                                 ease: "linear"
//                             }}
//                         />
//                     ))}
//                 </div>

//                 {/* Glowing orbs */}
//                 <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl"></div>
//                 <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl"></div>

//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.6, ease: "easeOut" }}
//                     className="bg-gradient-to-b from-gray-900/80 to-gray-800/90 backdrop-blur-md border border-gray-700/50 shadow-2xl shadow-purple-500/10 rounded-2xl p-8 max-w-lg w-full relative z-10"
//                 >
                   
//                     <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-purple-500"></div>
//                     <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-purple-500"></div>
//                     <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-purple-500"></div>
//                     <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-purple-500"></div>

//                     <motion.div
//                         initial={{ scale: 0, rotate: -180 }}
//                         animate={{ scale: 1, rotate: 0 }}
//                         transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
//                         className="flex justify-center mb-6 relative"
//                     >
//                         <div className="relative">
//                             <motion.div
//                                 animate={{ 
//                                     rotate: 360,
//                                     scale: [1, 1.1, 1]
//                                 }}
//                                 transition={{ 
//                                     rotate: { duration: 8, repeat: Infinity, ease: "linear" },
//                                     scale: { duration: 2, repeat: Infinity }
//                                 }}
//                                 className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 blur-md opacity-70"
//                             ></motion.div>
//                             <WifiOff className="w-16 h-16 text-white relative z-10" />
//                         </div>
//                     </motion.div>

//                     <motion.h1 
//                         className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2 text-center"
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.3 }}
//                     >
//                         Connection Interrupted
//                     </motion.h1>
                    
//                     <motion.p 
//                         className="text-gray-300 mb-6 text-center"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.4 }}
//                     >
//                         We've lost connection to the Employee Management System. 
//                         Please check your network settings and try again.
//                     </motion.p>

//                     <motion.div 
//                         className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.5 }}
//                     >
//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => window.location.reload()}
//                             className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
//                         >
//                             <RefreshCw className="w-5 h-5" /> Retry Connection
//                         </motion.button>

//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => (window.location.href = "/")}
//                             className="flex items-center justify-center gap-2 px-5 py-3 bg-gray-800 text-gray-200 border border-gray-700 rounded-xl shadow-lg hover:bg-gray-750 transition-all"
//                         >
//                             <Home className="w-5 h-5" /> Dashboard
//                         </motion.button>

//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => (window.location.href = "mailto:support@example.com")}
//                             className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
//                         >
//                             <LifeBuoy className="w-5 h-5" /> IT Support
//                         </motion.button>

//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => (window.location.href = "mailto:hr@example.com")}
//                             className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all"
//                         >
//                             <Users className="w-5 h-5" /> HR Support
//                         </motion.button>
//                     </motion.div>

//                     <motion.div 
//                         className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/30"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.6 }}
//                     >
//                         <h3 className="font-semibold text-gray-300 mb-3 flex items-center gap-2">
//                             <Shield className="w-4 h-4 text-purple-400" /> 
//                             System Status & Recommendations
//                         </h3>
//                         <ul className="text-sm text-gray-400 space-y-2">
//                             <li className="flex items-start gap-2">
//                                 <Briefcase className="w-4 h-4 text-blue-400 mt-0.5" />
//                                 <span>Employee data is saved locally and will sync when connection is restored</span>
//                             </li>
//                             <li className="flex items-start gap-2">
//                                 <Server className="w-4 h-4 text-green-400 mt-0.5" />
//                                 <span>All other enterprise systems are operating normally</span>
//                             </li>
//                             <li className="flex items-start gap-2">
//                                 <LifeBuoy className="w-4 h-4 text-yellow-400 mt-0.5" />
//                                 <span>Contact IT Support at extension 4357 if issue persists</span>
//                             </li>
//                         </ul>
//                     </motion.div>

//                     <motion.p
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.8 }}
//                         className="text-xs text-gray-500 mt-6 text-center"
//                     >
//                         Employee Management System v3.2 • Secure Connection Required
//                     </motion.p>
//                 </motion.div>
//             </div>
//         );
//     }

//     return children;
// };

// export default NetworkError;