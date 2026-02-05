import React from 'react';
// 1. Missing Icons इथे ऍड केले आहेत
import {
  FaArrowRight, FaHeart, FaBookOpen, FaLaptopCode, FaPlay,
  FaGoogle, FaYelp, FaFacebookF, FaMicrosoft, FaHubspot
} from "react-icons/fa";

import KnowAboutUs from '../components/KnowAboutUs';
import TestimonialSection from '../components/TestimonialSection';
import NewsletterSection from '../components/NewsletterSection';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const AboutHeroImage = "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";


const About = () => {


  const aboutData = {
    badge: "KNOW ABOUT US",
    title: <>We develops skills in youngsters & became the reason for success</>,
    desc: "We are one of the most reputed Training institutes in Ahmedabad, Pune & Navi Mumbai. We are providing, Live Project Training in All Programming Languages C, PHP, Java, Android, Python, Data Science, Software Testing, & Graphic Designing. We are Providing Training classes in with Live Projects. We have a team professional Trainers , mentors and industry experts who Continuously struggling to survey current market and preparing India’s youth to contribute in the growth of our country. After Training, We provide 100% assured job assistant after the training. Our Goal is “your Career is our Commitment ” . We Have Unlimited Combinations to create Bright Career. Our Culture is “No Theory , No Books”",
    features: [
      { id: 1, title: "Flexible Classes", desc: "Readable content.", icon: <FaHeart className="text-red-500 text-2xl" />, bg: "bg-red-100" },
      { id: 2, title: "Learn From Anywhere", desc: "Recusandae laborum.", icon: <FaBookOpen className="text-blue-600 text-2xl" />, bg: "bg-blue-100" },
      { id: 3, title: "Experienced Teachers", desc: "Aliquid mollitia.", icon: <FaLaptopCode className="text-orange-600 text-2xl" />, bg: "bg-orange-100" }
    ]
  };



  return (
    <div className="about-page ">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${AboutHeroImage})` }}></div>
        <div className="absolute inset-0 bg-[#0e1133]/70"></div>
        <div className="relative mb-20 z-10 text-center px-2 max-w-7xl mx-auto text-white flex flex-col items-center">
          <span className="inline-block px-4 py-1 mb-6 text-xl md:text-3xl lg:text-4xl  font-bold tracking-widest uppercase bg-white/10 rounded px-3 py-1 text-white backdrop-blur-sm">Coding <span className="text-blue-500">Cloud</span></span>
          <h1 className="text-xl md:text-5xl lg:text-5xl font-extrabold leading-tight mb-8 drop-shadow-lg">
            {/* <br className="hidden md:block" /> */}
            Your Door To The Future.
          </h1>
          {/* <button className="custom-btn">More About Us <span>→</span></button> */}
        </div>
      </div>

      <div>
        <KnowAboutUs data={aboutData} />
      </div>

      {/* --- VIDEO / INFO SECTION --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1 mb-4 text-xs font-bold text-blue-600 bg-blue-100 rounded-full uppercase tracking-wider">HOW WE WORK</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] mb-6 leading-tight">Discover yourself with  <br />coding cloud</h2>

            <p className="text-gray-900 text-lg mt-10 font-bold leading-relaxed">For Creative learning</p>
            <p className="text-gray-500 text-lg mb-5  leading-relaxed">Developing the creative innovators of tomorrow</p>

            <p className="text-gray-900 text-lg  font-bold leading-relaxed">For a better tomorrow</p>
            <p className="text-gray-500 text-lg mb-5 leading-relaxed">A Success-oriented learning environment.</p>

            <p className="text-gray-900 text-lg  font-bold leading-relaxed">Ignite young minds</p>
            <p className="text-gray-500 text-lg mb-5 leading-relaxed">Learning to lead with technology</p>

            <p className="text-gray-900 text-lg font-bold leading-relaxed">Technology that inspires</p>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed">Looking to the future with hope</p>

            <Link to="/contact">

              <div className="relative inline-flex items-center gap-3 cursor-pointer group overflow-hidden rounded-full py-3 pr-6 pl-2 transition-all">
                <span className="absolute top-0 left-0 h-full w-0 rounded-4xl bg-blue-300 group-hover:bg-blue-600 group-hover:w-full w-1/5 transition-all duration-500 ease-out z-0"></span>
                <div className="absolute left-0 w-12 h-12 bg-blue-200/50 rounded-full -z-10 group-hover:scale-110 transition-transform duration-300"></div>
                <span className="relative z-10 font-bold text-gray-800 ml-4 group-hover:text-white transition-colors duration-300">Learn More About Us</span>
                <FaArrowRight className="relative z-10 text-gray-800 text-sm group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>

            </Link>
          </div>
          <div className="relative rounded overflow-hidden shadow-2xl group cursor-pointer h-[400px] w-full">
            <img src="https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Student Learning" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FaPlay className="text-white text-xl ml-1" />
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIAL SCROLL SECTION --- */}
      <div className='relative'>
        <div className='flex px-10 bg-white  z-10 absolute bottom-0 h-full gap-5 flex-col w-1/4 justify-center items-center'>

          <div className="  flex px-10  bg-gradient-to-r from-white to-transparent z-10 absolute  h-full gap-5 ml-[150%] w-1/2 justify-center items-center "> </div>

          <div className="text-center py-2 px-7 font-bold bg-fuchsia-200 text-fuchsia-500 rounded-4xl ">
            <h1 >LEARNERS FEEDBACK</h1>
          </div>

          <div className='text-4xl font-extrabold'>
            <h1>What Our Learners Say</h1>
          </div>

          <div className='text-gray-500'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae consectetur adipisicing elit. Repudiandae </p>
          </div>

          <Link to="/contact"><button className='custom-btn'> Contact Us</button></Link>

        </div>
        <TestimonialSection />
      </div>


      <section className="py-16 bg-white">
        {/* <div className="container mx-auto px-4">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 mb-4 text-xs font-bold tracking-wider text-red-400 uppercase bg-red-200 rounded-full">
              Skill Teacher
            </span>
            <h2 className="mb-4 text-4xl font-extrabold text-slate-900">
              Whose Inspirations You Love
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Far far away, behind the word mountains, far from the countries Vokalia and
              Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at
              the coast of the Semantics, a large language ocean.
            </p>
          </div>
        </div> */}

        {/* Cards Grid */}

      </section>


      <Footer />
    </div>
  );
};

export default About;