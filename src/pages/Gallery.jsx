import { Link } from 'react-router-dom'

const items = [
  { title: '단정한 첫인상이 곧 신뢰입니다', desc: '정복을 입은 승무 사원들과 보유 차량 30대', photo: 'photos/crew-buses.jpg' },
  { title: '교육받은 기사만이 출발합니다', desc: '연 4회 서비스 정기 교육 · 안전 교육 현장', photo: 'photos/training.jpg' },
  { title: '준비된 차량만이 출발합니다', desc: '지정 정비업체 관리 · 예비 차량 3대 비치', photo: 'photos/garage.jpg' },
]

export default function Gallery() {
  return (
    <section className="page">
      <h1>현장 갤러리</h1>
      <p className="lead">
        정복을 입은 기사, 준비된 차량이 만드는 투어 — 현장 사진으로 직접 확인하세요.
      </p>
      <div className="gallery">
        {items.map((item) => (
          <figure className="gallery-item" key={item.title}>
            <img src={`${import.meta.env.BASE_URL}${item.photo}`} alt={item.title} />
            <figcaption>
              <strong>{item.title}</strong>
              <span>{item.desc}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="note">
        차량 번호판과 정비소 간판의 전화번호는 공개 전에 블러 처리했습니다.
        투어 운행 현장·예비 차량 등 추가 사진이 들어오면 이 갤러리에 더합니다.
      </p>

      <section className="section cta">
        <h2>이 현장 그대로, 투어를 맡겨보세요</h2>
        <p>
          <Link className="button primary" to="/contact">견적 문의하기</Link>
          {' '}
          <Link className="button" to="/story">브랜드 스토리 보기</Link>
        </p>
      </section>
    </section>
  )
}
