/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#14B8A6',
          DEFAULT: '#0D9488',
          dark: '#0F766E',
        },
        secondary: {
          light: '#FB923C',
          DEFAULT: '#F97316',
          dark: '#EA580C',
        },
        accent: '#1E40AF',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
