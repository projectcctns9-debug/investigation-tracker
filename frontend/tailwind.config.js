/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        police: {
          navy: {
            50: '#f0f4f8',
            100: '#d9e2ec',
            200: '#bcccdc',
            300: '#9fb3c8',
            400: '#829ab1',
            500: '#627d98',
            600: '#486581',
            700: '#334e68',
            800: '#102a43',
            900: '#0b1d30',
            950: '#060f1a'
          },
          gold: {
            50: '#fbf8eb',
            100: '#f7edcc',
            200: '#eed996',
            300: '#e3c260',
            400: '#d9ad35',
            500: '#c5951d',
            600: '#a37515',
            700: '#7c5413',
            800: '#5c3d14',
            900: '#422c12'
          },
          maroon: {
            500: '#8b0000',
            700: '#5c0000'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        hindi: ['"Tiro Devanagari Hindi"', 'Noto Sans Devanagari', 'sans-serif']
      }
    },
  },
  plugins: [],
}
