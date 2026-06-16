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
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="7" r="1.5" fill="currentColor" stroke="none" />
          <path d="M6 10.5h12" />
          <path d="M12 10.5v6" />
          <path d="M12 16.5l-3 4" />
          <path d="M12 16.5l3 4" />
        </svg>
      </button>

      {isOpen && (
        <div className="accessibility-dropdown">
          <button className="acc-btn" onClick={decreaseFont} aria-label="Disminuir tamaño de letra">A-</button>
          <button className="acc-btn" onClick={increaseFont} aria-label="Aumentar tamaño de letra">A+</button>
          <button className="acc-btn" onClick={toggleDark} aria-label="Alternar modo de color">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      )}
    </div>
  );
}
