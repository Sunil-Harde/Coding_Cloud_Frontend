import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookSquare,
  FaLinkedinIn,
  FaTwitter,
  FaChevronUp,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { RiAdminLine } from "react-icons/ri";
import { LayoutGrid } from "lucide-react";
import logo from "../assets/images/logo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State for mobile accordions
  const [mobileSubMenu, setMobileSubMenu] = useState("");
  // State for mobile nested dashboard
  const [mobileDashboardSub, setMobileDashboardSub] = useState("");

  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setMobileSubMenu("");
    setMobileDashboardSub("");
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleMobileSubMenu = (menu) => {
    setMobileSubMenu(mobileSubMenu === menu ? "" : menu);
    if (menu !== 'dashboard') setMobileDashboardSub("");
  };

  const toggleMobileDashboardSub = (sub) => {
    setMobileDashboardSub(mobileDashboardSub === sub ? "" : sub);
  };

  return (
    <header className="sticky top-0 z-[999] bg-white shadow-sm font-sans">

      {/* =========================================================
          TOP BAR (Hidden on Mobile)
      ========================================================== */}
      <div className="hidden lg:flex h-12 bg-[#1a1a2e] text-gray-400 text-sm justify-between items-center px-6 transition-colors duration-300">
        <ul className="flex items-center gap-6">
          <li className="flex items-center gap-2 hover:text-white cursor-pointer transition"><FaInstagram /> <span>100K</span></li>
          <li className="flex items-center gap-2 hover:text-white cursor-pointer transition"><FaFacebookSquare /> <span>500K</span></li>
          <li className="flex items-center gap-2 hover:text-white cursor-pointer transition"><IoCallOutline /> <span>+1-202-555-0174</span></li>
        </ul>
        {/* <div className="flex items-center gap-3">
          <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wide">Hot</span>
          <p className="flex items-center gap-2 text-xs font-medium text-gray-300"><span>Intro price. Get Histudy for Big Sale -95% off.</span></p>
        </div> */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3 border-r border-gray-600 pr-5">
            {[FaInstagram, FaFacebookSquare, FaLinkedinIn, FaTwitter].map((Icon, i) => (
              <a key={i} href="#" className="p-1.5 rounded-full hover:bg-gray-700 hover:text-white transition"><Icon /></a>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            {/* <div className="relative group cursor-pointer py-3">
              <div className="flex items-center gap-1 hover:text-white transition"><img src="https://flagcdn.com/us.svg" alt="US" className="h-3 w-5 object-cover" /> <span>English</span> <FaChevronUp size={8} /></div>
              <div className="absolute right-0 top-full w-32 bg-white text-gray-800 shadow-xl rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {['English', 'Hindi', 'Marathi'].map(lang => <div key={lang} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{lang}</div>)}
              </div>
            </div> */}
            {/* <div className="relative group cursor-pointer py-3">
              <div className="flex items-center gap-1 hover:text-white transition"><span>USD</span> <FaChevronUp size={8} /></div>
              <div className="absolute right-0 top-full w-24 bg-white text-gray-800 shadow-xl rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {['USD', 'INR', 'EUR'].map(curr => <div key={curr} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{curr}</div>)}
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* =========================================================
          MAIN NAVIGATION
      ========================================================== */}
      <nav className="relative border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-6 h-20 flex items-center justify-between">

          {/* Logo & Category */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex-shrink-0"><img src={logo} alt="Histudy" className="h-8 md:h-10 w-auto" /></Link>

            {/* Desktop Category */}
            {/* <div className="hidden xl:block relative group">
              <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-colors">
                <LayoutGrid className="w-4 h-4" /><span>Category</span>
              </button>
              <div className="absolute top-full left-0 mt-4 w-[550px] bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
                <div className="grid grid-cols-3 gap-8 p-8">
                  <div><h6 className="text-xs font-bold text-gray-400 mb-4 tracking-wider">SCHOOL</h6><ul className="space-y-3 text-sm font-medium text-gray-600">{["Course School", "Online School", "Kindergarten", "Classic LMS"].map(item => <li key={item} className="hover:text-blue-600 cursor-pointer transition">{item}</li>)}</ul></div>
                  <div><h6 className="text-xs font-bold text-gray-400 mb-4 tracking-wider">SUBJECTS</h6><ul className="space-y-3 text-sm font-medium text-gray-600">{["Web Design", "Art & Design", "Figma", "Adobe XD"].map(item => <li key={item} className="hover:text-blue-600 cursor-pointer transition">{item}</li>)}</ul></div>
                  <div><h6 className="text-xs font-bold text-gray-400 mb-4 tracking-wider">LANGUAGES</h6><ul className="space-y-3 text-sm font-medium text-gray-600">{["English", "French", "German", "Spanish"].map(item => <li key={item} className="hover:text-blue-600 cursor-pointer transition">{item}</li>)}</ul></div>
                </div>
              </div>
            </div> */}
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8 font-bold text-gray-700 text-sm xl:text-base">
              <li><Link to="/" className="hover:text-blue-600 transition py-6 block">Home</Link></li>

              <li className="relative group py-6 cursor-pointer">
                <span className="flex items-center gap-1 hover:text-blue-600 transition">Courses <FaChevronUp size={10} className="group-hover:rotate-180 transition-transform duration-300" /></span>
                <div className="absolute top-full left-0 w-52 bg-white shadow-xl rounded-lg border border-gray-100 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 py-2">
                  <Link to="/courses" className="block px-5 py-2.5 hover:bg-gray-50 hover:text-blue-600 text-sm">All Courses</Link>
                  <Link to="/course-details" className="block px-5 py-2.5 hover:bg-gray-50 hover:text-blue-600 text-sm">Course Details</Link>
                </div>
              </li>

              {/* <li className="relative group py-6 cursor-pointer">
                <span className="flex items-center gap-1 hover:text-blue-600 transition">Dashboard <FaChevronUp size={10} className="group-hover:rotate-180 transition-transform duration-300" /></span>
                <div className="absolute top-full -left-10 w-64 bg-white shadow-xl rounded-lg border border-gray-100 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 py-2">
                  <div className="group/item relative">
                    <div className="px-5 py-2.5 flex justify-between items-center hover:bg-gray-50 hover:text-blue-600 cursor-pointer text-sm font-semibold text-gray-700"><span>Instructor Dashboard</span> <span className="text-gray-400">›</span></div>
                    <div className="absolute left-full top-0 w-52 bg-white shadow-xl rounded-lg border border-gray-100 opacity-0 invisible translate-x-2 group-hover/item:opacity-100 group-hover/item:visible group-hover/item:translate-x-0 transition-all duration-200 z-50 py-2 before:content-[''] before:absolute before:top-0 before:-left-2 before:w-4 before:h-full">
                      {["Dashboard", "Profile", "Enroll Courses", "Reviews"].map(sub => <Link key={sub} to="#" className="block px-5 py-2 hover:bg-gray-50 hover:text-blue-600 text-sm text-gray-600">{sub}</Link>)}
                    </div>
                  </div>
                  <div className="group/item relative">
                    <div className="px-5 py-2.5 flex justify-between items-center hover:bg-gray-50 hover:text-blue-600 cursor-pointer text-sm font-semibold text-gray-700"><span>Student Dashboard</span> <span className="text-gray-400">›</span></div>
                    <div className="absolute left-full top-0 w-52 bg-white shadow-xl rounded-lg border border-gray-100 opacity-0 invisible translate-x-2 group-hover/item:opacity-100 group-hover/item:visible group-hover/item:translate-x-0 transition-all duration-200 z-50 py-2 before:content-[''] before:absolute before:top-0 before:-left-2 before:w-4 before:h-full">
                      {["Dashboard", "Profile", "My Quiz", "Order History"].map(sub => <Link key={sub} to="#" className="block px-5 py-2 hover:bg-gray-50 hover:text-blue-600 text-sm text-gray-600">{sub}</Link>)}
                    </div>
                  </div>
                </div>
              </li> */}

              {/* === RESTORED ORIGINAL "PAGES" DESIGN === */}
              
            </ul>

            <div className="flex items-center gap-6">
              <div className="hidden xl:flex items-center gap-6 border-r border-gray-200 pr-6">
                <FaSearch className="text-gray-600 hover:text-blue-600 cursor-pointer text-lg transition" />
                <div className="relative group cursor-pointer">
                  {/* <CiShoppingCart className="text-2xl text-gray-600 group-hover:text-blue-600 transition" /> */}
                  {/* <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border border-white">0</span> */}
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* <Link to="/admin" className="hidden xl:flex items-center gap-1 font-bold text-gray-700 hover:text-blue-600 text-sm transition"><RiAdminLine className="text-lg" /> Admin</Link> */}
                {/* <Link to="/register" className="font-bold text-gray-700 hover:text-blue-600 text-sm transition">Register</Link> */}
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

        {/* =========================================================
             MOBILE MENU (Slide Down)
        ========================================================== */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl overflow-hidden transition-all duration-500 ease-in-out z-50 ${isMenuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col p-6 space-y-2 overflow-y-auto max-h-[80vh]">

            {/* Search */}
            <div className="relative mb-4">
              <input type="text" placeholder="Search courses..." className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 pl-10 text-sm outline-none focus:border-blue-500 transition" />
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            </div>

            <Link to="/" className="font-bold text-gray-800 py-3 border-b border-gray-50 hover:text-blue-600">Home</Link>

            {/* Categories */}
            <div className="border-b border-gray-50">
              <button onClick={() => toggleMobileSubMenu('categories')} className="flex justify-between items-center w-full py-3 font-bold text-gray-800 hover:text-blue-600">
                <span className="flex items-center gap-2"><LayoutGrid className="w-4 h-4" /> Categories</span>
                <FaChevronUp className={`text-xs transition-transform duration-300 ${mobileSubMenu === 'categories' ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileSubMenu === 'categories' ? 'max-h-[500px] mb-3' : 'max-h-0'}`}>
                <div className="pl-6 flex flex-col space-y-4">
                  <div><p className="text-xs font-bold text-gray-400 mb-2 tracking-wider">SCHOOL</p>{["Course School", "Online School", "Kindergarten", "Classic LMS"].map(item => <p key={item} className="text-sm text-gray-600 py-1 cursor-pointer hover:text-blue-600">{item}</p>)}</div>
                  <div><p className="text-xs font-bold text-gray-400 mb-2 tracking-wider">SUBJECTS</p>{["Web Design", "Art & Design", "Figma", "Adobe XD"].map(item => <p key={item} className="text-sm text-gray-600 py-1 cursor-pointer hover:text-blue-600">{item}</p>)}</div>
                  <div><p className="text-xs font-bold text-gray-400 mb-2 tracking-wider">LANGUAGES</p>{["English", "French", "German", "Spanish"].map(item => <p key={item} className="text-sm text-gray-600 py-1 cursor-pointer hover:text-blue-600">{item}</p>)}</div>
                </div>
              </div>
            </div>

            {/* Courses */}
            <div className="border-b border-gray-50">
              <button onClick={() => toggleMobileSubMenu('courses')} className="flex justify-between items-center w-full py-3 font-bold text-gray-800 hover:text-blue-600">
                Courses <FaChevronUp className={`text-xs transition-transform duration-300 ${mobileSubMenu === 'courses' ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileSubMenu === 'courses' ? 'max-h-40 mb-3' : 'max-h-0'}`}>
                <div className="pl-4 flex flex-col space-y-2 text-sm text-gray-600">
                  <Link to="/courses" className="hover:text-blue-600">All Courses</Link>
                  <Link to="/course-details" className="hover:text-blue-600">Course Details</Link>
                </div>
              </div>
            </div>

            {/* Dashboard (With Nested Mobile Dropdowns) */}
            <div className="border-b border-gray-50">
              <button onClick={() => toggleMobileSubMenu('dashboard')} className="flex justify-between items-center w-full py-3 font-bold text-gray-800 hover:text-blue-600">
                Dashboard <FaChevronUp className={`text-xs transition-transform duration-300 ${mobileSubMenu === 'dashboard' ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileSubMenu === 'dashboard' ? 'max-h-[500px] mb-3' : 'max-h-0'}`}>
                <div className="pl-4 pb-2 flex flex-col space-y-2">
                  <div>
                    <button onClick={() => toggleMobileDashboardSub('instructor')} className="flex justify-between items-center w-full py-2 text-sm font-bold text-gray-700 hover:text-blue-600">
                      Instructor Dashboard <FaChevronUp className={`text-[10px] transition-transform ${mobileDashboardSub === 'instructor' ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${mobileDashboardSub === 'instructor' ? 'max-h-40' : 'max-h-0'}`}>
                      <div className="pl-4 border-l-2 border-gray-100 flex flex-col space-y-2 text-sm text-gray-600 py-1">
                        {["Dashboard", "Profile", "Enroll Courses", "Reviews"].map(sub => <Link key={sub} to="#" className="hover:text-blue-600">{sub}</Link>)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <button onClick={() => toggleMobileDashboardSub('student')} className="flex justify-between items-center w-full py-2 text-sm font-bold text-gray-700 hover:text-blue-600">
                      Student Dashboard <FaChevronUp className={`text-[10px] transition-transform ${mobileDashboardSub === 'student' ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${mobileDashboardSub === 'student' ? 'max-h-40' : 'max-h-0'}`}>
                      <div className="pl-4 border-l-2 border-gray-100 flex flex-col space-y-2 text-sm text-gray-600 py-1">
                        {["Dashboard", "Profile", "My Quiz", "Order History"].map(sub => <Link key={sub} to="#" className="hover:text-blue-600">{sub}</Link>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pages (Restored Structure for Mobile) */}
            <div className="border-b border-gray-50">
              <button onClick={() => toggleMobileSubMenu('pages')} className="flex justify-between items-center w-full py-3 font-bold text-gray-800 hover:text-blue-600">
                Pages <FaChevronUp className={`text-xs transition-transform duration-300 ${mobileSubMenu === 'pages' ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileSubMenu === 'pages' ? 'max-h-[800px] mb-3' : 'max-h-0'}`}>
                <div className="pl-6 flex flex-col space-y-6 pb-4">
                  <div>
                    <p className="text-xs font-bold text-gray-400 mb-2 tracking-wider">GET STARTED</p>
                    <div className="flex flex-col space-y-2 text-sm text-gray-600">
                      <Link to="/about" className="hover:text-blue-600">About Us 01</Link>
                      <Link to="/events" className="hover:text-blue-600">Events</Link>
                      <Link to="/event-details" className="hover:text-blue-600">Event Details</Link>
                      <Link to="/academy-gallery" className="hover:text-blue-600">Academy Gallery</Link>
                      <Link to="/admission-guide" className="hover:text-blue-600">Admission Guide</Link>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 mb-2 tracking-wider">EXTRA</p>
                    <div className="flex flex-col space-y-2 text-sm text-gray-600">
                      <Link to="/profile" className="hover:text-blue-600">Profile</Link>
                      <Link to="/contact" className="hover:text-blue-600">Contact Us</Link>
                      <Link to="/instructor" className="hover:text-blue-600">Become a Teacher</Link>
                      <Link to="/Teachers" className="hover:text-blue-600">Instructors</Link>
                      <Link to="/faqs" className="hover:text-blue-600">FAQs</Link>
                      <Link to="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 mb-2 tracking-wider">SHOP PAGES</p>
                    <div className="flex flex-col space-y-2 text-sm text-gray-600">
                      <Link to="/shop" className="hover:text-blue-600 text-blue-600 font-bold">Shop (Sale Anything)</Link>
                      <Link to="/single-product" className="hover:text-blue-600">Single Product</Link>
                      <Link to="/cart" className="hover:text-blue-600">Cart Page</Link>
                      <Link to="/checkout" className="hover:text-blue-600">Checkout</Link>
                      <Link to="/wishlist" className="hover:text-blue-600">Wishlist Page</Link>
                      <Link to="/account" className="hover:text-blue-600">My Account</Link>
                      <Link to="/login" className="hover:text-blue-600">Login & Register</Link>
                      <Link to="/subscription" className="hover:text-blue-600">Subscription</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Bottom Actions */}
            <div className="pt-4 flex flex-col gap-3">
              <Link to="/admin" className="flex items-center gap-2 font-bold text-gray-700 hover:text-blue-600 justify-center p-2 rounded-lg bg-gray-50"><RiAdminLine /> Admin Login</Link>
              <Link to="/register" className="font-bold text-gray-700 hover:text-blue-600 text-center p-2 rounded-lg bg-gray-50">Register / Login</Link>
              <button className="bg-blue-600 text-white w-full py-3.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">Enroll Now</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;