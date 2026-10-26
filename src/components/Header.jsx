import { NavLink } from 'react-router-dom'

const tabClass = ({ isActive }) => `tab ${isActive ? 'active' : ''}`

export default function Header() {
  return (
    <nav>
      <div className="nav-inner">
        <NavLink to="/" className="logo">
          SkyTour<span className="dot">.</span>
        </NavLink>

        <div className="tabs">
          <NavLink to="/" className={tabClass}>Home</NavLink>
          <NavLink to="/about" className={tabClass}>About</NavLink>
          <NavLink to="/contact" className={tabClass}>Contact</NavLink>
        </div>
      </div>
    </nav>
  )
}
