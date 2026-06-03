/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    files: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "../client-design-system/**/*.{js,ts,jsx,tsx}",
    ],
  },
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        background: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
        },
        text: {
          50: '#0f172a',
          100: '#334155',
          200: '#475569',
        },
      },
    },
  },
  plugins: [],
}
