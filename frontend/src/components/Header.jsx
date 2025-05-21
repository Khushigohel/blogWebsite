import React, { useState, useEffect } from 'react';
import '../App.css';

function HeaderSlider() {
  // Slides array: each slide has an image and optional text
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      heading: 'Welcome to My Blog',
      subheading: 'Discover amazing articles and insights.'
    },
    {
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      heading: 'Our Second Slide',
      subheading: 'Another catchy description here.'
    },
    {
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      heading: 'Third Slide Title',
      subheading: 'More details or an enticing tagline.'
    }
  ];

  // Track which slide is currently active
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically move to the next slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
    }, 3000);

    // Clear the timer on component unmount
    return () => clearInterval(timer);
  }, [slides.length]);

  // Manually go to a specific slide (for the indicators)
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="slider-container">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="overlay">
            <h1>{slide.heading}</h1>
            <p>{slide.subheading}</p>
          </div>
        </div>
      ))}

      {/* Indicators (dots) */}
      <div className="indicators">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default HeaderSlider;
