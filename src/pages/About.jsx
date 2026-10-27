const history = [
  { year: '2022.07', title: '법인 설립', body: '㈜모던스카이투어 설립' },
  { year: '2022.10', title: '차량 증차', body: '차량 보유 대수 10대, 정복 착용' },
  { year: '2023.10', title: '차량 추가 증차', body: '차량 보유 대수 20대' },
  { year: '2024.03', title: '추가 법인 설립', body: '㈜뉴모던스카이투어 설립, 차량 보유 대수 30대' },
  { year: '2025 ~', title: '플랫폼 사업', body: '안정적인 차량 수급' },
]

const executives = [
  { name: '박상호', role: '대표이사', career: '전 ㈜마이버스 근무, ㈜솔빛고속관광 대표이사 역임' },
  { name: '박종래', role: '이사', career: '전 ㈜마이버스 근무, ㈜솔빛고속관광 이사 역임' },
  { name: '이응복', role: '이사', career: '전 ㈜신공항관광 근무, ㈜모던제이씨 이사 역임' },
]

export default function About() {
  return (
    <section className="page">
      <h1>회사 소개</h1>
      <p className="lead">
        안녕하세요. 저희 ㈜모던스카이투어는 외국인 투어 차량 전문회사입니다.
      </p>

      <h2>인사말</h2>
      <p>
        체계적인 운영관리와 투명·공정·공평을 경영철학으로 삼고,
        정복 착용, 젊은 승무 사원, 엄격한 차량관리를 내세워
        업계 최고의 서비스와 매너를 갖춘 회사,
        그리고 파트너로서 신뢰받는 업체가 될 수 있도록 끊임없이 노력하겠습니다.
      </p>
      <p>— 모던스카이투어 운영진 일동</p>

      <h2>회사 연혁</h2>
      <ol className="timeline">
        {history.map((h) => (
          <li key={h.year}>
            <strong>{h.year} {h.title}</strong>
            <span>{h.body}</span>
          </li>
        ))}
      </ol>

      <h2>임원 소개</h2>
      <table className="table">
        <thead>
          <tr><th>이름</th><th>직책</th><th>경력</th></tr>
        </thead>
        <tbody>
          {executives.map((e) => (
            <tr key={e.name}>
              <td>{e.name}</td><td>{e.role}</td><td>{e.career}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>비전</h2>
      <p>
        모던스카이투어는 임직원 모두가 하나가 되어
        업계 탑클래스 메이커가 되기 위하여 최선을 다하고 있습니다.
      </p>
    </section>
  )
}
