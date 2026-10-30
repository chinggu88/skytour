// Supabase Edge Function: 신규 견적 문의 이메일 알림
// 배포: supabase functions deploy notify-inquiry
// 시크릿: supabase secrets set RESEND_API_KEY=... NOTIFY_TO=chinggu88@gmail.com
// Resend 무료 onboarding 발신자(onboarding@resend.dev)는 계정 소유자 메일로만 발송됩니다.

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    })
  }
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const body = await req.json().catch(() => ({}))
  const to = Deno.env.get('NOTIFY_TO') || 'chinggu88@gmail.com'
  const apiKey = Deno.env.get('RESEND_API_KEY')
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'RESEND_API_KEY not set' }), { status: 500 })
  }

  const rows: Array<[string, string]> = [
    ['지역', body.region || '미입력'],
    ['이용 날짜', body.date || '미정'],
    ['인원', body.people ? `${body.people}명` : '미입력'],
    ['희망 차종', body.vehicle || '미입력'],
    ['이름', body.name || '미입력'],
    ['연락처', body.contact || '미입력'],
    ['요청 사항', body.message || '-'],
  ]
  const list = rows.map(([k, v]) => `<li><strong>${k}:</strong> ${escapeHtml(String(v))}</li>`).join('')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'SkyTour <onboarding@resend.dev>',
      to: [to],
      subject: `[스카이투어 견적 문의] ${body.region || '지역 미입력'} · ${body.date || '날짜 미정'}`,
      html: `<h2>새 견적 문의가 등록되었습니다.</h2><ul>${list}</ul><p>Supabase 대시보드 skytour_inquiries 테이블에서도 확인할 수 있습니다.</p>`,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    return new Response(JSON.stringify({ error: text }), { status: 502 })
  }
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  })
})
