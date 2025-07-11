import React from 'react';

const Card = ({ carddata, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="max-w-sm bg-white rounded-xl shadow-lg border p-4 relative transition-transform duration-500 scale-100">
                
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full"
                >
                    X
                </button>

                <img
                    src={carddata.img}
                    alt={carddata.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />

                <h2 className="text-xl font-bold text-center mb-2">{carddata.name}</h2>
                <p className="text-gray-600 text-center mb-2">{carddata.email}</p>
                <p className="text-gray-800 text-center">{carddata.description}</p>
            </div>
        </div>
    );
};

export default Card;
