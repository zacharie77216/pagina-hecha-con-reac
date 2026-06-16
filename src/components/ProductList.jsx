import React from 'react'
import PropTypes from 'prop-types'
import ProductCard from './ProductCard'

export default function ProductList({ products, onAdd }) {
  return (
    <section className="product-list">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </section>
  )
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
}
