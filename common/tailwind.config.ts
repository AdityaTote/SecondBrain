import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: {
          100: "#f7f9fb"
        },
        purple: {
          100: "#dde3ff",
          400: "#6a6ea5",
          500: "#4644dd"
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
