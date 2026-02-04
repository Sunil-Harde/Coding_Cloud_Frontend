import React, { useState } from 'react';
import { FaHeadphones, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ============================================ */}
      {/* ADD NAVBAR COMPONENT HERE */}
      <Navbar />
      {/* ============================================ */}

      {/* Contact Info Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <span className="inline-block px-6 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
              Contact Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Reach Our Training Center <br className="hidden md:block" />
            </h2>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform duration-300">
                  <FaHeadphones className="text-white text-3xl" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Contact Phone Number</h4>
                <div className="space-y-2">
                  <p>
                    <a
                      href="tel:+444555666777"
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      +91 9537344018
                    </a>
                  </p>
                  <p>
                    <a
                      href="tel:+222222222333"
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      +91 9558216969
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform duration-300">
                  <FaEnvelope className="text-white text-3xl" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Our Email Address</h4>
                <div className="space-y-2">
                  <p>
                    <a
                      href="mailto:admin@gmail.com"
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      info@codingcloudinstitute.com
                    </a>
                  </p>
                  <p>
                    <a
                      href="mailto:example@gmail.com"
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                    >

                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform duration-300">
                  <FaMapMarkerAlt className="text-white text-3xl" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Our Location</h4>
                <p className="text-gray-600">
                  Unit No, 201, 2nd Floor, Polaris, Near Noble Hospital, Hadapsar, Pune, Maharashtra
                  411060
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form & Image Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Contact"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="order-1 lg:order-2">
              <div className="max-w-xl">
                <div className="mb-8">
                  <span className="inline-block px-6 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
                    EDUCATION FOR EVERYONE
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    Start Your Learning Journey
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Name Input */}
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 border-b-2 border-gray-300 focus:border-purple-600 outline-none transition-colors bg-transparent peer"
                      placeholder=" "
                    />
                    <label className="absolute left-4 top-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-purple-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm pointer-events-none">
                      Name
                    </label>
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 border-b-2 border-gray-300 focus:border-purple-600 outline-none transition-colors bg-transparent peer"
                      placeholder=" "
                    />
                    <label className="absolute left-4 top-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-purple-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm pointer-events-none">
                      Email
                    </label>
                  </div>

                  {/* Subject Input */}
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 border-b-2 border-gray-300 focus:border-purple-600 outline-none transition-colors bg-transparent peer"
                      placeholder=" "
                    />
                    <label className="absolute left-4 top-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-purple-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm pointer-events-none">
                      Your Subject
                    </label>
                  </div>

                  {/* Message Textarea */}
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-4 py-4 border-b-2 border-gray-300 focus:border-purple-600 outline-none transition-colors bg-transparent peer resize-none"
                      placeholder=" "
                    ></textarea>
                    <label className="absolute left-4 top-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-purple-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm pointer-events-none">
                      Message
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    <span>GET IT NOW</span>
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.061722436393!2d73.92283987397265!3d18.505634769632717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ebbf356e2f3f%3A0x4ef27a8683922201!2sCoding%20Cloud%20Institute%20%7C%20Data%20Science%20%2C%20Data%20Analyst%20%2CMern%20Stack%20%2CJava%20%2C%20Python%2CAWS%20%2C%20React%20js%20%2CTraining%20Institute%20in%20Pune!5e1!3m2!1sen!2sin!4v1769769830256!5m2!1sen!2sin"
              className="w-full h-[600px]"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Maps Location"
            ></iframe>

          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* ADD FOOTER COMPONENT HERE */}
      <Footer />
      {/* ============================================ */}
    </div>
  );
};

export default Contacts;