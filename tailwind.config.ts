import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        60: "repeat(60, minmax(0, 1fr))",
      },
      colors: {
        primary: "#6366f1",
        glow: "#22d3ee",
      },
    },
  },
  plugins: [],
} satisfies Config;
