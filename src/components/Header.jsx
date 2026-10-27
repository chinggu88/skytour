import { NavLink } from 'react-router-dom'

const tabClass = ({ isActive }) => `tab ${isActive ? 'active' : ''}`

export default function Header() {
  return (
    <nav>
      <div className="nav-inner">
        <NavLink to="/" className="logo">
          모던스카이투어<span className="dot">.</span>
        </NavLink>

        <div className="tabs">
          <NavLink to="/" className={tabClass}>Home</NavLink>
          <NavLink to="/about" className={tabClass}>회사 소개</NavLink>
          <NavLink to="/fleet" className={tabClass}>보유 차량</NavLink>
          <NavLink to="/contact" className={tabClass}>견적 문의</NavLink>
        </div>
      </div>
    </nav>
  )
}
