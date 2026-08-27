import { Link } from 'react-router-dom'
import heroImage from '../assets/images/barcelona-hero.jpg'
import './Home.css'

function Home() {
  return (
    <main className="home">
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero__overlay"></div>

        <div className="hero__content">
          <p className="hero__eyebrow">WELCOME TO BARCELONA</p>

          <h1 className="hero__title">
            More than a city.
            <span>A feeling.</span>
          </h1>

          <p className="hero__description">
            Discover unforgettable architecture, Mediterranean beaches,
            vibrant neighbourhoods and stories waiting around every corner.
          </p>

          <div className="hero__actions">
            <Link
              className="hero__button hero__button--primary"
              to="/attractions"
            >
              Explore Barcelona
            </Link>

            <Link
              className="hero__button hero__button--secondary"
              to="/tours"
            >
              Discover Tours
            </Link>
          </div>
        </div>

        <div className="hero__scroll">
          <span>Scroll to explore</span>
          <span className="hero__scroll-line"></span>
        </div>
      </section>
    </main>
  )
}

export default Home