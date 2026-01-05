import { loader } from '@blog/meta'
import type { BlogMeta } from '@blog/meta'

export const { load, _update } = loader((meta: BlogMeta): BlogMeta => {
  meta.title = 'Evolving a Software Janitor mindset'
  meta.published = 'January 2026'
  meta.tags = ['philosophy', 'social']
  meta.tldr =
    'Is this a blog post or a diary entry? In this post I continue my trend of a yearly post. In this one I ramble about the social aspects of developer experience in a large Python codebase and what that means for the next step in my career.'
  return meta
})
