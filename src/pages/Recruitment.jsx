import { Link } from 'react-router-dom'

const steps = [
  '서류 심사',
  '면접',
  '운전 테스트',
  '운전 연수',
  '투어 견습',
  '차량 배정',
  '최종 합격',
]

export default function Recruitment() {
  return (
    <section className="page">
      <h1>승무 사원 채용</h1>
      <p className="lead">
        젊은 승무 사원을 채용합니다. (30~50대)
      </p>

      <h2>근무 환경</h2>
      <ul>
        <li>깔끔한 정복 착용, 세탁비 지원, 명찰·견장·넥타이 제공</li>
        <li>당사 자체 밴드 운영으로 소통</li>
        <li>체계적인 배차 및 운영</li>
        <li>서비스 정기 교육 연 4회, 안전 교육, 법정 의무 교육</li>
        <li>연말 시상을 통한 서비스 마인드 독려</li>
      </ul>

      <h2>채용 절차</h2>
      <ol className="steps">
        {steps.map((step, i) => (
          <li key={step}>
            <strong>{i + 1}. {step}</strong>
          </li>
        ))}
      </ol>
      <p className="note">
        절차 순서는 회사소개 자료의 표를 기준으로 정리한 것입니다.
        의뢰사 확인 후 최종 확정합니다.
      </p>

      <section className="section cta">
        <h2>지원 문의</h2>
        <p>채용 관련 문의는 견적 문의 폼의 요청 사항에 ‘채용 문의’라고 적어 보내주세요.</p>
        <Link className="button primary" to="/contact">문의하기</Link>
      </section>
    </section>
  )
}
