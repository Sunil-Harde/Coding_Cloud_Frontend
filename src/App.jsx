import { Routes, Route } from "react-router-dom"; // Removed 'Navigate' as it conflicts with Home
import Home from "./pages/Home";
import Profile from "./pages/profile";
import Contact from './pages/Contact';
import Instructor from "./pages/Instructor";
import Teachers from "./pages/Teachers";
import BlogDetails from "./pages/BlogDetails";
import FAQsPage from "./pages/Faqs";
import PrivacyPolicyPage from "./pages/Privacy";
import AdmissionGuide from "./pages/AdmissionGuide";
import About from "./pages/About";
import Events from "./pages/Events";
import AcademyGallery from "./pages/AcademyGallery";
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";
import AllBlogs from "./pages/AllBlogs";

// 1. FIX TYPO: Removed space at the end
import CourseDetails from "./pages/CourseDetails "; 

// 2. IMPORT YOUR SMART COMPONENT
// (Make sure this path is correct based on where you saved CourseCard.jsx)
import CourseCard from "./components/CourseCard"; 
import Courses from "./pages/Courses";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* 3. REUSE THE SAME COMPONENT FOR BOTH ROUTES */}
      {/* Show All Courses */}
      <Route path="/courses" element={<Courses />} />
      
      {/* Show Filtered Courses (Note: :categoryId matches useParams in CourseCard) */}
      <Route path="/category/:categoryId" element={<CourseCard />} />

      {/* Course Details */}
      <Route path="/course/:id" element={<CourseDetails />} />

      {/* Other Pages */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/instructor" element={<Instructor />} />
      <Route path="/Teachers" element={<Teachers />} />
      <Route path="/faqs" element={<FAQsPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/admission-guide" element={<AdmissionGuide />} />
      <Route path="/about" element={<About />} />
      <Route path="/events" element={<Events />} />
      <Route path="/academy-gallery" element={<AcademyGallery />} />
      <Route path="/event-details" element={<EventDetails />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blogs" element={<AllBlogs />} /> {/* 2. Add Route */}
      <Route path="/blog/:id" element={<BlogDetails />} />
    </Routes>
  );
}

export default App;