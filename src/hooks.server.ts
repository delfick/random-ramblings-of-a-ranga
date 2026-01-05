import type { Handle } from '@sveltejs/kit'
import cookie from 'cookie'

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event)

  if (
    response.headers.get('content-type') === 'text/html' &&
    event.request.url.includes('/blog')
  ) {
    const ck = cookie.parse(event.request.headers.get('cookie') || '')

    if (!ck || (ck.theme != 'light' && ck.theme != 'dark')) {
      return response
    }

    let txt = await response.text()
    txt = txt.replace('<body', `<body class="${ck.theme}"`)
    return new Response(txt, {
      status: response.status,
      headers: response.headers
    })
  }

  return response
}
