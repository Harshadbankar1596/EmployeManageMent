import React, { useState } from 'react';

const Form = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '', // ✅ Address field added
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, address } = form;

    // ✅ Message with address included
    const message = `📚 नवीन पुस्तक ऑर्डर\n\n👤 नाव: ${name}\n📧 ईमेल: ${email}\n📞 फोन: ${phone}\n🏠 पत्ता: ${address}`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappNumber = '917028445707'; // ✅ Add country code (e.g., 91 for India)

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 relative">
        <h2 className="text-3xl font-bold marathi-text text-center text-gray-800 mb-4">पुस्तक मिळवा</h2>
        <p className="text-center text-gray-600 mb-6 text-sm">आपले नाव, ईमेल, फोन व पत्ता टाका</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="आपले पूर्ण नाव"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 font-medium"
          />
          <input
            type="email"
            name="email"
            placeholder="ईमेल"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 font-medium"
          />
          <input
            type="tel"
            name="phone"
            placeholder="फोन नंबर"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 font-medium"
          />
          <textarea
            name="address"
            placeholder="पत्ता"
            value={form.address}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 font-medium resize-none"
          />

          <button
            type="submit"
            className="btn-realistic btn-hindi w-full mt-4 bg-gradient-to-r from-orange-400 to-red-400 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-[1.03] transition-all duration-200"
          >
            सबमिट करा
          </button>
        </form>

        {submitted && (
          <p className="text-green-600 text-center mt-4 marathi-text">🎉 तुमची माहिती सबमिट झाली आहे!</p>
        )}
      </div>
    </div>
  );
};

export default Form;
