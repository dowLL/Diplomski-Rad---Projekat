const express = require('express')
const cors = require('cors')
const db = require('./database')
const { randomUUID } = require('node:crypto')

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

app.post('/api/bookings', (req, res) => {
  const {
    tourId,
    preferredDate,
    guests,
    fullName,
    email,
    message = '',
  } = req.body

  const normalizedTourId = Number(tourId)
  const normalizedGuests = Number(guests)

  if (
    !Number.isInteger(normalizedTourId) ||
    !preferredDate ||
    !Number.isInteger(normalizedGuests) ||
    normalizedGuests < 1 ||
    normalizedGuests > 20 ||
    typeof fullName !== 'string' ||
    !fullName.trim() ||
    typeof email !== 'string' ||
    !email.includes('@')
  ) {
    return res.status(400).json({
      message: 'Uneti podaci za rezervaciju nisu ispravni.',
    })
  }

  const tour = db
    .prepare('SELECT id FROM tours WHERE id = ?')
    .get(normalizedTourId)

  if (!tour) {
    return res.status(404).json({
      message: 'Izabrana tura ne postoji.',
    })
  }

  const result = db
    .prepare(`
      INSERT INTO tour_bookings (
        tourId,
        preferredDate,
        guests,
        fullName,
        email,
        message
      )
      VALUES (
        @tourId,
        @preferredDate,
        @guests,
        @fullName,
        @email,
        @message
      )
    `)
    .run({
      tourId: normalizedTourId,
      preferredDate,
      guests: normalizedGuests,
      fullName: fullName.trim(),
      email: email.trim(),
      message: typeof message === 'string' ? message.trim() : '',
    })

  const booking = db
    .prepare('SELECT * FROM tour_bookings WHERE id = ?')
    .get(result.lastInsertRowid)

  return res.status(201).json({
    message: 'Rezervacija je uspešno sačuvana.',
    booking,
  })
})

app.post('/api/orders', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    postalCode,
    country,
    note = '',
    deliveryMethod,
    paymentMethod,
    items,
  } = req.body

  const requiredTextFields = [
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    postalCode,
    country,
  ]

  const hasInvalidTextField = requiredTextFields.some(
    (value) => typeof value !== 'string' || !value.trim(),
  )

  const deliveryPrices = {
    standard: 4.9,
    express: 9.9,
    pickup: 0,
  }

  const validPaymentMethods = ['delivery', 'card']

  if (
    hasInvalidTextField ||
    !email.includes('@') ||
    !(deliveryMethod in deliveryPrices) ||
    !validPaymentMethods.includes(paymentMethod) ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return res.status(400).json({
      message: 'Podaci porudžbine nisu ispravni.',
    })
  }

  const normalizedItems = []

  for (const item of items) {
    const productId = Number(item.productId)
    const quantity = Number(item.quantity)

    if (
      !Number.isInteger(productId) ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 99
    ) {
      return res.status(400).json({
        message: 'Stavke porudžbine nisu ispravne.',
      })
    }

    const product = db
      .prepare('SELECT id, name, price FROM products WHERE id = ?')
      .get(productId)

    if (!product) {
      return res.status(404).json({
        message: `Proizvod sa ID brojem ${productId} ne postoji.`,
      })
    }

    normalizedItems.push({
      productId: product.id,
      productName: product.name,
      quantity,
      unitPrice: product.price,
    })
  }

  const productsTotal = Number(
    normalizedItems
      .reduce(
        (total, item) => total + item.unitPrice * item.quantity,
        0,
      )
      .toFixed(2),
  )

  const deliveryPrice = deliveryPrices[deliveryMethod]
  const grandTotal = Number((productsTotal + deliveryPrice).toFixed(2))
  const orderNumber = `BCN-${randomUUID().slice(0, 8).toUpperCase()}`

  const saveOrder = db.transaction(() => {
    const orderResult = db
      .prepare(`
        INSERT INTO orders (
          orderNumber,
          firstName,
          lastName,
          email,
          phone,
          address,
          city,
          postalCode,
          country,
          note,
          deliveryMethod,
          paymentMethod,
          productsTotal,
          deliveryPrice,
          grandTotal
        )
        VALUES (
          @orderNumber,
          @firstName,
          @lastName,
          @email,
          @phone,
          @address,
          @city,
          @postalCode,
          @country,
          @note,
          @deliveryMethod,
          @paymentMethod,
          @productsTotal,
          @deliveryPrice,
          @grandTotal
        )
      `)
      .run({
        orderNumber,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
        country: country.trim(),
        note: typeof note === 'string' ? note.trim() : '',
        deliveryMethod,
        paymentMethod,
        productsTotal,
        deliveryPrice,
        grandTotal,
      })

    const orderId = Number(orderResult.lastInsertRowid)

    const insertOrderItem = db.prepare(`
      INSERT INTO order_items (
        orderId,
        productId,
        productName,
        quantity,
        unitPrice
      )
      VALUES (
        @orderId,
        @productId,
        @productName,
        @quantity,
        @unitPrice
      )
    `)

    for (const item of normalizedItems) {
      insertOrderItem.run({
        orderId,
        ...item,
      })
    }

    return db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId)
  })

  try {
    const order = saveOrder()

    return res.status(201).json({
      message: 'Porudžbina je uspešno sačuvana.',
      order,
    })
  } catch (error) {
    console.error(error)
    
    return res.status(500).json({
      message: 'Došlo je do greške prilikom čuvanja porudžbine.',
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server je pokrenut na http://localhost:${PORT}`)
})