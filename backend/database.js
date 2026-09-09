const Database = require('better-sqlite3')
const path = require('path')

const db = new Database(path.join(__dirname, 'barcelona.db'))

db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS attractions (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL
  )
`)

const insertAttraction = db.prepare(`
  INSERT INTO attractions (
    id, name, category, location, description, image
  )
  VALUES (
    @id, @name, @category, @location, @description, @image
  )
  ON CONFLICT(id) DO NOTHING
`)

insertAttraction.run({
  id: 1,
  name: 'Sagrada Família',
  category: 'Architecture',
  location: 'Eixample',
  description: 'Gaudí’s unfinished masterpiece and Barcelona’s most iconic landmark.',
  image: 'sagrada-familia.jpg',
})

insertAttraction.run({
  id: 2,
  name: 'Park Güell',
  category: 'Parks',
  location: 'Gràcia',
  description: 'Colourful mosaics, playful architecture and panoramic city views.',
  image: 'park-guell.jpg',
})

insertAttraction.run({
  id: 3,
  name: 'Gothic Quarter',
  category: 'Historic',
  location: 'Ciutat Vella',
  description: 'A maze of medieval streets, hidden squares and centuries of history.',
  image: 'gothic-quarter.jpg',
})

insertAttraction.run({
  id: 4,
  name: 'Barcelona Viewpoints',
  category: 'Viewpoints',
  location: 'Across the city',
  description: 'See Barcelona from above and discover a new side of the city skyline.',
  image: 'attractions-hero.jpg',
})

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL CHECK (price >= 0),
    image TEXT NOT NULL
  )
`)

const insertProduct = db.prepare(`
  INSERT INTO products (
    id, name, category, price, image
  )
  VALUES (
    @id, @name, @category, @price, @image
  )
  ON CONFLICT(id) DO NOTHING
`)

const products = [
  {
    id: 1,
    name: 'Sagrada Família Miniature',
    category: 'Souvenirs',
    price: 24,
    image: 'sagrada-miniature.jpg',
  },
  {
    id: 2,
    name: 'Barcelona Postcard Set',
    category: 'Souvenirs',
    price: 9,
    image: 'barcelona-postcard.jpg',
  },
  {
    id: 3,
    name: 'Illustrated Barcelona Map',
    category: 'Art & Prints',
    price: 16,
    image: 'barcelona-map.jpg',
  },
  {
    id: 4,
    name: 'Barcelona Travel Poster',
    category: 'Art & Prints',
    price: 22,
    image: 'barcelona-poster.jpg',
  },
  {
    id: 5,
    name: 'Barcelona Canvas Tote',
    category: 'Accessories',
    price: 18,
    image: 'barcelona-tote.jpg',
  },
  {
    id: 6,
    name: 'Barcelona City T-Shirt',
    category: 'Clothing',
    price: 27,
    image: 'barcelona-shirt.jpg',
  },
  {
    id: 7,
    name: 'Barcelona Hoodie',
    category: 'Clothing',
    price: 49,
    image: 'barcelona-hoodie.jpg',
  },
  {
    id: 8,
    name: 'FC Barcelona Scarf',
    category: 'Accessories',
    price: 21,
    image: 'barcelona-scarf.jpg',
  },
]

for (const product of products) {
  insertProduct.run(product)
}

db.exec(`
  CREATE TABLE IF NOT EXISTS tours (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    duration TEXT NOT NULL,
    meetingPoint TEXT NOT NULL,
    price REAL NOT NULL CHECK (price >= 0),
    rating REAL CHECK (rating BETWEEN 0 AND 5),
    image TEXT NOT NULL,
    featured INTEGER NOT NULL DEFAULT 0 CHECK (featured IN (0, 1)),
    description TEXT NOT NULL,
    highlights TEXT NOT NULL DEFAULT '[]'
  )
`)

const insertTour = db.prepare(`
  INSERT INTO tours (
    id, title, category, duration, meetingPoint,
    price, rating, image, featured, description, highlights
  )
  VALUES (
    @id, @title, @category, @duration, @meetingPoint,
    @price, @rating, @image, @featured, @description, @highlights
  )
  ON CONFLICT(id) DO NOTHING
`)

insertTour.run({
  id: 1,
  title: 'Barcelona Hop-On Hop-Off',
  category: 'Bus Tours',
  duration: '24 or 48 hours',
  meetingPoint: 'Multiple stops across Barcelona',
  price: 33,
  rating: 4.7,
  image: 'barcelona-hero.jpg',
  featured: 1,
  description:
    'Explore Barcelona at your own pace with unlimited rides and stops near the city’s most famous landmarks.',
  highlights: JSON.stringify([
    'Two panoramic routes',
    'Audio guide included',
    'Free Wi-Fi',
  ]),
})

const remainingTours = [
  {
    id: 2,
    title: 'Gaudí Masterpieces Tour',
    category: 'Architecture',
    duration: '4 hours',
    meetingPoint: 'Sagrada Família',
    price: 59,
    rating: 4.9,
    image: 'sagrada-familia.jpg',
    featured: 0,
    description:
      'Discover Gaudí’s extraordinary imagination through Sagrada Família, Park Güell and the streets of Eixample.',
    highlights: ['Local expert guide', 'Priority entrance', 'Small group'],
  },
  {
    id: 3,
    title: 'Park Güell & Gràcia Walk',
    category: 'Walking Tours',
    duration: '3 hours',
    meetingPoint: 'Lesseps Square',
    price: 39,
    rating: 4.8,
    image: 'park-guell.jpg',
    featured: 0,
    description:
      'Walk through colourful Park Güell before discovering the relaxed squares and local character of Gràcia.',
    highlights: ['Park entry included', 'Local neighbourhoods', 'Photo stops'],
  },
  {
    id: 4,
    title: 'Secrets of the Gothic Quarter',
    category: 'Walking Tours',
    duration: '2.5 hours',
    meetingPoint: 'Barcelona Cathedral',
    price: 29,
    rating: 4.9,
    image: 'gothic-quarter.jpg',
    featured: 0,
    description:
      'Follow medieval streets, hidden courtyards and ancient Roman walls through Barcelona’s oldest quarter.',
    highlights: ['Historic stories', 'Hidden locations', 'Small group'],
  },
  {
    id: 5,
    title: 'Barcelona Coast & Sunset',
    category: 'Boat Tours',
    duration: '2 hours',
    meetingPoint: 'Port Olímpic',
    price: 45,
    rating: 4.8,
    image: 'attractions-hero.jpg',
    featured: 0,
    description:
      'See the Barcelona skyline from the Mediterranean and enjoy a relaxed sunset cruise along the city coast.',
    highlights: ['Sunset sailing', 'Welcome drink', 'Skyline views'],
  },
  {
    id: 6,
    title: 'Barcelona Highlights Express',
    category: 'Bus Tours',
    duration: '3.5 hours',
    meetingPoint: 'Plaça de Catalunya',
    price: 42,
    rating: 4.6,
    image: 'barcelona-tour.jpg',
    featured: 0,
    description:
      'Visit Barcelona’s essential landmarks on a comfortable guided journey designed for travellers with limited time.',
    highlights: ['Central departure', 'Live guide', 'Major landmarks'],
  },
]

for (const tour of remainingTours) {
  insertTour.run({
    ...tour,
    highlights: JSON.stringify(tour.highlights),
  })
}

db.exec(`
  CREATE TABLE IF NOT EXISTS tour_bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tourId INTEGER NOT NULL,
    preferredDate TEXT NOT NULL,
    guests INTEGER NOT NULL CHECK (guests BETWEEN 1 AND 20),
    fullName TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tourId) REFERENCES tours(id)
  )
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderNumber TEXT NOT NULL UNIQUE,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    postalCode TEXT NOT NULL,
    country TEXT NOT NULL,
    note TEXT NOT NULL DEFAULT '',
    deliveryMethod TEXT NOT NULL CHECK (
      deliveryMethod IN ('standard', 'express', 'pickup')
    ),
    paymentMethod TEXT NOT NULL CHECK (
      paymentMethod IN ('delivery', 'card')
    ),
    productsTotal REAL NOT NULL CHECK (productsTotal >= 0),
    deliveryPrice REAL NOT NULL CHECK (deliveryPrice >= 0),
    grandTotal REAL NOT NULL CHECK (grandTotal >= 0),
    status TEXT NOT NULL DEFAULT 'pending',
    createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId INTEGER NOT NULL,
    productId INTEGER NOT NULL,
    productName TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unitPrice REAL NOT NULL CHECK (unitPrice >= 0),
    FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id)
  )
`)

module.exports = db