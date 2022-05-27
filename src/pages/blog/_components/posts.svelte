<script lang="ts">
  import { ClientNodeApi } from "./post";
  import { layout } from "@roxi/routify";

  let posts: Array<ClientNodeApi> = [];

  let traverse = (node: ClientNodeApi) => {
    for (let n of node.children) {
      if (n.__file.isDir) {
        traverse(n);
      } else {
        if (n.path.startsWith("/blog/posts/")) {
          posts.push(n);
        }
      }
    }
    posts = posts;
  };

  $: if ($layout) {
    (posts = []), traverse($layout);
  }
</script>

<slot {posts} />
