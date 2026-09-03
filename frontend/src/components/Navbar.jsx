import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar({ cartCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link className="navbar__brand" to="/" onClick={closeMenu}>
          <span className="navbar__brand-main">Barcelona</span>
          <span className="navbar__brand-small">Travel Guide</span>
        </Link>

        <nav className="navbar__links" aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/attractions">Attractions</Link>
          <Link to="/tours">Tours</Link>
          <Link to="/guide">Travel Guide</Link>
          <Link to="/shop">Gift Shop</Link>
        </nav>

        <Link className="navbar__cta" to="/cart">
          Cart ({cartCount})
          <span aria-hidden="true">→</span>
        </Link>

        <button
          className={`navbar__menu-button ${isMenuOpen ? 'is-open' : ''}`}
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav
        className={`navbar__mobile-menu ${isMenuOpen ? 'is-open' : ''}`}
        aria-label="Mobile navigation"
      >
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/attractions" onClick={closeMenu}>
          Attractions
        </Link>

        <Link to="/tours" onClick={closeMenu}>
          Tours
        </Link>

        <Link to="/guide" onClick={closeMenu}>
          Travel Guide
        </Link>

        <Link to="/shop" onClick={closeMenu}>
          Gift Shop
        </Link>

        <Link to="/cart" onClick={closeMenu}>
          Cart ({cartCount})
        </Link>
      </nav>
    </header>
  )
}

export default Navbar