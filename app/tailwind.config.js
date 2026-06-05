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
        // Client design-system tokens. Components and mockups may customize these.
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
        // Stable Gallery shell tokens. Do not customize these for client themes.
        'gallery-primary': {
          50: '#f7f7f8',
          100: '#eeeeef',
          200: '#d9d9dc',
          300: '#b5b5ba',
          400: '#8a8a91',
          500: '#5f5f66',
          600: '#3f3f46',
          700: '#27272a',
          800: '#18181b',
          900: '#09090b',
        },
        'gallery-background': {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
        },
        'gallery-text': {
          50: '#09090b',
          100: '#3f3f46',
          200: '#71717a',
        },
      },
    },
  },
  plugins: [],
}
