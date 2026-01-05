import adapter from '@sveltejs/adapter-netlify'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

const prod = process.env.NODE_ENV == 'production'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      '@app': 'src/app',
      '@blog': 'src/app/blog',
      '@resume': 'src/app/resume',
      '@assets': 'src/assets'
    },
    csp: {
      mode: prod ? 'hash' : 'auto',
      directives: {
        'base-uri': ['delfick.com'],
        'object-src': ['none'],
        'frame-src': [
          'self',
          'https://twitter.com',
          'platform.twitter.com',
          'syndication.twitter.com',
          'app.netlify.com'
        ],

        'img-src': [
          'self',
          'data:',
          'abs.twimg.com',
          'https://pbs.twimg.com',
          'ton.twimg.com',
          'platform.twitter.com',
          'https://syndication.twitter.com'
        ],
        'script-src': [
          'self',
          'http:',
          'https:',
          'https://cdn.syndication.twimg.com',
          'api.twitter.com',
          'platform.twitter.com',
          'sha256-rwMOiOeVICH7/Cjy5SkreID3OOi5HTrit357k22hUDQ=',
          'sha256-94WxU203ItVdYeuHa4UBPQzWANAxvaHV/BgTnRrE/14='
        ],
        'style-src': [
          'self',
          'unsafe-inline',
          'https://ton.twimg.com',
          'platform.twitter.com',
          'https://cdnjs.cloudflare.com'
        ]
      }
    }
  }
}

export default config
