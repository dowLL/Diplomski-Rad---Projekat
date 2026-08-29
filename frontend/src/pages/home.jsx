import { Link } from 'react-router-dom'
import heroImage from '../assets/images/barcelona-hero.jpg'
import sagradaImage from '../assets/images/sagrada-familia.jpg'
import parkGuellImage from '../assets/images/park-guell.jpg'
import gothicQuarterImage from '../assets/images/gothic-quarter.jpg'
import tourImage from '../assets/images/barcelona-tour.jpg'
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

      <section className="featured">
        <div className="featured__header">
          <div>
            <p className="featured__eyebrow">DISCOVER THE CITY</p>
            <h2 className="featured__title">Popular attractions</h2>
          </div>

          <Link className="featured__link" to="/attractions">
            View all attractions →
          </Link>
        </div>

        <div className="featured__grid">
          <article
           className="attraction-card" 
           style={{ backgroundImage: `url(${sagradaImage})` }}>

            <div className="attraction-card__overlay"></div>
            <div className="attraction-card__number">01</div>

            <div className="attraction-card__content">
              <p>Architecture</p>
              <h3>Sagrada Família</h3>
              <span>Eixample, Barcelona</span>
            </div>
          </article>

          <article
          className="attraction-card"
          style={{ backgroundImage: `url(${parkGuellImage})` }}>

            <div className="attraction-card__overlay"></div>
            <div className="attraction-card__number">02</div>

            <div className="attraction-card__content">
              <p>Park &amp; Architecture</p>
              <h3>Park Güell</h3>
              <span>Gràcia, Barcelona</span>
            </div>
          </article>

          <article
          className="attraction-card"
          style={{ backgroundImage: `url(${gothicQuarterImage})` }}>
            <div className="attraction-card__overlay"></div>
            <div className="attraction-card__number">03</div>

            <div className="attraction-card__content">
              <p>Historic District</p>
              <h3>Gothic Quarter</h3>
              <span>Ciutat Vella, Barcelona</span>
            </div>
          </article>
        </div>
      </section>

      <section className="tours-promo">
        <div className="tours-promo__image">
          <img
            src={tourImage}
            alt="Travellers exploring Barcelona"
          />
        </div>

        <div className="tours-promo__content">
          <p className="tours-promo__eyebrow">EXPLORE YOUR WAY</p>

          <h2 className="tours-promo__title">
            Tours made for every kind of traveller.
          </h2>

          <p className="tours-promo__description">
            Walk through historic streets, discover Gaudí&apos;s masterpieces
            or experience Barcelona&apos;s food and culture with a local guide.
          </p>

          <Link className="tours-promo__button" to="/tours">
            Discover tours
          </Link>
        </div>
      </section>

    </main>
  )
}

export default Home