import React from 'react'

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full border-4 border-t-transparent border-indigo-600 animate-spin"></div>
        <br />
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  )
}


export default Loader
