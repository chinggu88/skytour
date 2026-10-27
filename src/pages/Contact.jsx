import { useState } from 'react'

const initial = {
  date: '',
  people: '',
  region: '',
  vehicle: '차종 미정',
  name: '',
  contact: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [submitted, setSubmitted] = useState(false)

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="page">
      <h1>견적 문의</h1>
      <p className="lead">
        날짜·인원·지역·차종을 알려주시면 견적 문의를 정리해 드립니다.
      </p>

      {submitted ? (
        <div className="card">
          <h2>문의 내용이 정리되었습니다.</h2>
          <p>
            {form.name ? `${form.name}님, ` : ''}입력해주신 내용을 확인했습니다.
            담당자 연락처가 확정되는 대로 실제 발송 기능으로 연결됩니다.
            그 전까지는 이 폼에서 발송이 이루어지지 않습니다.
          </p>
          <button className="button" type="button" onClick={() => { setForm(initial); setSubmitted(false) }}>
            다시 작성하기
          </button>
        </div>
      ) : (
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
          <button className="button primary" type="submit">문의 내용 정리하기</button>
          <p className="note">
            아직 담당자 연락처·주소가 확정되지 않아, 이 폼은 실제 발송이 아닌
            문의 내용 정리용입니다. 연락처 확정 후 이메일·전화 연결로 교체합니다.
          </p>
        </form>
      )}
    </section>
  )
}
