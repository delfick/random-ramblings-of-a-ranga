/// <reference types="@sveltejs/kit" />

import type { Post } from "@blog/meta";

declare namespace App {
  interface Locals {}

  interface Platform {}

  interface Session {}

  interface Stuff {
    posts: Array<Post>;
  }
}
