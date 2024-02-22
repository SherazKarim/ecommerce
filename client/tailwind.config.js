/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      clipPath: {
        'polygon': 'polygon(0 10%, 50% 100%, 100% 11%)',
      },
    },
  },
  animation: {
    shine: "shine 1s",
  },
  keyframes: {
    shine: {
      "100%": { left: "125%" },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}