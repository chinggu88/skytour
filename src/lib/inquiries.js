const KEY = 'skytour-inquiries'

export function loadInquiries() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveInquiries(list) {
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function getInquiry(id) {
  return loadInquiries().find((item) => item.id === id)
}
