import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleBookClick = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      navigate('/form');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-10 bg-gradient-to-br from-purple-50 to-blue-100 font-[Baloo_2]">
      <div className="max-w-6xl w-full space-y-10">
        {/* Book Card */}
        <div className="bg-white rounded-[25px] shadow-2xl grid md:grid-cols-2 gap-8 p-8 items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-400 to-blue-400 rounded-t-[25px]"></div>
          <div className="flex justify-center">
            <img
              src="/photo1.jpg"
              alt="मानसिकता Book"
              className="rounded-xl shadow-xl border-4 border-white transform hover:scale-105 duration-500"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">मानसिकता (Mindset)</h1>
            <h2 className="text-xl text-gray-600 mt-2">लेखक: प्रविण फलके पाटील</h2>
            <hr className="my-6 border-t-2 border-gray-200 w-3/4" />
            <p className="text-gray-700 text-lg leading-relaxed">
              ✨ "मन बदललं... तर जीवन बदलतं!" ✨ – 'मानसिकता' हे पुस्तक आता ऑनलाईन उपलब्ध!
              💡 मध्यमवर्गीय जीवनात सकारात्मक बदल घडवण्यासाठी आवश्यक असलेली मानसिकता 📘
              लेखक: प्रविण फलके पाटील – लेखक व मार्गदर्शक 🛒 आता खरेदी करा आणि स्वतःच्या जीवनात बदल घडवा
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleBookClick}
                className="bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
              >
                पुस्तक मिळवा
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">प्रकाशक: New Concept Publishing House</p>
          </div>
        </div>

        {/* Quote Section */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-2xl shadow-xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-5 text-[8rem] text-white/10 leading-none font-serif select-none">“</div>
          <p className="text-xl md:text-2xl font-semibold relative z-10">
            "मानसिकतेचे बदल हे जीवनातील सर्वात महत्त्वाचे बदल असतात. योग्य मानसिकतेमुळे अशक्य कामेही शक्य होतात."
          </p>
          <p className="text-lg font-medium mt-4 relative z-10">- प्रविण फलके पाटील</p>
        </div>

        {/* Inside Book Photos */}
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 relative">
            पुस्तकातील काही छायाचित्रे
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 h-1 w-20 bg-gradient-to-r from-orange-400 to-blue-400 rounded"></div>
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white transform hover:scale-105 duration-500">
              <img src="/photo1.jpg" alt="पान १" className="w-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white transform hover:scale-105 duration-500">
              <img src="/photo2.jpg" alt="पान २" className="w-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl transform scale-95">
            <p className="text-xl font-semibold mb-4">
              पुस्तक मिळविण्यासाठी आपल्याला पुढील पानावर नेण्यात येत आहे...
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg"
            >
              ठीक आहे
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
