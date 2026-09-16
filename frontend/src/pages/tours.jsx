import { useEffect, useMemo, useState } from 'react'

import heroImage from '../assets/images/barcelona-tour.jpg'
import busImage from '../assets/images/tour-hop-on-hop-off.jpg'
import gaudiImage from '../assets/images/tour-gaudi-interior.jpg'
import parkImage from '../assets/images/tour-park-guell-mosaic.jpg'
import gothicImage from '../assets/images/tour-gothic-quarter-alley.jpg'

import './Tours.css'

// API image names remain stable; each tour uses its own local photo.
const tourImages = {
  'barcelona-hero.jpg': busImage,
  'sagrada-familia.jpg': gaudiImage,
  'park-guell.jpg': parkImage,
  'gothic-quarter.jpg': gothicImage,
}

const tourImagePositions = {
  'barcelona-hero.jpg': 'center 95%',
  'park-guell.jpg': 'center 60%',
  'gothic-quarter.jpg': 'center 65%',
}



function Tours() {
  const [tours, setTours] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeCategory, setActiveCategory] = useState('All Tours')
  const [selectedTour, setSelectedTour] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

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

  const cardTours = tours.filter((tour) => [1, 2, 3, 4].includes(tour.id))

  const categories = [
    'All Tours',
    ...new Set(cardTours.map(({ category }) => category)),
  ]

  const filteredTours = useMemo(() => {
    if (activeCategory === 'All Tours') {
      return cardTours
    }

    return cardTours.filter(({ category }) => category === activeCategory)
  }, [cardTours, activeCategory])

  function openBooking(tourTitle) {
    setSelectedTour(tourTitle)
    setIsSubmitted(false)

    window.requestAnimationFrame(() => {
      document
        .getElementById('tour-booking')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const tour = tours.find((item) => item.title === selectedTour)

    if (!tour) {
      setSubmitError('Please select a valid tour.')
      return
    }

    setIsSubmitting(true)
    setIsSubmitted(false)
    setSubmitError('')

    try {
      const response = await fetch(
        'http://localhost:3000/api/bookings',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tourId: tour.id,
            preferredDate: formData.get('preferredDate'),
            guests: Number(formData.get('guests')),
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            message: formData.get('message'),
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to save booking.')
      }

      setIsSubmitted(true)
      form.reset()
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setIsSubmitting(false)
    }
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
                <img
                  src={tourImages[tour.image]}
                  alt={tour.title}
                  style={{ objectPosition: tourImagePositions[tour.image] || 'center' }}
                />

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
              <input type="date" name="preferredDate" required />
            </label>

            <label>
              Number of guests
              <input
                type="number"
                name="guests"
                min="1"
                max="20"
                defaultValue="2"
                required
              />
            </label>
          </div>

          <div className="booking-form__row">
            <label>
              Full name
              <input
                name="fullName"
                type="text"
                placeholder="Your full name"
                autoComplete="name"
                required
              />
            </label>

            <label>
              Email address
              <input
                name="email"
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
              name="message"
              rows="4"
              placeholder="Tell us if you have any questions or special requests."
            />
          </label>

          <button
            className="booking-form__button"
            type="submit"
            disabled={
              isLoading || isSubmitting || Boolean(error) || tours.length === 0
            }
          >
            {isSubmitting ? 'Sending...' : 'Send booking request →'}
          </button>

          {submitError && (
            <p className="booking-form__error" role="alert">
              {submitError}
            </p>
          )}

          {isSubmitted && (
            <p className="booking-form__success" role="status">
              Thank you! Your request for “{selectedTour}” has been saved.
            </p>
          )}
        </form>
      </section>
    </main>
  )
}

export default Tours
