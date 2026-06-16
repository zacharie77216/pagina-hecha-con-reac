import React, { useState, useEffect } from 'react';
import './AccessibilityMenu.css';

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSizeOffset, setFontSizeOffset] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Aplicar lógica de tamaño de fuente usando zoom (afecta todo incluso los px fijos)
    document.body.style.zoom = `${100 + fontSizeOffset * 10}%`;
  }, [fontSizeOffset]);

  useEffect(() => {
    // Aplicar lógica de modo oscuro
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const decreaseFont = () => setFontSizeOffset(prev => Math.max(prev - 1, -3));
  const increaseFont = () => setFontSizeOffset(prev => Math.min(prev + 1, 5));
  const toggleDark = () => setIsDarkMode(prev => !prev);

  return (
    <div className="accessibility-wrapper">
      <button 
        className={`acc-main-btn ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)} 
        aria-label="Opciones de accesibilidad"
      >
        <svg viewBox="0 0 100 100" width="36" height="36">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" />
          <circle cx="50" cy="30" r="6" fill="currentColor" />
          <path d="M 30 45 L 50 50 L 70 45" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 50 50 L 50 70" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 50 70 L 35 85" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 50 70 L 65 85" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <div className="accessibility-dropdown">
          <button className="acc-btn" onClick={decreaseFont} aria-label="Disminuir tamaño de letra">A-</button>
          <button className="acc-btn" onClick={increaseFont} aria-label="Aumentar tamaño de letra">A+</button>
          <button className="acc-btn" onClick={toggleDark} aria-label="Alternar modo de color" style={{ fontSize: '20px' }}>
            {isDarkMode ? '🌞' : '🌙'}
          </button>
        </div>
      )}
    </div>
  );
}
