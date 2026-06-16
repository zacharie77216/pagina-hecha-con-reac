import React, { useState } from 'react'
import PropTypes from 'prop-types'

function AdminListItem({ p, onUpdateProduct, onRemove }) {
  const [price, setPrice] = useState(p.price)
  const [isOffer, setIsOffer] = useState(p.isOffer)
  const [discount, setDiscount] = useState(p.discountPercentage)
  const [saved, setSaved] = useState(false)

  function handleApply() {
    onUpdateProduct(p.id, {
      price: Number.parseFloat(price) || 0,
      isOffer,
      discountPercentage: Number.parseFloat(discount) || 0
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="admin-item">
      <div className="admin-item-main" style={{flexWrap: 'wrap', gap: '8px'}}>
        <strong>{p.name}</strong>
        <div style={{display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', width: '100%'}}>
          <span style={{fontSize: '12px'}}>CLP$</span>
          <input
            type="number"
            value={price === 0 ? '' : price}
            onChange={(e) => setPrice(e.target.value)}
            className="admin-input-small"
            style={{width: '90px'}}
          />
          
          <label style={{fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '8px'}}>
            <input 
              type="checkbox" 
              checked={isOffer} 
              onChange={(e) => setIsOffer(e.target.checked)} 
            />
            Oferta
          </label>

          {isOffer && (
            <div style={{display: 'flex', alignItems: 'center'}}>
              <input
                type="number"
                value={discount || ''}
                onChange={(e) => setDiscount(e.target.value)}
                className="admin-input-small"
                style={{width: '50px'}}
                placeholder="%"
              />
              <span style={{fontSize: '12px', marginLeft: '4px'}}>%</span>
            </div>
          )}

          <div style={{marginLeft: 'auto', display: 'flex', gap: '4px'}}>
            <button 
              className={`btn-pill ${saved ? 'btn-secondary' : 'btn-primary'}`} 
              style={{padding: '4px 8px', fontSize: '12px', minWidth: '70px', background: saved ? '#a8e6cf' : '', color: saved ? '#111' : ''}} 
              onClick={handleApply}
            >
              {saved ? '✔ Listo' : 'Aplicar'}
            </button>
            <button className="btn-pill btn-secondary" style={{padding: '4px 8px', fontSize: '12px'}} onClick={() => onRemove(p.id)}>Eliminar</button>
          </div>
        </div>
      </div>
      <div className="admin-item-desc">{p.description}</div>
    </div>
  )
}

export default function AdminPanel({ products, onUpdateProduct, onRemove, onAdd, onClose }) {
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [activeCategory, setActiveCategory] = useState('Juegos')
  const [newIsOffer, setNewIsOffer] = useState(false)
  const [newDiscount, setNewDiscount] = useState('')

  const categories = ['Juegos', 'Consolas', 'Accesorios', 'Merchandising']

  const filteredProducts = products.filter(p => p.category === activeCategory)

  function handleAdd(e) {
    e.preventDefault()
    if (!newName || !newPrice) return
    onAdd({ 
      id: String(Date.now()), 
      name: newName, 
      price: Number.parseFloat(newPrice), 
      description: newDesc,
      category: activeCategory,
      isOffer: newIsOffer,
      discountPercentage: newIsOffer ? (Number.parseFloat(newDiscount) || 0) : 0
    })
    setNewName('')
    setNewPrice('')
    setNewDesc('')
    setNewIsOffer(false)
    setNewDiscount('')
  }

  return (
    <aside className="admin-panel glass-panel">
      <div className="admin-header">
        <h2>Administrar Inventario</h2>
        <button className="btn-pill btn-secondary" onClick={onClose} aria-label="Cerrar panel">Cerrar</button>
      </div>

      <div className="admin-tabs">
        {categories.map(cat => (
          <button 
            key={cat} 
            type="button"
            className={`btn-nav ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <section className="admin-list">
        {filteredProducts.length === 0 ? (
          <p style={{textAlign: 'center', color: 'gray', margin: '20px 0'}}>
            No hay productos en esta categoría.
          </p>
        ) : (
          filteredProducts.map((p) => (
            <AdminListItem 
              key={p.id} 
              p={p} 
              onUpdateProduct={onUpdateProduct} 
              onRemove={onRemove} 
            />
          ))
        )}
      </section>

      <section className="admin-add">
        <h3>Añadir a {activeCategory}</h3>
        <form onSubmit={handleAdd} className="admin-form">
          <input className="admin-input" placeholder="Nombre" value={newName} onChange={(e) => setNewName(e.target.value)} required />
          <input className="admin-input" type="number" placeholder="Precio (CLP)" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required />
          <input className="admin-input" placeholder="Descripción" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
          
          <div className="admin-form-row">
            <label className="admin-checkbox-label">
              <input type="checkbox" checked={newIsOffer} onChange={(e) => setNewIsOffer(e.target.checked)} />
              Es Oferta
            </label>

            {newIsOffer && (
              <input 
                className="admin-input" 
                type="number" 
                placeholder="% Descuento" 
                value={newDiscount} 
                onChange={(e) => setNewDiscount(e.target.value)} 
                style={{width: '120px'}}
                required
              />
            )}
          </div>
          
          <button type="submit" className="btn-pill btn-primary" style={{marginTop: '12px', width: '100%'}}>Agregar Producto</button>
        </form>
      </section>
    </aside>
  )
}

AdminPanel.propTypes = {
  products: PropTypes.array.isRequired,
  onUpdateProduct: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}
