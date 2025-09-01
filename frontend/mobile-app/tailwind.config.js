/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'poppins-bold': ['Poppins-Bold'],
        'poppins-medium': ['Poppins-Medium'],
        'poppins-regular': ['Poppins-Regular'],
        'poppins-semibold': ['Poppins-SemiBold'],
        'poppins-light': ['Poppins-Light'],
        'manuale-bold': ['Manuale-Bold'],
        'manuale-medium': ['Manuale-Medium'],
        'manuale-regular': ['Manuale-Regular'],
        'manuale-semibold': ['Manuale-SemiBold'],
        'manuale-light': ['Manuale-Light'],
      },
    },
  },
  plugins: [],
}
