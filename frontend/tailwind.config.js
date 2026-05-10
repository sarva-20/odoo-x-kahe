/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
      extend: {
          colors: {
              primary: "#ff4500",
              secondary: "#004b57",
              "vivid-coral": "#FF4500",
              "deep-teal": "#004B57",
              "surface-container-lowest": "#ffffff",
              surface: "#fff8f6",
              "on-surface": "#291712",
              "on-background": "#291712",
              background: "#fff8f6",
              "surface-variant": "#fddbd3",
              "on-surface-variant": "#5d4038",
              "outline": "#926f66",
              "primary-container": "#d83900",
              "on-primary": "#ffffff",
              "secondary-container": "#afe9f8",
              "tertiary-container": "#0075d5",
              "tertiary": "#005daa",
              "error-container": "#ffdad6",
              error: "#ba1a1a",
              "on-error-container": "#93000a"
          },
          fontFamily: {
              "body-md": ["Be Vietnam Pro", "sans-serif"],
              "body-lg": ["Be Vietnam Pro", "sans-serif"],
              "body-sm": ["Be Vietnam Pro", "sans-serif"],
              "headline-md": ["Plus Jakarta Sans", "sans-serif"],
              "headline-lg": ["Plus Jakarta Sans", "sans-serif"],
              "display-xl": ["Plus Jakarta Sans", "sans-serif"],
              "label-md": ["Be Vietnam Pro", "sans-serif"],
              "label-bold": ["Plus Jakarta Sans", "sans-serif"]
          },
          spacing: {
              "container-margin-desktop": "64px",
              "container-margin-mobile": "20px",
              "margin-desktop": "64px",
              "margin-mobile": "16px",
              "gutter": "24px",
              "xs": "4px",
              "sm": "12px",
              "md": "24px",
              "lg": "48px",
              "xl": "80px",
              "unit": "8px",
              "base": "8px"
          }
      }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
