import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadGalleryPosts, deleteGalleryPost, hashPassword } from '../lib/gallery'

const items = [
  { title: '단정한 첫인상이 곧 신뢰입니다', desc: '정복을 입은 승무 사원들과 보유 차량 30대', photo: 'photos/crew-buses.jpg' },
  { title: '교육받은 기사만이 출발합니다', desc: '연 4회 서비스 정기 교육 · 안전 교육 현장', photo: 'photos/training.jpg' },
  { title: '준비된 차량만이 출발합니다', desc: '지정 정비업체 관리 · 예비 차량 3대 비치', photo: 'photos/garage.jpg' },
]

export default function Gallery() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pendingDelete, setPendingDelete] = useState(null)
  const [deletePassword, setDeletePassword] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    loadGalleryPosts()
      .then(setPosts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const confirmDelete = async (item) => {
    setDeleteError('')
    setDeleting(true)
    try {
      if (item.password_hash) {
        const hash = await hashPassword(deletePassword)
        if (hash !== item.password_hash) {
          setDeleteError('비밀번호가 맞지 않습니다.')
          return
        }
      }
      await deleteGalleryPost(item.id)
      setPosts(posts.filter((x) => x.id !== item.id))
      setPendingDelete(null)
      setDeletePassword('')
    } catch (e) {
      setDeleteError(e.message)
    } finally {
      setDeleting(false)
    }
  }

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

      <div className="list-head" style={{ marginTop: 48 }}>
        <div>
          <h2>갤러리 게시글</h2>
          <p className="lead">사진과 글로 올린 홍보 게시글입니다.</p>
        </div>
        <Link className="button primary" to="/gallery/write">글쓰기</Link>
      </div>

      {loading && <p>게시글을 불러오는 중입니다...</p>}
      {error && (
        <div className="card">
          <h2>게시글을 불러오지 못했습니다.</h2>
          <p>Supabase에 skytour_gallery 테이블이 아직 만들어지지 않았을 수 있습니다. SQL을 실행한 뒤 새로고침해 주세요.</p>
          <p className="note">{error}</p>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="card">
          <h2>아직 등록된 게시글이 없습니다.</h2>
          <p>글쓰기 버튼을 눌러 첫 게시글을 남겨보세요.</p>
          <p><Link to="/gallery/write">글쓰기로 이동 →</Link></p>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="gallery">
          {posts.map((post) => (
            <figure className="gallery-item" key={post.id}>
              {post.photo_url ? (
                <img src={post.photo_url} alt={post.title} />
              ) : (
                <div className="gallery-placeholder">사진 없음</div>
              )}
              <figcaption>
                <strong>{post.title}</strong>
                <span>{post.description}</span>
                {post.createdAt && (
                  <span className="note">등록 {new Date(post.createdAt).toLocaleDateString('ko-KR')}</span>
                )}
                {pendingDelete?.id === post.id ? (
                  <span>
                    <input
                      type="password"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                      placeholder="글쓴이 비밀번호"
                      style={{ padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 8, marginTop: 8, width: '100%' }}
                    />
                    {deleteError && <span className="note">{deleteError}</span>}
                    <span className="row-actions">
                      <button className="button primary" type="button" disabled={deleting} onClick={() => confirmDelete(post)}>
                        {deleting ? '삭제 중...' : '삭제 확인'}
                      </button>
                      <button className="button" type="button" onClick={() => { setPendingDelete(null); setDeletePassword(''); setDeleteError('') }}>취소</button>
                    </span>
                  </span>
                ) : (
                  <span className="row-actions">
                    <Link className="button" to={`/gallery/write/${post.id}`}>수정</Link>
                    <button className="button" type="button" onClick={() => { setPendingDelete(post); setDeletePassword(''); setDeleteError('') }}>삭제</button>
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

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
