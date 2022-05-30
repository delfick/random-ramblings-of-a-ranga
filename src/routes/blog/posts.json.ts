import path from "path";
import { EmptyMeta } from "./_components/meta";

export const get = async () => {
  const allPostFiles = import.meta.glob("./posts/*.svelte");
  const iterablePostFiles = Object.entries(allPostFiles);

  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([p, resolver]) => {
      const resolved = await resolver();
      const parsed = path.parse(p);

      if (!resolved.update || parsed.name == "__layout") {
        return;
      }

      const meta = resolved.update(EmptyMeta);

      return {
        meta,
        path: `/blog/${parsed.dir.substring(2)}/${parsed.name}`,
      };
    })
  );

  return {
    body: allPosts.filter((p) => p != null),
  };
};
