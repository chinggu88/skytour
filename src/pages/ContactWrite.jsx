import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getInquiry, createInquiry, updateInquiry, hashPassword } from '../lib/inquiries'
import { notifyInquiry } from '../lib/notify'

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
  const [form, setForm] = useState(initial)
  const [storedHash, setStoredHash] = useState(null)
  const [verified, setVerified] = useState(!id)
  const [verifyPassword, setVerifyPassword] = useState('')
  const [verifyError, setVerifyError] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(!!id)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!id) return
    getInquiry(id)
      .then((item) => {
        if (item) {
          setForm({
            date: item.date,
            people: item.people,
            region: item.region,
            vehicle: item.vehicle,
            name: item.name,
            contact: item.contact,
            message: item.message,
          })
          setStoredHash(item.password_hash)
          if (!item.password_hash) setVerified(true)
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const verify = async (e) => {
    e.preventDefault()
    setVerifyError('')
    const hash = await hashPassword(verifyPassword)
    if (hash === storedHash) setVerified(true)
    else setVerifyError('비밀번호가 맞지 않습니다.')
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      if (id) {
        const newHash = password ? await hashPassword(password) : null
        await updateInquiry(id, form, newHash)
      } else {
        const newHash = await hashPassword(password)
        await createInquiry(form, newHash)
        // 신규 등록 시에만 이메일 알림 (수정 시에는 보내지 않음).
        // 알림 실패가 등록을 실패시키지 않는다.
        await notifyInquiry(form)
      }
      navigate('/contact')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <section className="page"><p>문의 내용을 불러오는 중입니다...</p></section>

  if (id && !verified) {
    return (
      <section className="page">
        <h1>견적 문의 수정</h1>
        <p className="lead">수정하려면 글쓴이 비밀번호를 입력해 주세요.</p>
        <form className="form" onSubmit={verify}>
          <label>
            글 비밀번호
            <input type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} required />
          </label>
          {verifyError && <p className="note">{verifyError}</p>}
          <div className="row-actions">
            <button className="button primary" type="submit">확인</button>
            <button className="button" type="button" onClick={() => navigate('/contact')}>목록으로</button>
          </div>
          <p className="note">비밀번호를 잊어버리셨다면 회사에 직접 연락해 주세요. 비밀번호는 복구할 수 없습니다.</p>
        </form>
      </section>
    )
  }

  return (
    <section className="page">
      <h1>{id ? '견적 문의 수정' : '견적 문의 글쓰기'}</h1>
      <p className="lead">
        날짜·인원·지역·차종을 알려주시면 견적 문의를 정리해 드립니다.
      </p>

      {error && (
        <div className="card">
          <h2>저장하지 못했습니다.</h2>
          <p>Supabase에 skytour_inquiries 테이블과 등록 정책이 아직 만들어지지 않았을 수 있습니다. SQL을 실행한 뒤 다시 시도해 주세요.</p>
          <p className="note">{error}</p>
        </div>
      )}

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
        <label>
          {id ? '새 비밀번호 (비워두면 기존 유지)' : '글 비밀번호'}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={!id}
            minLength={4}
            placeholder={id ? '변경할 때만 입력' : '수정·삭제 시 필요합니다'}
          />
        </label>
        <div className="row-actions">
          <button className="button primary" type="submit" disabled={saving}>{saving ? '저장 중...' : id ? '수정하기' : '등록하기'}</button>
          <button className="button" type="button" onClick={() => navigate('/contact')}>목록으로</button>
        </div>
        <p className="note">
          이 글은 Supabase에 저장되어 회사에서도 확인할 수 있습니다.
          비밀번호는 해시로 저장되며, 분실 시 복구할 수 없습니다.
        </p>
      </form>
    </section>
  )
}
