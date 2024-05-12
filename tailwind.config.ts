import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-green-600",
    "bg-orange-600",
    "bg-red-600",
    "border-green-600",
    "border-orange-600",
    "border-red-600",
    "text-green-600",
    "text-orange-600",
    "text-red-600",
    "bg-green-100",
    "bg-orange-100",
    "bg-red-100",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#37146B",
        background: "#F8F8F8",
        foreground: "#FFFFFF",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
