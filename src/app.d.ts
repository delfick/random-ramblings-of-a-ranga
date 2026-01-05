/// <reference types="@sveltejs/kit" />
import type { Post, Meta } from '@blog/meta'

declare namespace App {
  interface Locals {}

  interface Platform {}

  interface Session {}

  interface PageData {
    tag: string
    base: string
    posts: Array<Post>
    meta: Meta
    pathname: string
  }
}
