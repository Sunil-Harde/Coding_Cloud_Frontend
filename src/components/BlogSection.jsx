import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API, BASE_URL } from "../api/endpoints";

const BlogSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  // Standard placeholder image (Base64 or local path is safer than external URL)
  const FALLBACK_IMAGE = "https://ui-avatars.com/api/?name=No+Image&background=random";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const url = `${BASE_URL}${API.ARTICLES.LIST}`;
        const response = await fetch(url);

        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        const result = await response.json();

        if (Array.isArray(result)) {
          setArticles(result);
        } else if (result.data && Array.isArray(result.data)) {
          setArticles(result.data);
        } else {
          setArticles([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError(error.message);
        setArticles([]);
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // ✅ SAFER IMAGE HANDLER
  const handleImageError = (e) => {
    // Prevent infinite loop: If the current src is ALREADY the fallback, stop.
    if (e.target.src.includes("ui-avatars.com")) {
      e.target.style.display = "none"; // Hide image if fallback fails
      return;
    }
    e.target.src = FALLBACK_IMAGE;
  };

  const getImage = (item) => {
    // Return API image or fallback immediately if null
    return item.image || item.img || FALLBACK_IMAGE;
  };

  if (loading) return <div className="py-24 text-center animate-pulse">Loading Articles...</div>;
  if (error) return <div className="py-24 text-center text-red-500">Error: {error}</div>;
  if (!Array.isArray(articles) || articles.length === 0) return <div className="py-24 text-center">No articles available.</div>;

  const featuredArticle = articles[0];
  const sideArticles = showAll ? articles.slice(1) : articles.slice(1, 4);

  return (
    
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="inline-block px-4 py-1 mb-4 text-sm font-bold text-[#6A4DF4] bg-[#F2F0FE] rounded-full uppercase tracking-wider">BLOG POST</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">Popular Articles</h2>
          </div>
          
          <button
            onClick={() => navigate('/blogs')} // <--- CHANGED THIS LINE
            className="bg-[#8053FF] hover:bg-[#6f42ef] text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-colors flex items-center gap-2"
          >
            See All Articles <FaArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Featured Article */}
          {featuredArticle && (
            <div onClick={() => navigate(`/blog/${featuredArticle.id}`)} className="cursor-pointer rounded-xl bg-white hover:scale-[1.02] transition-transform duration-300 shadow-md group h-fit overflow-hidden">
              <div className="rounded-t-xl overflow-hidden h-[300px] md:h-[400px]">
                <img
                  src={getImage(featuredArticle)}
                  onError={handleImageError} // ✅ Attach Safe Error Handler
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#6A4DF4] transition-colors line-clamp-2">{featuredArticle.title}</h3>
                <div className="text-gray-500 mb-6 leading-relaxed line-clamp-3 text-sm" dangerouslySetInnerHTML={{ __html: featuredArticle.description || featuredArticle.text || "No description available." }} />
                <button className="text-gray-900 font-bold flex items-center gap-2 transition-colors group-hover:text-[#6A4DF4]">Learn More <FaArrowRight /></button>
              </div>
            </div>
          )}

          {/* Side Articles */}
          <div className="flex flex-col gap-6">
            {sideArticles.map((post) => (
              <div key={post.id} onClick={() => navigate(`/blog/${post.id}`)} className="flex flex-col sm:flex-row items-center gap-6 group cursor-pointer rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-100">
                <div className="w-full sm:w-48 h-32 shrink-0 overflow-hidden shadow-md rounded-lg relative">
                  <img
                    src={getImage(post)}
                    onError={handleImageError} // ✅ Attach Safe Error Handler
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#6A4DF4] transition-colors line-clamp-2">{post.title}</h4>
                  <div className="text-xs text-gray-400 mb-3">{new Date(post.date || post.created_at || Date.now()).toLocaleDateString()}</div>
                  <button className="text-gray-500 font-bold text-xs uppercase tracking-wide flex items-center gap-2 transition-colors group-hover:text-[#6A4DF4]">Read Article <FaArrowRight className="text-[10px]" /></button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogSection;