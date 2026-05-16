/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx"
  ],
  theme: {
    extend: {
      colors: {
          gold: {
              DEFAULT: '#00A36C', // Verde Metalizado (mantido o nome 'gold' nas classes)
              light: '#50C878',
              dark: '#007A4B',
          },
          background: '#050505',
          surface: '#121212',
          'surface-light': '#1e1e1e',
          whatsapp: '#25D366',
      },
      fontFamily: {
          heading: ['Archivo Black', 'sans-serif'],
          sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
