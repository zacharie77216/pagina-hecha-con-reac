import React, { useState } from 'react'

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    '/carousel_images/1372x640_M_-_UP_-_SP.avif',
    '/carousel_images/BANNER-74-NINTENDO-1920X700-1170x427.jpg',
    '/carousel_images/H2x1_NintendoSwitch_Family_esES_ptPT.jpg'
  ]

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
  }

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
  }

  return (
    <div className="carousel-container glass-panel">
      <div className="carousel-content">
        <button className="carousel-btn prev" onClick={prevSlide}>&lt;</button>
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />
        <button className="carousel-btn next" onClick={nextSlide}>&gt;</button>

        <div className="carousel-dots">
          {images.map((_, idx) => (
            <div 
              key={idx} 
              className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
