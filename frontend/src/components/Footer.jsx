import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">

      <div className="footer__content">
        <div className="footer__brand">
          <Link className="footer__logo" to="/">
            Barcelona
            <span>Tourism &amp; Travel Guide</span>
          </Link>

          <p>
            Discover the architecture, culture, food and unforgettable places
            that make Barcelona unique.
          </p>
        </div>

        <div className="footer__column">
          <h3>Explore</h3>

          <nav aria-label="Explore Barcelona">
            <Link to="/">Home</Link>
            <Link to="/attractions">Attractions</Link>
            <Link to="/tours">Tours</Link>
            <Link to="/shop">Gift shop</Link>
          </nav>
        </div>

        <div className="footer__column">
          <h3>Plan your visit</h3>

          <nav aria-label="Plan your visit">
            <Link to="/guide">Travel guide</Link>
            <Link to="/guide">Getting around</Link>
            <Link to="/guide">Best time to visit</Link>
            <Link to="/guide">Tickets &amp; reservations</Link>
          </nav>
        </div>

        <div className="footer__column">
          <h3>Barcelona essentials</h3>

          <ul>
            <li>Currency: Euro (€)</li>
            <li>Languages: Catalan &amp; Spanish</li>
            <li>Emergency number: 112</li>
            <li>Timezone: Central European Time</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Barcelona Tourism</p>
        <p>Made for travellers who want to explore more.</p>
      </div>
    </footer>
  )
}

export default Footer