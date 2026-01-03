import React, { useState, useEffect } from 'react';
import { FaQuoteRight, FaStar } from 'react-icons/fa';
import { API } from '../api/endpoints';

const BACKEND_DOMAIN = "https://codingcloud.pythonanywhere.com";

// --- CARD COMPONENT ---
const TestimonialCard = ({ item }) => {
    const isColor = item.variant === 'color';
    return (
        <div className={`shrink-0 w-[350px] md:w-[400px] p-8 rounded-2xl mx-4 relative flex flex-col justify-between transition-transform hover:scale-105 ${isColor ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-white text-gray-600 shadow-xl border border-gray-100'}`}>
            <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1 text-yellow-400 text-sm">{item.logo}</div>
                <FaQuoteRight className={`text-4xl opacity-30 ${isColor ? 'text-white' : 'text-gray-300'}`} />
            </div>
            <p className={`text-lg leading-relaxed mb-8 ${isColor ? 'text-blue-50' : 'text-gray-500'} line-clamp-4 italic`}>"{item.text}"</p>
            <div className="flex items-center gap-4">
                <img src={item.img} alt={item.author} className="w-12 h-12 rounded-full object-cover border-2 border-white/20" onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${item.author}&background=random` }} />
                <div>
                    <h4 className={`font-bold ${isColor ? 'text-white' : 'text-gray-900'}`}>{item.author}</h4>
                    <p className={`text-sm ${isColor ? 'text-blue-200' : 'text-gray-400'}`}>{item.role}</p>
                </div>
            </div>
        </div>
    );
};

// --- MAIN SECTION ---
const TestimonialsSection = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null); // Error store करण्यासाठी

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const url = API.TESTIMONIALS.LIST;
                console.log("DEBUG: Fetching URL ->", url);

                const response = await fetch(url);

                // चेक करा की Response OK आहे का?
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(`Server Error: ${response.status} ${response.statusText} - ${text.substring(0, 50)}...`);
                }

                const jsonData = await response.json();
                console.log("DEBUG: Data Received ->", jsonData);

                let testimonialArray = [];
                if (jsonData.data && Array.isArray(jsonData.data)) testimonialArray = jsonData.data;
                else if (jsonData.results && Array.isArray(jsonData.results)) testimonialArray = jsonData.results;
                else if (Array.isArray(jsonData)) testimonialArray = jsonData;

                if (testimonialArray.length === 0) {
                    setErrorMsg("Data found but list is empty (0 items).");
                }

                const formattedData = testimonialArray.map((item, index) => {
                    let imageUrl = item.image;
                    if (imageUrl && !imageUrl.startsWith('http')) imageUrl = `${BACKEND_DOMAIN}${imageUrl}`;
                    if (!imageUrl || imageUrl.includes('default.jpg')) imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random`;

                    return {
                        id: item.id || index,
                        text: item.review || "No review text.",
                        author: item.name || "Anonymous",
                        role: "Student",
                        img: imageUrl,
                        logo: <div className="flex text-yellow-400 text-sm">{[...Array(5)].map((_, i) => (<FaStar key={i} className={i < (item.rating || 5) ? "text-yellow-400" : "text-gray-300"} />))}</div>,
                        variant: index % 2 === 0 ? "white" : "color"
                    };
                });

                // Duplicate for loop
                let finalData = formattedData;
                if (finalData.length > 0 && finalData.length < 6) finalData = [...finalData, ...finalData, ...finalData];

                setTestimonials(finalData);
                setLoading(false);

            } catch (error) {
                console.error("DEBUG Error:", error);
                setErrorMsg(error.message); // स्क्रीनवर एरर दाखवण्यासाठी
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    // --- RENDERING ---
    const midPoint = Math.ceil(testimonials.length / 2);
    const row1 = testimonials.slice(0, midPoint);
    const row2 = testimonials.slice(midPoint);
    const marqueeRow1 = [...row1, ...row1];
    const marqueeRow2 = [...row2, ...row2];

    return (
        <section className="py-24 bg-white overflow-hidden relative border-t-4 border-blue-500">
            <style>{`
            @keyframes marquee-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            @keyframes marquee-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
            .animate-marquee-left { animation: marquee-left 40s linear infinite; }
            .animate-marquee-right { animation: marquee-right 40s linear infinite; }
            .marquee-container:hover .animate-marquee-left, .marquee-container:hover .animate-marquee-right { animation-play-state: paused; }
        `}</style>

            <div className="max-w-7xl mx-auto px-5 text-center mb-16">
                <span className="inline-block px-4 py-1 mb-5 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full uppercase tracking-wider">EDUCATION FOR EVERYONE</span>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">People like Coding Cloud education.
                    <br/>No joking - here’s the proof!</h2>
            </div>

            {/* --- DEBUGGING MESSAGES --- */}
            {loading && <div className="text-center text-blue-600 font-bold text-xl animate-pulse">Trying to load data...</div>}

            {errorMsg && (
                <div className="max-w-xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-10 text-center">
                    <strong className="font-bold">Error Loading Data: </strong>
                    <span className="block sm:inline">{errorMsg}</span>
                    <p className="text-sm mt-2">Check console (F12) for details.</p>
                </div>
            )}

            {!loading && !errorMsg && testimonials.length === 0 && (
                <div className="text-center text-gray-500 text-xl">No Testimonials Found.</div>
            )}

            {/* --- ACTUAL CONTENT --- */}
            {!loading && testimonials.length > 0 && (
                <>
                    <div className="marquee-container w-full mb-8 overflow-hidden">
                        <div className="flex w-max animate-marquee-left gap-0">
                            {marqueeRow1.map((item, index) => <TestimonialCard key={`row1-${index}`} item={item} />)}
                        </div>
                    </div>
                    <div className="marquee-container w-full overflow-hidden">
                        <div className="flex w-max animate-marquee-right gap-0">
                            {marqueeRow2.map((item, index) => <TestimonialCard key={`row2-${index}`} item={item} />)}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default TestimonialsSection;