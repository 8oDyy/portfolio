import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: "#f5f2ec",
        ink: "#0e0e0e",
        pollen: "#e8ff00",
        muted: "#6b6864",
        subtle: "#a09b94",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "SF Mono", "monospace"],
      },
      animation: {
        "marquee": "marquee 45s linear infinite",
        "marquee-slow": "marquee 90s linear infinite",
        "drift": "drift 14s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(10px, -14px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
