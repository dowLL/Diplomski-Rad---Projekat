import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Attractions from './pages/Attractions'
import Tours from './pages/Tours'
import TravelGuide from './pages/TravelGuide'
import GiftShop from './pages/GiftShop'
import GiftShopCart from './pages/GiftShopCart'
import Checkout from './pages/Checkout'

function App() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('barcelona-cart')

      return savedCart ? JSON.parse(savedCart) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('barcelona-cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(product) {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (cartProduct) => cartProduct.id === product.id,
      )

      if (existingProduct) {
        return currentCart.map((cartProduct) =>
          cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
            : cartProduct,
        )
      }

      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
      removeFromCart(productId)
      return
    }

    setCart((currentCart) =>
      currentCart.map((product) =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product,
      ),
    )
  }

  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((product) => product.id !== productId),
    )
  }

  function clearCart() {
    setCart([])
  }

  const cartCount = cart.reduce(
    (total, product) => total + product.quantity,
    0,
  )

  return (
    <>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/guide" element={<TravelGuide />} />
        <Route
          path="/shop"
          element={<GiftShop cart={cart} addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <GiftShopCart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} clearCart={clearCart} />}
        />
      </Routes>

      <Footer />
    </>
  )
}

export default App