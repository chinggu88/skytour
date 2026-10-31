import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getGalleryPost, createGalleryPost, updateGalleryPost, uploadGalleryPhoto, hashPassword,
  checkWritePassword, isWriteUnlocked, unlockWrite,
} from '../lib/gallery'

const initial = { title: '', description: '', photo_url: '' }

export default function GalleryWrite() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(initial)
  const [file, setFile] = useState(null)
  const [showUrl, setShowUrl] = useState(false)
  const [fontLarge, setFontLarge] = useState(false)
  const [showSendMenu, setShowSendMenu] = useState(false)
  const [storedHash, setStoredHash] = useState(null)
  const [verified, setVerified] = useState(!id)
  const [verifyPassword, setVerifyPassword] = useState('')
  const [verifyError, setVerifyError] = useState('')
  const [password, setPassword] = useState('')
  const [writeUnlocked, setWriteUnlocked] = useState(() => isWriteUnlocked())
  const [writeGatePassword, setWriteGatePassword] = useState('')
  const [writeGateError, setWriteGateError] = useState('')
  const [loading, setLoading] = useState(!!id)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const fileRef = useRef(null)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (!id) return
    getGalleryPost(id)
      .then((item) => {
        if (item) {
          setForm({ title: item.title, description: item.description, photo_url: item.photo_url })
          if (item.photo_url) setShowUrl(true)
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

  const verifyWriteGate = async (e) => {
    e.preventDefault()
    setWriteGateError('')
    if (await checkWritePassword(writeGatePassword)) {
      unlockWrite()
      setWriteUnlocked(true)
    } else {
      setWriteGateError('비밀번호가 맞지 않습니다.')
    }
  }

  const verify = async (e) => {
    e.preventDefault()
    setVerifyError('')
    const hash = await hashPassword(verifyPassword)
    if (hash === storedHash) setVerified(true)
    else setVerifyError('비밀번호가 맞지 않습니다.')
  }

  const insertEmoji = () => {
    const el = bodyRef.current
    if (!el) return
    const start = el.selectionStart ?? form.description.length
    const end = el.selectionEnd ?? form.description.length
    const next = `${form.description.slice(0, start)}😊${form.description.slice(end)}`
    setForm({ ...form, description: next })
    setTimeout(() => { el.focus(); el.setSelectionRange(start + 2, start + 2) }, 0)
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      let photoUrl = form.photo_url
      if (file) photoUrl = await uploadGalleryPhoto(file)
      const data = { ...form, photo_url: photoUrl }
      if (id) {
        const newHash = password ? await hashPassword(password) : null
        await updateGalleryPost(id, data, newHash)
      } else {
        const newHash = await hashPassword(password)
        await createGalleryPost(data, newHash)
      }
      navigate('/gallery')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <section className="page"><p>게시글을 불러오는 중입니다...</p></section>

  if (!id && !writeUnlocked) {
    return (
      <section className="page">
        <h1>갤러리 글쓰기</h1>
        <p className="lead">글쓰기는 회사 관계자만 가능합니다. 글쓰기 비밀번호를 입력해 주세요.</p>
        <form className="form" onSubmit={verifyWriteGate}>
          <label>
            글쓰기 비밀번호
            <input type="password" value={writeGatePassword} onChange={(e) => setWriteGatePassword(e.target.value)} required />
          </label>
          {writeGateError && <p className="note">{writeGateError}</p>}
          <div className="row-actions">
            <button className="button primary" type="submit">확인</button>
            <button className="button" type="button" onClick={() => navigate('/gallery')}>목록으로</button>
          </div>
          <p className="note">비밀번호를 모르시면 회사에 직접 연락해 주세요.</p>
        </form>
      </section>
    )
  }

  if (id && !verified) {
    return (
      <section className="page">
        <h1>갤러리 게시글 수정</h1>
        <p className="lead">수정하려면 글쓴이 비밀번호를 입력해 주세요.</p>
        <form className="form" onSubmit={verify}>
          <label>
            글 비밀번호
            <input type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} required />
          </label>
          {verifyError && <p className="note">{verifyError}</p>}
          <div className="row-actions">
            <button className="button primary" type="submit">확인</button>
            <button className="button" type="button" onClick={() => navigate('/gallery')}>목록으로</button>
          </div>
          <p className="note">비밀번호를 잊어버리셨다면 회사에 직접 연락해 주세요. 비밀번호는 복구할 수 없습니다.</p>
        </form>
      </section>
    )
  }

  return (
    <section className="page">
      <h1>{id ? '갤러리 게시글 수정' : '갤러리 글쓰기'}</h1>

      {error && (
        <div className="card">
          <h2>저장하지 못했습니다.</h2>
          <p>Supabase에 skytour_gallery 테이블이나 사진 버킷이 아직 만들어지지 않았을 수 있습니다. SQL과 버킷 설정을 확인한 뒤 다시 시도해 주세요.</p>
          <p className="note">{error}</p>
        </div>
      )}

      <form className="mail-compose" onSubmit={submit}>
        <input
          className="mail-title"
          type="text"
          name="title"
          value={form.title}
          onChange={change}
          placeholder="제목"
          required
        />

        <div className="mail-password-row">
          <label htmlFor="gallery-password">글 비밀번호</label>
          <input
            id="gallery-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={!id}
            minLength={4}
            placeholder={id ? '변경할 때만 입력 (비워두면 기존 유지)' : '수정·삭제 시 필요합니다'}
          />
        </div>

        <textarea
          ref={bodyRef}
          className={`mail-body ${fontLarge ? 'large' : ''}`}
          name="description"
          value={form.description}
          onChange={change}
          placeholder="내용을 입력하세요"
        />

        {showUrl && (
          <input
            className="mail-url"
            type="text"
            name="photo_url"
            value={form.photo_url}
            onChange={change}
            placeholder="사진 URL (https://...)"
          />
        )}

        {(file || form.photo_url) && (
          <div className="mail-photo-preview">
            {file ? (
              <span>첨부된 사진: {file.name}</span>
            ) : (
              <img src={form.photo_url} alt="선택한 사진 미리보기" />
            )}
            <button
              type="button"
              className="button"
              onClick={() => { setFile(null); setForm({ ...form, photo_url: '' }); setShowUrl(false) }}
            >
              사진 제거
            </button>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0] || null)}
        />

        <div className="mail-toolbar">
          <span className="mail-send-group">
            <button className="mail-send" type="submit" disabled={saving}>
              {saving ? '보내는 중...' : '보내기'}
            </button>
            <button
              className="mail-send-arrow"
              type="button"
              aria-label="보내기 옵션"
              onClick={() => setShowSendMenu(!showSendMenu)}
            >
              ▾
            </button>
          </span>
          {showSendMenu && (
            <span className="mail-send-menu">
              <button type="button" onClick={() => navigate('/gallery')}>목록으로</button>
            </span>
          )}
          <button className="mail-icon-btn" type="button" title="글자 크기" onClick={() => setFontLarge(!fontLarge)}>Aa</button>
          <button className="mail-icon-btn" type="button" title="사진 첨부" onClick={() => fileRef.current?.click()}>📎</button>
          <button className="mail-icon-btn" type="button" title="사진 URL" onClick={() => setShowUrl(!showUrl)}>🔗</button>
          <button className="mail-icon-btn" type="button" title="이모지 삽입" onClick={insertEmoji}>😊</button>
          <button className="mail-icon-btn" type="button" title="사진 첨부" onClick={() => fileRef.current?.click()}>🖼️</button>
          <span className="mail-spacer" />
          <button className="mail-icon-btn" type="button" title="작성 취소" onClick={() => navigate('/gallery')}>🗑️</button>
        </div>
      </form>

      <p className="note">
        사진은 Supabase Storage에 저장되고, 글은 Supabase에 저장됩니다.
        비밀번호는 해시로 저장되며, 분실 시 복구할 수 없습니다.
      </p>
    </section>
  )
}
