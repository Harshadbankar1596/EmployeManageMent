// import React from 'react'
// import { useState, useEffect } from 'react'
// import { io } from "socket.io-client";
// import { useSelector } from 'react-redux'
// import { useGetmessagesMutation } from '../../redux/apislice'

// const socket = io("http://localhost:5000")

// const Chat = () => {
//   const [getmessages , {isLoading , error , refetch}] = useGetmessagesMutation()
//   const [groupname, setGroupname] = useState("bishnoi")
//   const [messages, setMessages] = useState([])
//   const name = useSelector((state) => state.user.name)

//   useEffect(() => {
//     socket.on("receive-message", ({ message, name, groupname }) => {
//     })
//   }, [])

//   useEffect(() => {
//     getmessages(groupname).unwrap().then((res)=>{
//       setMessages(res.message.message)
//     })
//   }, [])

//   const [message, setMessage] = useState("")

//   const sendMessage = (e) => {
//     e.preventDefault()
//     socket.emit("send-message", { message, name, groupname })
//     setMessage("")
//     // refetch()
//   }

//   return (
//     <div className='flex flex-col items-center justify-center h-screen'>

//       <div>

//       </div>

//       <div className="max-w-xl mx-auto mt-10 bg-white rounded-lg shadow-lg flex flex-col h-[500px]">
//         <div className="px-6 py-4 border-b flex items-center justify-between bg-blue-900 rounded-t-lg">
//           <h1 className="text-2xl font-bold text-white">Group Chat</h1>
//         </div>

//         <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
//           {messages.length === 0 &&<div className="text-gray-400 text-center mt-20">No messages yet.</div>}

//           {messages.map((msg)=>(
//             <div key={msg._id} className={`border border-gray-300 rounded-lg h-auto p-2 flex ${msg.username === name ? "justify-end" : "justify-start"}`}>
//               <p className={`text-black font-bold border p-2 rounded-lg flex w-1/2 ${msg.username === name ? "bg-green-500 text-white" : "bg-yellow-500 text-black"}`}>{msg.text}</p>
//             </div>
//           ))}
//         </div>

//         <div className="px-6 py-4 border-t flex items-center bg-gray-50 rounded-b-lg">
//           <form>
//             <input
//               onChange={(e) => setMessage(e.target.value)}
//               value={message}
//               type="text"
//               placeholder="Type a message"
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//               onClick={(e) => {
//                 if (message.trim() !== "") {
//                   sendMessage(e)
//                   setMessage("")
//                 } else {
//                   e.preventDefault()
//                 }
//               }}
//               className="bg-blue-600 text-white px-5 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
//               Send
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default Chat






import React, { useState, useEffect, useRef } from 'react'
import { io } from "socket.io-client"
import { useSelector } from 'react-redux'
import { useGetMessagesQuery , useCreateGroupMutation } from '../../redux/apislice'

const socket = io("http://localhost:5000")

const Chat = () => {
  const bottomRef = useRef(null)

  const [creategroup, setCreategroup] = useState("")
  const [groupname, setGroupname] = useState("mygroup")
  const name = useSelector((state) => state.user.name)
  const [localMessages, setLocalMessages] = useState([])

  const { data, refetch, isLoading } = useGetMessagesQuery(groupname)
  const [createGroup, { isLoading: isCreating , error }] = useCreateGroupMutation()
  useEffect(() => {
    socket.on("receive-message", () => {
      refetch()
    })

    return () => {
      socket.off("receive-message")
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
    socket.emit("send-message", { message, name, groupname })
    setMessage("")
  }

  const createnewgroup = () => {
    createGroup(creategroup)
    setCreategroup("")
  }

  if(error){
    alert("Group already exists")
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-2 md:p-8">
      <div className="w-full md:w-72 flex-shrink-0 flex flex-col items-center justify-start border rounded-lg shadow-md bg-white p-4 md:p-6 mb-6 md:mb-0 md:mr-8">
        <div className="flex flex-col items-center justify-center mb-6 w-full">
          <label
            htmlFor="groupname"
            className="text-base font-semibold text-blue-900 mb-2"
            onClick={() => setCreategroup(creategroup)}
          >
            Create More Groups
          </label>
          <div className="flex w-full gap-2">
            <input
              value={creategroup}
              onChange={(e) => setCreategroup(e.target.value)}
              type="text"
              placeholder="Enter Group Name"
              className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors shadow"
              onClick={() => createnewgroup()}
              disabled={isCreating || !creategroup.trim()}
            >
              {isCreating ? "..." : "Create"}
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start w-full gap-2">
          <span className="text-xs text-gray-400 mb-1">Your Groups</span>
          <div className="flex flex-col gap-1 w-full max-h-60 overflow-y-auto">
            {data?.groups?.length === 0 && (
              <span className="text-gray-400 text-sm px-2 py-1">No groups yet.</span>
            )}
            {data?.groups?.map((group) => (
              <button
                key={group}
                onClick={() => setGroupname(group)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  group === groupname
                    ? "bg-blue-100 text-blue-700 font-bold"
                    : "bg-gray-100 hover:bg-blue-50 text-blue-500"
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg flex flex-col h-[70vh] min-h-[400px]">
        {/* Header */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-b flex items-center justify-between bg-blue-900 rounded-t-lg">
          <h1 className="text-xl md:text-2xl font-bold text-white">Group Chat</h1>
          <span className="text-xs md:text-sm text-blue-200 font-medium truncate ml-2">
            {groupname}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-3 md:px-6 py-3 md:py-4 space-y-3 bg-blue-50">
          {isLoading && (
            <div className="text-gray-400 text-center mt-20">Loading messages...</div>
          )}
          {!isLoading && localMessages.length === 0 && (
            <div className="text-gray-400 text-center mt-20">No messages yet.</div>
          )}

          {localMessages.map((msg, idx) => (
            <div
              ref={idx === localMessages.length - 1 ? bottomRef : null}
              key={msg._id || idx}
              className={`flex flex-col items-${
                msg.username === name ? "end" : "start"
              }`}
            >
              <div
                className={`rounded-lg p-2 flex flex-col max-w-[85%] break-words text-base md:text-lg shadow-sm ${
                  msg.username === name
                    ? "bg-green-500 text-white self-end"
                    : "bg-yellow-400 text-black self-start"
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
            </div>
          ))}
        </div>

        <div className="px-3 md:px-6 py-3 border-t flex items-center bg-gray-50 rounded-b-lg">
          <form className="flex w-full" onSubmit={(e) => {
            if (message.trim() !== "") {
              sendMessage(e)
            } else {
              e.preventDefault()
            }
          }}>
            <input
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              type="text"
              placeholder="Type a message"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 md:px-5 py-2 rounded-r-md hover:bg-blue-700 transition-colors text-sm md:text-base"
              disabled={message.trim() === ""}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat
