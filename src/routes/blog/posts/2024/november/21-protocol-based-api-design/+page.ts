import { loader } from "@blog/meta";
import type { BlogMeta } from "@blog/meta";

export const { load, update } = loader((meta: BlogMeta): BlogMeta => {
  meta.title = "Strong opinions on typing.Protocol";
  meta.published = "November 2024";
  meta.tags = ["static-types", "python", "api-design"];
  meta.tldr =
    "Protocols in Python give us the ability to formally separate the shape of an object from the implementation of that shape.";
  return meta;
});
