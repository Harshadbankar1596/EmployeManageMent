// import React, { useState, useEffect, useRef } from 'react'
// import { io } from "socket.io-client"
// import { useSelector } from 'react-redux'
// import { useGetMessagesQuery, useCreateGroupMutation, useGetAllGroupsNameQuery } from '../../redux/apislice'
// import { motion, AnimatePresence } from 'framer-motion'
// import { FiSend, FiImage, FiSmile, FiUsers, FiMessageCircle, FiPlus } from 'react-icons/fi'
// import { FaSpinner } from "react-icons/fa6"
// import { useGetallmembersnameQuery } from '../../redux/adminapislice'

// const socket = io(import.meta.env.VITE_BACKEND_URL)

// const sidebarVariants = {
//   hidden: { x: -50, opacity: 0 },
//   visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
// }

// const chatVariants = {
//   hidden: { y: 30, opacity: 0 },
//   visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
// }

// const messageVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
// }

// const DotsLoader = () => (
//   <motion.div
//     className="flex items-center gap-1 mt-1"
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//   >
//     <span className="text-blue-600 text-xs">Sending</span>
//     <motion.span
//       className="w-1 h-1 bg-blue-500 rounded-full"
//       animate={{ y: [0, -3, 0] }}
//       transition={{ repeat: Infinity, duration: 0.8 }}
//     />
//     <motion.span
//       className="w-1 h-1 bg-blue-500 rounded-full"
//       animate={{ y: [0, -3, 0] }}
//       transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
//     />
//     <motion.span
//       className="w-1 h-1 bg-blue-500 rounded-full"
//       animate={{ y: [0, -3, 0] }}
//       transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
//     />
//   </motion.div>
// )

// const Chat = () => {
//   const bottomRef = useRef(null)
//   const userId = useSelector((state) => state.user?.id)
//   const name = useSelector((state) => state.user?.name)

//   const [creategroup, setCreategroup] = useState("")
//   const [groupname, setGroupname] = useState("")
//   const [localMessages, setLocalMessages] = useState([])
//   const [selectedMembers, setSelectedMembers] = useState([])

//   // const { data, refetch, isLoading } = useGetMessagesQuery({
//   //   groupname,
//   //   userId
//   // })


//   const [createGroup, { isLoading: isCreating, error }] = useCreateGroupMutation()
//   const { data: users, isLoading: loadingusers } = useGetallmembersnameQuery()
//   const { data: groupsname, isLoading: groupnameloading } = useGetAllGroupsNameQuery()

//   const [sending, setSending] = useState(false)
//   const [pendingMessage, setPendingMessage] = useState(null)
//   const [message, setMessage] = useState("")

//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const { data, refetch, isFetching, isLoading } = useGetMessagesQuery(
//     { groupname, userId, page, limit: 20 },
//     { skip: !groupname }
//   );

//   useEffect(() => {
//     if (data?.messages) {
//       if (page === 1) {
//         setLocalMessages(data.messages);
//       } else {
//         // prepend older messages
//         setLocalMessages((prev) => [...data.messages, ...prev]);
//       }
//       setHasMore(data.hasMore);
//     }
//   }, [data]);

//   // scroll event
//   const chatContainerRef = useRef(null);

//   const handleScroll = () => {
//     if (!chatContainerRef.current || isFetching || !hasMore) return;

//     if (chatContainerRef.current.scrollTop === 0) {
//       setPage((prev) => prev + 1);
//     }
//   };



//   useEffect(() => {
//     const handleReceive = (data) => {
//       if (data.groupname === groupname) {
//         refetch().then(() => {
//           setSending(false)
//           setPendingMessage(null)
//         })
//       }
//     }

//     socket.on("receive-message", handleReceive)
//     return () => {
//       socket.off("receive-message", handleReceive)
//     }
//   }, [groupname, refetch])

//   useEffect(() => {
//     if (groupname) {
//       socket.emit("join-room", groupname)
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

//   const sendMessage = (e) => {
//     e.preventDefault()
//     if (!message.trim()) return

//     setSending(true)
//     setPendingMessage({
//       username: name,
//       text: message,
//       time: new Date().toISOString(),
//       _id: `pending-${Date.now()}`,
//     })

//     socket.emit("send-message", { message, name, groupname, userId })
//     setMessage("")
//   }

//   const createnewgroup = () => {
//     if (!creategroup.trim()) {
//       alert("Please enter a group name")
//       return
//     }

//     const membersData = selectedMembers.map(memberId => {
//       const user = users?.usersname?.find(u => u.id === memberId)
//       return { id: user.id, name: user.name }
//     })

//     createGroup({
//       groupname: creategroup,
//       members: membersData
//     }).then((result) => {
//       if (!result.error) {
//         setCreategroup("")
//         setSelectedMembers([])
//         refetch()
//       }
//     })
//   }


//   useEffect(() => {
//     if (error) {
//       alert("Group creation failed. The group may already exist.")
//     }
//   }, [error])

//   const displayedMessages = sending && pendingMessage
//     ? [...localMessages, { ...pendingMessage, pending: true }]
//     : localMessages

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="flex flex-col lg:flex-row items-start justify-center w-full max-w-6xl gap-6">
//         {/* Sidebar */}
//         <motion.aside
//           className="w-full lg:w-80 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
//           initial="hidden"
//           animate="visible"
//           variants={sidebarVariants}
//         >
//           {/* Header */}
//           <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
//             <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
//               <FiMessageCircle className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-semibold text-gray-800">Group Chat</h1>
//               <p className="text-sm text-gray-500">Connect with your team</p>
//             </div>
//           </div>

//           {/* Create Group Section */}
//           <div className="mb-8">
//             <div className="flex items-center gap-2 mb-4">
//               <FiPlus className="w-4 h-4 text-gray-600" />
//               <h2 className="text-lg font-semibold text-gray-800">Create New Group</h2>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Group Name
//                 </label>
//                 <input
//                   value={creategroup}
//                   onChange={(e) => setCreategroup(e.target.value)}
//                   type="text"
//                   placeholder="Enter group name..."
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                 />
//               </div>

//               <div>

//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Add Members
//                 </label>
//                 <select
//                   multiple
//                   data-lenis-prevent
//                   value={selectedMembers}
//                   onChange={(e) => setSelectedMembers(Array.from(e.target.selectedOptions, option => option.value))}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
//                 >
//                   {users?.usersname?.map((user) => (
//                     <option key={user.id} value={user.id} className="p-2">
//                       {user.name}
//                     </option>
//                   ))}
//                 </select>
//                 <p className="text-xs text-gray-500 mt-2">
//                   Hold Ctrl/Cmd to select multiple members
//                 </p>
//               </div>

//               <button
//                 onClick={createnewgroup}
//                 disabled={isCreating || !creategroup.trim()}
//                 className={`w-full py-3 rounded-lg font-medium transition-colors ${isCreating || !creategroup.trim()
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-600 hover:bg-blue-700 text-white"
//                   }`}
//               >
//                 {isCreating ? "Creating Group..." : "Create Group"}
//               </button>
//             </div>
//           </div>

//           {/* Groups List */}
//           <div>
//             <div className="flex items-center gap-2 mb-4">
//               <FiUsers className="w-4 h-4 text-gray-600" />
//               <h2 className="text-lg font-semibold text-gray-800">Your Groups</h2>
//             </div>

//             <div data-lenis-prevent className="space-y-2 max-h-64 overflow-y-auto">
//               {groupsname?.GroupName?.length === 0 ? (
//                 <p className="text-gray-500 text-center py-4">No groups yet</p>
//               ) : (
//                 groupsname?.GroupName?.map((group) => (
//                   <button
//                     key={group}
//                     onClick={() => setGroupname(group)}
//                     className={`w-full text-left p-3 rounded-lg transition-colors ${group === groupname
//                       ? "bg-blue-50 border border-blue-200 text-blue-700"
//                       : "hover:bg-gray-50 border border-transparent"
//                       }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className={`w-2 h-2 rounded-full ${group === groupname ? "bg-blue-600" : "bg-gray-300"
//                         }`} />
//                       <span className="font-medium">{group}</span>
//                     </div>
//                   </button>
//                 ))
//               )}
//             </div>
//           </div>
//         </motion.aside>

//         {/* Chat Area */}
//         <motion.section
//           className="flex-1 max-w-2xl bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[75vh] min-h-[600px]"
//           initial="hidden"
//           animate="visible"
//           variants={chatVariants}
//         >
//           {/* Chat Header */}
//           <div className="px-6 py-4 border-b border-gray-200 bg-white rounded-t-xl">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
//                   <FiMessageCircle className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-800">{groupname}</h2>
//                   <p className="text-sm text-gray-500">
//                     {displayedMessages.length} messages • Online
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Messages Area */}
//           <div className="flex-1 px-6 py-4 bg-gray-50 overflow-y-auto">
//             {isLoading ? (
//               <div className="flex items-center justify-center h-full">
//                 <div className="text-center">
//                   <div className="w-8 h-8 border-3 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
//                   <p className="text-gray-500">Loading messages...</p>
//                 </div>
//               </div>
//             ) : displayedMessages.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full text-center">
//                 <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
//                   <FiMessageCircle className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-600 mb-2">No messages yet</h3>
//                 <p className="text-gray-500 max-w-sm">
//                   Start the conversation by sending the first message in {groupname}
//                 </p>
//               </div>
//             ) : (
             

//               <div
//                 ref={chatContainerRef}
//                 onScroll={handleScroll}
//                 className="flex-1 px-6 py-4 bg-gray-50 overflow-y-auto"
//               >
//                 {isFetching && page > 1 && (
//                   <div className="text-center text-gray-500 mb-2">Loading older messages...</div>
//                 )}

//                 <div  className="space-y-4">
//                   {localMessages.map((msg, idx) => (
//                     <motion.div  data-lenis-prevent ref={idx === displayedMessages.length - 1 ? bottomRef : null} key={msg?._id || idx} className={`flex ${msg.username === name ? 'justify-end' : 'justify-start'}`}>
//                       <div data-lenis-prevent ref={idx === displayedMessages.length - 1 ? bottomRef : null} className={`max-w-[70%] ${msg.username === name ? 'text-right' : 'text-left'}`}>
//                         <p className="text-sm">{msg.username}</p>
//                         <div  className={`px-4 py-3 rounded-2xl ${msg.username === name ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
//                           {msg.text}
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>

//                 <div ref={bottomRef} />
//               </div>

//             )}
//           </div>

//           {/* Message Input */}
//           <div className="px-6 py-4 border-t border-gray-200 bg-white rounded-b-xl">
//             <form onSubmit={sendMessage} className="flex gap-3">
//               <div className="flex-1 flex gap-2">
//                 <button
//                   type="button"
//                   className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   <FiImage className="w-5 h-5" />
//                 </button>
//                 <input
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   type="text"
//                   placeholder="Type your message..."
//                   className="flex-1 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   disabled={sending}
//                 />

//               </div>
//               <button
//                 type="submit"
//                 disabled={!message.trim() || sending}
//                 className={`px-6 rounded-lg transition-colors ${!message.trim() || sending
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 hover:bg-blue-700 text-white'
//                   }`}
//               >
//                 {sending ? (
//                   <FaSpinner className="w-5 h-5 animate-spin" />
//                 ) : (
//                   <FiSend className="w-5 h-5" />
//                 )}
//               </button>
//             </form>
//           </div>
//         </motion.section>
//       </div>
//     </div>
//   )
// }

// export default Chat

import React, { useState, useEffect, useRef } from 'react'
import { io } from "socket.io-client"
import { useSelector } from 'react-redux'
import { useGetMessagesQuery, useCreateGroupMutation, useGetAllGroupsNameQuery } from '../../redux/apislice'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiImage, FiSmile, FiUsers, FiMessageCircle, FiPlus } from 'react-icons/fi'
import { FaSpinner } from "react-icons/fa6"
import { useGetallmembersnameQuery } from '../../redux/adminapislice'

const socket = io(import.meta.env.VITE_BACKEND_URL)

const sidebarVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
}

const chatVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
}

const messageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
}

const DotsLoader = () => (
  <motion.div
    className="flex items-center gap-1 mt-1"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <span className="text-blue-600 text-xs">Sending</span>
    <motion.span
      className="w-1 h-1 bg-blue-500 rounded-full"
      animate={{ y: [0, -3, 0] }}
      transition={{ repeat: Infinity, duration: 0.8 }}
    />
    <motion.span
      className="w-1 h-1 bg-blue-500 rounded-full"
      animate={{ y: [0, -3, 0] }}
      transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
    />
    <motion.span
      className="w-1 h-1 bg-blue-500 rounded-full"
      animate={{ y: [0, -3, 0] }}
      transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
    />
  </motion.div>
)

const Chat = () => {
  const bottomRef = useRef(null)
  const chatContainerRef = useRef(null)
  const userId = useSelector((state) => state.user?.id)
  const name = useSelector((state) => state.user?.name)

  const [creategroup, setCreategroup] = useState("")
  const [groupname, setGroupname] = useState("")
  const [localMessages, setLocalMessages] = useState([])
  const [selectedMembers, setSelectedMembers] = useState([])

  const [createGroup, { isLoading: isCreating, error }] = useCreateGroupMutation()
  const { data: users, isLoading: loadingusers } = useGetallmembersnameQuery()
  const { data: groupsname, isLoading: groupnameloading } = useGetAllGroupsNameQuery()

  const [sending, setSending] = useState(false)
  const [pendingMessage, setPendingMessage] = useState(null)
  const [message, setMessage] = useState("")

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { data, refetch, isFetching, isLoading } = useGetMessagesQuery(
    { groupname, userId, page, limit: 20 },
    { skip: !groupname }
  );

  const scrollToBottom = () => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      })
    }, 100)
  }

  useEffect(() => {
    if (localMessages.length > 0) {
      scrollToBottom()
    }
  }, [localMessages.length])

  // Handle new messages from socket
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
      socket.emit("join-room", groupname)
      setPage(1) 
      setLocalMessages([]) 
    }
  }, [groupname])

  useEffect(() => {
    if (data?.messages) {
      if (page === 1) {
        setLocalMessages(data.messages);
        setTimeout(() => {
          scrollToBottom()
        }, 200)
      } else {
        setLocalMessages((prev) => [...data.messages, ...prev]);
      }
      setHasMore(data.hasMore);
    }
  }, [data]);

  const handleScroll = () => {
    if (!chatContainerRef.current || isFetching || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    
    if (scrollTop === 0) {
      setPage((prev) => prev + 1);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    setSending(true)
    setPendingMessage({
      username: name,
      text: message,
      time: new Date().toISOString(),
      _id: `pending-${Date.now()}`,
    })

    socket.emit("send-message", { message, name, groupname, userId })
    setMessage("")
  }

  const createnewgroup = () => {
    if (!creategroup.trim()) {
      alert("Please enter a group name")
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
        refetch()
      }
    })
  }

  useEffect(() => {
    if (error) {
      alert("Group creation failed. The group may already exist.")
    }
  }, [error])

  const displayedMessages = sending && pendingMessage
    ? [...localMessages, { ...pendingMessage, pending: true }]
    : localMessages

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row items-start justify-center w-full max-w-6xl gap-6">
          {/* Sidebar */}
        <motion.aside
          className="w-full lg:w-80 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          initial="hidden"
          animate="visible"
          variants={sidebarVariants}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FiMessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Group Chat</h1>
              <p className="text-sm text-gray-500">Connect with your team</p>
            </div>
          </div>

          {/* Create Group Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FiPlus className="w-4 h-4 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">Create New Group</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group Name
                </label>
                <input
                  value={creategroup}
                  onChange={(e) => setCreategroup(e.target.value)}
                  type="text"
                  placeholder="Enter group name..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Members
                </label>
                <select
                  multiple
                  data-lenis-prevent
                  value={selectedMembers}
                  onChange={(e) => setSelectedMembers(Array.from(e.target.selectedOptions, option => option.value))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                >
                  {users?.usersname?.map((user) => (
                    <option key={user.id} value={user.id} className="p-2">
                      {user.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  Hold Ctrl/Cmd to select multiple members
                </p>
              </div>

              <button
                onClick={createnewgroup}
                disabled={isCreating || !creategroup.trim()}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${isCreating || !creategroup.trim()
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
              >
                {isCreating ? "Creating Group..." : "Create Group"}
              </button>
            </div>
          </div>

          {/* Groups List */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FiUsers className="w-4 h-4 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">Your Groups</h2>
            </div>

            <div data-lenis-prevent className="space-y-2 max-h-64 overflow-y-auto">
              {groupsname?.GroupName?.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No groups yet</p>
              ) : (
                groupsname?.GroupName?.map((group) => (
                  <button
                    key={group}
                    onClick={() => setGroupname(group)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${group === groupname
                      ? "bg-blue-50 border border-blue-200 text-blue-700"
                      : "hover:bg-gray-50 border border-transparent"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${group === groupname ? "bg-blue-600" : "bg-gray-300"
                        }`} />
                      <span className="font-medium">{group}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </motion.aside>

        {/* Chat Area */}
        <motion.section
          className="flex-1 max-w-2xl bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[75vh] min-h-[600px]"
          initial="hidden"
          animate="visible"
          variants={chatVariants}
        >
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-white rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <FiMessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{groupname}</h2>
                  <p className="text-sm text-gray-500">
                    {displayedMessages.length} messages • Online
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={chatContainerRef}
            onScroll={handleScroll}
            className="flex-1 px-6 py-4 bg-gray-50 overflow-y-auto"
          >
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-8 h-8 border-3 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-gray-500">Loading messages...</p>
                </div>
              </div>
            ) : displayedMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <FiMessageCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">No messages yet</h3>
                <p className="text-gray-500 max-w-sm">
                  Start the conversation by sending the first message in {groupname}
                </p>
              </div>
            ) : (
              <>
                {isFetching && page > 1 && (
                  <div className="text-center text-gray-500 mb-2">Loading older messages...</div>
                )}

                <div  data-lenis-prevent className="space-y-4">
                  {displayedMessages.map((msg, idx) => (
                    <motion.div 
                      key={msg?._id || idx} 
                      className={`flex ${msg.username === name ? 'justify-end' : 'justify-start'}`}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className={`max-w-[70%] ${msg.username === name ? 'text-right' : 'text-left'}`}>
                        <p className="text-sm text-gray-600 mb-1">{msg.username}</p>
                        <div className={`px-4 py-3 rounded-2xl ${msg.username === name 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white border border-gray-200 text-gray-800'
                        } ${msg.pending ? 'opacity-70' : ''}`}>
                          {msg.text}
                          {msg.pending && <DotsLoader />}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(msg.time).toLocaleTimeString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom element for auto-scroll */}
                <div ref={bottomRef} />
              </>
            )}
          </div>

          <div className="px-6 py-4 border-t border-gray-200 bg-white rounded-b-xl">
            <form onSubmit={sendMessage} className="flex gap-3">
              <div className="flex-1 flex gap-2">
                <button
                  type="button"
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiImage className="w-5 h-5" />
                </button>
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={sending}
                />
              </div>
              <button
                type="submit"
                disabled={!message.trim() || sending || !groupname}
                className={`px-6 rounded-lg transition-colors ${!message.trim() || sending || !groupname
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
              >
                {sending ? (
                  <FaSpinner className="w-5 h-5 animate-spin" />
                ) : (
                  <FiSend className="w-5 h-5" />
                )}
              </button>
            </form>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Chat