/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gradientColorStops: {
        'transparent-black': 'rgba(21, 21, 21, 0)',
      },
    },
  },
  plugins: [require("daisyui")],
}

