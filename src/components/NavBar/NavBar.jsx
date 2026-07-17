import { NavLink } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget.jsx'
import './NavBar.css'

const categories = ['mates', 'bombillas', 'termos', 'yerbas', 'combos']

function NavBar() {
  return (
    <header className="navbar">
      <NavLink className="brand" to="/">MateStore</NavLink>
      <nav className="nav-links" aria-label="Navegación principal">
        <NavLink to="/">Inicio</NavLink>
        {categories.map((category) => (
          <NavLink key={category} to={`/category/${category}`}>
            {category[0].toUpperCase() + category.slice(1)}
          </NavLink>
        ))}
      </nav>
      <CartWidget />
    </header>
  )
}

export default NavBar
