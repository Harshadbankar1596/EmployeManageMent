import React from 'react'

const Loader = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-lg font-medium text-gray-700">Loading your works...</p>
            </div>
        </div>
    )
}

export default Loader
