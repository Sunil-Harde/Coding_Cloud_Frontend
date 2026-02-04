import React, { useState, useEffect } from 'react';
import { FaQuoteRight, FaStar } from 'react-icons/fa';
import { API } from '../api/endpoints';

const BACKEND_DOMAIN = "https://codingcloud.pythonanywhere.com";

// ==========================================
// 1. CARD COMPONENT
// ==========================================
const TestimonialCard = ({ item }) => {
    // Safety: If item is missing, return nothing (prevents blank cards)
    if (!item) return null;

    const isColor = item.variant === 'color';

    return (
        <div className={`shrink-0 w-[300px] md:w-[400px] p-6 md:p-8 rounded-2xl mx-4 relative flex flex-col justify-between transition-transform hover:scale-105 ${isColor ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-white text-gray-600 shadow-xl border border-gray-100'}`}>
            
            {/* Top Row: Stars & Quote Icon */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1 text-yellow-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < (item.rating || 5) ? "text-yellow-400" : "text-gray-300"} />
                    ))}
                </div>
                <FaQuoteRight className={`text-4xl opacity-30 ${isColor ? 'text-white' : 'text-gray-300'}`} />
            </div>
            
            {/* Review Text */}
            <p className={`text-lg leading-relaxed mb-8 ${isColor ? 'text-blue-50' : 'text-gray-500'} line-clamp-4 italic`}>
                "{item.review}"
            </p>
            
            {/* User Profile */}
            <div className="flex items-center gap-4">
                <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20" 
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${item.name || 'User'}&background=random` }} 
                />
                <div>
                    <h4 className={`font-bold ${isColor ? 'text-white' : 'text-gray-900'}`}>{item.name}</h4>
                    <p className={`text-sm ${isColor ? 'text-blue-200' : 'text-gray-400'}`}>Student</p>
                </div>
            </div>
        </div>
    );
};

// ==========================================
// 2. MAIN SECTION COMPONENT
// ==========================================
const TestimonialSection = () => {
    const [testimonials, setTestimonials] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch(API.TESTIMONIALS.LIST);
                const jsonData = await response.json();

                // --- DATA CLEANING ---
                // 1. Ensure we have an array, regardless of API structure
                let dataArray = [];
                if (Array.isArray(jsonData)) dataArray = jsonData;
                else if (jsonData.results) dataArray = jsonData.results;
                else if (jsonData.data) dataArray = jsonData.data;

                // 2. Format the data (Fix images, add colors)
                const processedData = dataArray.map((item, index) => {
                    let imgUrl = item.image;
                    // Fix relative paths from Django (e.g., /media/image.jpg -> https://.../media/image.jpg)
                    if (imgUrl && !imgUrl.startsWith('http')) {
                        imgUrl = `${BACKEND_DOMAIN}${imgUrl}`;
                    }

                    return {
                        ...item, 
                        image: imgUrl,
                        variant: index % 2 === 0 ? "white" : "color", // Alternate card styles
                        rating: item.rating || 5 
                    };
                });

                // 3. Duplicate data if list is short (Ensures marquee animation looks smooth)
                let finalData = processedData;
                if (finalData.length > 0 && finalData.length < 6) {
                    finalData = [...finalData, ...finalData, ...finalData];
                }

                setTestimonials(finalData);

            } catch (error) {
                console.error("Error loading testimonials:", error);
                setTestimonials([]); // Prevent crash by setting empty array
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    // --- RENDER HELPERS ---

    if (loading) return <div className="py-20 text-center animate-pulse text-gray-400">Loading Reviews...</div>;
    
    // Safety Check: If no data, show message instead of crashing
    if (!testimonials || testimonials.length === 0) {
        return <div className="text-center py-10 text-gray-400">No reviews available.</div>;
    }

    // --- CRASH-PROOF LIST SPLITTING ---
    
    // 1. Ensure we are working with an array
    const safeList = Array.isArray(testimonials) ? testimonials : [];

    // 2. Calculate mid-point
    const mid = Math.ceil(safeList.length / 2);
    
    // 3. Slice safely
    const row1 = safeList.slice(0, mid);
    const row2 = safeList.slice(mid);

    // 4. Spread safely (The fix for "not iterable" error)
    // using (row1 || []) ensures we never spread undefined
    const marquee1 = [...(row1 || []), ...(row1 || [])]; 
    const marquee2 = [...(row2 || []), ...(row2 || [])];

    return (
        <div className="w-full overflow-hidden relative">
             {/* Animation Styles */}
             <style>{`
                @keyframes marquee-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                @keyframes marquee-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
                .animate-marquee-left { animation: marquee-left 40s linear infinite; }
                .animate-marquee-right { animation: marquee-right 40s linear infinite; }
                .marquee-container:hover .animate-marquee-left, .marquee-container:hover .animate-marquee-right { animation-play-state: paused; }
            `}</style>

            {/* Row 1: Marquee Left */}
            <div className="marquee-container w-full mb-8 overflow-hidden">
                <div className="flex w-max animate-marquee-left gap-0">
                    {marquee1.map((item, index) => (
                        <TestimonialCard key={`row1-${item.id}-${index}`} item={item} />
                    ))}
                </div>
            </div>

            {/* Row 2: Marquee Right (Only render if we have enough items) */}
            {marquee2.length > 0 && (
                <div className="marquee-container w-full overflow-hidden">
                    <div className="flex w-max animate-marquee-right gap-0">
                        {marquee2.map((item, index) => (
                            <TestimonialCard key={`row2-${item.id}-${index}`} item={item} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestimonialSection;