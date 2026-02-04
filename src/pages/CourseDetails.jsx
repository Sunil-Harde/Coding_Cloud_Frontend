import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API, BASE_URL } from '../api/endpoints'; // Ensure BASE_URL is imported
import {
  FaStar, FaPlay, FaCheck, FaLock, FaUserTie,
  FaChevronDown, FaChevronUp, FaPhoneAlt, FaCheckCircle,
  FaBookOpen, FaLayerGroup
} from 'react-icons/fa';
import { MdUpdate, MdAccessTime, MdLanguage, MdOndemandVideo } from "react-icons/md";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Spinner = () => (
  <div className="flex justify-center items-center w-full h-screen bg-white">
    <svg className="animate-spin h-12 w-12 text-[#4F5DE4]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
);

// Helper component to render stars based on a number (e.g., 4 or 5)
const StarRating = ({ rating }) => {
  return (
    <div className="flex text-[#FFC224] text-xs">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className={i < rating ? "text-[#FFC224]" : "text-gray-300"} />
      ))}
    </div>
  );
};

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [faqs, setFaqs] = useState([]); // ✅ State for FAQs
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [openSection, setOpenSection] = useState(0);
  const [openFaq, setOpenFaq] = useState(null); // State for open FAQ accordion

  // Refs for sections
  const overviewRef = useRef(null);
  const detailRef = useRef(null);
  const contentRef = useRef(null);
  const instructorRef = useRef(null);
  const reviewsRef = useRef(null);
  const faqRef = useRef(null); // Ref for FAQ section

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch Course Detail
        const courseUrl = `${BASE_URL}${API.COURSES.DETAIL(id)}`;
        const courseRes = await fetch(courseUrl);
        const courseData = await courseRes.json();
        setCourse(courseData);

        // 2. Fetch Reviews
        const reviewsUrl = `${BASE_URL}${API.TESTIMONIALS.LIST}`;
        const reviewsRes = await fetch(reviewsUrl);
        const reviewsData = await reviewsRes.json();
        const reviewsList = Array.isArray(reviewsData) ? reviewsData : (reviewsData.data || []);
        setReviews(reviewsList);

        // 3. Fetch FAQs (With Debugging)
        const faqsUrl = `${BASE_URL}${API.FAQS.LIST}`;
        console.log("Fetching FAQs from:", faqsUrl);

        const faqsRes = await fetch(faqsUrl);
        const faqsData = await faqsRes.json();

        console.log("All FAQs from API:", faqsData); // 🔍 DEBUG: Check this in Console

        // Handle different API formats (Array vs Object)
        let allFaqs = [];
        if (Array.isArray(faqsData)) {
          allFaqs = faqsData;
        } else if (faqsData.results) {
          allFaqs = faqsData.results;
        } else if (faqsData.data) {
          allFaqs = faqsData.data;
        }

        // Filter FAQs for THIS specific course
        console.log(`Filtering for Course ID: ${id}`);

        // Ensure we compare numbers to numbers
        const currentCourseId = parseInt(id);
        const filteredFaqs = allFaqs.filter(faq => {
          // Check if faq.course exists and matches
          return faq.course === currentCourseId;
        });

        console.log("Filtered FAQs:", filteredFaqs); // 🔍 DEBUG: Should not be empty
        setFaqs(filteredFaqs);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Scroll Function
  const scrollToSection = (section) => {
    setActiveTab(section);
    let targetRef = null;

    switch (section) {
      case 'overview': targetRef = overviewRef; break;
      case 'Detail': targetRef = detailRef; break;
      case 'content': targetRef = contentRef; break;
      case 'instructor': targetRef = instructorRef; break;
      case 'reviews': targetRef = reviewsRef; break;
      case 'Faq': targetRef = faqRef; break; // Add case for FAQ
      default: targetRef = overviewRef;
    }

    if (targetRef && targetRef.current) {
      const elementPosition = targetRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - 250;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Helper to handle Review Images
  const getReviewImage = (imgUrl) => {
    if (!imgUrl) return "https://ui-avatars.com/api/?name=User&background=random";
    if (imgUrl.startsWith("http")) return imgUrl;
    return `${BASE_URL}${imgUrl}`; // Handle relative paths
  };

  // Toggle FAQ accordion
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (loading) return <Spinner />;
  if (!course) return <div className="text-center py-20 text-xl font-bold text-gray-600">Course not found.</div>;

  const originalPrice = course.price ? (Number(course.price) * 1.4).toFixed(2) : "0.00";

  // Calculate Average Rating dynamically
  const totalRating = reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0);
  const avgRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : "0.0";

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white font-sans text-[#1a1a2e]">

        {/* HEADER */}
        <div className="bg-gradient-to-br from-[#E0F2FE] via-[#F3E8FF] to-[#FAE8FF] pt-16 pb-48 px-5 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10 space-y-6">
            <div className="flex justify-center mb-4 gap-4">
              <span className="bg-white/80 backdrop-blur text-[#4F5DE4] text-xs font-extrabold px-4 py-1.5 rounded-full shadow-sm border border-purple-100 flex items-center gap-2">
                <span className="bg-[#FFC224] text-white p-0.5 rounded-full"><FaStar size={8} /></span> Bestseller
              </span>
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
                <div className="flex items-center gap-1 font-bold text-[#b4690e]">
                  <span className="text-lg">{avgRating || "4.8"}</span>
                  <div className="flex items-center">
                    <StarRating rating={Math.round(Number(avgRating))} />
                  </div>                    </div>
                <span className="text-gray-500 font-medium">({reviews.length} ratings)</span>
                <span className="text-gray-900 font-semibold">{course.students || '616,029'} students</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-[#4f5dff] to-[#8b7cff] bg-clip-text text-transparent leading-tight tracking-tight">
              {course.name}
            </h1>

            <div className="flex flex-wrap flex-col justify-center items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <img src={course.image || "https://ui-avatars.com/api/?name=Instructor"} alt="Instructor" className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm" />
                <span>By <span className="text-[#4F5DE4] font-bold cursor-pointer hover:underline">{course.instructor || "Angela"}</span> In <span className="font-bold">Development</span></span>
              </div>
              <div className='flex gap-5'>
                <div className="flex items-center gap-1.5 text-xs bg-white/50 px-3 py-1 rounded-full"><MdUpdate /> Updated 12/2024</div>
                <div className="flex items-center gap-1.5 text-xs bg-white/50 px-3 py-1 rounded-full">
                  <MdLanguage /> {course.language || "English"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VIDEO BANNER */}
        <div className="max-w-5xl mx-auto px-5 relative z-20 -mt-32 mb-16">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-black relative group aspect-video md:aspect-[21/9]">
            <img src={course.banner_img} alt={course.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50 shadow-lg cursor-pointer transform group-hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <FaPlay className="text-[#4F5DE4] text-2xl ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="max-w-7xl mx-auto px-5 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* --- LEFT COLUMN: PRICING CARD --- */}
            <div className="lg:col-span-1 h-fit sticky top-32 ">
              <div className="bg-white rounded-xl shadow-[0_5px_30px_rgba(0,0,0,0.08)] border border-blue-100 p-6">

                <div className="mb-6 mt-10">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-extrabold text-[#1a1a2e]">{course.price ? `$${course.price}` : "Free"}</span>
                    {course.price && <span className="text-gray-400 line-through text-lg font-medium">${originalPrice}</span>}
                  </div>
                  {course.price && (
                    <span className="inline-block bg-red-50 text-red-500 text-xs font-bold px-3 py-1 rounded-full mt-2">
                      <MdAccessTime className="inline mr-1" /> 3 days left!
                    </span>
                  )}
                </div>

                <p className="text-center text-xs text-gray-500 mb-6 flex justify-center gap-1">
                  <FaCheckCircle size={12} /> 30-Day Money-Back Guarantee
                </p>

                <div className="space-y-4 border-t border-gray-100 pt-6">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="font-semibold">Start Date</span>
                    <span className="text-xs text-gray-500">5 Hrs 20 Min</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="font-semibold">Enrolled</span>
                    <span className="text-xs text-gray-500">{course.students || 100}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="font-semibold">Lectures</span>
                    <span className="text-xs text-gray-500">{course.lecture || 50}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="font-semibold">Skill Level</span>
                    <span className="text-xs text-gray-500">Basic</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="font-semibold">Language</span>
                    <span className="text-xs text-gray-500">{course.language || "English"}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  <button className="w-full py-2.5 bg-[#F4F1FE] rounded-full text-[#4F5DE4] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#ece6fd] transition-colors">
                    <FaPhoneAlt size={10} /> Call Us: +444 555 666 777
                  </button>
                </div>
              </div>
            </div>


            {/* --- RIGHT COLUMN: SECTIONS --- */}
            <div className="lg:col-span-2">

              {/* Sticky Nav Buttons */}
              <div className="sticky top-[125px] bg-white z-30 py-5 border-b border-gray-100 mb-8 flex flex-wrap gap-2">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'Detail', label: 'Detail' },
                  { id: 'Faq', label: 'Faq' },
                  { id: 'content', label: 'Course Content' },
                  // { id: 'instructor', label: 'Instructor' },
                  { id: 'reviews', label: 'Reviews' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`px-5 py-2 text-sm font-bold rounded-full transition-all border ${activeTab === tab.id
                      ? 'bg-[#4F5DE4] text-white border-[#4F5DE4] shadow-md'
                      : 'bg-white text-gray-600 border-transparent hover:bg-gray-100'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* CONTENT BLOCKS */}
              <div className="space-y-12">

                {/* OVERVIEW */}
                <div id="overview" ref={overviewRef} className="animate-fadeIn">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">What you'll learn</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {course.text || "Are you new to programming? This course will help you get all the fundamentals needed to start your career."}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    {['Become an advanced developer', 'Use modern tools and libraries', 'Master the basics', 'Build real-world projects'].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-gray-500">
                        <FaCheck className="text-green-500 mt-1 shrink-0" size={12} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DETAIL */}
                <div id="Detail" ref={detailRef} className="animate-fadeIn ">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Detail</h3>
                  <div className="grid grid-cols-1 md:grid-cols-1 px-1 text-justify gap-4 mb-4 text-sm text-gray-600 leading-relaxed">
                    <p>
                      Are you new to PHP or need a refresher? Then this course will help you get all the fundamentals of Procedural PHP, Object Oriented PHP, MYSQLi and ending the course by building a CMS system similar to WordPress, Joomla or Drupal. Knowing PHP has allowed me to make enough money to stay home and make courses like this one for students all over the world.
                    </p>
                  </div>
                </div>

                <hr className="border-gray-100" />



                {/* FAQ SECTION (DYNAMIC) */}
                <div id="Faq" ref={faqRef} className="animate-fadeIn">
                  {/* <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3> */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h3>

                  <div className="space-y-4">
                    {faqs.length > 0 ? (
                      faqs.map((faq, index) => (
                        <div key={faq.id} className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
                          <button
                            onClick={() => toggleFaq(index)}
                            className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-colors focus:outline-none"
                          >
                            <span className="text-lg font-bold text-gray-800">{faq.question}</span>
                            {openFaq === index ? (
                              <FaChevronUp className="text-[#4F5DE4] flex-shrink-0 ml-4" />
                            ) : (
                              <FaChevronDown className="text-gray-400 flex-shrink-0 ml-4" />
                            )}
                          </button>
                          {openFaq === index && (
                            <div className="px-6 pb-6 pt-2 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                              {faq.answer.split('\n').map((line, i) => (
                                <p key={i} className="mb-2 last:mb-0">{line}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">No FAQs available for this course.</p>
                    )}
                  </div>
                </div>


                <hr className="border-gray-100" />

                {/* CONTENT */}
                {/* <div id="content" ref={contentRef} className="animate-fadeIn">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h3>
                  <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    {['Intro to Course', 'Course Fundamentals', 'Advanced Concepts'].map((sectionTitle, index) => (
                      <div key={index} className="border-b border-gray-100 last:border-0">
                        <button
                          onClick={() => setOpenSection(openSection === index ? -1 : index)}
                          className="w-full bg-white px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`text-lg font-bold ${openSection === index ? 'text-[#4F5DE4]' : 'text-gray-800'}`}>
                              {sectionTitle}
                            </span>
                            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">3 Lectures • 30min</span>
                          </div>
                          {openSection === index ? <FaChevronUp className="text-[#4F5DE4]" /> : <FaChevronDown className="text-gray-400" />}
                        </button>
                        {openSection === index && (
                          <div className="px-6 pb-6 bg-white space-y-4">
                            {[1, 2, 3].map((lecture, i) => (
                              <div key={i} className="flex justify-between items-center text-sm group">
                                <div className="flex items-center gap-3 text-gray-600 group-hover:text-[#4F5DE4] transition-colors cursor-pointer">
                                  <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center">
                                    <FaPlay size={8} className="text-gray-400 group-hover:text-[#4F5DE4]" />
                                  </div>
                                  <span className="font-medium">{i === 0 ? "Introduction" : "Lecture " + i}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="text-xs text-gray-400">10 min</span>
                                  {i !== 2 ? (
                                    <span className="bg-[#EBE9FF] text-[#4F5DE4] text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer">Preview</span>
                                  ) : (
                                    <FaLock className="text-gray-300" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div> */}

                <hr className="border-gray-100" />

                {/* REVIEWS SECTION (DYNAMIC) */}
                <div id="reviews" ref={reviewsRef} className="animate-fadeIn">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h3>

                  {/* Rating Summary Box */}
                  <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm text-center mb-8">
                    <h1 className="text-6xl font-extrabold text-[#1a1a2e]">{avgRating}</h1>
                    <div className="flex justify-center my-3">
                      <StarRating rating={Math.round(Number(avgRating))} />
                    </div>
                    <p className="text-gray-500 text-xs font-bold uppercase">Course Rating</p>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div key={review.id} className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex gap-4">
                          <img
                            src={getReviewImage(review.image)}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover border border-gray-200"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-gray-900">{review.name}</h4>
                              <span className="text-xs text-gray-400">
                                {new Date(review.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="mb-2">
                              <StarRating rating={review.rating} />
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {review.review}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">No reviews yet.</p>
                    )}
                  </div>
                </div>

                <hr className="border-gray-100" />


              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}