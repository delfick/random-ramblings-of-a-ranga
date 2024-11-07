import { page } from "$app/stores";
import Cookies from "js-cookie";
import type { Theme } from "svelte-dark-mode/types/DarkMode.svelte";
import { writable, derived } from "svelte/store";

const val: Theme = (Cookies.get("theme") || "light") as Theme;
export const theme = writable<Theme>(val);
export const isDark = derived(theme, ($theme) => $theme == "dark");
export const isLight = derived(theme, ($theme) => $theme == "light");
export const changeableTheme = derived(page, ($page) =>
    $page.url.pathname.includes("/blog")
);
