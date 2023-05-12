/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        bglight: "url(/images/body-bg.png)",
        bgdark: "url(/images/dark-bg.png)",
      }),
    },
  },
  plugins: [require("flowbite/plugin")],
};
