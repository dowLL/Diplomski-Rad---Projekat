import { useMemo, useState } from 'react'

import hoodieImage from '../assets/images/shop/barcelona-hoodie.jpg'
import mapImage from '../assets/images/shop/barcelona-map.jpg'
import postcardImage from '../assets/images/shop/barcelona-postcard.jpg'
import posterImage from '../assets/images/shop/barcelona-poster.jpg'
import scarfImage from '../assets/images/shop/barcelona-scarf.jpg'
import shirtImage from '../assets/images/shop/barcelona-shirt.jpg'
import toteImage from '../assets/images/shop/barcelona-tote.jpg'
import miniatureImage from '../assets/images/shop/sagrada-miniature.jpg'

import './GiftShop.css'

const products = [
  {
    id: 1,
    name: 'Sagrada Família Miniature',
    category: 'Souvenirs',
    price: 24,
    image: miniatureImage,
  },
  {
    id: 2,
    name: 'Barcelona Postcard Set',
    category: 'Souvenirs',
    price: 9,
    image: postcardImage,
  },
  {
    id: 3,
    name: 'Illustrated Barcelona Map',
    category: 'Art & Prints',
    price: 16,
    image: mapImage,
  },
  {
    id: 4,
    name: 'Barcelona Travel Poster',
    category: 'Art & Prints',
    price: 22,
    image: posterImage,
  },
  {
    id: 5,
    name: 'Barcelona Canvas Tote',
    category: 'Accessories',
    price: 18,
    image: toteImage,
  },
  {
    id: 6,
    name: 'Barcelona City T-Shirt',
    category: 'Clothing',
    price: 27,
    image: shirtImage,
  },
  {
    id: 7,
    name: 'Barcelona Hoodie',
    category: 'Clothing',
    price: 49,
    image: hoodieImage,
  },
  {
    id: 8,
    name: 'FC Barcelona Scarf',
    category: 'Accessories',
    price: 21,
    image: scarfImage,
  },
]

const categories = [
  'All',
  ...new Set(products.map((product) => product.category)),
]

function GiftShop({ cart, addToCart }) {
  const [activeCategory, setActiveCategory] = useState('All')

  const visibleProducts = useMemo(() => {
    if (activeCategory === 'All') {
      return products
    }

    return products.filter(
      (product) => product.category === activeCategory,
    )
  }, [activeCategory])

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
