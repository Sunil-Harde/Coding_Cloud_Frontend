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
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
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
          {categories.map((cat, index) => (
            <div 
              key={index}
              // ✅ FIX: Navigate to specific ID URL
              onClick={() => navigate(`/category/${cat.id}`)}
              className="h-60 shadow-xl bg-white rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:-translate-y-2 transition-transform duration-300 border border-transparent hover:border-blue-500"
            >
              <img 
                src={`${BASE_URL}${cat.image}`} 
                alt={cat.name} 
                className="h-20 mb-5 object-contain"
                onError={(e) => { e.target.src = "https://via.placeholder.com/100?text=Icon"; }} 
              />
              <h1 className="text-lg font-semibold">{cat.name}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;