import { SUPABASE_URL, SUPABASE_KEY } from './supabase'

// 신규 견적 등록 시 이메일 알림용 Edge Function 호출.
// 알림 실패가 글 등록 자체를 실패시키지 않도록, 실패 시 false만 반환합니다.
export async function notifyInquiry(form) {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/notify-inquiry`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    return res.ok
  } catch {
    return false
  }
}
