import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import HeaderSlider from './Header'; // Correct import for home page slider
import '../App.css';

function PageHeader({ blogTitle, blogImage }) {
  const { pathname } = useLocation();
  const { id } = useParams(); // Get blog ID from URL

  // ✅ Detect if this is a Blog Details Page (Example: /blog/2)
  const isBlogDetailsPage = pathname.startsWith('/blog/') && id;

  // ✅ If it's the home page, show the slider
  if (pathname === '/' || pathname === '') {
    return <HeaderSlider />;
  }

  // ✅ Set title dynamically
  let title = "Page";
  let backgroundImage = "/images/blog1.jpg"; // Default background image for normal pages

  if (pathname.includes('about')) {
    title = "About Us";
  } else if (pathname === '/blog') {
    title = "Blogs";
  } else if (isBlogDetailsPage) {
    title = blogTitle || "Blog Details";
    backgroundImage = blogImage || "/images/blog1.jpg"; // ✅ Use blog-specific image if available
  } else if (pathname.includes('contact')) {
    title = "Contact Us";
  }

  return (
    <div
      className="static-header"
      style={{
        backgroundImage: `url(${backgroundImage})`, // ✅ Background image for all pages
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        textShadow: '2px 2px 10px rgba(0,0,0,0.7)',
      }}
    >
      <h1>{title}</h1>
    </div>
  );
}

export default PageHeader;
