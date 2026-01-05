import type { PageLoad } from './$types'
import type { Post } from '@blog/meta'

export const load: PageLoad = async ({ fetch, params }) => {
  const tag = params.tag
  const posts: Array<Post> = await (await fetch(`/experiments/posts.json`)).json()
  return {
    posts: posts.filter((post: Post) => post.meta.tags.includes(tag)),
    tag
  }
}
