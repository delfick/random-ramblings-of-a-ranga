import type { PageLoad } from './$types'
import type { Post } from '@blog/meta'

export const load: PageLoad = async ({ fetch, params }) => {
  const posts: Array<Post> = await (await fetch(`/experiments/posts.json`)).json()
  return {
    posts: posts.filter(post =>
      post.path.startsWith(`/experiments/posts/${params.year}/`)
    ),
    year: params.year
  }
}
