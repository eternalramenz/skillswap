/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '2xs': '0px',
        'xs': '375px', 
        'sm': '640px', // Small screens
        'md': '768px', // Medium screens
        'lg': '1024px', // Large screens
        'xl': '1280px', // Extra large screens
        '2xl': '1536px', // 2XL screens
        '3xl': '1920px', // 3XL screens
      },
      fontFamily: {
        inter: ['Inter', 'sans'],
        main: ['Euclid Circular B', 'sans']
      },
      colors: {
        Primary: '#0d53fb',
        Secondary: '#0d84fb',
        darkBlue: '#162b4d',
        gray: '#79859a',
        lightGray: '#e2e4e8',
        white1: '#f5f8f9',
        white2: '#e9eaef',
        skyBlue: '#eff4fc',
        textbox: '#fbfbfb',
        card: 'rgba(255,255,255,0.9)',
        error: '#ff5353',
        royalBlue: '#017EFF',

        darkPrimary: '#0560fd',
        black1:'#121314',
        lightBlack: '#1b1b1c',
        darkGray: '#2f3030',
        darkWhite: '#888',
      },
      
    },
  },
  plugins: [
  ],
});