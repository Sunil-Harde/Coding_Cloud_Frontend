import React, { useState, useEffect } from "react";
import { FiGrid, FiList, FiSearch, FiFilter } from "react-icons/fi";
import { API, BASE_URL } from '../api/endpoints'; 

// Import the Child Component
import CourseCard from './CourseCard'; 

// Internal Loading Spinner Component
const Spinner = () => (
  <div className="flex justify-center items-center w-full h-64">
    <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
);

const CoursesList = () => {
  const [view, setView] = useState("grid"); // 'grid' or 'list'
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH API HERE ---
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Construct full URL using your endpoints file
        const url = `${BASE_URL}${API.COURSES.LIST}`;
        console.log("Fetching URL:", url);
        
        const response = await fetch(url);
        const data = await response.json();
        
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-[#eef1ff] to-[#d9c7ff] p-4 md:p-10 rounded-xl shadow-sm min-h-screen">
      
      {/* Header Info */}
      <div className="text-sm text-gray-600 mb-5">
        Home <span className="mx-1">›</span> <span className="text-black">All Courses</span>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-4xl font-extrabold text-gray-900">All Courses</h1>
        <div className="mt-3 md:mt-0 bg-white px-4 py-2 rounded-full shadow-sm text-indigo-600 font-medium">
          🎓 {courses.length} Courses
        </div>
      </div>
      
      <p className="text-gray-600 mt-2 mb-6">
        Courses that help beginner designers become true unicorns.
      </p>

      {/* Controls Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-5 border-b border-gray-300 pb-6 mb-10">
        
        {/* View Toggle Buttons */}
        <div className="flex items-center gap-3">
           <button 
             onClick={() => setView("grid")} 
             className={`flex items-center gap-2 px-4 py-2 rounded-full border transition duration-300
             ${view === "grid" ? "bg-white shadow text-indigo-600 border-transparent" : "bg-transparent border-gray-400 text-gray-600"}`}
           >
             <FiGrid /> Grid
           </button>
           
           <button 
             onClick={() => setView("list")} 
             className={`flex items-center gap-2 px-4 py-2 rounded-full border transition duration-300
             ${view === "list" ? "bg-white shadow text-indigo-600 border-transparent" : "bg-transparent border-gray-400 text-gray-600"}`}
           >
             <FiList /> List
           </button>
        </div>
        
        {/* Search & Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center bg-white shadow px-4 py-2 rounded-full w-full">
              <input type="text" placeholder="Search..." className="outline-none text-sm w-full bg-transparent" />
              <FiSearch className="text-gray-500" />
            </div>
            <button className="flex items-center gap-2 bg-white shadow px-5 py-2 rounded-full hover:bg-gray-50 transition">
              <FiFilter /> Filter
            </button>
        </div>
      </div>

      {/* --- RENDER CARDS --- */}
      {loading ? (
        <Spinner />
      ) : (
        <div className={
          view === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
            : "flex flex-col gap-6"
        }>
          {courses.length > 0 ? (
            courses.map((courseItem) => (
               <CourseCard 
                 key={courseItem.id} 
                 course={courseItem} 
                 view={view} 
               />
            ))
          ) : (
            <div className="text-center w-full col-span-full py-10 text-gray-500">
              No courses found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CoursesList;