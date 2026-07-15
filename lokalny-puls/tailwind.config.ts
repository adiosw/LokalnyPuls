import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050816",
        primary: "#3B82F6",
        accent: "#6366F1",
        highlight: "#60A5FA",
      },
    },
  },
  plugins: [],
};
export default config;
