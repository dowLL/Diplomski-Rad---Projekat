import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import heroImage from '../assets/images/attractions-hero.jpg'
import sagradaImage from '../assets/images/sagrada-familia.jpg'
import parkGuellImage from '../assets/images/park-guell.jpg'
import gothicQuarterImage from '../assets/images/gothic-quarter.jpg'
import campNouImage from '../assets/images/camp-nou.jpg'
import './Attractions.css'

const attractions = [
  {
    id: 1,
    name: 'Sagrada Família',
    category: 'Architecture',
    location: 'Eixample',
    description: 'Gaudí’s unfinished masterpiece and Barcelona’s most iconic landmark.',
    image: sagradaImage,
  },
  {
    id: 2,
    name: 'Park Güell',
    category: 'Parks',
    location: 'Gràcia',
    description: 'Colourful mosaics, playful architecture and panoramic city views.',
    image: parkGuellImage,
  },
  {
    id: 3,
    name: 'Gothic Quarter',
    category: 'Historic',
    location: 'Ciutat Vella',
    description: 'A maze of medieval streets, hidden squares and centuries of history.',
    image: gothicQuarterImage,
  },
  {
    id: 4,
    name: 'Barcelona Viewpoints',
    category: 'Viewpoints',
    location: 'Across the city',
    description: 'See Barcelona from above and discover a new side of the city skyline.',
    image: heroImage,
  },
]

const categories = ['All', ...new Set(attractions.map(({ category }) => category))]

function Attractions() {
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
  }, [activeCategory, searchTerm])

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

        {filteredAttractions.length > 0 ? (
          <div className="attractions-grid">
            {filteredAttractions.map((attraction, index) => (
              <article className="attractions-card" key={attraction.id}>
                <div className="attractions-card__image">
                  <img src={attraction.image} alt={attraction.name} />
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
