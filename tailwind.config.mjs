/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'custom-inset':
          'inset -1px -1px 1.5px rgba(0, 0, 0, 0.6), inset 1px 1px 1.5px rgba(255, 255, 255, 0.3)'
      }
    }
  },
  plugins: []
}
