import { writable, derived } from "svelte/store";
import type { Theme } from "svelte-dark-mode/types/DarkMode.svelte";

export const theme = writable<Theme>("light");
export const isDark = derived(theme, ($theme) => $theme == "dark");
export const isLight = derived(theme, ($theme) => $theme == "light");
