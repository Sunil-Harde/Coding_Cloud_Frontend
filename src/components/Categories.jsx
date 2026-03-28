import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { API, BASE_URL } from '../api/endpoints';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}${API.CATEGORY.LIST}`);
        const jsonData = await response.json();
        
        // ✅ DEFENSIVE CODING: Extract the array safely
        let dataArray = [];
        if (Array.isArray(jsonData)) {
            dataArray = jsonData;
        } else if (jsonData.results && Array.isArray(jsonData.results)) {
            dataArray = jsonData.results;
        } else if (jsonData.data && Array.isArray(jsonData.data)) {
            dataArray = jsonData.data;
        }

        setCategories(dataArray);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <div className="p-2 mt-20 bg-blue-100 text-blue-700 font-semibold rounded-full px-6">CATEGORIES</div>
      <h1 className="text-2xl md:text-4xl font-bold text-center mt-5 mb-10">Explore Top Categories</h1>
      
      {loading ? (
        <div className="animate-pulse text-blue-600 font-bold">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-[90%] gap-10">
          {/* ✅ SAFETY CHECK: Ensure categories is an array before mapping */}
          {(Array.isArray(categories) ? categories : []).map((cat) => (
            <div 
              key={cat.id} // Use cat.id instead of index for better React performance
              onClick={() => navigate(`/category/${cat.id}`)}
              className="h-60 shadow-xl bg-white rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:-translate-y-2 transition-transform duration-300 border border-transparent hover:border-blue-500 group"
            >
              <img 
                // Handle image URLs safely (prepend BASE_URL if it's a relative path)
                src={cat.image?.startsWith('http') ? cat.image : `${BASE_URL}${cat.image}`} 
                alt={cat.name} 
                className="h-20 mb-5 object-contain group-hover:scale-110 transition-transform duration-300"
                onError={(e) => { e.target.src = "https://via.placeholder.com/100?text=Icon"; }} 
              />
              <h1 className="text-lg font-semibold text-gray-800">{cat.name}</h1>
            </div>
          ))}
          
          {!loading && categories.length === 0 && (
             <div className="col-span-full text-center text-gray-500 py-10">No categories found.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Categories;