const fleet = [
  { name: '현대 유니버스', count: '17대', note: '대형 투어 버스' },
  { name: '기아 뉴그랜버드', count: '9대', note: '대형 투어 버스' },
  { name: '대우 BX212', count: '1대', note: '대형 투어 버스' },
  { name: '벤츠 스프린터', count: '2대', note: '소형 밴' },
]

export default function Fleet() {
  return (
    <section className="page">
      <h1>보유 차량</h1>
      <p className="lead">총 30대 보유 (2024.07.03 기준)</p>

      <div className="cards">
        {fleet.map((f) => (
          <article className="card" key={f.name}>
            <h3>{f.name}</h3>
            <p>{f.count} · {f.note}</p>
          </article>
        ))}
      </div>

      <h2>차량 관리</h2>
      <ul>
        <li>지정 정비업체를 통한 체계적인 관리, 정비 내역 철저 체크</li>
        <li>차량 외부 도색 유지보수</li>
        <li>긴급 상황 발생 시 비상 투입 인력 대기</li>
        <li>예비 차량 10대당 1대 비율, 현재 3대 비치</li>
      </ul>
      <p className="note">
        차종별 정원·내부 사진 등 상세 스펙은 의뢰사 확인 후 추가됩니다.
        차량번호판 목록은 공개 홈페이지에 게재하지 않습니다.
      </p>
    </section>
  )
}
