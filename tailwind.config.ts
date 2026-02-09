import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        glow: "#22d3ee",
      },
    },
  },
  plugins: [],
} satisfies Config;
