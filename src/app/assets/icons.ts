import Moon from "@assets/moon.svg";
import Sun from "@assets/sun.svg";
import { writable } from "svelte/store";

const empty = '<span width="24px" height="24px">i</span>';
export const cachedsvg = writable<SVG>({ sun: empty, moon: empty });

export declare interface SVG {
  sun: string;
  moon: string;
}

export const ready = new Promise((resolve) => {
  const makeUrl = (path: string) => {
    // ssg is annoying and requires an absolute path
    try {
      if (window.location.hostname == "jsdom.ssr") {
        return `http://localhost:4213/${path}`;
      } else {
        return path;
      }
    } catch (e) {
      return `http://localhost:4213/${path}`;
    }
  };

  const getTxt = async (path: string): Promise<string> => {
    const res = await fetch(makeUrl(path));
    const txt = await res.text();
    if (res.ok) {
      return txt;
    } else {
      throw new Error(txt);
    }
  };
  const hidden_sun = document.getElementById("hidden-sun-svg");
  const hidden_moon = document.getElementById("hidden-moon-svg");

  const retrieve = () => {
    const getIcons = async () => [await getTxt(Sun), await getTxt(Moon)];
    void getIcons().then((info) => {
      hidden_sun.outerHTML = info[0];
      hidden_moon.outerHTML = info[1];
      cachedsvg.set({ sun: info[0], moon: info[1] });
      resolve();
    });
  };

  if (window.location.hostname == "jsdom.ssr") {
    retrieve();
  } else {
    if (hidden_sun.innerHTML == "") {
      retrieve();
    } else {
      cachedsvg.set({
        sun: hidden_sun.outerHTML,
        moon: hidden_moon.outerHTML,
      });
      resolve();
    }
  }
});
