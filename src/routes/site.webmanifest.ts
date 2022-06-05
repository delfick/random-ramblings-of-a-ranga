import Icon192 from "@assets/android-chrome-192x192.png";
import Icon512 from "@assets/android-chrome-512x512.png";
import AppleTouchIcon from "@assets/apple-touch-icon.png";
import Icon16 from "@assets/favicon-16x16.png";
import Icon32 from "@assets/favicon-32x32.png";
import Icon from "@assets/favicon.ico";

const manifest = {
  name: "Stephen Moore's personal website",
  short_name: "Random Ramblings of a Ranga",
  icons: [
    { src: Icon, type: "image/ico" },
    { src: Icon32, type: "image/png", sizes: "32x32" },
    { src: Icon16, type: "image/png", sizes: "16x16" },
    { src: Icon192, type: "image/png", sizes: "192x192" },
    { src: Icon512, type: "image/png", sizes: "512x512" },
    { src: AppleTouchIcon, type: "image/png", sizes: "180x180" },
  ],
  theme_color: "#ffffff",
  background_color: "#ffffff",
  display: "standalone",
};

export const get = async () => ({
  status: 200,
  body: manifest,
  headers: { "Content-Type": "application/json" },
});
