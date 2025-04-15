/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}", // Make sure .tsx files are included
  ],
  theme: {
    extend: {
      colors: {
        "nav-bg": "#f6f6f6",
        "task-bg": "#f6f6f6",
        "task-bg-hover": "#d9d9d9",
        "button-bg": "#d9d9d9",
        "button-bg-hover": "#bdbdbd",
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};