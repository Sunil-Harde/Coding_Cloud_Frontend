import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { API } from "../api/endpoints";

// --- ICONS ---
import {
  FaInstagram, FaFacebookSquare, FaLinkedinIn, FaTwitter,
  FaChevronUp, FaSearch, FaBars, FaTimes,
  FaPython, FaJava, FaReact, FaNodeJs, FaAndroid, FaAws, FaPhp, FaCheckCircle
} from "react-icons/fa";
import {
  SiDjango, SiJavascript, SiFlutter, SiHtml5, SiC, SiMysql, SiCplusplus
} from "react-icons/si";
import { TbBrandCpp } from "react-icons/tb";
import { IoCallOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { BrainCircuit } from "lucide-react";
import { BsGraphUp } from "react-icons/bs";
import { MdOutlineScience } from "react-icons/md";
import logo from "../assets/images/logo.png";

// --- ICON HELPER FUNCTION ---
const getCourseIcon = (courseName) => {
  const lowerName = courseName.toLowerCase();

  // Python & Data
  if (lowerName.includes("python django")) return <SiDjango className="text-green-900 text-xl" />;
  if (lowerName.includes("python")) return <FaPython className="text-yellow-500 text-2xl" />;
  if (lowerName.includes("machine learning")) return <BrainCircuit className="text-pink-500 text-xl" />;
  if (lowerName.includes("data science")) return <MdOutlineScience className="text-blue-400 text-2xl" />;
  if (lowerName.includes("data analytics")) return <BsGraphUp className="text-yellow-600 text-xl" />;
  if (lowerName.includes("testing")) return <FaCheckCircle className="text-red-500 text-xl" />;

  // Web & Mobile
  if (lowerName.includes("javascript")) return <SiJavascript className="text-yellow-400 text-xl" />;
  if (lowerName.includes("react")) return <FaReact className="text-blue-400 text-2xl" />;
  if (lowerName.includes("node")) return <FaNodeJs className="text-green-600 text-2xl" />;
  if (lowerName.includes("mern")) return <div className="flex text-xs"><FaReact className="text-blue-400" /><FaNodeJs className="text-green-500" /></div>;
  if (lowerName.includes("android")) return <FaAndroid className="text-green-500 text-2xl" />;
  if (lowerName.includes("flutter")) return <SiFlutter className="text-blue-400 text-xl" />;

  // Programming Languages
  if (lowerName.includes("c++")) return <TbBrandCpp className="text-blue-700 text-2xl" />;
  if (lowerName.includes("c programming")) return <SiC className="text-blue-500 text-2xl" />;
  if (lowerName.includes("php")) return <FaPhp className="text-indigo-600 text-2xl" />;
  if (lowerName.includes("java")) return <FaJava className="text-red-500 text-2xl" />;
  if (lowerName.includes("web design")) return <SiHtml5 className="text-orange-500 text-xl" />;
  if (lowerName.includes("aws")) return <FaAws className="text-orange-400 text-2xl" />;

  return <FaCheckCircle className="text-gray-400 text-xl" />;
};

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState("");
  const [courses, setCourses] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(API.COURSES.LIST);
        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setMobileSubMenu("");
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMobileSubMenu = (menu) => setMobileSubMenu(mobileSubMenu === menu ? "" : menu);

  return (
    <header className="sticky top-0 z-[999] bg-white shadow-sm font-sans">

      {/* TOP BAR */}
      <div className="hidden lg:flex h-12 bg-[#1a1a2e] text-gray-400 text-sm justify-between items-center px-6 transition-colors duration-300">
        <ul className="flex items-center gap-6">
          <li className="flex items-center gap-2 hover:text-white cursor-pointer transition"><FaInstagram /> <span>100K</span></li>
          <li className="flex items-center gap-2 hover:text-white cursor-pointer transition"><FaFacebookSquare /> <span>500K</span></li>
          <li className="flex items-center gap-2 hover:text-white cursor-pointer transition"><IoCallOutline /> <span>+1-202-555-0174</span></li>
        </ul>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3 border-r border-gray-600 pr-5">
            {[FaInstagram, FaFacebookSquare, FaLinkedinIn, FaTwitter].map((Icon, i) => (
              <a key={i} href="#" className="p-1.5 rounded-full hover:bg-gray-700 hover:text-white transition"><Icon /></a>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav className="relative border-b border-gray-100">
        {/* ✅ 1. ADDED 'relative' TO THIS CONTAINER */}
        <div className="container mx-auto px-4 lg:px-6 h-20 flex items-center justify-between relative">

          <div className="flex items-center gap-8">
            <Link to="/" className="flex-shrink-0"><img src={logo} alt="Histudy" className="h-8 md:h-10 w-auto" /></Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8 font-bold text-gray-700 text-sm xl:text-base">
              <li><Link to="/" className="hover:text-blue-600 transition py-6 block">Home</Link></li>

              {/* DYNAMIC MEGA MENU */}
              {/* ✅ 2. CHANGED 'relative' TO 'static' HERE */}
              <li className="static group py-6 cursor-pointer">
                <span className="flex items-center gap-1 hover:text-blue-600 transition">
                  Courses <FaChevronUp size={10} className="group-hover:rotate-180 transition-transform duration-300" />
                </span>

                {/* ✅ 3. CHANGED WIDTH TO 'w-full' AND REMOVED NEGATIVE MARGIN */}
                <div className="absolute top-full left-0 w-full bg-white shadow-2xl rounded-b-xl border-t border-gray-100 opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 p-8">
                  {/* Grid System (Increased to 4 columns for full width look) */}
                  <div className="grid grid-cols-4 gap-y-4 gap-x-8">
                    {courses.map((course) => (
                      <Link
                        key={course.id}
                        to={`/course/${course.id}`}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group/item"
                      >
                        <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full group-hover/item:bg-white group-hover/item:shadow-md transition-all shrink-0">
                          {getCourseIcon(course.name)}
                        </div>
                        <span className="text-sm font-bold text-gray-700 group-hover/item:text-blue-600 transition-colors truncate">
                          {course.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                  {courses.length === 0 && <div className="text-center text-gray-400 py-4 italic">Loading courses...</div>}
                </div>
              </li>

              <li className="relative group py-6 cursor-pointer hover:text-blue-600">Juniors</li>
              <li className="relative group py-6 cursor-pointer hover:text-blue-600">Internship</li>
              <li className="relative group py-6 cursor-pointer hover:text-blue-600">
                <Link to="/about">About Us</Link>
              </li>

              <li className="relative group py-6 cursor-pointer hover:text-blue-600">
                <Link to="/contact">contact Us</Link>
              </li>
            </ul>

            <div className="flex items-center gap-6">
              <div className="hidden xl:flex items-center gap-6 border-r border-gray-200 pr-6">
                <FaSearch className="text-gray-600 hover:text-blue-600 cursor-pointer text-lg transition" />
              </div>
              <div className="flex items-center gap-4">
                <button className="bg-gray-900 text-white rounded-full px-6 py-2.5 font-bold text-sm hover:bg-blue-600 hover:shadow-lg transition-all duration-300">Enroll Now</button>
              </div>
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="lg:hidden flex items-center gap-5">
            <div className="relative"><CiShoppingCart className="text-2xl text-gray-700" /><span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border border-white">0</span></div>
            <button onClick={toggleMenu} className="text-2xl text-gray-800 focus:outline-none hover:text-blue-600 transition">{isMenuOpen ? <FaTimes /> : <FaBars />}</button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl overflow-hidden transition-all duration-500 ease-in-out z-50 ${isMenuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col p-6 space-y-2 overflow-y-auto max-h-[80vh]">

            <div className="relative mb-4">
              <input type="text" placeholder="Search courses..." className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 pl-10 text-sm outline-none focus:border-blue-500 transition" />
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            </div>

            <Link to="/" className="font-bold text-gray-800 py-3 border-b border-gray-50 hover:text-blue-600">Home</Link>

            <div className="border-b border-gray-50">
              <button onClick={() => toggleMobileSubMenu('courses')} className="flex justify-between items-center w-full py-3 font-bold text-gray-800 hover:text-blue-600">
                Courses <FaChevronUp className={`text-xs transition-transform duration-300 ${mobileSubMenu === 'courses' ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileSubMenu === 'courses' ? 'max-h-96 mb-3' : 'max-h-0'}`}>
                <div className="pl-4 flex flex-col space-y-2 text-sm text-gray-600">
                  {courses.map((course) => (
                    <Link
                      key={course.id}
                      to={`/course/${course.id}`}
                      className="hover:text-blue-600 py-1 flex items-center gap-2"
                    >
                      <span className="text-xs opacity-70">{getCourseIcon(course.name)}</span> {course.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/contact" className="font-bold text-gray-800 py-3 border-b border-gray-50 hover:text-blue-600">Contact Us</Link>

            <div className="pt-4 flex flex-col gap-3">
              <button className="bg-blue-600 text-white w-full py-3.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">Enroll Now</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;