module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          offwhite: '#fdfaf7',
          cream: '#f5f5f0',
          sand: '#e8e2d9',
          rose: '#e5989b',
          black: '#1a1a1a',
          red: '#6d1a1d',
        }
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
}
