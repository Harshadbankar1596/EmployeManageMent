// import React, { useState, useEffect, useRef } from 'react'
// import { io } from "socket.io-client"
// import { useSelector } from 'react-redux'
// import { useGetMessagesQuery, useCreateGroupMutation } from '../../redux/apislice'
// import { motion, AnimatePresence } from 'framer-motion'
// import SmoothScroll from '../../lenis'
// import { FiSend, FiImage, FiSmile } from 'react-icons/fi'
// import { FaSpinner } from "react-icons/fa6";
// import { useGetallmembersnameQuery } from '../../redux/adminapislice'

// const socket = io(import.meta.env.VITE_BACKEND_URL)

// const sidebarVariants = {
//   hidden: { x: -50, opacity: 0 },
//   visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 80, damping: 15 } }
// }

// const chatVariants = {
//   hidden: { y: 50, opacity: 0 },
//   visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80, damping: 15 } }
// }

// const messageVariants = {
//   hidden: { opacity: 0, y: 20, scale: 0.95 },
//   visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 12 } }
// }



// // Loader with animated dots (soft animation)
// const DotsLoader = () => (
//   <motion.div
//     className="flex items-center justify-center gap-1 mt-2"
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//   >
//     <span className="text-blue-500 text-sm font-semibold">Sending</span>
//     <motion.span
//       className="inline-block w-2 h-2 bg-blue-400 rounded-full"
//       animate={{ y: [0, -4, 0] }}
//       transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
//     />
//     <motion.span
//       className="inline-block w-2 h-2 bg-blue-400 rounded-full"
//       animate={{ y: [0, -4, 0] }}
//       transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.2 }}
//     />
//     <motion.span
//       className="inline-block w-2 h-2 bg-blue-400 rounded-full"
//       animate={{ y: [0, -4, 0] }}
//       transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.4 }}
//     />
//   </motion.div>
// )

// const Chat = () => {
//   const bottomRef = useRef(null)

//   const [creategroup, setCreategroup] = useState("")
//   const [groupname, setGroupname] = useState("Global")
//   const name = useSelector((state) => state.user.name)
//   const [localMessages, setLocalMessages] = useState([])

//   const { data, refetch, isLoading, refetch: refetchgroup } = useGetMessagesQuery(groupname)
//   const [createGroup, { isLoading: isCreating, error }] = useCreateGroupMutation()

//   // Loader state for sending message
//   const [sending, setSending] = useState(false)
//   // Store the last sent message (for loader)
//   const [pendingMessage, setPendingMessage] = useState(null)

//   const { data: users, isLoading : loadingusers} = useGetallmembersnameQuery();
//   console.log(users?.usersname)

//   useEffect(() => {
//     // Listen for message received event
//     const handleReceive = () => {
//       refetch().then(() => {
//         setSending(false)
//         setPendingMessage(null)
//       })
//     }
//     socket.on("receive-message", handleReceive)
//     return () => {
//       socket.off("receive-message", handleReceive)
//     }
//   }, [groupname])

//   useEffect(() => {
//     if (data?.message?.message) {
//       setLocalMessages(data.message.message)
//       setTimeout(() => {
//         bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
//       }, 100)
//     }
//   }, [data])

//   const [message, setMessage] = useState("")

//   const sendMessage = (e) => {
//     e.preventDefault()
//     if (!message.trim()) return
//     setSending(true)
//     setPendingMessage({
//       username: name,
//       text: message,
//       time: new Date().toISOString(),
//       _id: `pending-${Date.now()}`
//     })
//     socket.emit("send-message", { message, name, groupname })
//     setMessage("")
//   }

//   // const createnewgroup = () => {
//   //   createGroup(creategroup)
//   //   setCreategroup("")
//   //   refetchgroup()
//   // }

//   const [selectedMembers, setSelectedMembers] = useState([]);

// const createnewgroup = () => {
//   if (!groupname.trim() || selectedMembers.length === 0) {
//     alert("Group name and members required");
//     return;
//   }
//   createGroup({ groupname, members: selectedMembers });
//   setGroupname("");
//   setSelectedMembers([]);
//   refetchgroup();
// };


//   useEffect(() => {
//     if (error) {
//       alert("Group already exists")
//     }
//   }, [error])

//   const displayedMessages = sending && pendingMessage
//     ? [...localMessages, { ...pendingMessage, pending: true }]
//     : localMessages

//   return (
//     <div className="lenis-ignore flex flex-col md:flex-row items-center justify-center min-h-screen p-2 md:p-6 ">
//       <motion.aside
//         className="w-full sm:w-80 md:w-72 flex-shrink-0 flex flex-col items-center justify-start border rounded-2xl shadow-sm bg-white p-4 md:p-6 mb-4 md:mb-0 md:mr-8"
//         initial="hidden"
//         animate="visible"
//         variants={sidebarVariants}
//       >
//         <motion.div
//           className="flex flex-col items-center justify-center mb-6 w-full rounded-xl p-4 border bg-gray-50"
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
//         >
//           <label
//             htmlFor="groupname"
//             className="text-base font-semibold text-gray-800 mb-3 tracking-wide"
//             style={{ letterSpacing: "0.03em" }}
//           >
//             Create Group
//           </label>
//           <div className="flex w-full gap-2">
//             <input
//               value={creategroup}
//               onChange={(e) => setCreategroup(e.target.value)}
//               type="text"
//               placeholder="Enter Group Name"
//               className="flex-1 border border-gray-300 bg-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-400 shadow-sm text-sm"
//               style={{ minWidth: 0 }}
//             />
//             <motion.button
//               whileTap={{ scale: 0.95 }}
//               className={`px-4 py-2 rounded-md font-semibold transition-colors shadow-sm border border-blue-600 ${
//                 isCreating || !creategroup.trim()
//                   ? "bg-blue-300 text-white cursor-not-allowed"
//                   : "bg-[#3797F0] hover:bg-[#2f86d6] text-white"
//               }`}
//               onClick={createnewgroup}
//               disabled={isCreating || !creategroup.trim()}
//             >
//               {isCreating ? (
//                 <span className="flex items-center gap-2">
//                   <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
//                   </svg>
//                   Creating...
//                 </span>
//               ) : (
//                 "Create"
//               )}
//             </motion.button>
//           </div>
//         </motion.div>

//         <div className="flex flex-col items-start w-full gap-2">
//           <span className="text-xs text-gray-500 mb-1">Your Groups</span>
//           <div data-lenis-prevent className="flex flex-col gap-1 w-full max-h-60 overflow-y-auto">
//             {data?.groups?.length === 0 && (
//               <span className="text-gray-400 text-sm px-2 py-1">No groups yet.</span>
//             )}
//             <AnimatePresence>
//               {data?.groups?.map((group) => (
//                 <motion.button
//                   key={group}
//                   onClick={() => setGroupname(group)}
//                   className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 text-sm ${
//                     group === groupname
//                       ? "bg-gray-200 text-gray-900 font-semibold"
//                       : "bg-gray-100 hover:bg-gray-200 text-gray-700"
//                   }`}
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -10 }}
//                   whileTap={{ scale: 0.97 }}
//                 >
//                   {group}
//                 </motion.button>
//               ))}
//             </AnimatePresence>
//           </div>
//         </div>
//       </motion.aside>

//       <motion.section
//         className="w-full max-w-2xl bg-white rounded-2xl shadow-md flex flex-col h-[70vh] min-h-[400px] relative border"
//         initial="hidden"
//         animate="visible"
//         variants={chatVariants}
//       >
//         <motion.div
//           className="px-4 md:px-6 py-3 md:py-4 border-b flex items-center justify-between bg-white rounded-t-2xl"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
//         >
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500" />
//             <div className="flex flex-col">
//               <h1 className="text-base md:text-lg font-bold text-gray-900">Group Chat</h1>
//               <span className="text-xs md:text-xs text-gray-500 font-medium truncate">{groupname}</span>
//             </div>
//           </div>
//           <div className="flex items-center gap-3 text-gray-500">
//             <FiImage className="hidden sm:block" />
//             <FiSmile className="hidden sm:block" />
//           </div>
//         </motion.div>

//         <div
//           data-lenis-prevent
//           className="overflow-y-auto scrollbar-hide flex-1 px-2 sm:px-4 md:px-6 py-3 md:py-4 space-y-3 bg-gray-50 scroll-smooth"
//           style={{ minHeight: 0 }}
//         >
//           {isLoading && (
//             <motion.div
//               className="text-gray-400 text-center mt-20"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               Loading messages...
//             </motion.div>
//           )}
//           {!isLoading && displayedMessages.length === 0 && (
//             <motion.div
//               className="text-gray-400 text-center mt-20"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               No messages yet.
//             </motion.div>
//           )}

//           <AnimatePresence>
//             {displayedMessages.map((msg, idx) => (
//               <motion.div
//                 ref={idx === displayedMessages.length - 1 ? bottomRef : null}
//                 key={msg._id || idx}
//                 className={`flex flex-col items-${msg.username === name ? "end" : "start"} w-full`}
//                 initial="hidden"
//                 animate="visible"
//                 exit="hidden"
//                 variants={messageVariants}
//                 layout
//               >
//                 <div
//                   className={`px-4 py-2 flex flex-col max-w-[90%] sm:max-w-[80%] break-words text-[15px] md:text-base shadow-sm transition-all duration-300 ${
//                     msg.username === name
//                       ? "bg-[#3797F0] text-white self-end rounded-2xl rounded-br-sm"
//                       : "bg-white text-gray-900 self-start rounded-2xl rounded-bl-sm border"
//                   }`}
//                   style={msg.pending ? { opacity: 0.7, filter: "blur(0.5px)" } : {}}
//                 >
//                   {msg.username !== name && (
//                     <p className="text-gray-500 text-xs font-semibold mb-1">{msg.username}</p>
//                   )}
//                   <div className="flex items-center justify-between gap-5">
//                     <p className="break-words">{msg.text}</p>
//                   </div>
//                 </div>
//                 <div
//                   className={`flex items-center gap-2 mt-1 ${msg.username === name ? "justify-end" : "justify-start"
//                     }`}
//                 >
//                   <p className="text-xs text-gray-500">
//                     {msg.time
//                       ? new Date(msg.time).toLocaleTimeString([], {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })
//                       : ""}
//                   </p>
//                   {msg.pending && <DotsLoader />}
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>

//         <motion.div
//           className="px-2 sm:px-4 md:px-6 py-3 border-t flex items-center bg-white rounded-b-2xl"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
//         >
//           <form
//             className="flex w-full gap-2"
//             onSubmit={(e) => {
//               if (message.trim() !== "" && !sending) {
//                 sendMessage(e)
//               } else {
//                 e.preventDefault()
//               }
//             }}
//           >
//             <div className="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-200 rounded-full px-3 py-2">
//               <button type="button" className="text-gray-500 hover:text-gray-700">
//                 <FiImage />
//               </button>
//               <input
//                 onChange={(e) => setMessage(e.target.value)}
//                 value={message}
//                 type="text"
//                 placeholder="Message..."
//                 className="flex-1 bg-transparent focus:outline-none text-sm md:text-base"
//                 disabled={sending}
//               />
//               <button type="button" className="text-gray-500 hover:text-gray-700">
//                 <FiSmile />
//               </button>
//             </div>
//             <motion.button
//               type="submit"
//               className={`flex items-center justify-center bg-[#3797F0] text-white w-10 h-10 rounded-full hover:bg-[#2f86d6] transition-colors ${sending ? "opacity-60 cursor-not-allowed" : ""}`}
//               disabled={message.trim() === "" || sending}
//               whileTap={{ scale: 0.95 }}
//             >
//               {sending ? <FaSpinner className="animate-spin" /> : <FiSend />}
//             </motion.button>
//           </form>
//         </motion.div>
//       </motion.section>
//     </div>
//   )
// }

// export default Chat


import React, { useState, useEffect, useRef } from 'react'
import { io } from "socket.io-client"
import { useSelector } from 'react-redux'
import { useGetMessagesQuery, useCreateGroupMutation } from '../../redux/apislice'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiImage, FiSmile } from 'react-icons/fi'
import { FaSpinner } from "react-icons/fa6";
import { useGetallmembersnameQuery } from '../../redux/adminapislice'

const socket = io(import.meta.env.VITE_BACKEND_URL)

const sidebarVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 80, damping: 15 } }
}

const chatVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80, damping: 15 } }
}

const messageVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 12 } }
}

const DotsLoader = () => (
  <motion.div
    className="flex items-center justify-center gap-1 mt-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <span className="text-blue-500 text-sm font-semibold">Sending</span>
    <motion.span
      className="inline-block w-2 h-2 bg-blue-400 rounded-full"
      animate={{ y: [0, -4, 0] }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
    />
    <motion.span
      className="inline-block w-2 h-2 bg-blue-400 rounded-full"
      animate={{ y: [0, -4, 0] }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.2 }}
    />
    <motion.span
      className="inline-block w-2 h-2 bg-blue-400 rounded-full"
      animate={{ y: [0, -4, 0] }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.4 }}
    />
  </motion.div>
)

const Chat = () => {
  const bottomRef = useRef(null)
  const userId = useSelector((state) => state.user?.id) // Added optional chaining
  const name = useSelector((state) => state.user?.name) // Added optional chaining

  const [creategroup, setCreategroup] = useState("")
  const [groupname, setGroupname] = useState("Global")
  const [localMessages, setLocalMessages] = useState([])
  const [selectedMembers, setSelectedMembers] = useState([])

  // Get messages with userId in request body
  const { data, refetch, isLoading } = useGetMessagesQuery({
    groupname,
    userId
  })

  const [createGroup, { isLoading: isCreating, error }] = useCreateGroupMutation()
  const { data: users, isLoading: loadingusers } = useGetallmembersnameQuery()

  const [sending, setSending] = useState(false)
  const [pendingMessage, setPendingMessage] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const handleReceive = (data) => {
      if (data.groupname === groupname) {
        refetch().then(() => {
          setSending(false)
          setPendingMessage(null)
        })
      }
    }

    socket.on("receive-message", handleReceive)
    return () => {
      socket.off("receive-message", handleReceive)
    }
  }, [groupname, refetch])

  useEffect(() => {
    if (groupname) {
      socket.emit("join-room", groupname);
    }
  }, [groupname]);


  useEffect(() => {
    if (data?.message?.message) {
      setLocalMessages(data.message.message)
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [data])

  // const sendMessage = (e) => {
  //   e.preventDefault()
  //   if (!message.trim()) return
  //   setSending(true)
  //   setPendingMessage({
  //     username: name,
  //     text: message,
  //     time: new Date().toISOString(),
  //     _id: `pending-${Date.now()}`
  //   })
  //   socket.emit("send-message", { message, name, groupname })
  //   setMessage("")
  // }

  const sendMessage = (e) => {
  e.preventDefault();
  if (!message.trim()) return;
  
  setSending(true);
  setPendingMessage({
    username: name,
    text: message,
    time: new Date().toISOString(),
    _id: `pending-${Date.now()}`,
  });

  socket.emit("send-message", { message, name, groupname, userId });
  setMessage("");
};


  const createnewgroup = () => {
    if (!creategroup.trim()) {
      alert("Group name is required")
      return
    }

    const membersData = selectedMembers.map(memberId => {
      const user = users?.usersname?.find(u => u.id === memberId)
      return { id: user.id, name: user.name }
    })

    createGroup({
      groupname: creategroup,
      members: membersData
    }).then((result) => {
      if (!result.error) {
        setCreategroup("")
        setSelectedMembers([])
        refetch() // Refetch groups list
      }
    })
  }

  useEffect(() => {
    if (error) {
      alert("Group already exists or creation failed")
    }
  }, [error])

  const displayedMessages = sending && pendingMessage
    ? [...localMessages, { ...pendingMessage, pending: true }]
    : localMessages

  // return (
  //   <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-2 md:p-6">
  //     <motion.aside
  //       className="w-full sm:w-80 md:w-72 flex-shrink-0 flex flex-col items-center justify-start border rounded-2xl shadow-sm bg-white p-4 md:p-6 mb-4 md:mb-0 md:mr-8"
  //       initial="hidden"
  //       animate="visible"
  //       variants={sidebarVariants}
  //     >
  //       <motion.div
  //         className="flex flex-col items-center justify-center mb-6 w-full rounded-xl p-4 border bg-gray-50"
  //         initial={{ opacity: 0, scale: 0.95 }}
  //         animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
  //       >
  //         <label className="text-base font-semibold text-gray-800 mb-3 tracking-wide">
  //           Create Group
  //         </label>

  //         {/* Group Name Input */}
  //         <div className="flex w-full gap-2 mb-3">
  //           <input
  //             value={creategroup}
  //             onChange={(e) => setCreategroup(e.target.value)}
  //             type="text"
  //             placeholder="Enter Group Name"
  //             className="flex-1 border border-gray-300 bg-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-400 shadow-sm text-sm"
  //           />
  //         </div>

  //         {/* Members Multi-select */}
  //         <div data-lenis-prevent className="w-full mb-3">
  //           <label className="text-sm font-medium text-gray-700 mb-2 block">
  //             Select Members
  //           </label>
  //           <select
  //             multiple
  //             value={selectedMembers}
  //             onChange={(e) => setSelectedMembers(Array.from(e.target.selectedOptions, option => option.value))}
  //             className="w-full border border-gray-300 bg-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 shadow-sm text-sm max-h-32 overflow-y-auto"
  //           >
  //             {users?.usersname?.map((user) => (
  //               <option key={user.id} value={user.id}>
  //                 {user.name}
  //               </option>
  //             ))}
  //           </select>
  //           <div className="text-xs text-gray-500 mt-1">
  //             Hold Ctrl/Cmd to select multiple members
  //           </div>
  //         </div>

  //         <motion.button
  //           whileTap={{ scale: 0.95 }}
  //           className={`w-full px-4 py-2 rounded-md font-semibold transition-colors shadow-sm border border-blue-600 ${isCreating || !creategroup.trim()
  //               ? "bg-blue-300 text-white cursor-not-allowed"
  //               : "bg-[#3797F0] hover:bg-[#2f86d6] text-white"
  //             }`}
  //           onClick={createnewgroup}
  //           disabled={isCreating || !creategroup.trim()}
  //         >
  //           {isCreating ? (
  //             <span className="flex items-center justify-center gap-2">
  //               <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
  //                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
  //                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  //               </svg>
  //               Creating...
  //             </span>
  //           ) : (
  //             "Create Group"
  //           )}
  //         </motion.button>
  //       </motion.div>

  //       <div data-lenis-prevent className="flex flex-col items-start w-full gap-2">
  //         <span className="text-xs text-gray-500 mb-1">Your Groups</span>
  //         <div data-lenis-prevent className="flex flex-col gap-1 w-full max-h-60 overflow-y-auto">
  //           {data?.groups?.length === 0 && (
  //             <span className="text-gray-400 text-sm px-2 py-1">No groups yet.</span>
  //           )}
  //           <AnimatePresence data-lenis-prevent>
  //             {data?.groups?.map((group) => (
  //               <motion.button
  //                 key={group}
  //                 onClick={() => setGroupname(group)}
  //                 className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 text-sm ${group === groupname
  //                     ? "bg-gray-200 text-gray-900 font-semibold"
  //                     : "bg-gray-100 hover:bg-gray-200 text-gray-700"
  //                   }`}
  //                 initial={{ opacity: 0, x: -10 }}
  //                 animate={{ opacity: 1, x: 0 }}
  //                 exit={{ opacity: 0, x: -10 }}
  //                 whileTap={{ scale: 0.97 }}
  //               >
  //                 {group}
  //               </motion.button>
  //             ))}
  //           </AnimatePresence>
  //         </div>
  //       </div>
  //     </motion.aside>

  //     <motion.section
  //       className="w-full max-w-2xl bg-white rounded-2xl shadow-md flex flex-col h-[70vh] min-h-[400px] relative border"
  //       initial="hidden"
  //       animate="visible"
  //       variants={chatVariants}
  //     >
  //       <motion.div
  //         className="px-4 md:px-6 py-3 md:py-4 border-b flex items-center justify-between bg-white rounded-t-2xl"
  //         initial={{ opacity: 0, y: -10 }}
  //         animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
  //       >
  //         <div className="flex items-center gap-3">
  //           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500" />
  //           <div className="flex flex-col">
  //             <h1 className="text-base md:text-lg font-bold text-gray-900">Group Chat</h1>
  //             <span className="text-xs md:text-xs text-gray-500 font-medium truncate">{groupname}</span>
  //           </div>
  //         </div>
  //         <div className="flex items-center gap-3 text-gray-500">
  //           <FiImage className="hidden sm:block" />
  //           <FiSmile className="hidden sm:block" />
  //         </div>
  //       </motion.div>

  //       <div data-lenis-prevent
  //         className="overflow-y-auto flex-1 px-2 sm:px-4 md:px-6 py-3 md:py-4 space-y-3 bg-gray-50 scroll-smooth"
  //         style={{ minHeight: 0 }}
  //       >
  //         {isLoading && (
  //           <motion.div
  //             className="text-gray-400 text-center mt-20"
  //             initial={{ opacity: 0 }}
  //             animate={{ opacity: 1 }}
  //           >
  //             Loading messages...
  //           </motion.div>
  //         )}
  //         {!isLoading && displayedMessages.length === 0 && (
  //           <motion.div
  //             className="text-gray-400 text-center mt-20"
  //             initial={{ opacity: 0 }}
  //             animate={{ opacity: 1 }}
  //           >
  //             No messages yet.
  //           </motion.div>
  //         )}

  //         <AnimatePresence>
  //           {displayedMessages.map((msg, idx) => (
  //             <motion.div
  //               ref={idx === displayedMessages.length - 1 ? bottomRef : null}
  //               key={msg._id || idx}
  //               className={`flex flex-col items-${msg.username === name ? "end" : "start"} w-full`}
  //               initial="hidden"
  //               animate="visible"
  //               exit="hidden"
  //               variants={messageVariants}
  //               layout
  //             >
  //               <div
  //                 className={`px-4 py-2 flex flex-col max-w-[90%] sm:max-w-[80%] break-words text-[15px] md:text-base shadow-sm transition-all duration-300 ${msg.username === name
  //                     ? "bg-[#3797F0] text-white self-end rounded-2xl rounded-br-sm"
  //                     : "bg-white text-gray-900 self-start rounded-2xl rounded-bl-sm border"
  //                   }`}
  //                 style={msg.pending ? { opacity: 0.7, filter: "blur(0.5px)" } : {}}
  //               >
  //                 {msg.username !== name && (
  //                   <p className="text-gray-500 text-xs font-semibold mb-1">{msg.username}</p>
  //                 )}
  //                 <div className="flex items-center justify-between gap-5">
  //                   <p className="break-words">{msg.text}</p>
  //                 </div>
  //               </div>
  //               <div
  //                 className={`flex items-center gap-2 mt-1 ${msg.username === name ? "justify-end" : "justify-start"
  //                   }`}
  //               >
  //                 <p className="text-xs text-gray-500">
  //                   {msg.time
  //                     ? new Date(msg.time).toLocaleTimeString([], {
  //                       hour: "2-digit",
  //                       minute: "2-digit",
  //                     })
  //                     : ""}
  //                 </p>
  //                 {msg.pending && <DotsLoader />}
  //               </div>
  //             </motion.div>
  //           ))}
  //         </AnimatePresence>
  //       </div>

  //       <motion.div
  //         className="px-2 sm:px-4 md:px-6 py-3 border-t flex items-center bg-white rounded-b-2xl"
  //         initial={{ opacity: 0, y: 10 }}
  //         animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
  //       >
  //         <form
  //           className="flex w-full gap-2"
  //           onSubmit={(e) => {
  //             if (message.trim() !== "" && !sending) {
  //               sendMessage(e)
  //             } else {
  //               e.preventDefault()
  //             }
  //           }}
  //         >
  //           <div className="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-200 rounded-full px-3 py-2">
  //             <button type="button" className="text-gray-500 hover:text-gray-700">
  //               <FiImage />
  //             </button>
  //             <input
  //               onChange={(e) => setMessage(e.target.value)}
  //               value={message}
  //               type="text"
  //               placeholder="Message..."
  //               className="flex-1 bg-transparent focus:outline-none text-sm md:text-base"
  //               disabled={sending}
  //             />
  //             <button type="button" className="text-gray-500 hover:text-gray-700">
  //               <FiSmile />
  //             </button>
  //           </div>
  //           <motion.button
  //             type="submit"
  //             className={`flex items-center justify-center bg-[#3797F0] text-white w-10 h-10 rounded-full hover:bg-[#2f86d6] transition-colors ${sending ? "opacity-60 cursor-not-allowed" : ""}`}
  //             disabled={message.trim() === "" || sending}
  //             whileTap={{ scale: 0.95 }}
  //           >
  //             {sending ? <FaSpinner className="animate-spin" /> : <FiSend />}
  //           </motion.button>
  //         </form>
  //       </motion.div>
  //     </motion.section>
  //   </div>
  // )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start justify-center w-full max-w-6xl gap-6">
        {/* Sidebar - Glass Morphism Design */}
        <motion.aside
          className="w-full md:w-80 flex-shrink-0 flex flex-col items-center justify-start backdrop-blur-lg bg-white/70 rounded-3xl shadow-2xl border border-white/20 p-6"
          initial="hidden"
          animate="visible"
          variants={sidebarVariants}
        >
          {/* Create Group Section */}
          <motion.div
            className="flex flex-col items-center justify-center mb-8 w-full rounded-2xl p-5 backdrop-blur-sm bg-gradient-to-br from-white/80 to-blue-50/80 border border-white/30 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
          >
            <div className="flex items-center gap-2 mb-4 w-full">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create Group
              </h2>
            </div>

            {/* Group Name Input */}
            <div className="w-full mb-4">
              <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                Group Name
              </label>
              <input
                value={creategroup}
                onChange={(e) => setCreategroup(e.target.value)}
                type="text"
                placeholder="Enter group name..."
                className="w-full border border-gray-200/80 bg-white/50 backdrop-blur-sm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-700 placeholder-gray-400 shadow-inner transition-all duration-200"
              />
            </div>

            {/* Members Multi-select */}
            <div className="w-full mb-4">
              <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                Select Members
              </label>
              <select
              data-lenis-prevent
                multiple
                value={selectedMembers}
                onChange={(e) => setSelectedMembers(Array.from(e.target.selectedOptions, option => option.value))}
                className="w-full border border-gray-200/80 bg-white/50 backdrop-blur-sm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-700 shadow-inner max-h-32 overflow-y-auto transition-all duration-200"
              >
                {users?.usersname?.map((user) => (
                  <option key={user.id} value={user.id} className="p-2 hover:bg-blue-50 rounded">
                    {user.name}
                  </option>
                ))}
              </select>
              <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Hold Ctrl/Cmd to select multiple
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-lg ${
                isCreating || !creategroup.trim()
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-blue-500/25 hover:shadow-blue-500/40"
              }`}
              onClick={createnewgroup}
              disabled={isCreating || !creategroup.trim()}
            >
              {isCreating ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Creating Group...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Group
                </span>
              )}
            </motion.button>
          </motion.div>

          {/* Your Groups Section */}
          <div className="flex flex-col items-start w-full gap-3">
            <div className="flex items-center gap-2 w-full">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700">Your Groups</span>
            </div>
            
            <div data-lenis-prevent className="flex flex-col gap-2 w-full max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
              {data?.groups?.length === 0 && (
                <motion.div 
                  className="text-gray-400 text-sm p-4 text-center rounded-xl bg-white/50 border border-white/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  No groups created yet
                </motion.div>
              )}
              <AnimatePresence>
                data-lenis-prevent
                {data?.groups?.map((group) => (
                  <motion.button
                    key={group}
                    onClick={() => setGroupname(group)}
                    
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 group ${
                      group === groupname
                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-200/50 shadow-md"
                        : "bg-white/50 hover:bg-white/80 border border-white/30 hover:border-blue-200/50 hover:shadow-md"
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        group === groupname 
                          ? "bg-gradient-to-r from-blue-500 to-purple-600" 
                          : "bg-gray-300 group-hover:bg-blue-400"
                      }`} />
                      <span className={`font-medium truncate ${
                        group === groupname 
                          ? "text-blue-700" 
                          : "text-gray-600 group-hover:text-gray-800"
                      }`}>
                        {group}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.aside>

        {/* Chat Area - Modern Design */}
        <motion.section
          className="w-full max-w-2xl backdrop-blur-lg bg-white/70 rounded-3xl shadow-2xl flex flex-col h-[75vh] min-h-[500px] relative border border-white/20"
          initial="hidden"
          animate="visible"
          variants={chatVariants}
        >
          {/* Chat Header */}
          <motion.div
            className="px-6 py-4 border-b border-white/30 flex items-center justify-between bg-gradient-to-r from-white/80 to-blue-50/80 rounded-t-3xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Group Chat
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 font-medium">{groupname}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span className="text-xs text-green-500 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Online
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 rounded-xl bg-white/50 hover:bg-white/80 border border-white/30 text-gray-600 hover:text-blue-600 transition-all duration-200 shadow-sm hover:shadow-md">
                <FiImage className="w-5 h-5" />
              </button>
              <button className="p-2.5 rounded-xl bg-white/50 hover:bg-white/80 border border-white/30 text-gray-600 hover:text-yellow-600 transition-all duration-200 shadow-sm hover:shadow-md">
                <FiSmile className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Messages Area */}
          <div
            className="flex-1 px-4 sm:px-6 py-4 space-y-4 bg-gradient-to-b from-transparent to-blue-50/30 scroll-smooth overflow-y-auto"
            style={{ minHeight: 0 }}
          >
            {isLoading && (
              <motion.div
                className="flex items-center justify-center h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-500 font-medium">Loading messages...</p>
                </div>
              </motion.div>
            )}
            
            {!isLoading && displayedMessages.length === 0 && (
              <motion.div
                className="flex flex-col items-center justify-center h-full text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No messages yet</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Start the conversation by sending the first message in {groupname}
                </p>
              </motion.div>
            )}

            <AnimatePresence>
              {displayedMessages.map((msg, idx) => (
                <motion.div
                data-lenis-prevent
                  ref={idx === displayedMessages.length - 1 ? bottomRef : null}
                  key={msg._id || idx}
                  className={`flex flex-col ${msg.username === name ? "items-end" : "items-start"} w-full group`}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={messageVariants}
                  layout
                >
                  <div className="flex items-end gap-2 max-w-[85%]">
                    {msg.username !== name && (
                      <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex-shrink-0 mb-1 shadow-md"></div>
                    )}
                    <div className="flex flex-col">
                      {msg.username !== name && (
                        <p className="text-xs font-semibold text-gray-500 mb-1 ml-1">{msg.username}</p>
                      )}
                      <div
                        className={`px-4 py-3 flex flex-col break-words text-[15px] md:text-base transition-all duration-300 backdrop-blur-sm ${
                          msg.username === name
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl rounded-br-md shadow-lg shadow-blue-500/25"
                            : "bg-white/80 text-gray-800 rounded-3xl rounded-bl-md shadow-lg shadow-gray-500/10 border border-white/50"
                        } ${msg.pending ? "opacity-70 scale-95" : ""}`}
                      >
                        <p className="break-words leading-relaxed">{msg.text}</p>
                      </div>
                      <div className={`flex items-center gap-2 mt-1 ${msg.username === name ? "justify-end" : "justify-start"}`}>
                        <p className="text-xs text-gray-400 font-medium">
                          {msg.time
                            ? new Date(msg.time).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </p>
                        {msg.pending && <DotsLoader />}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Message Input */}
          <motion.div
            className="px-4 sm:px-6 py-4 border-t border-white/30 flex items-center bg-gradient-to-r from-white/80 to-blue-50/80 rounded-b-3xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
          >
            <form
              className="flex w-full gap-3"
              onSubmit={(e) => {
                if (message.trim() !== "" && !sending) {
                  sendMessage(e)
                } else {
                  e.preventDefault()
                }
              }}
            >
              <div className="flex items-center gap-2 flex-1 bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl px-4 py-3 shadow-inner hover:shadow-md transition-all duration-200">
                <button type="button" className="text-gray-400 hover:text-blue-500 transition-colors duration-200 p-1 rounded-lg hover:bg-blue-50/50">
                  <FiImage className="w-5 h-5" />
                </button>
                <input
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent focus:outline-none text-sm md:text-base placeholder-gray-400 text-gray-700"
                  disabled={sending}
                />
                <button type="button" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200 p-1 rounded-lg hover:bg-yellow-50/50">
                  <FiSmile className="w-5 h-5" />
                </button>
              </div>
              <motion.button
                type="submit"
                className={`flex items-center justify-center w-12 h-12 rounded-2xl shadow-lg transition-all duration-200 ${
                  message.trim() === "" || sending
                    ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-blue-500/25 hover:shadow-blue-500/40"
                }`}
                disabled={message.trim() === "" || sending}
                whileHover={message.trim() !== "" && !sending ? { scale: 1.05 } : {}}
                whileTap={message.trim() !== "" && !sending ? { scale: 0.95 } : {}}
              >
                {sending ? (
                  <FaSpinner className="animate-spin w-5 h-5" />
                ) : (
                  <FiSend className="w-5 h-5" />
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )

}

export default Chat