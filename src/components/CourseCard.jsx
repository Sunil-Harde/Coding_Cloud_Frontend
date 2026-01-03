import React, { useState, useEffect } from 'react';
import { API } from '../api/endpoints';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaBookOpen, FaUserFriends, FaChevronRight } from 'react-icons/fa';

const Spinner = () => (
  <div className="flex justify-center items-center w-full h-96">
    <svg className="animate-spin h-12 w-12 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
);

export default function CourseCard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("All Courses");
  
  const navigate = useNavigate();
  const { categoryId } = useParams(); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(API.COURSES.LIST);
        const allCourses = await response.json();

        if (categoryId) {
          const filtered = allCourses.filter(course => Number(course.category) === Number(categoryId));
          setCourses(filtered);
          setPageTitle("Category Courses");
        } else {
          setCourses(allCourses);
          setPageTitle("All Courses");
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [categoryId]);

  return (
    <div className="w-full min-h-screen py-10 px-5 bg-gray-50">
      
      {/* Page Title */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
      </div>

      {loading ? (
        <Spinner />
      ) : courses.length === 0 ? (
        <div className="text-center text-xl text-gray-500 mt-20">No courses found.</div>
      ) : (
        <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((data, index) => (
            // CARD CONTAINER
            <div 
              key={index} 
              className="bg-white rounded-[2rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full"
            >
              
              {/* 1. IMAGE SECTION (With Padding & Rounded Corners) */}
              <div className="relative h-56 w-full rounded-2xl overflow-hidden mb-5 shrink-0 bg-gray-100">
                <img
                  src={data.banner_img}
                  alt={data.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Course+Image"; }}
                />
              </div>

              {/* 2. CONTENT SECTION */}
              <div className="flex flex-col flex-1 px-2">
                
                {/* Rating Stars */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-orange-400 text-sm">
                     {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < (data.rating || 5) ? "fill-current" : "text-gray-200"} />
                     ))}
                  </div>
                  <span className="text-gray-400 text-xs font-medium">({data.reviews || 0} Reviews)</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                  {data.name}
                </h3>

                {/* Lessons & Students Meta */}
                <div className="flex items-center gap-6 text-gray-500 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <FaBookOpen className="text-indigo-400" />
                    <span>{data.lecture} Lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUserFriends className="text-orange-400" />
                    <span>{data.students} Students</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                  {data.text || "Learn the fundamentals and advanced concepts in this comprehensive course designed for all skill levels."}
                </p>

                {/* Footer: Instructor & Price */}
                <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4 mb-5">
                   {/* Instructor */}
                   <div className="flex items-center gap-3">
                      <img 
                        src={data.image || "https://ui-avatars.com/api/?name=Instructor&background=random"} 
                        alt="Instructor" 
                        className="w-10 h-10 rounded-full object-cover border border-gray-100"
                      />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Instructor</span>
                        <span className="text-sm font-bold text-gray-900">{data.instructor || "Unknown"}</span>
                      </div>
                   </div>

                   {/* Price */}
                   <span className="text-lg font-bold text-indigo-600">
                     {data.price && Number(data.price) > 0 ? `$${data.price}` : "Free"}
                   </span>
                </div>

                {/* 3. BUTTON (Full Width, Light Purple) */}
                <button 
                  onClick={() => navigate(`/course/${data.id}`)}
                  className="w-full py-3.5 rounded-xl bg-[#F0F0FF] text-[#5D3EFF] font-bold text-sm hover:bg-[#5D3EFF] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Learn More
                  <FaChevronRight className="text-xs transition-transform group-hover:translate-x-1" />
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}