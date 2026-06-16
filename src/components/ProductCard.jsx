import React from 'react'

export default function ProductCard({ product = {}, onAdd = () => {} }) {
  const price = Number(product.price) || 0
  const discountPercentage = Number(product.discountPercentage) || 0
  const isDiscounted = product.isOffer && discountPercentage > 0
  const finalPrice = isDiscounted
    ? Math.round(price - (price * (discountPercentage / 100)))
    : price

  const formatPrice = (p) => {
    const n = Number(p) || 0
    try {
      return n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
    } catch (e) {
      return `${n}`
    }
  }

  return (
    <article className="product-card">
      {product.isOffer && (
        <span className="badge-offer">
          ¡OFERTAAAA! {isDiscounted ? `-${product.discountPercentage}%` : ''}
        </span>
      )}
      <div className="product-thumb">🎮</div>
      <div className="product-body" style={{width: '100%'}}>
        <div style={{fontSize: '12px', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px'}}>
          {product.category || 'Producto'}
        </div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            {isDiscounted && (
              <span className="price-original" style={{textDecoration: 'line-through', color: 'gray', fontSize: '12px'}}>
                {formatPrice(product.price)}
              </span>
            )}
            <span className={isDiscounted ? 'price-discounted' : 'price'} style={isDiscounted ? {color: 'var(--accent)', fontWeight: 'bold', fontSize: '20px'} : {}}>
              {formatPrice(finalPrice)}
            </span>
          </div>
          <button className="btn-pill btn-primary" onClick={() => onAdd && onAdd({ ...product, price: finalPrice })}>Agregar</button>
        </div>
      </div>
    </article>
  )
}
