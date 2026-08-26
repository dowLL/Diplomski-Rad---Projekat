import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/attractions">Attractions</Link>
      <Link to="/tours">Tours</Link>
      <Link to="/guide">Travel Guide</Link>
      <Link to="/shop">Gift Shop</Link>
    </nav>
  )
}

export default Navbar