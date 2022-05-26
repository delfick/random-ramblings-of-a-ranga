import HMR from "@roxi/routify/hmr";
import App from "./App.svelte";

let target = document.getElementById("app");

if (target == null) {
  target = document.createElement("app");
  document.body.appendChild(target);
}

export default HMR(App, { target });
