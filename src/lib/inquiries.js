import { SUPABASE_URL, SUPABASE_KEY } from './supabase'

const BASE = `${SUPABASE_URL}/rest/v1/skytour_inquiries`

function headers(extra = {}) {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    ...extra,
  }
}

function toDb(form) {
  return {
    use_date: form.date || null,
    people: form.people ? parseInt(form.people, 10) : null,
    region: form.region,
    vehicle: form.vehicle,
    name: form.name,
    contact: form.contact,
    message: form.message || null,
  }
}

function fromDb(row) {
  return {
    id: row.id,
    date: row.use_date || '',
    people: row.people ?? '',
    region: row.region || '',
    vehicle: row.vehicle || '',
    name: row.name || '',
    contact: row.contact || '',
    message: row.message || '',
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

export async function loadInquiries() {
  const res = await check(await fetch(`${BASE}?select=*&order=created_at.desc`, { headers: headers() }))
  const rows = await res.json()
  return rows.map(fromDb)
}

export async function getInquiry(id) {
  const res = await check(await fetch(`${BASE}?id=eq.${id}&select=*`, { headers: headers() }))
  const rows = await res.json()
  return rows[0] ? fromDb(rows[0]) : null
}

export async function createInquiry(form) {
  const res = await check(await fetch(BASE, {
    method: 'POST',
    headers: headers({ Prefer: 'return=representation' }),
    body: JSON.stringify(toDb(form)),
  }))
  const rows = await res.json()
  return fromDb(rows[0])
}

export async function updateInquiry(id, form) {
  const res = await check(await fetch(`${BASE}?id=eq.${id}`, {
    method: 'PATCH',
    headers: headers({ Prefer: 'return=representation' }),
    body: JSON.stringify(toDb(form)),
  }))
  const rows = await res.json()
  return fromDb(rows[0])
}

export async function deleteInquiry(id) {
  await check(await fetch(`${BASE}?id=eq.${id}`, {
    method: 'DELETE',
    headers: headers(),
  }))
}

export function maskContact(contact) {
  if (!contact) return '미입력'
  const digits = contact.replace(/\D/g, '')
  if (digits.length >= 7) return `${digits.slice(0, 3)}-****-${digits.slice(-4)}`
  return `${contact.slice(0, 2)}****`
}
