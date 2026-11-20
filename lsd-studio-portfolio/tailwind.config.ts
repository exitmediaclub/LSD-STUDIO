import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EEEEEC", // latar terang ala referensi
        "paper-dark": "#E2E2DF",
        ink: "#111111",
        muted: "#6B6B6B",
        select: "#2F6BFF", // biru seleksi ala macOS
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "'SF Pro Display'", "'Helvetica Neue'", "Inter", "Arial", "sans-serif"],
        display: ["-apple-system", "BlinkMacSystemFont", "'SF Pro Display'", "'Helvetica Neue'", "Arial Black", "sans-serif"],
        mono: ["'SF Mono'", "ui-monospace", "Menlo", "monospace"],
      },
      boxShadow: {
        window: "0 30px 80px -20px rgba(0,0,0,.35), 0 0 0 1px rgba(0,0,0,.06)",
        icon: "0 6px 16px -4px rgba(0,0,0,.35)",
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
