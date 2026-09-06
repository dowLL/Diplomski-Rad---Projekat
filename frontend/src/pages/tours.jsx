import { useEffect, useMemo, useState } from 'react'

import heroImage from '../assets/images/barcelona-tour.jpg'
import busImage from '../assets/images/barcelona-hero.jpg'
import gaudiImage from '../assets/images/sagrada-familia.jpg'
import parkImage from '../assets/images/park-guell.jpg'
import gothicImage from '../assets/images/gothic-quarter.jpg'
import coastImage from '../assets/images/attractions-hero.jpg'

import './Tours.css'

const tourImages = {
  'barcelona-hero.jpg': busImage,
  'sagrada-familia.jpg': gaudiImage,
  'park-guell.jpg': parkImage,
  'gothic-quarter.jpg': gothicImage,
  'attractions-hero.jpg': coastImage,
  'barcelona-tour.jpg': heroImage,
}



function Tours() {
  const [tours, setTours] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeCategory, setActiveCategory] = useState('All Tours')
  const [selectedTour, setSelectedTour] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function loadTours() {
      try {
        const response = await fetch(
          'http://localhost:3000/api/tours',
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error('Failed to load tours.')
        }

        const data = await response.json()

        setTours(data)
        setSelectedTour(data[0]?.title ?? '')
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError('Unable to load tours. Please try again later.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadTours()

    return () => controller.abort()
  }, [])

  const categories = [
    'All Tours',
    ...new Set(tours.map(({ category }) => category)),
  ]

  const filteredTours = useMemo(() => {
    if (activeCategory === 'All Tours') {
      return tours
    }

    return tours.filter(({ category }) => category === activeCategory)
  }, [tours, activeCategory])  

  function openBooking(tourTitle) {
    setSelectedTour(tourTitle)
    setIsSubmitted(false)

    window.requestAnimationFrame(() => {
      document
        .getElementById('tour-booking')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <main className="tours-page">
      <section
        className="tours-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="tours-hero__overlay" />

        <div className="tours-hero__content">
          <p className="tours-hero__eyebrow">EXPERIENCE BARCELONA</p>

          <h1>
            See the city.
            <span>Your way.</span>
          </h1>

          <p className="tours-hero__description">
            From open-top buses and Gaudí landmarks to historic streets and
            Mediterranean sunsets, find the Barcelona experience made for you.
          </p>

          <a className="tours-hero__button" href="#tour-list">
            Explore all tours
          </a>
        </div>
      </section>

      <section className="tours-intro" id="tour-list">
        <div className="tours-intro__heading">
          <div>
            <p className="tours-section__eyebrow">CHOOSE YOUR EXPERIENCE</p>
            <h2>Unforgettable ways to explore.</h2>
          </div>

          <p className="tours-intro__text">
            Carefully selected experiences for curious travellers, first-time
            visitors and everyone who wants to see more of Barcelona.
          </p>
        </div>

        <div className="tours-filters" aria-label="Filter tours by category">
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

        {isLoading && <p>Loading tours...</p>}

        {error && <p role="alert">{error}</p>}

        {!isLoading && !error && tours.length === 0 && (
          <p>No tours available.</p>
        )}

        <div className="tours-grid">
          {filteredTours.map((tour) => (
            <article
              className={`tour-card ${tour.featured ? 'tour-card--featured' : ''}`}
              key={tour.id}
            >
              <div className="tour-card__image">
                <img src={tourImages[tour.image]} alt={tour.title} />

                {tour.featured && (
                  <span className="tour-card__badge">MOST POPULAR</span>
                )}

                <span className="tour-card__rating">
                  <span aria-hidden="true">★</span> {tour.rating}
                </span>
              </div>

              <div className="tour-card__body">
                <p className="tour-card__category">{tour.category}</p>
                <h3>{tour.title}</h3>
                <p className="tour-card__description">{tour.description}</p>

                <ul className="tour-card__highlights">
                  {tour.highlights.map((highlight) => (
                    <li key={highlight}>
                      <span aria-hidden="true">✓</span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="tour-card__details">
                  <p>
                    <span>Duration</span>
                    <strong>{tour.duration}</strong>
                  </p>

                  <p>
                    <span>Meeting point</span>
                    <strong>{tour.meetingPoint}</strong>
                  </p>
                </div>

                <div className="tour-card__footer">
                  <p className="tour-card__price">
                    <span>From</span>
                    <strong>€{tour.price}</strong>
                    <small>/ person</small>
                  </p>

                  <button
                    type="button"
                    onClick={() => openBooking(tour.title)}
                  >
                    Book this tour →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bus-feature">
        <div className="bus-feature__image">
          <img
            src={busImage}
            alt="Barcelona viewed from a sightseeing bus route"
          />
        </div>

        <div className="bus-feature__content">
          <p className="tours-section__eyebrow">EXPLORE AT YOUR OWN PACE</p>
          <h2>Hop on. Hop off. See it all.</h2>

          <p>
            The easiest way to discover Barcelona for the first time. Travel
            between the city’s major attractions on an open-top sightseeing bus
            and leave the bus whenever something catches your attention.
          </p>

          <div className="bus-feature__facts">
            <div>
              <strong>40+</strong>
              <span>Convenient stops</span>
            </div>

            <div>
              <strong>2</strong>
              <span>Panoramic routes</span>
            </div>

            <div>
              <strong>16</strong>
              <span>Audio languages</span>
            </div>
          </div>

          <button
            className="bus-feature__button"
            type="button"
            onClick={() => openBooking('Barcelona Hop-On Hop-Off')}
          >
            Reserve your bus ticket →
          </button>
        </div>
      </section>

      <section className="booking-section" id="tour-booking">
        <div className="booking-section__intro">
          <p className="tours-section__eyebrow">PLAN YOUR EXPERIENCE</p>
          <h2>Ready for Barcelona?</h2>
          <p>
            Send us your preferred date and group size. This demonstration form
            confirms your request on the page and can later be connected to the
            project backend.
          </p>

          <div className="booking-section__note">
            <span aria-hidden="true">i</span>
            <p>
              No payment is collected through this form. Availability and final
              details are confirmed separately.
            </p>
          </div>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <label>
            Selected tour
            <select
              value={selectedTour}
              onChange={(event) => {
                setSelectedTour(event.target.value)
                setIsSubmitted(false)
              }}
            >
              {tours.map((tour) => (
                <option key={tour.id} value={tour.title}>
                  {tour.title}
                </option>
              ))}
            </select>
          </label>

          <div className="booking-form__row">
            <label>
              Preferred date
              <input type="date" required />
            </label>

            <label>
              Number of guests
              <input type="number" min="1" max="20" defaultValue="2" required />
            </label>
          </div>

          <div className="booking-form__row">
            <label>
              Full name
              <input
                type="text"
                placeholder="Your full name"
                autoComplete="name"
                required
              />
            </label>

            <label>
              Email address
              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>
          </div>

          <label>
            Additional message
            <textarea
              rows="4"
              placeholder="Tell us if you have any questions or special requests."
            />
          </label>

          <button
            className="booking-form__button"
            type="submit"
            disabled={isLoading || Boolean(error) || tours.length === 0}
          >
            Send booking request →
          </button>

          {isSubmitted && (
            <p className="booking-form__success" role="status">
              Thank you! Your request for “{selectedTour}” has been recorded.
            </p>
          )}
        </form>
      </section>
    </main>
  )
}

export default Tours