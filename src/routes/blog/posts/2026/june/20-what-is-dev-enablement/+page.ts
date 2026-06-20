import { loader } from '@blog/meta'
import type { BlogMeta } from '@blog/meta'

export const { load, _update } = loader((meta: BlogMeta): BlogMeta => {
  meta.title = 'What I think developer enablement actually is'
  meta.published = 'June 2026'
  meta.tags = ['philosophy']
  meta.tldr =
    'I see developer enablement/experience as a company function for helping developers handle distractions rather than specifically about tooling'
  return meta
})
