import React, { useState, useEffect, useRef } from 'react'
import { io } from "socket.io-client"
import { useSelector } from 'react-redux'
import { useGetMessagesQuery, useCreateGroupMutation } from '../../redux/apislice'
import { motion, AnimatePresence } from 'framer-motion'
import SmoothScroll from '../../lenis'

const socket = io("http://localhost:5000")

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

const Chat = () => {
  const bottomRef = useRef(null)

  const [creategroup, setCreategroup] = useState("")
  const [groupname, setGroupname] = useState("Global")
  const name = useSelector((state) => state.user.name)
  const [localMessages, setLocalMessages] = useState([])

  const { data, refetch, isLoading, refetch: refetchgroup } = useGetMessagesQuery(groupname)
  const [createGroup, { isLoading: isCreating, error }] = useCreateGroupMutation()

  useEffect(() => {
    socket.on("receive-message", () => {
      refetch()
    })
    return () => {
      socket.off("receive-message")
    }
  }, [groupname, refetch])

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

  return (
    <div className="lenis-ignore flex flex-col md:flex-row items-center justify-center min-h-screen  p-2 md:p-6">
      {/* Sidebar */}
      <motion.aside
        className="w-full sm:w-80 md:w-72 flex-shrink-0 flex flex-col items-center justify-start border rounded-2xl shadow-lg bg-white p-4 md:p-6 mb-4 md:mb-0 md:mr-8"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
      >
        <motion.div
          className="flex flex-col items-center justify-center mb-8 w-full bg-gradient-to-r from-blue-200 to-blue-300 rounded-xl shadow-md p-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
        >
          <label
            htmlFor="groupname"
            className="text-lg font-bold text-blue-800 mb-3 tracking-wide"
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
              className="flex-1 border border-blue-300 bg-white p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 placeholder-gray-400 shadow-sm text-sm"
              style={{ minWidth: 0 }}
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-r-md font-semibold transition-colors shadow-md border border-blue-600
                ${isCreating || !creategroup.trim()
                  ? "bg-blue-300 text-white cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"}
              `}
              onClick={createnewgroup}
              disabled={isCreating || !creategroup.trim()}
            >
              {isCreating ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
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
          <span className="text-xs text-gray-400 mb-1">Your Groups</span>
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
                      ? "bg-blue-100 text-blue-700 font-bold"
                      : "bg-gray-100 hover:bg-blue-50 text-blue-500"
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

      {/* Chat Area */}
      <motion.section
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl flex flex-col h-[70vh] min-h-[400px] relative"
        initial="hidden"
        animate="visible"
        variants={chatVariants}
      >
        {/* Header */}
        <motion.div
          className="px-4 md:px-6 py-3 md:py-4 border-b flex items-center justify-between bg-blue-900 rounded-t-2xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
        >
          <h1 className="text-lg md:text-2xl font-bold text-white">Group Chat</h1>
          <span className="text-xs md:text-sm text-blue-200 font-medium truncate ml-2">
            {groupname}
          </span>
        </motion.div>

        {/* Messages */}
        <div
          data-lenis-prevent
          className="overflow-y-auto flex-1 px-2 sm:px-4 md:px-6 py-3 md:py-4 space-y-3 bg-blue-50 scroll-smooth"
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
          {!isLoading && localMessages.length === 0 && (
            <motion.div
              className="text-gray-400 text-center mt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No messages yet.
            </motion.div>
          )}

          <AnimatePresence>
            <SmoothScroll/>
            {localMessages.map((msg, idx) => (
              <motion.div
                ref={idx === localMessages.length - 1 ? bottomRef : null}
                key={msg._id || idx}
                className={`flex flex-col items-${msg.username === name ? "end" : "start"} w-full`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={messageVariants}
                layout
              >
                <div
                  className={`rounded-xl px-4 py-2 flex flex-col max-w-[90%] sm:max-w-[80%] break-words text-base md:text-lg shadow-sm transition-all duration-300 ${
                    msg.username === name
                      ? "bg-gradient-to-br from-green-400 to-green-500 text-white self-end"
                      : "bg-gradient-to-br from-yellow-300 to-yellow-400 text-black self-start"
                  }`}
                >
                  {msg.username !== name && (
                    <p className="text-red-600 text-xs font-semibold mb-1">{msg.username}</p>
                  )}
                  <div className="flex items-center justify-between gap-5">
                    <p className="break-words">{msg.text}</p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-2 mt-1 ${
                    msg.username === name ? "justify-end" : "justify-start"
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
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input */}
        <motion.div
          className="px-2 sm:px-4 md:px-6 py-3 border-t flex items-center bg-gray-50 rounded-b-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
        >
          <form
            className="flex w-full gap-2"
            onSubmit={(e) => {
              if (message.trim() !== "") {
                sendMessage(e)
              } else {
                e.preventDefault()
              }
            }}
          >
            <input
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              type="text"
              placeholder="Type a message"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
            />
            <motion.button
              type="submit"
              className="bg-blue-600 text-white px-4 md:px-5 py-2 rounded-r-md hover:bg-blue-700 transition-colors text-sm md:text-base font-semibold"
              disabled={message.trim() === ""}
              whileTap={{ scale: 0.97 }}
            >
              Send
            </motion.button>
          </form>
        </motion.div>
      </motion.section>
    </div>
  )
}

export default Chat
