export function formatDate(date) {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export function formatNumber(value) {
  return Number(value).toLocaleString('ko-KR')
}
