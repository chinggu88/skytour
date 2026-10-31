import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loadGalleryPosts, deleteGalleryPost, hashPassword, checkWritePassword, unlockWrite } from '../lib/gallery'

export default function Gallery() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pendingDelete, setPendingDelete] = useState(null)
  const [deletePassword, setDeletePassword] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [showWriteGate, setShowWriteGate] = useState(false)
  const [writePassword, setWritePassword] = useState('')
  const [writeError, setWriteError] = useState('')
  const [writeChecking, setWriteChecking] = useState(false)

  useEffect(() => {
    loadGalleryPosts()
      .then(setPosts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const confirmWrite = async (e) => {
    e.preventDefault()
    setWriteError('')
    setWriteChecking(true)
    try {
      if (await checkWritePassword(writePassword)) {
        unlockWrite()
        navigate('/gallery/write')
      } else {
        setWriteError('비밀번호가 맞지 않습니다.')
      }
    } catch (err) {
      setWriteError(err.message)
    } finally {
      setWriteChecking(false)
    }
  }

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
      <div className="list-head">
        <div>
          <h2>갤러리 게시글</h2>
          <p className="lead">사진과 글로 올린 홍보 게시글입니다.</p>
        </div>
        <button className="button primary" type="button" onClick={() => { setShowWriteGate(true); setWritePassword(''); setWriteError('') }}>글쓰기</button>
      </div>

      {showWriteGate && (
        <form className="card" onSubmit={confirmWrite}>
          <h2>글쓰기 비밀번호</h2>
          <p>글쓰기는 회사 관계자만 가능합니다. 글쓰기 비밀번호를 입력해 주세요.</p>
          <input
            type="password"
            value={writePassword}
            onChange={(e) => setWritePassword(e.target.value)}
            placeholder="글쓰기 비밀번호"
            style={{ padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 8, width: '100%' }}
            required
          />
          {writeError && <p className="note">{writeError}</p>}
          <span className="row-actions">
            <button className="button primary" type="button" disabled={writeChecking} onClick={confirmWrite}>
              {writeChecking ? '확인 중...' : '확인'}
            </button>
            <button className="button" type="button" onClick={() => setShowWriteGate(false)}>취소</button>
          </span>
        </form>
      )}

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
          <p><button className="button primary" type="button" onClick={() => { setShowWriteGate(true); setWritePassword(''); setWriteError('') }}>글쓰기로 이동 →</button></p>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="gallery">
          {posts.map((post) => (
            <figure className="gallery-item" key={post.id}>
              <Link to={`/gallery/${post.id}`}>
                {post.photo_url ? (
                  <img src={post.photo_url} alt={post.title} />
                ) : (
                  <div className="gallery-placeholder">사진 없음</div>
                )}
              </Link>
              <figcaption>
                <Link to={`/gallery/${post.id}`}><strong>{post.title}</strong></Link>
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
