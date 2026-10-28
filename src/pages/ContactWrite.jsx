import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { loadInquiries, saveInquiries, getInquiry } from '../lib/inquiries'

const initial = {
  date: '',
  people: '',
  region: '',
  vehicle: '차종 미정',
  name: '',
  contact: '',
  message: '',
}

export default function ContactWrite() {
  const { id } = useParams()
  const navigate = useNavigate()
  const editing = getInquiry(id)
  const [form, setForm] = useState(editing ? { ...initial, ...editing } : initial)

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = (e) => {
    e.preventDefault()
    const list = loadInquiries()
    if (editing) {
      saveInquiries(list.map((item) => (item.id === id ? { ...item, ...form } : item)))
    } else {
      saveInquiries([{ ...form, id: String(Date.now()), createdAt: new Date().toISOString() }, ...list])
    }
    navigate('/contact')
  }

  return (
    <section className="page">
      <h1>{editing ? '견적 문의 수정' : '견적 문의 글쓰기'}</h1>
      <p className="lead">
        날짜·인원·지역·차종을 알려주시면 견적 문의를 정리해 드립니다.
      </p>

      <form className="form" onSubmit={submit}>
        <label>
          이용 날짜
          <input type="date" name="date" value={form.date} onChange={change} required />
        </label>
        <label>
          인원
          <input type="number" name="people" value={form.people} onChange={change} min="1" placeholder="예: 25" required />
        </label>
        <label>
          출발지 / 목적지
          <input type="text" name="region" value={form.region} onChange={change} placeholder="예: 인천공항 → 서울" required />
        </label>
        <label>
          희망 차종
          <select name="vehicle" value={form.vehicle} onChange={change}>
            <option>차종 미정</option>
            <option>현대 유니버스</option>
            <option>기아 뉴그랜버드</option>
            <option>대우 BX212</option>
            <option>벤츠 스프린터</option>
          </select>
        </label>
        <label>
          이름
          <input type="text" name="name" value={form.name} onChange={change} required />
        </label>
        <label>
          연락처
          <input type="text" name="contact" value={form.contact} onChange={change} placeholder="전화번호 또는 이메일" required />
        </label>
        <label>
          요청 사항
          <textarea name="message" value={form.message} onChange={change} rows="4" placeholder="일정, 짐, 추가 요청 사항 등" />
        </label>
        <div className="row-actions">
          <button className="button primary" type="submit">{editing ? '수정하기' : '등록하기'}</button>
          <button className="button" type="button" onClick={() => navigate('/contact')}>목록으로</button>
        </div>
        <p className="note">
          아직 담당자 연락처·서버 연동이 확정되지 않아, 이 글은 실제 발송이 아닌
          이 브라우저에만 저장됩니다.
        </p>
      </form>
    </section>
  )
}
