import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import heroImage from '../assets/images/attractions-hero.jpg'
import sagradaImage from '../assets/images/sagrada-familia.jpg'
import parkGuellImage from '../assets/images/park-guell.jpg'
import gothicQuarterImage from '../assets/images/gothic-quarter.jpg'
import campNouImage from '../assets/images/camp-nou.jpg'
import viewpointsImage from '../assets/images/barcelona-viewpoints-carmel.jpg'
import './Attractions.css'

const attractionImages = {
  'sagrada-familia.jpg': sagradaImage,
  'park-guell.jpg': parkGuellImage,
  'gothic-quarter.jpg': gothicQuarterImage,
  'attractions-hero.jpg': viewpointsImage,
}

function Attractions() {
  const [attractions, setAttractions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadAttractions() {
      try {
        const response = await fetch(
          'http://localhost:3000/api/attractions',
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error('Failed to load attractions.')
        }

        const data = await response.json()
        setAttractions(data)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError('Unable to load attractions. Please try again later.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadAttractions()

    return () => controller.abort()
  }, [])

  const categories = [
    'All',
    ...new Set(attractions.map(({ category }) => category)),
  ]
  
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredAttractions = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return attractions.filter((attraction) => {
      const matchesCategory =
        activeCategory === 'All' || attraction.category === activeCategory
      const matchesSearch =
        attraction.name.toLowerCase().includes(normalizedSearch) ||
        attraction.location.toLowerCase().includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [attractions, activeCategory, searchTerm])

  return (
    <main className="attractions-page">
      <section
        className="attractions-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="attractions-hero__overlay" />
        <div className="attractions-hero__content">
          <p className="attractions-hero__eyebrow">EXPLORE BARCELONA</p>
          <h1>Places worth remembering.</h1>
          <p>
            From Gaudí’s architecture to medieval streets and peaceful parks,
            discover the places that give Barcelona its character.
          </p>
        </div>
      </section>

      <section className="attractions-browser">
        <div className="attractions-browser__heading">
          <div>
            <p className="attractions-browser__eyebrow">FIND YOUR NEXT STOP</p>
            <h2>Explore the city</h2>
          </div>

          <label className="attractions-search">
            <span className="sr-only">Search attractions</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name or location"
            />
            <span aria-hidden="true">⌕</span>
          </label>
        </div>

        <div className="attractions-filters" aria-label="Filter attractions">
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

        {isLoading ? (<p>Loading attractions...</p>) : error ? (<p role="alert">{error}</p>) : filteredAttractions.length > 0 ? (
          <div className="attractions-grid">
            {filteredAttractions.map((attraction, index) => (
              <article className="attractions-card" key={attraction.id}>
                <div className="attractions-card__image">
                  <img src={attractionImages[attraction.image]} alt={attraction.name}/>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>

                <div className="attractions-card__body">
                  <p className="attractions-card__category">{attraction.category}</p>
                  <h3>{attraction.name}</h3>
                  <p className="attractions-card__description">
                    {attraction.description}
                  </p>
                  <p className="attractions-card__location">
                    <span aria-hidden="true">●</span> {attraction.location}, Barcelona
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="attractions-empty">
            <h3>No attractions found</h3>
            <p>Try a different search term or choose another category.</p>
          </div>
        )}
      </section>
      
      <section className="camp-nou">
        <div className="camp-nou__content">
          <p className="camp-nou__eyebrow">MORE THAN A STADIUM</p>

          <h2>Experience the home of FC Barcelona.</h2>

          <p className="camp-nou__description">
            Discover the history of one of the world&apos;s most famous football
            clubs. Explore the Barça Museum, relive unforgettable moments and learn
            what makes Camp Nou a symbol of Barcelona.
          </p>

          <div className="camp-nou__details">
            <div>
              <span>Location</span>
              <strong>Les Corts</strong>
            </div>

            <div>
              <span>Category</span>
              <strong>Sport &amp; Culture</strong>
            </div>
          </div>

          <a
            className="camp-nou__button"
            href="https://www.fcbarcelona.com/en/club/facilities/spotify-camp-nou"
            target="_blank"
            rel="noreferrer"
          >
            Discover Camp Nou →
          </a>
        </div>

        <div className="camp-nou__image">
          <img
            src={campNouImage}
            alt="Camp Nou football stadium in Barcelona"
          />
        </div>
    </section>

    <section className="attractions-cta">
      <div>
        <p className="attractions-cta__eyebrow">START EXPLORING</p>
        <h2>Ready to discover Barcelona?</h2>
      </div>

      <Link className="attractions-cta__button" to="/guide">
        Plan your visit →
      </Link>
  </section>
    </main>
  )
}

export default Attractions
