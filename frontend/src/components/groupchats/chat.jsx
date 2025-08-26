import React, { useState, useEffect, useRef } from 'react'
import { io } from "socket.io-client"
import { useSelector } from 'react-redux'
import { useGetMessagesQuery, useCreateGroupMutation } from '../../redux/apislice'
import { motion, AnimatePresence } from 'framer-motion'
import SmoothScroll from '../../lenis'
import { FiSend, FiImage, FiSmile } from 'react-icons/fi'
import { FaSpinner } from "react-icons/fa6";

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

// Loader with animated dots (soft animation)
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

  const [creategroup, setCreategroup] = useState("")
  const [groupname, setGroupname] = useState("Global")
  const name = useSelector((state) => state.user.name)
  const [localMessages, setLocalMessages] = useState([])

  const { data, refetch, isLoading, refetch: refetchgroup } = useGetMessagesQuery(groupname)
  const [createGroup, { isLoading: isCreating, error }] = useCreateGroupMutation()

  // Loader state for sending message
  const [sending, setSending] = useState(false)
  // Store the last sent message (for loader)
  const [pendingMessage, setPendingMessage] = useState(null)

  useEffect(() => {
    // Listen for message received event
    const handleReceive = () => {
      refetch().then(() => {
        setSending(false)
        setPendingMessage(null)
      })
    }
    socket.on("receive-message", handleReceive)
    return () => {
      socket.off("receive-message", handleReceive)
    }
  }, [groupname])

  useEffect(() => {
    if (data?.message?.message) {
      setLocalMessages(data.message.message)
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [data])

  const [message, setMessage] = useState("")

  const sendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    setSending(true)
    setPendingMessage({
      username: name,
      text: message,
      time: new Date().toISOString(),
      _id: `pending-${Date.now()}`
    })
    socket.emit("send-message", { message, name, groupname })
    setMessage("")
  }

  const createnewgroup = () => {
    createGroup(creategroup)
    setCreategroup("")
    refetchgroup()
  }

  useEffect(() => {
    if (error) {
      alert("Group already exists")
    }
  }, [error])

  const displayedMessages = sending && pendingMessage
    ? [...localMessages, { ...pendingMessage, pending: true }]
    : localMessages

  return (
    <div className="lenis-ignore flex flex-col md:flex-row items-center justify-center min-h-screen p-2 md:p-6 ">
      <motion.aside
        className="w-full sm:w-80 md:w-72 flex-shrink-0 flex flex-col items-center justify-start border rounded-2xl shadow-sm bg-white p-4 md:p-6 mb-4 md:mb-0 md:mr-8"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
      >
        <motion.div
          className="flex flex-col items-center justify-center mb-6 w-full rounded-xl p-4 border bg-gray-50"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
        >
          <label
            htmlFor="groupname"
            className="text-base font-semibold text-gray-800 mb-3 tracking-wide"
            style={{ letterSpacing: "0.03em" }}
          >
            Create Group
          </label>
          <div className="flex w-full gap-2">
            <input
              value={creategroup}
              onChange={(e) => setCreategroup(e.target.value)}
              type="text"
              placeholder="Enter Group Name"
              className="flex-1 border border-gray-300 bg-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-400 shadow-sm text-sm"
              style={{ minWidth: 0 }}
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-md font-semibold transition-colors shadow-sm border border-blue-600 ${
                isCreating || !creategroup.trim()
                  ? "bg-blue-300 text-white cursor-not-allowed"
                  : "bg-[#3797F0] hover:bg-[#2f86d6] text-white"
              }`}
              onClick={createnewgroup}
              disabled={isCreating || !creategroup.trim()}
            >
              {isCreating ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create"
              )}
            </motion.button>
          </div>
        </motion.div>

        <div className="flex flex-col items-start w-full gap-2">
          <span className="text-xs text-gray-500 mb-1">Your Groups</span>
          <div data-lenis-prevent className="flex flex-col gap-1 w-full max-h-60 overflow-y-auto">
            {data?.groups?.length === 0 && (
              <span className="text-gray-400 text-sm px-2 py-1">No groups yet.</span>
            )}
            <AnimatePresence>
              {data?.groups?.map((group) => (
                <motion.button
                  key={group}
                  onClick={() => setGroupname(group)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 text-sm ${
                    group === groupname
                      ? "bg-gray-200 text-gray-900 font-semibold"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {group}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      <motion.section
        className="w-full max-w-2xl bg-white rounded-2xl shadow-md flex flex-col h-[70vh] min-h-[400px] relative border"
        initial="hidden"
        animate="visible"
        variants={chatVariants}
      >
        <motion.div
          className="px-4 md:px-6 py-3 md:py-4 border-b flex items-center justify-between bg-white rounded-t-2xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500" />
            <div className="flex flex-col">
              <h1 className="text-base md:text-lg font-bold text-gray-900">Group Chat</h1>
              <span className="text-xs md:text-xs text-gray-500 font-medium truncate">{groupname}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-500">
            <FiImage className="hidden sm:block" />
            <FiSmile className="hidden sm:block" />
          </div>
        </motion.div>

        <div
          data-lenis-prevent
          className="overflow-y-auto scrollbar-hide flex-1 px-2 sm:px-4 md:px-6 py-3 md:py-4 space-y-3 bg-gray-50 scroll-smooth"
          style={{ minHeight: 0 }}
        >
          {isLoading && (
            <motion.div
              className="text-gray-400 text-center mt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Loading messages...
            </motion.div>
          )}
          {!isLoading && displayedMessages.length === 0 && (
            <motion.div
              className="text-gray-400 text-center mt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No messages yet.
            </motion.div>
          )}

          <AnimatePresence>
            {displayedMessages.map((msg, idx) => (
              <motion.div
                ref={idx === displayedMessages.length - 1 ? bottomRef : null}
                key={msg._id || idx}
                className={`flex flex-col items-${msg.username === name ? "end" : "start"} w-full`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={messageVariants}
                layout
              >
                <div
                  className={`px-4 py-2 flex flex-col max-w-[90%] sm:max-w-[80%] break-words text-[15px] md:text-base shadow-sm transition-all duration-300 ${
                    msg.username === name
                      ? "bg-[#3797F0] text-white self-end rounded-2xl rounded-br-sm"
                      : "bg-white text-gray-900 self-start rounded-2xl rounded-bl-sm border"
                  }`}
                  style={msg.pending ? { opacity: 0.7, filter: "blur(0.5px)" } : {}}
                >
                  {msg.username !== name && (
                    <p className="text-gray-500 text-xs font-semibold mb-1">{msg.username}</p>
                  )}
                  <div className="flex items-center justify-between gap-5">
                    <p className="break-words">{msg.text}</p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-2 mt-1 ${msg.username === name ? "justify-end" : "justify-start"
                    }`}
                >
                  <p className="text-xs text-gray-500">
                    {msg.time
                      ? new Date(msg.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      : ""}
                  </p>
                  {msg.pending && <DotsLoader />}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="px-2 sm:px-4 md:px-6 py-3 border-t flex items-center bg-white rounded-b-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
        >
          <form
            className="flex w-full gap-2"
            onSubmit={(e) => {
              if (message.trim() !== "" && !sending) {
                sendMessage(e)
              } else {
                e.preventDefault()
              }
            }}
          >
            <div className="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-200 rounded-full px-3 py-2">
              <button type="button" className="text-gray-500 hover:text-gray-700">
                <FiImage />
              </button>
              <input
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                type="text"
                placeholder="Message..."
                className="flex-1 bg-transparent focus:outline-none text-sm md:text-base"
                disabled={sending}
              />
              <button type="button" className="text-gray-500 hover:text-gray-700">
                <FiSmile />
              </button>
            </div>
            <motion.button
              type="submit"
              className={`flex items-center justify-center bg-[#3797F0] text-white w-10 h-10 rounded-full hover:bg-[#2f86d6] transition-colors ${sending ? "opacity-60 cursor-not-allowed" : ""}`}
              disabled={message.trim() === "" || sending}
              whileTap={{ scale: 0.95 }}
            >
              {sending ? <FaSpinner className="animate-spin" /> : <FiSend />}
            </motion.button>
          </form>
        </motion.div>
      </motion.section>
    </div>
  )
}

export default Chat
