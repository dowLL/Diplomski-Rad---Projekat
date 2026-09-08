import { useEffect, useMemo, useState } from 'react'

import hoodieImage from '../assets/images/shop/barcelona-hoodie.jpg'
import mapImage from '../assets/images/shop/barcelona-map.jpg'
import postcardImage from '../assets/images/shop/barcelona-postcard.jpg'
import posterImage from '../assets/images/shop/barcelona-poster.jpg'
import scarfImage from '../assets/images/shop/barcelona-scarf.jpg'
import shirtImage from '../assets/images/shop/barcelona-shirt.jpg'
import toteImage from '../assets/images/shop/barcelona-tote.jpg'
import miniatureImage from '../assets/images/shop/sagrada-miniature.jpg'

import './GiftShop.css'

const productImages = {
  'sagrada-miniature.jpg': miniatureImage,
  'barcelona-postcard.jpg': postcardImage,
  'barcelona-map.jpg': mapImage,
  'barcelona-poster.jpg': posterImage,
  'barcelona-tote.jpg': toteImage,
  'barcelona-shirt.jpg': shirtImage,
  'barcelona-hoodie.jpg': hoodieImage,
  'barcelona-scarf.jpg': scarfImage,
}

function GiftShop({ cart, addToCart }) {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      try {
        const response = await fetch(
          'http://localhost:3000/api/products',
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error('Failed to load products.')
        }

        const data = await response.json()

        const productsWithImages = data.map((product) => ({
          ...product,
          image: productImages[product.image],
        }))

        setProducts(productsWithImages)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError('Unable to load products. Please try again later.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadProducts()

    return () => controller.abort()
  }, [])

  const categories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ]

  const visibleProducts = useMemo(() => {
    if (activeCategory === 'All') {
      return products
    }

    return products.filter(
      (product) => product.category === activeCategory,
    )
  }, [products, activeCategory])

  const cartTotal = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  )

  const cartCount = cart.reduce(
    (total, product) => total + product.quantity,
    0,
  )

  return (
    <main className="shop-page">
      <section className="shop-hero">
        <div className="shop-hero__content">
          <p className="shop-eyebrow">A PIECE OF BARCELONA</p>

          <h1>
            Take the city
            <span>home with you.</span>
          </h1>

          <p>
            Discover colourful gifts inspired by Barcelona’s architecture,
            Mediterranean spirit and unforgettable streets.
          </p>

          <a href="#products">Shop the collection</a>
        </div>
      </section>

      <section className="shop-products" id="products">
        <div className="shop-heading">
          <div>
            <p className="shop-eyebrow">OUR COLLECTION</p>
            <h2>Barcelona favourites.</h2>
          </div>

          <div className="shop-cart">
            <span>Shopping bag</span>
            <strong>
              {cartCount} {cartCount === 1 ? 'item' : 'items'} · €
              {cartTotal.toFixed(2)}
            </strong>
          </div>
        </div>

        <div className="shop-filters">
          {categories.map((category) => (
            <button
              className={activeCategory === category ? 'is-active' : ''}
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading && <p>Loading products...</p>}
        {error && <p role="alert">{error}</p>}

        <div className="shop-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-card__image">
                <img src={product.image} alt={product.name} loading="lazy" />
                <span>{product.category}</span>
              </div>

              <div className="product-card__content">
                <div>
                  <p>{product.category}</p>
                  <h3>{product.name}</h3>
                </div>

                <strong>€{product.price.toFixed(2)}</strong>
              </div>

              <button type="button" onClick={() => addToCart(product)}>
                Add to bag +
              </button>
            </article>
          ))}
        </div>

        {cartCount > 0 && (
          <div className="shop-message" role="status">
            Added successfully! Your shopping bag contains {cartCount}{' '}
            {cartCount === 1 ? 'product' : 'products'}.
          </div>
        )}
      </section>

      <section className="shop-banner">
        <p className="shop-eyebrow">MADE WITH LOCAL SPIRIT</p>
        <h2>Small gifts. Great memories.</h2>
        <p>
          Our collection celebrates Barcelona through locally inspired
          colours, patterns and stories.
        </p>
      </section>
    </main>
  )
}

export default GiftShop
