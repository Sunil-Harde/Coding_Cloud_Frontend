import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, BASE_URL } from '../api/endpoints';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaArrowRight, FaHome, FaRocket } from 'react-icons/fa';

const AllBlogs = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Settings
  const MEDIA_DOMAIN = "https://codingcloud.pythonanywhere.com";
  const FALLBACK_IMAGE = "https://ui-avatars.com/api/?name=Blog&background=random&color=fff&size=800";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const url = `${BASE_URL}${API.ARTICLES.LIST}`;
        const response = await fetch(url);
        const result = await response.json();
        
        let data = [];
        if (Array.isArray(result)) data = result;
        else if (result.data && Array.isArray(result.data)) data = result.data;
        
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const getImage = (item) => {
    if (!item?.image) return FALLBACK_IMAGE;
    if (item.image.startsWith('/media')) return `${MEDIA_DOMAIN}${item.image}`;
    return item.image;
  };

  const handleImageError = (e) => {
    if (e.target.src !== FALLBACK_IMAGE) e.target.src = FALLBACK_IMAGE;
  };

  if (loading) return <div className="h-screen flex items-center justify-center animate-pulse text-[#6A4DF4] font-bold">Loading Blogs...</div>;

  // Split Data Logic
  // 1. First item is the Big Featured card
  const featured = articles[0];
  // 2. Next 3 items are the Side List
  const topList = articles.slice(1, 4);
  // 3. The rest go to the bottom grid
  const restArticles = articles.slice(4);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 font-sans text-[#1a1a2e]">
        
        {/* ================= HEADER SECTION (Gradient) ================= */}
        {/* Using a soft purple-blue gradient to match the 'Unicorn' vibe */}
        <div className="bg-gradient-to-r from-[#e0e7ff] via-[#ede9fe] to-[#f5f3ff] pt-32 pb-48 px-5 relative overflow-hidden">
            
            {/* Decorative Blur Circles (Optional, for that 'glow' effect) */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
                    <span className="flex items-center gap-1 hover:text-[#6A4DF4] cursor-pointer" onClick={() => navigate('/')}>
                        <FaHome /> Home
                    </span>
                    <span className="text-gray-400">{'>'}</span>
                    <span className="text-[#6A4DF4] font-bold">All Blog</span>
                </div>
                
                {/* Title & Badge */}
                <div className="flex flex-wrap items-center gap-6 mb-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-[#1a1a2e] tracking-tight">
                        All Blog
                    </h1>
                    {/* Pill Badge */}
                    <span className="bg-[#1a1a2e] text-white px-5 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-xl border border-white/20">
                        <FaRocket className="text-yellow-400" /> 
                        {articles.length} Articles
                    </span>
                </div>
                
                {/* Subtitle */}
                <p className="text-gray-500 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
                    Blog that help beginner designers become true unicorns. <br/>
                    <span className="text-sm text-gray-400 font-normal">Explore the latest news, updates, and guides.</span>
                </p>
            </div>
        </div>

        {/* ================= OVERLAPPING CONTENT SECTION ================= */}
        {/* Negative Margin (-mt-32) pulls this section up over the gradient */}
        <div className="max-w-7xl mx-auto px-5 -mt-32 pb-20 relative z-20">
            
            {/* 1. TOP SPLIT SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                
                {/* LEFT: Featured Big Card */}
                {featured && (
                    <div 
                        onClick={() => navigate(`/blog/${featured.id}`)}
                        className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer group h-full flex flex-col"
                    >
                        <div className="h-[280px] md:h-[350px] overflow-hidden rounded-xl mb-6 relative w-full">
                            <img 
                                src={getImage(featured)} 
                                alt="Featured" 
                                onError={handleImageError}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                            />
                            {/* Tag Overlay */}
                            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-[#6A4DF4] shadow-sm">
                                {featured.tag || "Featured"}
                            </span>
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 group-hover:text-[#6A4DF4] transition-colors leading-tight line-clamp-2">
                                    {featured.description}
                                </h2>
                                <p className="text-gray-500 mb-6 line-clamp-2 leading-relaxed">
                                    {featured.text || "Click to read more about this topic..."}
                                </p>
                            </div>
                            <span className="text-gray-900 font-bold flex items-center gap-2 text-sm group-hover:translate-x-1 transition-transform">
                                Learn More <FaArrowRight className="text-[#6A4DF4]"/>
                            </span>
                        </div>
                    </div>
                )}

                {/* RIGHT: Stacked List Cards */}
                <div className="flex flex-col gap-6">
                    {topList.map(item => (
                        <div 
                            key={item.id} 
                            onClick={() => navigate(`/blog/${item.id}`)}
                            className="bg-white p-4 rounded-2xl shadow-[0_5px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col sm:flex-row gap-5 group items-center h-full"
                        >
                            {/* Thumbnail */}
                            <div className="w-full sm:w-48 h-32 shrink-0 overflow-hidden rounded-xl relative">
                                <img 
                                    src={getImage(item)} 
                                    onError={handleImageError}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                />
                            </div>
                            
                            {/* Text Content */}
                            <div className="flex-1">
                                <h3 className="font-bold text-lg mb-2 leading-snug text-gray-900 group-hover:text-[#6A4DF4] transition-colors line-clamp-2">
                                    {item.description}
                                </h3>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-gray-400 text-xs font-bold">
                                        {new Date(item.created_at).toLocaleDateString()}
                                    </span>
                                    <span className="text-gray-900 text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                        Read <FaArrowRight className="text-[#6A4DF4] text-[10px]" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. GRID SECTION (Remaining Articles) */}
            {restArticles.length > 0 && (
                <div className="animate-fadeIn">
                    <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">More Articles</h3>
                        <div className="h-[1px] bg-gray-200 flex-1"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {restArticles.map(item => (
                            <div 
                                key={item.id} 
                                onClick={() => navigate(`/blog/${item.id}`)}
                                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
                            >
                                <div className="h-48 overflow-hidden bg-gray-100 relative">
                                    <img 
                                        src={getImage(item)} 
                                        onError={handleImageError}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                    <span className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-[10px] font-bold text-gray-600 uppercase">
                                        {item.tag || "Blog"}
                                    </span>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 font-medium">
                                         <span>{new Date(item.created_at).toLocaleDateString()}</span>
                                         <span>•</span>
                                         <span>Admin {item.admin_id}</span>
                                    </div>
                                    <h4 className="font-bold text-lg mb-3 text-gray-900 group-hover:text-[#6A4DF4] transition-colors line-clamp-2">
                                        {item.description}
                                    </h4>
                                    <div className="mt-auto pt-4 flex items-center text-[#6A4DF4] text-xs font-bold uppercase tracking-wider gap-2">
                                        Read Article <FaArrowRight size={10} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllBlogs;