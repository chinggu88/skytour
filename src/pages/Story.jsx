import { Link } from 'react-router-dom'

const chapters = [
  {
    no: '01',
    title: '정복 — 단정함부터가 서비스',
    body: '깔끔한 정복 착용을 기본으로 합니다. 세탁비를 지원하고 명찰·견장·넥타이까지 단정하게 갖춥니다. 고객이 처음 마주하는 기사의 모습이 곧 회사의 첫인상이라고 믿기 때문입니다.',
  },
  {
    no: '02',
    title: '젊은 승무 사원 — 현장의 에너지',
    body: '30~50대 젊은 승무 사원을 채용합니다. 당사 자체 밴드로 소통하고, 체계적인 배차와 운영으로 현장의 빈틈을 줄입니다. 노사관계에서도 적극적인 지원과 체계적인 규율로 투명·공정·공평한 회사를 운영합니다.',
  },
  {
    no: '03',
    title: '교육 — 서비스는 훈련에서 나온다',
    body: '서비스 정기 교육을 연 4회 실시하고, 안전 교육과 법정 의무 교육(외부 강사)도 빠짐없이 진행합니다. 차량 청결과 복장 단정 교육은 기본, 연말 시상으로 서비스 마인드를 독려합니다.',
  },
  {
    no: '04',
    title: '차량 — 준비된 차량만이 출발한다',
    body: '지정 정비업체를 통해 체계적으로 관리하고 정비 내역을 철저히 체크합니다. 외부 도색 유지보수도 놓치지 않습니다. 긴급 상황에는 비상 투입 인력이 대기하고, 예비 차량은 10대당 1대 비율로 현재 3대를 비치하고 있습니다.',
  },
]

export default function Story() {
  return (
    <section className="page">
      <h1>브랜드 스토리</h1>
      <p className="lead">
        모던스카이투어가 지키는 네 가지 약속입니다.
      </p>

      {chapters.map((c) => (
        <article className="story" key={c.no}>
          <span className="story-no">{c.no}</span>
          <div>
            <h2>{c.title}</h2>
            <p>{c.body}</p>
          </div>
        </article>
      ))}

      <section className="section cta">
        <h2>이 약속을 현장에서 확인하세요</h2>
        <p>
          <Link to="/gallery">현장 갤러리 보기 →</Link>
          {' · '}
          <Link to="/fleet">보유 차량 보기 →</Link>
          {' · '}
          <Link to="/contact">견적 문의하기 →</Link>
        </p>
      </section>
    </section>
  )
}
