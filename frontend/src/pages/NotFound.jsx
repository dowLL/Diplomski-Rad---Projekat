import { Link } from 'react-router-dom'

import './NotFound.css'

function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found">
        <p className="not-found__code">ERROR 404</p>
        <h1>Lost in Barcelona?</h1>

        <p className="not-found__description">
          The page you are looking for does not exist or may have been moved.
          Let&apos;s get you back to exploring the city.
        </p>

        <div className="not-found__actions">
          <Link to="/">Return home</Link>
          <Link to="/guide">Open travel guide</Link>
        </div>
      </section>
    </main>
  )
}

export default NotFound
