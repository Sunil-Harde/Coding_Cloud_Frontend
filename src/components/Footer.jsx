import React from 'react';
import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn, FaArrowRight } from 'react-icons/fa';
import CodingCloud from '../assets/images/logo.png'
const Footer = () => {


  const linkIcon= [

    {
      id:1,
      icon: FaFacebookF,
      link:"https://www.facebook.com/codingcloudinstitute"
    },

    {
      id:2,
      icon: FaYoutube,
      link:"https://www.youtube.com/@CodingHunt"
    },

    {
      id:3,
      icon:  FaInstagram ,
      link:"https://www.instagram.com/codingcloud_institute/"
    },

    {
      id:4,
      icon: FaLinkedinIn,
      link:"https://www.linkedin.com/company/coding-cloud/"
    }

  ]

  return (
    <footer className="bg-white pt-20 pb-10 border-t border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-5">

        {/* --- TOP MAIN SECTION --- */}
        {/* Changed grid to 12 columns for better control. Stacks on mobile (col-span-1), splits on large (4/8) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">

          {/* COLUMN 1: BRAND INFO (Takes 4/12 columns on large screens) */}
          <div className=" mb-10 lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-6">
              {/* Logo Icon */}
              <div className=" h-15 w-15">
                <img src={CodingCloud} alt="" className='max-h-12 max-w-18' />
              </div>
            </div>
            <p className="text-gray-500 leading-relaxed mb-8 pr-0 md:pr-4">
              We’re always in search for talented and motivated people. Don’t be shy introduce yourself!
            </p>
            <button className="flex items-center gap-2 px-8 py-3 rounded-full border border-gray-300 text-gray-700 font-bold hover:bg-[#6A4DF4] hover:text-white hover:border-[#6A4DF4] transition-all duration-300 group shadow-sm hover:shadow-lg">
              Contact With Us <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* RIGHT SIDE LINKS CONTAINER (Takes 8/12 columns on large screens) */}
          <div className="lg:col-span-8">
            {/* Nested Grid: Stacks on mobile, 3 columns on tablet+ */}
            <div className='grid grid-cols-2 sm:grid-cols-3 sm:gap-8 '>
              {/* Column 2: Useful Links */}
              <div className="bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-6 md:mb-8">Top Cource</h3>
                <ul className="space-y-3 md:space-y-4 text-gray-500 font-medium">
                  {['Marketplace', 'kindergarten', 'University', 'GYM Coaching', 'FAQ'].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-[#6A4DF4] hover:pl-2 transition-all duration-300 block w-fit">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Our Company */}
              <div className="bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-6 md:mb-8">Our Company</h3>
                <ul className="space-y-3 md:space-y-4 text-gray-500 font-medium">
                  {['Contact Us', 'Become Teacher', 'Blog'].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-[#6A4DF4] hover:pl-2 transition-all duration-300 block w-fit">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: Get Contact */}
              <div className=" mt-10 sm:mt-0 col-span-2 sm:col-span-1  ">
                <h3 className="text-xl font-bold text-gray-900 mb-6 md:mb-8">Get Contact</h3>
                <div className="space-y-3 md:space-y-4 text-gray-500 mb-8 font-medium">
                  <p className="hover:text-[#6A4DF4] cursor-pointer">Phone: +91 95373 44018</p>
                  <p className="hover:text-[#6A4DF4] cursor-pointer break-all">E-mail: pune@codingcloudinstitute.com</p>
                  <p>Location: Office No. 201, 2nd Floor, Polaris Building, Nr. Noble Hospital Hadapsar, Pune, 411028</p>
                </div>

                {/* Social Icons */}
                <div className="flex gap-4">
                  {linkIcon.map((data, index) => (
                    <a key={index} href={data.link} target="_blank" className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#6A4DF4] hover:text-white hover:-translate-y-1 transition-all duration-300">
                      <data.icon />
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR: COPYRIGHT & LINKS --- */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p className="text-center md:text-left">
            Copyright © 2025 <span className="font-bold text-gray-900">Coding Cloud</span>. All Rights Reserved
          </p>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-6 items-center">
            <a href="#" className="hover:text-[#6A4DF4] transition-colors">Terms of service</a>
            <span className="hidden md:inline text-gray-300">|</span>
            <a href="#" className="hover:text-[#6A4DF4] transition-colors">Privacy policy</a>
            {/* <span className="hidden md:inline text-gray-300">|</span> */}
            {/* <a href="#" className="hover:text-[#6A4DF4] transition-colors">Subscription</a> */}
            {/* <span className="hidden md:inline text-gray-300">|</span> */}
            {/* <a href="#" className="hover:text-[#6A4DF4] transition-colors">Login & Register</a> */}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;