import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { API, BASE_URL } from '../api/endpoints';
import { FaCheckCircle } from 'react-icons/fa'; // Optional: Use an icon if you have react-icons

import Navbar from "../components/Navbar";
import Footer from '../components/Footer';

const Register = () => {
  const navigate = useNavigate(); // 2. Initialize navigation

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    mobile: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  // State to control the visibility of the popup
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      // Use the endpoint from your config
      const fullUrl = `${BASE_URL}${API.REGISTER}`;
      
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // SUCCESS
        setStatus({ loading: false, success: true, error: null });
        setFormData({ first_name: '', last_name: '', mobile: '', message: '' });
        
        // 3. Show Popup
        setShowPopup(true);

        // 4. Wait 2 seconds, then redirect to Home
        setTimeout(() => {
          setShowPopup(false);
          navigate('/'); // Redirect to Home Page route
        }, 2000);

      } else {
        const errorMsg = data.detail || data.message || "Submission failed.";
        setStatus({ loading: false, success: false, error: errorMsg });
      }

    } catch (err) {
      console.error("Submission Error:", err);
      setStatus({ 
        loading: false, 
        success: false, 
        error: "Network Error: Please check your connection." 
      });
    }
  };

  return (
    <div >
      <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 relative">
      {/* --- SUCCESS POPUP MODAL --- */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center text-center transform transition-all scale-100 animate-bounceIn">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600 text-4xl">
              ✓ 
              {/* If you installed react-icons, use: <FaCheckCircle /> */}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
            <p className="text-gray-600 mb-4">Your message has been sent.</p>
            <p className="text-sm text-gray-400">Redirecting to Home...</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Contact Us</h2>
        
        {/* Error Alert (Only show error here, success is now a popup) */}
        {status.error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-200 rounded text-center">
            ⚠️ {status.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required className="mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Sudhanshu" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required className="mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Mishra" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile</label>
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required className="mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="1234567890" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" className="mt-1 w-full p-2 border rounded resize-none focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Type message..."></textarea>
          </div>
          <button type="submit" disabled={status.loading} className={`w-full py-3 px-4 text-white font-bold rounded transition-all ${status.loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {status.loading ? 'Sending...' : 'Submit Message'}
          </button>
        </form>
      </div>

      {/* Tailwind Custom Animation (Add this to your CSS if needed, or stick to standard utility classes) */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bounceIn { 
          0% { transform: scale(0.8); opacity: 0; } 
          60% { transform: scale(1.05); opacity: 1; } 
          100% { transform: scale(1); } 
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-bounceIn { animation: bounceIn 0.5s ease-out; }
      `}</style>


    </div>
      <Footer/>
    </div>
  );
};

export default Register;