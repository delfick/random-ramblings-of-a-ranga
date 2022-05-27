import App from "./App.svelte";
import HMR from "@roxi/routify/hmr";
import { SvelteComponent as Component } from "svelte";

let target = document.getElementById("app");

if (target == null) {
  target = document.createElement("app");
  document.body.appendChild(target);
}

interface WrapComponent {
  (c: typeof App, options: unknown): Component;
}

export default (HMR as WrapComponent)(App, { target });
