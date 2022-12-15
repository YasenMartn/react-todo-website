/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-1': '#646681',
        'black-2': '#585858',
        'purple-1': '#646ff0',
        'gray-1': '#cccdde',
        'gray-2': '#dedfe1',
        'dark': '#0f172a',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
  important: true,
}