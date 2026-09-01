import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { Link } from 'react-router-dom'

import heroImage from '../assets/images/attractions-hero.jpg'
import 'leaflet/dist/leaflet.css'
import './TravelGuide.css'

const locations = [
  {
    id: 1,
    name: 'Sagrada Família',
    position: [41.4036, 2.1744],
    description: 'Gaudí’s iconic basilica and Barcelona’s most famous landmark.',
  },
  {
    id: 2,
    name: 'Park Güell',
    position: [41.4145, 2.1527],
    description: 'A colourful park filled with mosaics, architecture and city views.',
  },
  {
    id: 3,
    name: 'Gothic Quarter',
    position: [41.3839, 2.1763],
    description: 'Historic streets, medieval buildings and hidden city squares.',
  },
  {
    id: 4,
    name: 'Camp Nou',
    position: [41.3809, 2.1228],
    description: 'The historic home of FC Barcelona.',
  },
  {
    id: 5,
    name: 'Plaça de Catalunya',
    position: [41.387, 2.1701],
    description: 'A central meeting point connecting Barcelona’s main districts.',
  },
]

const markerIcon = L.divIcon({
  className: 'travel-map__marker',
  html: '<span></span>',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -30],
})

const essentials = [
  { value: 'EUR (€)', label: 'Currency' },
  { value: 'Catalan & Spanish', label: 'Languages' },
  { value: 'CET / CEST', label: 'Time zone' },
  { value: '112', label: 'Emergency number' },
]

const transportOptions = [
  {
    number: '01',
    title: 'Metro',
    description:
      'The fastest way to travel across the city. Barcelona has an extensive metro network with frequent daily services.',
  },
  {
    number: '02',
    title: 'Bus',
    description:
      'Regular and night buses connect the city centre with beaches, neighbourhoods and attractions.',
  },
  {
    number: '03',
    title: 'Walking',
    description:
      'Many central areas are best explored on foot, especially the Gothic Quarter, El Born and Eixample.',
  },
  {
    number: '04',
    title: 'Bicycle',
    description:
      'Barcelona offers bike lanes, rental services and scenic routes along the Mediterranean coast.',
  },
  {
    number: '05',
    title: 'Taxi',
    description:
      'Official black-and-yellow taxis are widely available and use regulated meters.',
  },
]

const seasons = [
  {
    title: 'Spring',
    months: 'March — May',
    description:
      'Comfortable temperatures, longer days and fewer visitors than during peak summer.',
  },
  {
    title: 'Summer',
    months: 'June — August',
    description:
      'The best season for beaches and nightlife, with hot weather and larger crowds.',
  },
  {
    title: 'Autumn',
    months: 'September — November',
    description:
      'Warm days, cultural events and a calmer atmosphere throughout the city.',
  },
  {
    title: 'Winter',
    months: 'December — February',
    description:
      'Mild weather, lower prices and shorter queues at popular attractions.',
  },
]

const travelTips = [
  'Reserve major attractions online before your visit.',
  'Keep personal belongings secure in crowded tourist areas.',
  'Carry a reusable water bottle during warmer months.',
  'Use a T-casual or travel card for multiple public transport journeys.',
  'Remember that dinner in Barcelona often starts later in the evening.',
  'Learn a few basic Catalan or Spanish phrases before travelling.',
]

function TravelGuide() {
  return (
    <main className="travel-guide">
      <section
        className="guide-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="guide-hero__overlay" />

        <div className="guide-hero__content">
          <p className="guide-eyebrow">PLAN YOUR VISIT</p>

          <h1>
            Barcelona made
            <span>simple.</span>
          </h1>

          <p>
            Everything you need to move around, choose the right time to visit
            and enjoy the city with confidence.
          </p>

          <a className="guide-hero__button" href="#guide-essentials">
            Start planning
          </a>
        </div>
      </section>

      <section className="guide-essentials" id="guide-essentials">
        <div className="guide-section-heading">
          <div>
            <p className="guide-eyebrow">GOOD TO KNOW</p>
            <h2>Barcelona essentials</h2>
          </div>

          <p>
            A few useful facts to help you prepare before arriving in the city.
          </p>
        </div>

        <div className="essentials-grid">
          {essentials.map((item) => (
            <article className="essential-card" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="getting-around">
        <div className="getting-around__intro">
          <p className="guide-eyebrow">GETTING AROUND</p>
          <h2>Move through the city with ease.</h2>

          <p>
            Barcelona is compact, walkable and supported by an excellent public
            transport network. Choose the option that best fits your day.
          </p>
        </div>

        <div className="transport-list">
          {transportOptions.map((option) => (
            <article className="transport-card" key={option.title}>
              <span className="transport-card__number">{option.number}</span>

              <div>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="visit-season">
        <div className="guide-section-heading">
          <div>
            <p className="guide-eyebrow">WHEN TO VISIT</p>
            <h2>Barcelona in every season</h2>
          </div>

          <p>
            Every part of the year offers a different way to experience the
            city, from summer beaches to peaceful winter streets.
          </p>
        </div>

        <div className="season-grid">
          {seasons.map((season) => (
            <article className="season-card" key={season.title}>
              <p>{season.months}</p>
              <h3>{season.title}</h3>
              <span>{season.description}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="guide-map-section">
        <div className="guide-map-section__content">
          <p className="guide-eyebrow">EXPLORE THE MAP</p>
          <h2>Find Barcelona’s essential places.</h2>

          <p>
            Use the interactive map to locate some of the city’s best-known
            attractions and plan how to move between them.
          </p>

          <ul>
            {locations.map((location) => (
              <li key={location.id}>
                <span>{String(location.id).padStart(2, '0')}</span>
                {location.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="travel-map">
          <MapContainer
            center={[41.397, 2.16]}
            zoom={13}
            scrollWheelZoom={false}
            aria-label="Map of important tourist locations in Barcelona"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {locations.map((location) => (
              <Marker
                icon={markerIcon}
                key={location.id}
                position={location.position}
              >
                <Popup>
                  <strong>{location.name}</strong>
                  <p>{location.description}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>

      <section className="travel-tips">
        <div className="travel-tips__heading">
          <p className="guide-eyebrow">LOCAL ADVICE</p>
          <h2>Useful tips for a smoother visit.</h2>
        </div>

        <div className="tips-grid">
          {travelTips.map((tip, index) => (
            <article className="tip-card" key={tip}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{tip}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tickets-section">
        <div>
          <p className="guide-eyebrow">TICKETS & RESERVATIONS</p>
          <h2>Plan ahead. Spend more time exploring.</h2>
        </div>

        <div className="tickets-section__content">
          <p>
            Popular landmarks such as Sagrada Família and Park Güell can sell
            out during busy periods. Reserve tickets and guided experiences in
            advance whenever possible.
          </p>

          <Link to="/tours">Explore available tours →</Link>
        </div>
      </section>

      <section className="guide-cta">
        <div>
          <p className="guide-eyebrow">READY TO EXPLORE?</p>
          <h2>Discover Barcelona your way.</h2>
        </div>

        <Link to="/tours">Find your tour →</Link>
      </section>
    </main>
  )
}

export default TravelGuide