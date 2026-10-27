import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="hero-fullbleed">
      <img src={`${import.meta.env.BASE_URL}photos/crew-buses.jpg`} alt="정복을 입은 모던스카이투어 승무 사원들과 보유 버스" />
      <div className="hero-fullbleed-content">
        <p className="eyebrow">외국인 투어 차량 전문회사 · 보유 30대</p>
        <h1>정복을 입은 기사,<br />준비된 차량이 만드는 투어</h1>
        <p className="hero-sub">체계적인 운영관리와 투명·공정·공평을 경영철학으로, 파트너로서 신뢰받는 업체가 되겠습니다.</p>
        <div className="hero-actions">
          <Link className="button primary" to="/contact">견적 문의하기</Link>
          <Link className="button outline-light" to="/story">브랜드 스토리 보기</Link>
          <Link className="button outline-light" to="/about">회사 소개 보기</Link>
        </div>
        <p className="hero-caption">회사 소개 자료의 실제 현장 사진입니다 (차량 번호판은 블러 처리했습니다).</p>
      </div>
    </section>
  )
}
