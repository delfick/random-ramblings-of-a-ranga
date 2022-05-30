/// <reference types="@sveltejs/kit" />
import type { BlogMeta } from "../_components/meta";

declare namespace App {
  interface Locals {}

  interface Platform {}

  interface Session {}

  interface Stuff {
    meta: BlogMeta;
  }
}
