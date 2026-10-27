const items = [
  { title: '차량 외부', desc: '보유 차량 외관 사진 자리' },
  { title: '정복 착용한 승무 사원', desc: '정복·명찰·넥타이를 갖춘 현장 사진 자리' },
  { title: '교육 현장', desc: '서비스 정기 교육·안전 교육 현장 사진 자리' },
  { title: '정비·차량 관리 현장', desc: '지정 정비업체 관리·도색 유지보수 사진 자리' },
  { title: '투어 운행 현장', desc: '외국인 투어 운행 현장 사진 자리' },
  { title: '예비 차량', desc: '비상 투입용 예비 차량 사진 자리' },
]

export default function Gallery() {
  return (
    <section className="page">
      <h1>현장 갤러리</h1>
      <p className="lead">
        모던스카이투어의 현장 사진이 들어갈 자리입니다.
      </p>
      <div className="gallery">
        {items.map((item) => (
          <figure className="gallery-item" key={item.title}>
            <div className="gallery-placeholder">사진 준비 중</div>
            <figcaption>
              <strong>{item.title}</strong>
              <span>{item.desc}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="note">
        아직 현장 사진 원본이 제공되지 않아 사진 자리만 만들어 두었습니다.
        원본 사진을 받으면 이 자리에 교체합니다. 임의의 스톡 사진은 사용하지 않았습니다.
      </p>
    </section>
  )
}
