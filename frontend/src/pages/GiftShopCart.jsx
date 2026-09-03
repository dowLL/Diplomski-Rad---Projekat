import { Link } from 'react-router-dom'
import './GiftShopCart.css'

function GiftShopCart({
  cart,
  updateQuantity,
  removeFromCart,
  clearCart,
}) {
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  )

  const totalItems = cart.reduce(
    (total, product) => total + product.quantity,
    0,
  )

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <section className="cart-empty">
          <span className="cart-empty__icon" aria-hidden="true">
            ♡
          </span>

          <p className="cart-eyebrow">YOUR SHOPPING BAG</p>
          <h1>Your bag is empty.</h1>

          <p>
            Discover gifts inspired by Barcelona and take a piece of the city
            home with you.
          </p>

          <Link to="/shop">Explore the Gift Shop →</Link>
        </section>
      </main>
    )
  }

  return (
    <main className="cart-page">
      <section className="cart-header">
        <p className="cart-eyebrow">YOUR SHOPPING BAG</p>
        <h1>Selected souvenirs.</h1>
        <p>
          You have {totalItems} {totalItems === 1 ? 'item' : 'items'} in your
          shopping bag.
        </p>
      </section>

      <section className="cart-layout">
        <div className="cart-products">
          {cart.map((product) => (
            <article className="cart-item" key={product.id}>
              <div className="cart-item__image">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="cart-item__details">
                <p>{product.category}</p>
                <h2>{product.name}</h2>
                <strong>€{product.price.toFixed(2)}</strong>

                <button
                  className="cart-item__remove"
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>

              <div className="cart-item__quantity">
                <span>Quantity</span>

                <div>
                  <button
                    type="button"
                    aria-label={`Decrease quantity of ${product.name}`}
                    onClick={() =>
                      updateQuantity(product.id, product.quantity - 1)
                    }
                  >
                    −
                  </button>

                  <strong>{product.quantity}</strong>

                  <button
                    type="button"
                    aria-label={`Increase quantity of ${product.name}`}
                    onClick={() =>
                      updateQuantity(product.id, product.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <p className="cart-item__total">
                €{(product.price * product.quantity).toFixed(2)}
              </p>
            </article>
          ))}

          <div className="cart-products__actions">
            <Link to="/shop">← Continue shopping</Link>

            <button type="button" onClick={clearCart}>
              Clear shopping bag
            </button>
          </div>
        </div>

        <aside className="cart-summary">
          <p className="cart-eyebrow">ORDER SUMMARY</p>
          <h2>Your total</h2>

          <div className="cart-summary__row">
            <span>Products ({totalItems})</span>
            <strong>€{totalPrice.toFixed(2)}</strong>
          </div>

          <div className="cart-summary__row">
            <span>Delivery</span>
            <strong>Free</strong>
          </div>

          <div className="cart-summary__total">
            <span>Total</span>
            <strong>€{totalPrice.toFixed(2)}</strong>
          </div>

          <Link className="cart-summary__checkout" to="/checkout">
            Proceed to checkout →
          </Link>

          <p className="cart-summary__note">
            Checkout will be connected in the next development phase.
          </p>
        </aside>
      </section>
    </main>
  )
}

export default GiftShopCart