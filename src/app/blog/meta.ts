import type { Load } from '@sveltejs/kit'
import { writable } from 'svelte/store'

export declare interface BlogMeta {
  title: string
  tldr: string
  author: string
  tags: Array<string>
  published: string
}

export declare interface Post {
  meta: BlogMeta
  date: Date
  path: string
}

export const EmptyMeta = {
  title: 'A blog',
  tldr: 'Forgot to add meta to this post',
  author: 'Stephen Moore',
  published: 'the past',
  tags: ['forgot-meta']
}

export const meta = writable({ ...EmptyMeta })

export declare type BlogMetaUpdater = (m: BlogMeta) => BlogMeta

export declare interface LoadExports {
  load: Load
  _update: BlogMetaUpdater
}

export const loader = (updater: BlogMetaUpdater): LoadExports => {
  const _update = (meta: BlogMeta): BlogMeta => {
    return updater(meta)
  }

  const load = async () => {
    const m = { ...EmptyMeta }
    _update(m)
    meta.update(() => m)
    return { props: { meta: m } }
  }

  return { _update, load }
}
