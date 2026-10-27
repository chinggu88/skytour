const items = [
  { title: '차량 앞 승무 사원 단체', desc: '정복을 입은 승무 사원들과 보유 차량', photo: 'photos/crew-buses.jpg' },
  { title: '교육 현장', desc: '서비스 정기 교육·안전 교육 현장', photo: 'photos/training.jpg' },
  { title: '정비·차량 관리 현장', desc: '지정 정비업체 관리 현장', photo: 'photos/garage.jpg' },
]

export default function Gallery() {
  return (
    <section className="page">
      <h1>현장 갤러리</h1>
      <p className="lead">
        회사 소개 자료(PDF·PPT)에 들어 있던 실제 현장 사진입니다.
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
    </section>
  )
}
