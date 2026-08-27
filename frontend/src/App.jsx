import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Attractions from './pages/Attractions'
import Tours from './pages/Tours'
import TravelGuide from './pages/TravelGuide'
import GiftShop from './pages/GiftShop'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/guide" element={<TravelGuide />} />
        <Route path="/shop" element={<GiftShop />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App