import { writable } from "svelte/store";

export const started = writable<boolean>(false);
