import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <section className="hero story-hero">
        <p className="eyebrow">외국인 투어 차량 전문회사</p>
        <h1>정복을 입은 기사,<br />준비된 차량이 만드는 투어</h1>
        <p className="quote">
          “체계적인 운영관리와 투명·공정·공평을 경영철학으로,
          업계 최고의 서비스와 매너를 갖춘 회사,
          그리고 파트너로서 신뢰받는 업체가 되겠습니다.”
        </p>
        <p>— 모던스카이투어 운영진 일동</p>
        <div className="hero-actions">
          <Link className="button primary" to="/story">브랜드 스토리 보기</Link>
          <Link className="button" to="/contact">견적 문의하기</Link>
        </div>
      </section>

      <section className="section">
        <h2>왜 모던스카이투어인가</h2>
        <div className="cards">
          <article className="card">
            <h3>정복, 단정한 첫인상</h3>
            <p>깔끔한 정복 착용, 명찰·견장·넥타이, 세탁비 지원. 단정함부터가 서비스입니다.</p>
            <Link to="/story">스토리 보기 →</Link>
          </article>
          <article className="card">
            <h3>젊은 승무 사원</h3>
            <p>30~50대 젊은 승무 사원 채용, 자체 밴드 소통, 체계적인 배차와 운영.</p>
            <Link to="/story">스토리 보기 →</Link>
          </article>
          <article className="card">
            <h3>준비된 차량</h3>
            <p>지정 정비업체 관리, 정비 내역 체크, 예비 차량 3대 비치. 긴급 상황에도 비상 투입합니다.</p>
            <Link to="/fleet">보유 차량 보기 →</Link>
          </article>
        </div>
      </section>

      <section className="section">
        <h2>숫자로 보는 모던스카이투어</h2>
        <div className="stats">
          <div className="stat"><strong>30대</strong><span>보유 차량 (2024.07 기준)</span></div>
          <div className="stat"><strong>2022.07</strong><span>법인 설립</span></div>
          <div className="stat"><strong>연 4회</strong><span>서비스 정기 교육</span></div>
          <div className="stat"><strong>3대</strong><span>예비 차량</span></div>
        </div>
        <p>
          <Link to="/about">연혁 보기 →</Link>
          {' · '}
          <Link to="/gallery">현장 갤러리 보기 →</Link>
          {' · '}
          <Link to="/recruitment">승무 사원 채용 보기 →</Link>
        </p>
      </section>
    </>
  )
}
