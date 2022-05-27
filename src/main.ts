import App from "./App.svelte";
import HMR from "@roxi/routify/hmr";

let target = document.getElementById("app");

if (target == null) {
  target = document.createElement("app");
  document.body.appendChild(target);
}

export default HMR(App, { target });
