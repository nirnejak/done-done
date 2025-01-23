import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          "2xl": "980px",
        },
      },
      boxShadow: {
        heavy:
          "0 1px 1px 0.5px rgba(41, 41, 41, 0.04), 0 3px 3px -1.5px rgba(41, 41, 41, 0.02), 0 6px 6px -3px rgba(41, 41, 41, 0.04), 0 12px 12px -6px rgba(41, 41, 41, 0.04), 0 24px 24px -12px rgba(41, 41, 41, 0.04), 0 48px 48px -24px rgba(41, 41, 41, 0.04), 0 0 0 1px rgba(41, 41, 41, 0.04), inset 0 -1px 1px -0.5px rgba(51, 51, 51, 0.06)",
      },
    },
    fontFamily: {
      sans: ["var(--sans-font)"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}

export default config
