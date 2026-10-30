import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getGalleryPost, createGalleryPost, updateGalleryPost, uploadGalleryPhoto, hashPassword,
} from '../lib/gallery'

const initial = { title: '', description: '', photo_url: '' }

export default function GalleryWrite() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(initial)
  const [file, setFile] = useState(null)
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
    getGalleryPost(id)
      .then((item) => {
        if (item) {
          setForm({ title: item.title, description: item.description, photo_url: item.photo_url })
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
      <p className="lead">사진과 글을 함께 올려 홍보용 갤러리 게시글을 만듭니다.</p>

      {error && (
        <div className="card">
          <h2>저장하지 못했습니다.</h2>
          <p>Supabase에 skytour_gallery 테이블이나 사진 버킷이 아직 만들어지지 않았을 수 있습니다. SQL과 버킷 설정을 확인한 뒤 다시 시도해 주세요.</p>
          <p className="note">{error}</p>
        </div>
      )}

      <form className="form" onSubmit={submit}>
        <label>
          제목
          <input type="text" name="title" value={form.title} onChange={change} placeholder="예: 단정한 첫인상이 곧 신뢰입니다" required />
        </label>
        <label>
          설명
          <textarea name="description" value={form.description} onChange={change} rows="4" placeholder="사진에 대한 설명, 홍보 문구 등" />
        </label>
        <label>
          사진 파일
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0] || null)} />
        </label>
        {file && <p className="note">선택한 파일: {file.name} (저장 시 업로드됩니다)</p>}
        <label>
          사진 URL (파일 대신 URL을 쓸 때)
          <input type="text" name="photo_url" value={form.photo_url} onChange={change} placeholder="https://..." />
        </label>
        {form.photo_url && !file && (
          <p><img src={form.photo_url} alt="선택한 사진 미리보기" style={{ maxWidth: '100%', borderRadius: 12 }} /></p>
        )}
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
          <button className="button" type="button" onClick={() => navigate('/gallery')}>목록으로</button>
        </div>
        <p className="note">
          사진은 Supabase Storage에 저장되고, 글은 Supabase에 저장됩니다.
          비밀번호는 해시로 저장되며, 분실 시 복구할 수 없습니다.
        </p>
      </form>
    </section>
  )
}
