import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--fg)",
        primary: "#C71E76",
        grey: "var(--grey)",
        grey2: "var(--grey2)",
        grey3: "var(--grey3)",
        grey4: "var(--grey4)",
        grey5: "var(--grey5)",
        link: "var(--link)",
        secondary: "#f215fa",
        card: "var(--card-bg)", // Custom card background color
      },
      background: {
        DEFAULT: '#fa265b', // Light grey for light mode
        dark: '#fa265b',     // Grey for dark mode
      },
      keyframes: {
        "appear": {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        "slide": {
          from: {
            transform: "translateX(100%)",
          },
          to: {
            transform: "translateX(0%)",
          },
        },
      },
      animation: {
        "appear": "appear 1s ease-in-out",
        "slide": "slide 750ms ease-in-out",
      },
      fontFamily: {
        'custom-mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xxl': '1.375rem',
      },
      spacing: {
        '26': '76px',
      }
    },
  },
  plugins: [],
};
export default config;
