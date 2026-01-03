import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../api/endpoints';
import { FaArrowLeft, FaStar } from 'react-icons/fa';

// Spinner Component
const Spinner = () => (
  <div className="flex justify-center items-center w-full h-96">
    <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
);

export default function CategoryCourses() {
  const { id } = useParams(); // Get Category ID from URL
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch the Category Details (to get the Name)
        const catResponse = await fetch(API.CATEGORY.DETAIL(id));
        const catData = await catResponse.json();
        setCategoryName(catData.name); // Assuming API returns 'name'

        // 2. Fetch ALL Courses
        const courseResponse = await fetch(API.COURSES.LIST);
        const courseData = await courseResponse.json();

        // 3. Filter courses that match this Category ID
        // Note: We check if course.category == id
        const filteredCourses = courseData.filter(course => course.category === Number(id));
        
        setCourses(filteredCourses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-4 md:mb-0">
                <FaArrowLeft className="mr-2" /> Back
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
                {categoryName ? `${categoryName} Courses` : "Courses"}
            </h1>
            <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {loading ? (
          <Spinner />
        ) : courses.length === 0 ? (
          <div className="text-center py-20 text-xl text-gray-500">
            No courses found in this category.
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((data, index) => (
              <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col border border-gray-100">
                
                {/* Image */}
                <div className="relative overflow-hidden h-52 shrink-0">
                  <img
                    src={data.banner_img}
                    alt={data.title}
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {data.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-4 text-orange-400">
                     <FaStar /> <span className="text-gray-500 text-sm">({data.reviews || 0} Reviews)</span>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="text-xl font-bold text-indigo-600">
                        {data.price ? `$${data.price}` : "Free"}
                    </span>
                    <button 
                        onClick={() => navigate(`/course/${data.id}`)}
                        className="text-indigo-600 font-semibold text-sm hover:underline"
                    >
                        View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}