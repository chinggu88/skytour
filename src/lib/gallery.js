import { SUPABASE_URL, SUPABASE_KEY } from './supabase'
import { hashPassword } from './inquiries'

export { hashPassword }

const BASE = `${SUPABASE_URL}/rest/v1/skytour_gallery`
const BUCKET = 'skytour-gallery'

function headers(extra = {}) {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    ...extra,
  }
}

function toDb(form, passwordHash) {
  const row = {
    title: form.title,
    description: form.description || null,
    photo_url: form.photo_url || null,
  }
  if (passwordHash) row.password_hash = passwordHash
  return row
}

function fromDb(row) {
  return {
    id: row.id,
    title: row.title || '',
    description: row.description || '',
    photo_url: row.photo_url || '',
    password_hash: row.password_hash || null,
    createdAt: row.created_at,
  }
}

async function check(res) {
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Supabase 오류 (${res.status}): ${body}`)
  }
  return res
}

export async function loadGalleryPosts() {
  const res = await check(await fetch(`${BASE}?select=*&order=created_at.desc`, { headers: headers() }))
  const rows = await res.json()
  return rows.map(fromDb)
}

export async function getGalleryPost(id) {
  const res = await check(await fetch(`${BASE}?id=eq.${id}&select=*`, { headers: headers() }))
  const rows = await res.json()
  return rows[0] ? fromDb(rows[0]) : null
}

export async function createGalleryPost(form, passwordHash) {
  const res = await check(await fetch(BASE, {
    method: 'POST',
    headers: headers({ Prefer: 'return=representation' }),
    body: JSON.stringify(toDb(form, passwordHash)),
  }))
  const rows = await res.json()
  return fromDb(rows[0])
}

export async function updateGalleryPost(id, form, passwordHash) {
  const res = await check(await fetch(`${BASE}?id=eq.${id}`, {
    method: 'PATCH',
    headers: headers({ Prefer: 'return=representation' }),
    body: JSON.stringify(toDb(form, passwordHash)),
  }))
  const rows = await res.json()
  return fromDb(rows[0])
}

export async function deleteGalleryPost(id) {
  await check(await fetch(`${BASE}?id=eq.${id}`, {
    method: 'DELETE',
    headers: headers(),
  }))
}

// Supabase Storage 공개 버킷에 사진을 올리고 공개 URL을 반환합니다.
// 버킷(skytour-gallery)은 대시보드 Storage에서 미리 만들어야 합니다.
export async function uploadGalleryPhoto(file) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const path = `${Date.now()}-${safeName}`
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': file.type || 'application/octet-stream',
      'x-upsert': 'true',
    },
    body: file,
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`사진 업로드 실패 (${res.status}): ${body}`)
  }
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`
}
