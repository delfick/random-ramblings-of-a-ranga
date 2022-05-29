import App from "./App.svelte";
import HMR from "@roxi/routify/hmr";

let target = document.getElementById("app");

if (target == null) {
  target = document.createElement("app");
  document.body.appendChild(target);
}

const theme = localStorage.getItem("theme");
if (theme !== null) {
  document.body.className = theme;
}

export default HMR(App, { target });
