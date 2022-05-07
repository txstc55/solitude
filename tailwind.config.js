module.exports = {
  content: ["./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      spacing: {
        76: '19rem',
        92: '23rem',
        94: '23.5rem',
        128: '32rem',
        160: '40rem',
      },
      animation: {
        tilt: 'tilt 10s infinite linear',
      },
      keyframes: {
        tilt: {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(1deg)',
          },
          '75%': {
            transform: 'rotate(-1deg)',
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}
