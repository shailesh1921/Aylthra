/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0a0a0a',
          dark: '#1a1a1a',
          gray: '#6b7280',
          light: '#f5f5f5',
          cream: '#faf9f7',
          accent: '#c9a96e',
          'accent-hover': '#b8944f',
        }
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      }
    }
  },
  plugins: []
}
