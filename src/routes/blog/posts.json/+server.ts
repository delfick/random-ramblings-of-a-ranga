import type { Module } from "@blog/posts";
import { getter } from "@blog/posts";

export const GET = async () =>
  new Response(
    JSON.stringify(
      (await getter("blog", import.meta.glob<Module>("../posts/**/+page.ts")))
        .body
    ),
    {
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    }
  );
