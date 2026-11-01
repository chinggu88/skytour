export function GallerySkeleton() {
  return (
    <div className="gallery" role="status" aria-label="게시글을 불러오는 중">
      {[0, 1, 2].map((i) => (
        <figure className="gallery-item" key={i} aria-hidden="true">
          <div className="skel skel-img" />
          <figcaption>
            <div className="skel skel-line" style={{ width: '70%' }} />
            <div className="skel skel-line" style={{ width: '90%' }} />
            <div className="skel skel-line" style={{ width: '40%' }} />
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export function InquirySkeleton() {
  return (
    <div className="inquiry-list" role="status" aria-label="목록을 불러오는 중">
      {[0, 1, 2].map((i) => (
        <article className="card inquiry-card" key={i} aria-hidden="true">
          <div className="skel skel-line" style={{ width: '60%', height: 20 }} />
          <div className="skel skel-line" style={{ width: '90%' }} />
          <div className="skel skel-line" style={{ width: '50%' }} />
        </article>
      ))}
    </div>
  )
}

export function DetailSkeleton() {
  return (
    <div role="status" aria-label="게시글을 불러오는 중">
      <div className="detail-author" aria-hidden="true">
        <span className="skel skel-avatar" />
        <span style={{ flex: 1 }}>
          <span className="skel skel-line" style={{ width: 120, height: 16 }} />
          <span className="skel skel-line" style={{ width: 160 }} />
        </span>
      </div>
      <div className="skel skel-line" style={{ width: '80%', height: 28 }} aria-hidden="true" />
      <div className="skel skel-line" style={{ width: '100%' }} aria-hidden="true" />
      <div className="skel skel-line" style={{ width: '100%' }} aria-hidden="true" />
      <div className="skel skel-line" style={{ width: '60%' }} aria-hidden="true" />
      <div className="skel skel-img" aria-hidden="true" />
    </div>
  )
}
