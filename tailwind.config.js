/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "body": ["body"]
      }
    },
  },
  plugins: [require('@tailwindcss/forms')({
    strategy: 'base', // only generate global styles
    strategy: 'class', // only generate classes
  }),],
  prefix: "t-"
}
