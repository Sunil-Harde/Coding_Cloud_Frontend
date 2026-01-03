import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API, BASE_URL } from '../api/endpoints';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaUser, FaClock, FaArrowLeft, FaTag } from 'react-icons/fa';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ 1. DOMAIN CONFIGURATION
  // This is required to fix relative paths like "/media/image.jpg"
  const MEDIA_DOMAIN = "https://codingcloud.pythonanywhere.com";
  
  // ✅ 2. FALLBACK IMAGE
  // If the API image fails or is missing, this image will show.
  const FALLBACK_IMAGE = "https://ui-avatars.com/api/?name=No+Image&background=e2e8f0&color=64748b&size=800&font-size=0.3";

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const url = `${BASE_URL}${API.ARTICLES.DETAIL(id)}`;
        console.log("Fetching Article URL:", url); // DEBUG LOG

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch article details');
        }

        const data = await response.json();
        console.log("Article Data Received:", data); // DEBUG LOG: Check your Console to see if 'image' field exists!
        setArticle(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArticleDetails();
  }, [id]);

  // ✅ 3. IMAGE URL BUILDER
  const getImage = (item) => {
    if (!item?.image) return FALLBACK_IMAGE;

    // Check if it's a relative path from Django (starts with /media)
    if (item.image.startsWith('/media')) {
      const fullUrl = `${MEDIA_DOMAIN}${item.image}`;
      return fullUrl;
    }

    // Check if it's already a full URL (e.g., https://...)
    if (item.image.startsWith('http')) {
      return item.image;
    }

    return item.image;
  };

  // ✅ 4. ERROR HANDLER (Prevents Broken Image Icon)
  const handleImageError = (e) => {
    console.warn("Failed to load image:", e.target.src); // DEBUG LOG
    if (e.target.src !== FALLBACK_IMAGE) {
      e.target.src = FALLBACK_IMAGE;
    }
  };

  // ✅ 5. DATE FORMATTER
  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    try {
      return new Date(dateString).toLocaleDateString('en-GB', { 
        day: 'numeric', month: 'long', year: 'numeric' 
      });
    } catch (e) {
      return "Invalid Date";
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-gray-500 animate-pulse">Loading...</div>;
  if (error) return <div className="h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  if (!article) return <div className="h-screen flex items-center justify-center">Article not found.</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white font-sans text-[#1a1a2e]">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="bg-gradient-to-b from-[#F5F3FF] to-white pt-16 pb-12 px-5">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Back Button */}
            <button 
                onClick={() => navigate(-1)} 
                className="mb-8 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#6A4DF4] transition-colors mx-auto md:mx-0"
            >
               <FaArrowLeft /> Back to Blogs
            </button>

            {/* Meta Data Pill */}
            <div className="inline-flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600 mb-6 bg-white border border-gray-100 px-6 py-2 rounded-full shadow-sm">
               <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-[#6A4DF4] text-[10px]">
                    <FaUser />
                  </span>
                  <span className="font-bold text-gray-900">
                    {article.author || `Admin ${article.admin_id || ''}`}
                  </span>
               </div>
               
               <span className="text-gray-300">|</span>
               
               <div className="flex items-center gap-1 text-[#6A4DF4] font-bold">
                  <FaTag size={12} />
                  <span>{article.tag || "Education"}</span>
               </div>
               
               <span className="text-gray-300">|</span>
               
               <div className="flex items-center gap-2 text-gray-500">
                  <FaClock size={12} />
                  <span>{formatDate(article.created_at)}</span>
               </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1a2e] leading-tight mb-4 drop-shadow-sm">
              {article.description || "Untitled Article"}
            </h1>

          </div>
        </div>

        {/* ================= IMAGE & CONTENT SECTION ================= */}
        <div className="max-w-5xl mx-auto px-5 pb-24">
           
           {/* Hero Image */}
           <div className="rounded-3xl overflow-hidden shadow-2xl mb-12 bg-gray-100 h-[300px] md:h-[500px] relative border-4 border-white">
              <img 
                src={getImage(article)} 
                alt={article.description}
                onError={handleImageError} 
                className="w-full h-full object-cover"
              />
           </div>

           {/* Content Body */}
           <div className="max-w-3xl mx-auto">
              
              {/* Quote/Highlight */}
              <div className="border-l-4 border-[#6A4DF4] pl-6 py-4 mb-10 bg-gray-50 rounded-r-xl shadow-sm">
                 <p className="text-gray-600 italic text-lg">
                    "Learning never exhausts the mind."
                 </p>
              </div>

              {/* Main Text */}
              <div 
                className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-line text-lg"
              >
                 {article.text || "No content available for this article."}
              </div>

              {/* Footer Tags */}
              <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-3">
                 <span className="font-bold text-gray-900">Tags:</span>
                 <div className="flex flex-wrap gap-2">
                    <span className="bg-purple-50 text-[#6A4DF4] px-3 py-1 rounded-full text-xs font-bold border border-purple-100 cursor-pointer hover:bg-[#6A4DF4] hover:text-white transition-colors">
                        #{article.tag || "Blog"}
                    </span>
                 </div>
              </div>

           </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default BlogDetails;