import { Link } from 'react-router-dom'

const stats = [
  { value: '30대', label: '보유 차량 (2024.07 기준)' },
  { value: '2022.07', label: '법인 설립' },
  { value: '3대', label: '예비 차량 (10대당 1대)' },
  { value: '연 4회', label: '서비스 정기 교육' },
]

const pillars = [
  {
    title: '직원 관리',
    body: '깔끔한 정복 착용, 명찰·견장·넥타이, 젊은 승무 사원 채용, 자체 밴드 소통, 체계적인 배차 및 운영',
  },
  {
    title: '차량 관리',
    body: '지정 정비업체를 통한 체계적인 관리, 정비 내역 철저 체크, 외부 도색 유지보수, 긴급 상황 시 비상 투입',
  },
  {
    title: '서비스 관리',
    body: '서비스 정기 교육 연 4회, 안전 교육, 법정 의무 교육(외부 강사), 차량 청결·복장 단정 교육, 연말 시상',
  },
]

const fleet = [
  { name: '현대 유니버스', count: '17대' },
  { name: '기아 뉴그랜버드', count: '9대' },
  { name: '대우 BX212', count: '1대' },
  { name: '벤츠 스프린터', count: '2대' },
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">외국인 투어 차량 전문회사</p>
        <h1>모던스카이투어</h1>
        <p>
          체계적인 운영관리와 투명·공정·공평을 경영철학으로,
          업계 최고의 서비스와 매너를 갖춘 파트너가 되겠습니다.
        </p>
        <div className="hero-actions">
          <Link className="button primary" to="/contact">견적 문의하기</Link>
          <Link className="button" to="/fleet">보유 차량 보기</Link>
        </div>
      </section>

      <section className="stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      <section className="section">
        <h2>모던스카이투어의 관리 시스템</h2>
        <div className="cards">
          {pillars.map((p) => (
            <article className="card" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>보유 차량</h2>
        <div className="cards">
          {fleet.map((f) => (
            <article className="card" key={f.name}>
              <h3>{f.name}</h3>
              <p>{f.count}</p>
            </article>
          ))}
        </div>
        <p className="note">차종별 정원·사진 등 상세 스펙은 의뢰사 확인 후 추가됩니다.</p>
      </section>

      <section className="section cta">
        <h2>투어 차량이 필요하신가요?</h2>
        <p>날짜·인원·지역·차종만 알려주시면 견적 문의를 정리해 드립니다.</p>
        <Link className="button primary" to="/contact">견적 문의하기</Link>
      </section>
    </>
  )
}
