import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        maindark: "#ae9460",
        maindarkblur: "#ae9460aa",
        mainlight: "#f7f3e9",
        seclight: "#cdbc9a",
        seclightblur: "#cdbc9a54",
        secdark: "#c2af87",
        anotherLight: "#dfd6c5",
        blackLayer: "#00000073",
      },
      padding: {
        mainX: "10px",
      },
    },
  },
  plugins: [],
} satisfies Config;
