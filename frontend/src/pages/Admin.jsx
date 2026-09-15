import { useEffect, useState } from 'react'
import './Admin.css'

function Admin() {
  const [token, setToken] = useState(
    () => sessionStorage.getItem('barcelona-admin-token') || '',
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bookings, setBookings] = useState([])
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(Boolean(token))
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [error, setError] = useState('')
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    if (!token) {
      return undefined
    }

    const controller = new AbortController()

    async function loadAdminData() {
      setIsLoading(true)
      setError('')

      try {
        const requestOptions = {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        const [bookingsResponse, ordersResponse] = await Promise.all([
          fetch(
            'http://localhost:3000/api/admin/bookings',
            requestOptions,
          ),
          fetch(
            'http://localhost:3000/api/admin/orders',
            requestOptions,
          ),
        ])

        if (
          bookingsResponse.status === 401 ||
          ordersResponse.status === 401
        ) {
          sessionStorage.removeItem('barcelona-admin-token')
          setLoginError('Your session has expired. Please sign in again.')
          setToken('')
          return
        }

        if (!bookingsResponse.ok || !ordersResponse.ok) {
          throw new Error('Unable to load administration data.')
        }

        const [bookingsData, ordersData] = await Promise.all([
          bookingsResponse.json(),
          ordersResponse.json(),
        ])

        setBookings(bookingsData)
        setOrders(ordersData)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError('Unable to load administration data.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadAdminData()

    return () => controller.abort()
  }, [token])

  async function handleLogin(event) {
    event.preventDefault()

    setIsLoggingIn(true)
    setLoginError('')

    try {
      const response = await fetch(
        'http://localhost:3000/api/admin/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to sign in.')
      }

      sessionStorage.setItem('barcelona-admin-token', data.token)
      setToken(data.token)
      setPassword('')
      setIsLoading(true)
    } catch (error) {
      setLoginError(error.message)
    } finally {
      setIsLoggingIn(false)
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('barcelona-admin-token')
    setToken('')
    setBookings([])
    setOrders([])
    setEmail('')
    setPassword('')
    setError('')
    setLoginError('')
  }

  const totalRevenue = orders.reduce(
    (total, order) => total + order.grandTotal,
    0,
  )

  if (!token) {
    return (
      <main className="admin-page admin-page--login">
        <section className="admin-login">
          <p>ADMINISTRATION</p>

          <span>
            Sign in to review tour bookings and customer orders.
          </span>

          <form onSubmit={handleLogin}>
            <label>
              Email address
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="username"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </label>

            {loginError && (
              <p className="admin-login__error" role="alert">
                {loginError}
              </p>
            )}

            <button type="submit" disabled={isLoggingIn}>
              {isLoggingIn ? 'Signing in...' : 'Sign in →'}
            </button>
          </form>
        </section>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="admin-page">
        <p>Loading administration data...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="admin-page">
        <p role="alert">{error}</p>
      </main>
    )
  }

  return (
    <main className="admin-page">
      <section className="admin-header">
        <p>ADMINISTRATION</p>
        <h1>Dashboard</h1>
        <span>
          Review tour bookings, customer orders and current activity.
        </span>

        <button
            className="admin-logout"
            type="button"
            onClick={handleLogout}
        >
        Log out
        </button>
        
      </section>

      <section className="admin-statistics">
        <article>
          <span>Tour bookings</span>
          <strong>{bookings.length}</strong>
        </article>

        <article>
          <span>Orders</span>
          <strong>{orders.length}</strong>
        </article>

        <article>
          <span>Total revenue</span>
          <strong>€{totalRevenue.toFixed(2)}</strong>
        </article>
      </section>

      <section className="admin-section">
        <div className="admin-section__heading">
          <div>
            <p>TOUR REQUESTS</p>
            <h2>Recent bookings</h2>
          </div>

          <span>{bookings.length} total</span>
        </div>

        {bookings.length === 0 ? (
          <p>No tour bookings have been received.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tour</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Guests</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>#{booking.id}</td>
                    <td>{booking.tourTitle}</td>
                    <td>
                      <strong>{booking.fullName}</strong>
                      <br />
                      <span>{booking.email}</span>
                    </td>
                    <td>{booking.preferredDate}</td>
                    <td>{booking.guests}</td>
                    <td>{booking.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="admin-section">
        <div className="admin-section__heading">
          <div>
            <p>CUSTOMER ORDERS</p>
            <h2>Recent orders</h2>
          </div>

          <span>{orders.length} total</span>
        </div>

        {orders.length === 0 ? (
          <p>No customer orders have been received.</p>
        ) : (
          <div className="admin-orders">
            {orders.map((order) => (
              <article className="admin-order" key={order.id}>
                <div className="admin-order__heading">
                  <div>
                    <span>Order</span>
                    <h3>{order.orderNumber}</h3>
                  </div>

                  <strong>€{order.grandTotal.toFixed(2)}</strong>
                </div>

                <div className="admin-order__details">
                  <p>
                    <span>Customer</span>
                    <strong>
                      {order.firstName} {order.lastName}
                    </strong>
                  </p>

                  <p>
                    <span>Email</span>
                    <strong>{order.email}</strong>
                  </p>

                  <p>
                    <span>Delivery</span>
                    <strong>{order.deliveryMethod}</strong>
                  </p>

                  <p>
                    <span>Status</span>
                    <strong>{order.status}</strong>
                  </p>
                </div>

                <div className="admin-order__items">
                  <h4>Products</h4>

                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id}>
                        <span>
                          {item.quantity} × {item.productName}
                        </span>

                        <strong>
                          €
                          {(item.quantity * item.unitPrice).toFixed(2)}
                        </strong>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Admin
