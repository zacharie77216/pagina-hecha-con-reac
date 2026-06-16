import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Carousel from './components/Carousel'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import AdminPanel from './components/AdminPanel'
import Footer from './components/Footer'
import FormsModal from './components/FormsModal'
import products from './data/products'
import AccessibilityMenu from './components/AccessibilityMenu'

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [productList, setProductList] = useState(products)
  const [adminOpen, setAdminOpen] = useState(false)
  const [users, setUsers] = useState([])
  const [formsOpen, setFormsOpen] = useState(false)
  const [formsTab, setFormsTab] = useState('login')

  function addToCart(product) {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id)
      if (exists) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p))
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  function updateProduct(id, updates) {
    setProductList((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  function removeProduct(id) {
    setProductList((prev) => prev.filter((p) => p.id !== id))
  }

  function addProduct(prod) {
    setProductList((prev) => [...prev, prod])
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((p) => p.id !== productId))
  }

  function clearCart() {
    setCart([])
  }

  const totalItems = cart.reduce((s, p) => s + p.qty, 0)

  return (
    <div className="shop-root">
      <Header
        title="Nintendo Shop"
        cartCount={totalItems}
        onToggleCart={() => setCartOpen((v) => !v)}
        onAdminToggle={() => setAdminOpen((v) => !v)}
        isAdminOpen={adminOpen}
        onOpenForms={(tab) => { setFormsTab(tab); setFormsOpen(true); }}
      />

      <AccessibilityMenu />

      {adminOpen ? (
        <main className="container" style={{ marginTop: '32px' }}>
          <AdminPanel
            products={productList}
            onUpdateProduct={updateProduct}
            onRemove={removeProduct}
            onAdd={addProduct}
            onClose={() => setAdminOpen(false)}
          />
        </main>
      ) : (
        <>
          <Navigation />
          <Carousel />
          <main className="container">
            <section>
              <h2 className="page-title">Productos destacados</h2>
              <ProductList products={productList} onAdd={addToCart} />
            </section>
          </main>
        </>
      )}

      <Cart open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onClear={clearCart} />
      <FormsModal 
        open={formsOpen} 
        initialTab={formsTab} 
        onClose={() => setFormsOpen(false)} 
        onRegister={(u) => setUsers((prev) => [...prev, u])} 
      />
      <Footer />
    </div>
  )
}
