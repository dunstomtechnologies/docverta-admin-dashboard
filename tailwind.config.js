/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        navy: {
          800: '#111b33',
          900: '#0b1329',
          950: '#070c1b',
        },
        cardPastel: {
          blue: '#eef4ff',
          green: '#ecfdf5',
          purple: '#f3e8ff',
          amber: '#fff7ed',
          rose: '#fff1f2',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        subtle: '0 2px 10px 0 rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
