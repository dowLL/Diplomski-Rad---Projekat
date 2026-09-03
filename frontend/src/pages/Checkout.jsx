import { useState } from 'react'
import { Link } from 'react-router-dom'

import './Checkout.css'

const deliveryPrices = {
  standard: 4.9,
  express: 9.9,
  pickup: 0,
}

function Checkout({ cart, clearCart }) {
  const [deliveryMethod, setDeliveryMethod] = useState('standard')
  const [paymentMethod, setPaymentMethod] = useState('delivery')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [orderTotal, setOrderTotal] = useState(0)

  const [orderNumber] = useState(
    () => `BCN-${Math.floor(100000 + Math.random() * 900000)}`,
  )

  const totalItems = cart.reduce(
    (total, product) => total + product.quantity,
    0,
  )

  const productsTotal = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  )

  const deliveryPrice = deliveryPrices[deliveryMethod]
  const grandTotal = productsTotal + deliveryPrice

  function handleSubmit(event) {
    event.preventDefault()

    setOrderTotal(grandTotal)
    setIsSubmitted(true)
    clearCart()

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (isSubmitted) {
    return (
      <main className="checkout-page">
        <section className="checkout-success">
          <span className="checkout-success__icon" aria-hidden="true">
            ✓
          </span>

          <p className="checkout-eyebrow">ORDER CONFIRMED</p>
          <h1>Thank you for your order.</h1>

          <p>
            Your Barcelona souvenirs are being prepared. This is a
            demonstration order and no payment has been collected.
          </p>

          <div className="checkout-success__details">
            <div>
              <span>Order number</span>
              <strong>{orderNumber}</strong>
            </div>

            <div>
              <span>Order total</span>
              <strong>€{orderTotal.toFixed(2)}</strong>
            </div>
          </div>

          <Link to="/">Return to homepage →</Link>
        </section>
      </main>
    )
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <section className="checkout-empty">
          <p className="checkout-eyebrow">CHECKOUT</p>
          <h1>Your shopping bag is empty.</h1>

          <p>
            Add a few Barcelona souvenirs before proceeding to checkout.
          </p>

          <Link to="/shop">Explore the Gift Shop →</Link>
        </section>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <section className="checkout-header">
        <p className="checkout-eyebrow">SECURE CHECKOUT</p>
        <h1>Complete your order.</h1>

        <p>
          Enter your delivery details and review your selected Barcelona
          souvenirs.
        </p>
      </section>

      <section className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <section className="checkout-form__section">
            <div className="checkout-form__heading">
              <span>01</span>

              <div>
                <p className="checkout-eyebrow">CONTACT</p>
                <h2>Contact information</h2>
              </div>
            </div>

            <div className="checkout-form__row">
              <label>
                First name
                <input
                  type="text"
                  name="firstName"
                  placeholder="Your first name"
                  autoComplete="given-name"
                  required
                />
              </label>

              <label>
                Last name
                <input
                  type="text"
                  name="lastName"
                  placeholder="Your last name"
                  autoComplete="family-name"
                  required
                />
              </label>
            </div>

            <div className="checkout-form__row">
              <label>
                Email address
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label>
                Phone number
                <input
                  type="tel"
                  name="phone"
                  placeholder="+381 60 123 4567"
                  autoComplete="tel"
                  required
                />
              </label>
            </div>
          </section>

          <section className="checkout-form__section">
            <div className="checkout-form__heading">
              <span>02</span>

              <div>
                <p className="checkout-eyebrow">DELIVERY ADDRESS</p>
                <h2>Where should we send it?</h2>
              </div>
            </div>

            <label>
              Street and house number
              <input
                type="text"
                name="address"
                placeholder="Street name and number"
                autoComplete="street-address"
                required
              />
            </label>

            <div className="checkout-form__row">
              <label>
                City
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  autoComplete="address-level2"
                  required
                />
              </label>

              <label>
                Postal code
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal code"
                  autoComplete="postal-code"
                  required
                />
              </label>
            </div>

            <label>
              Country
              <select
                name="country"
                autoComplete="country-name"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select a country
                </option>
                <option value="Serbia">Serbia</option>
                <option value="Bosnia and Herzegovina">
                  Bosnia and Herzegovina
                </option>
                <option value="Croatia">Croatia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="North Macedonia">North Macedonia</option>
                <option value="Spain">Spain</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label>
              Order note
              <textarea
                name="note"
                rows="4"
                placeholder="Optional delivery instructions"
              />
            </label>
          </section>

          <section className="checkout-form__section">
            <div className="checkout-form__heading">
              <span>03</span>

              <div>
                <p className="checkout-eyebrow">DELIVERY METHOD</p>
                <h2>Choose your delivery</h2>
              </div>
            </div>

            <div className="checkout-options">
              <label
                className={`checkout-option ${
                  deliveryMethod === 'standard' ? 'is-selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="standard"
                  checked={deliveryMethod === 'standard'}
                  onChange={(event) =>
                    setDeliveryMethod(event.target.value)
                  }
                />

                <span>
                  <strong>Standard delivery</strong>
                  <small>Delivery within 5–7 working days</small>
                </span>

                <b>€4.90</b>
              </label>

              <label
                className={`checkout-option ${
                  deliveryMethod === 'express' ? 'is-selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="express"
                  checked={deliveryMethod === 'express'}
                  onChange={(event) =>
                    setDeliveryMethod(event.target.value)
                  }
                />

                <span>
                  <strong>Express delivery</strong>
                  <small>Delivery within 2–3 working days</small>
                </span>

                <b>€9.90</b>
              </label>

              <label
                className={`checkout-option ${
                  deliveryMethod === 'pickup' ? 'is-selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="pickup"
                  checked={deliveryMethod === 'pickup'}
                  onChange={(event) =>
                    setDeliveryMethod(event.target.value)
                  }
                />

                <span>
                  <strong>Store pickup</strong>
                  <small>Collect your order in Barcelona</small>
                </span>

                <b>Free</b>
              </label>
            </div>
          </section>

          <section className="checkout-form__section">
            <div className="checkout-form__heading">
              <span>04</span>

              <div>
                <p className="checkout-eyebrow">PAYMENT</p>
                <h2>Payment method</h2>
              </div>
            </div>

            <div className="checkout-options">
              <label
                className={`checkout-option ${
                  paymentMethod === 'delivery' ? 'is-selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="delivery"
                  checked={paymentMethod === 'delivery'}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                />

                <span>
                  <strong>Payment on delivery</strong>
                  <small>Pay when your order arrives</small>
                </span>
              </label>

              <label
                className={`checkout-option ${
                  paymentMethod === 'card' ? 'is-selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                />

                <span>
                  <strong>Card payment — demonstration</strong>
                  <small>No real payment will be processed</small>
                </span>
              </label>
            </div>

            {paymentMethod === 'card' && (
              <div className="checkout-demo-note">
                This is a demonstration checkout. Do not enter real card
                information.
              </div>
            )}
          </section>

          <label className="checkout-consent">
            <input type="checkbox" required />

            <span>
              I confirm that the entered information is correct and accept the
              terms of this demonstration order.
            </span>
          </label>

          <button className="checkout-submit" type="submit">
            Confirm order · €{grandTotal.toFixed(2)}
          </button>
        </form>

        <aside className="checkout-summary">
          <p className="checkout-eyebrow">YOUR ORDER</p>
          <h2>Order summary</h2>

          <div className="checkout-summary__products">
            {cart.map((product) => (
              <article className="checkout-product" key={product.id}>
                <div className="checkout-product__image">
                  <img src={product.image} alt={product.name} />

                  <span>{product.quantity}</span>
                </div>

                <div>
                  <h3>{product.name}</h3>
                  <p>
                    {product.quantity} × €{product.price.toFixed(2)}
                  </p>
                </div>

                <strong>
                  €{(product.price * product.quantity).toFixed(2)}
                </strong>
              </article>
            ))}
          </div>

          <div className="checkout-summary__row">
            <span>Products ({totalItems})</span>
            <strong>€{productsTotal.toFixed(2)}</strong>
          </div>

          <div className="checkout-summary__row">
            <span>Delivery</span>
            <strong>
              {deliveryPrice === 0
                ? 'Free'
                : `€${deliveryPrice.toFixed(2)}`}
            </strong>
          </div>

          <div className="checkout-summary__total">
            <span>Total</span>
            <strong>€{grandTotal.toFixed(2)}</strong>
          </div>

          <Link to="/cart">← Return to shopping bag</Link>
        </aside>
      </section>
    </main>
  )
}

export default Checkout