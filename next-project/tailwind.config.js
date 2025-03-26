/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Frank Ruhl Libre', 'serif'], 
      },
      screens: {
        'sm': '640px', 
        'md': '768px', 
        'lg': '1024px', 
        'xl': '1280px',
        '2xl': '1536px', 
      },
      maxWidth: {
        '8xl': '1400px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};