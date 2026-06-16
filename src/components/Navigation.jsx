import React from 'react'

export default function Navigation() {
  const categories = ['Juegos', 'Consolas', 'Accesorios', 'Merchandising', 'Ofertas']

  return (
    <nav className="nav-bar">
      {categories.map((cat, idx) => (
        <button key={idx} className="btn-nav">
          {cat}
        </button>
      ))}
    </nav>
  )
}
