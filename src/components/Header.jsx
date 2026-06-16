import React from 'react'
import PropTypes from 'prop-types'

export default function Header({ title, cartCount, onToggleCart, onAdminToggle, isAdminOpen }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="site-title-container">
          <h1 className="site-title">{title}</h1>
          <span className="site-subtitle">Tienda oficial — productos exclusivos</span>
        </div>
        <div className="header-actions">
          <button className="btn-pill btn-primary" onClick={onAdminToggle} aria-label="Abrir admin">
            {isAdminOpen ? 'Volver a la Tienda' : 'Administrar'}
          </button>
          {!isAdminOpen && (
            <button className="btn-pill btn-primary" onClick={onToggleCart} aria-label="Abrir carrito">
              Mi Carrito <span style={{ background: 'rgba(255,255,255,0.3)', padding: '2px 8px', borderRadius: '12px' }}>{cartCount}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  cartCount: PropTypes.number.isRequired,
  onToggleCart: PropTypes.func.isRequired,
  onAdminToggle: PropTypes.func,
  isAdminOpen: PropTypes.bool,
}
