const express = require('express')
const cors = require('cors')
const db = require('./database')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend radi!' })
})

app.get('/api/attractions', (req, res) => {
  const attractions = db.prepare('SELECT * FROM attractions').all()

  res.json(attractions)
})

app.get('/api/products', (req, res) => {
  const products = db.prepare('SELECT * FROM products ORDER BY id').all()

  res.json(products)
})

app.get('/api/tours', (req, res) => {
  const rows = db.prepare('SELECT * FROM tours ORDER BY id').all()

  const tours = rows.map((tour) => ({
    ...tour,
    featured: tour.featured === 1,
    highlights: JSON.parse(tour.highlights),
  }))

  res.json(tours)
})

app.listen(PORT, () => {
  console.log(`Server je pokrenut na http://localhost:${PORT}`)
})