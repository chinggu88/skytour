import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadInquiries, deleteInquiry, hashPassword, maskContact } from '../lib/inquiries'

export default function Contact() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pendingDelete, setPendingDelete] = useState(null)
  const [deletePassword, setDeletePassword] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    loadInquiries()
      .then(setInquiries)
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
      await deleteInquiry(item.id)
      setInquiries(inquiries.filter((x) => x.id !== item.id))
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
          <h1>견적 문의</h1>
          <p className="lead">
            등록된 견적 문의 목록입니다. 글쓰기 버튼을 누르면 문의 작성 페이지로 이동합니다.
          </p>
        </div>
        <Link className="button primary" to="/contact/write">글쓰기</Link>
      </div>

      <p className="note">
        이 목록은 Supabase에 저장됩니다. 연락처는 화면에서 마스킹해서 보여줍니다.
        수정·삭제에는 글쓴이가 정한 비밀번호가 필요합니다.
      </p>

      {loading && <p>목록을 불러오는 중입니다...</p>}
      {error && (
        <div className="card">
          <h2>목록을 불러오지 못했습니다.</h2>
          <p>Supabase에 skytour_inquiries 테이블과 조회 정책이 아직 만들어지지 않았을 수 있습니다. SQL을 실행한 뒤 새로고침해 주세요.</p>
          <p className="note">{error}</p>
        </div>
      )}

      {!loading && !error && inquiries.length === 0 && (
        <div className="card">
          <h2>아직 등록된 문의가 없습니다.</h2>
          <p>글쓰기 버튼을 눌러 첫 견적 문의를 남겨보세요.</p>
          <p><Link to="/contact/write">글쓰기로 이동 →</Link></p>
        </div>
      )}

      {!loading && !error && inquiries.length > 0 && (
        <div className="inquiry-list">
          {inquiries.map((item) => (
            <article className="card inquiry-card" key={item.id}>
              <h3>{item.region || '지역 미입력'} · {item.date || '날짜 미정'}</h3>
              <p>
                인원 {item.people ? `${item.people}명` : '미입력'} · 희망 차종 {item.vehicle}
                {' · '}작성자 {item.name || '미입력'}
              </p>
              {item.message && <p>{item.message}</p>}
              <p className="note">
                연락처 {maskContact(item.contact)}
                {item.createdAt && ` · 등록 ${new Date(item.createdAt).toLocaleDateString('ko-KR')}`}
              </p>
              {pendingDelete?.id === item.id ? (
                <div>
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
                    <button className="button primary" type="button" disabled={deleting} onClick={() => confirmDelete(item)}>
                      {deleting ? '삭제 중...' : '삭제 확인'}
                    </button>
                    <button className="button" type="button" onClick={() => { setPendingDelete(null); setDeletePassword(''); setDeleteError('') }}>취소</button>
                  </div>
                </div>
              ) : (
                <div className="row-actions">
                  <Link className="button" to={`/contact/write/${item.id}`}>수정</Link>
                  <button className="button" type="button" onClick={() => { setPendingDelete(item); setDeletePassword(''); setDeleteError('') }}>삭제</button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
