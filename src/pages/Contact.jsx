import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadInquiries, deleteInquiry, maskContact } from '../lib/inquiries'

export default function Contact() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadInquiries()
      .then(setInquiries)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const remove = async (id, name) => {
    if (!window.confirm(`${name ? `${name}님의 ` : ''}견적 문의를 삭제할까요?`)) return
    try {
      await deleteInquiry(id)
      setInquiries(inquiries.filter((item) => item.id !== id))
    } catch (e) {
      setError(e.message)
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
              <div className="row-actions">
                <Link className="button" to={`/contact/write/${item.id}`}>수정</Link>
                <button className="button" type="button" onClick={() => remove(item.id, item.name)}>삭제</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
