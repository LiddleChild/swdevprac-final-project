/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "ci-green": "#15B69B",
        "ci-gray": "#EAEAEA",
      },
    },
  },
  plugins: [],
};
