import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getGalleryPost, deleteGalleryPost, hashPassword } from '../lib/gallery'

export default function GalleryDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    getGalleryPost(id)
      .then((item) => { if (item) setPost(item) })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  const confirmDelete = async () => {
    setDeleteError('')
    setDeleting(true)
    try {
      if (post.password_hash) {
        const hash = await hashPassword(deletePassword)
        if (hash !== post.password_hash) {
          setDeleteError('비밀번호가 맞지 않습니다.')
          return
        }
      }
      await deleteGalleryPost(post.id)
      navigate('/gallery')
    } catch (e) {
      setDeleteError(e.message)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <section className="page"><p>게시글을 불러오는 중입니다...</p></section>
  if (error) {
    return (
      <section className="page">
        <div className="card">
          <h2>게시글을 불러오지 못했습니다.</h2>
          <p className="note">{error}</p>
          <p><Link to="/gallery">갤러리 목록으로 →</Link></p>
        </div>
      </section>
    )
  }
  if (!post) {
    return (
      <section className="page">
        <div className="card">
          <h2>게시글을 찾을 수 없습니다.</h2>
          <p><Link to="/gallery">갤러리 목록으로 →</Link></p>
        </div>
      </section>
    )
  }

  return (
    <section className="page detail">
      <div className="detail-header">
        <button className="detail-back" type="button" onClick={() => navigate('/gallery')} aria-label="갤러리 목록으로 돌아가기">←</button>
        <strong>현장 갤러리</strong>
        <span className="detail-menu-wrap">
          <button className="detail-menu-btn" type="button" aria-label="게시글 메뉴" onClick={() => setMenuOpen(!menuOpen)}>⋮</button>
          {menuOpen && (
            <span className="detail-menu">
              <Link to={`/gallery/write/${post.id}`}>수정</Link>
              <button type="button" onClick={() => { setShowDelete(true); setMenuOpen(false) }}>삭제</button>
            </span>
          )}
        </span>
      </div>

      <div className="detail-author">
        <span className="detail-avatar" aria-hidden="true">모</span>
        <span>
          <strong>모던스카이투어</strong>
          <span className="detail-meta">
            {post.createdAt ? new Date(post.createdAt).toLocaleString('ko-KR') : ''}
          </span>
        </span>
      </div>

      <h1 className="detail-title">{post.title}</h1>

      {post.description && (
        <p className="detail-body">{post.description}</p>
      )}

      {post.photo_url && (
        <figure className="detail-photo">
          <img src={post.photo_url} alt={post.title} />
        </figure>
      )}

      {showDelete && (
        <div className="card" style={{ marginTop: 24 }}>
          <h2>게시글을 삭제할까요?</h2>
          <label>
            글 비밀번호
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="글쓴이 비밀번호"
              style={{ padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 8, marginTop: 6, width: '100%' }}
            />
          </label>
          {deleteError && <p className="note">{deleteError}</p>}
          <div className="row-actions">
            <button className="button primary" type="button" disabled={deleting} onClick={confirmDelete}>
              {deleting ? '삭제 중...' : '삭제 확인'}
            </button>
            <button className="button" type="button" onClick={() => { setShowDelete(false); setDeletePassword(''); setDeleteError('') }}>취소</button>
          </div>
        </div>
      )}

      <section className="section">
        <h2>댓글</h2>
        <p className="note">아직 댓글이 없습니다. 댓글 작성 기능은 다음 단계에서 연결할 수 있습니다.</p>
      </section>

      <p><Link to="/gallery">← 갤러리 목록으로</Link></p>
    </section>
  )
}
