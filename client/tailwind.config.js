/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        krishi: {
          green: '#1b5e20',
          lightgreen: '#4caf50',
          accent: '#81c784',
          yellow: '#fbc02d',
          brown: '#5d4037',
          dark: '#121212',
          card: '#1e293b'
        }
      }
    },
  },
  plugins: [],
}
