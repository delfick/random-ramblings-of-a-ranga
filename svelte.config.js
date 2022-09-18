import adapter from "@sveltejs/adapter-netlify";
import preprocess from "svelte-preprocess";

const prod = process.env.NODE_ENV == "production";

export default {
  preprocess: preprocess({ postcss: true }),
  kit: {
    adapter: adapter(),
    alias: {
      "@app": "src/app",
      "@blog": "src/routes/blog/_components",
      "@assets": "src/assets",
    },
    csp: {
      mode: prod ? "hash" : "auto",
      directives: {
        "base-uri": ["delfick.com"],
        "object-src": ["none"],
        "frame-src": [
          "self",
          "https://twitter.com",
          "platform.twitter.com",
          "syndication.twitter.com",
          "app.netlify.com",
        ],

        "img-src": [
          "self",
          "data:",
          "abs.twimg.com",
          "https://pbs.twimg.com",
          "ton.twimg.com",
          "platform.twitter.com",
          "https://syndication.twitter.com",
        ],
        "script-src": [
          "self",
          "http:",
          "https:",
          "https://cdn.syndication.twimg.com",
          "api.twitter.com",
          "platform.twitter.com",
          "sha256-rwMOiOeVICH7/Cjy5SkreID3OOi5HTrit357k22hUDQ=",
        ],
        "style-src": [
          "self",
          "unsafe-inline",
          "https://ton.twimg.com",
          "platform.twitter.com",
          "https://cdnjs.cloudflare.com",
        ],
      },
    },
  },
};
