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
          <NavLink to="/story" className={tabClass}>브랜드 스토리</NavLink>
          <NavLink to="/gallery" className={tabClass}>갤러리</NavLink>
          <NavLink to="/recruitment" className={tabClass}>채용</NavLink>
          <NavLink to="/contact" className={tabClass}>견적 문의</NavLink>
        </div>
      </div>
    </nav>
  )
}
