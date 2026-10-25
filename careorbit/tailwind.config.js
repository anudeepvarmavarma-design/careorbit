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
          50: '#f0fdf9',
          100: '#ccfbef',
          200: '#99f6df',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        mint: {
          50: '#f4fbf7',
          100: '#e7f7ef',
          200: '#cff0de',
          300: '#a3e1c2',
          400: '#6ecea0',
          500: '#3eb87f',
          600: '#2b9864',
          700: '#237851',
          800: '#1e5f41',
          900: '#1a4f37',
        },
        navy: {
          800: '#1e293b',
          900: '#0f172a',
          950: '#080d1a',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'soft-xl': '0 20px 35px -10px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
