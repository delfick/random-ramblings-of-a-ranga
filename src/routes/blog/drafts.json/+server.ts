import type { Module } from "@blog/drafts";
import { getter } from "@blog/drafts";

export const GET = async () =>
  new Response(
    JSON.stringify(
      (await getter(import.meta.glob<Module>("../drafts/**/+page.ts"))).body
    ),
    {
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    }
  );
