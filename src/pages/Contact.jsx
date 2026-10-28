import { useState } from 'react'
import { Link } from 'react-router-dom'
import { loadInquiries, saveInquiries } from '../lib/inquiries'

export default function Contact() {
  const [inquiries, setInquiries] = useState(() => loadInquiries())

  const remove = (id, name) => {
    if (!window.confirm(`${name ? `${name}님의 ` : ''}견적 문의를 삭제할까요?`)) return
    const next = inquiries.filter((item) => item.id !== id)
    saveInquiries(next)
    setInquiries(next)
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
        아직 담당자 연락처·서버 연동이 확정되지 않아, 이 목록은 실제 발송이 아닌
        이 브라우저에만 저장되는 목록입니다. 다른 기기나 회사에서는 보이지 않습니다.
      </p>

      {inquiries.length === 0 ? (
        <div className="card">
          <h2>아직 등록된 문의가 없습니다.</h2>
          <p>글쓰기 버튼을 눌러 첫 견적 문의를 남겨보세요.</p>
          <p><Link to="/contact/write">글쓰기로 이동 →</Link></p>
        </div>
      ) : (
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
                연락처 {item.contact || '미입력'}
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
