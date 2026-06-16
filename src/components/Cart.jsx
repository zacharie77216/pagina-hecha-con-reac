import React from 'react'

export default function Cart({ open, items, onClose, onRemove, onClear }) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)

  const formatPrice = (price) => {
    return price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
  }

  return (
    <aside className={`cart-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="cart-header">
        <h3>Carrito</h3>
        <button onClick={onClose} aria-label="Cerrar carrito" style={{background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text)'}}>✕</button>
      </div>

      <div className="cart-body">
        {items.length === 0 && <p>El carrito está vacío.</p>}
        {items.map((it) => (
          <div key={it.id} className="cart-item">
            <div className="cart-item-info">
              <strong>{it.name}</strong>
              <div style={{fontSize: '14px', color: 'gray'}}>Cant: {it.qty}</div>
            </div>
            <div className="cart-item-actions" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px'}}>
              <div className="cart-price" style={{fontWeight: 'bold', color: 'var(--accent)'}}>{formatPrice(it.price * it.qty)}</div>
              <button className="btn-pill" style={{padding: '4px 8px', fontSize: '12px'}} onClick={() => onRemove(it.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-total" style={{fontWeight: 'bold', fontSize: '18px', marginBottom: '12px'}}>
          Total: {formatPrice(total)}
        </div>
        <div className="cart-actions" style={{display: 'flex', gap: '12px'}}>
          <button className="btn-pill btn-secondary" style={{flex: 1}} onClick={onClear}>Vaciar</button>
          <button className="btn-pill btn-primary" style={{flex: 1}} disabled={items.length===0}>Pagar</button>
        </div>
      </div>
    </aside>
  )
}
