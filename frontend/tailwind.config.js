module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'wave-pattern': 'url(/360_F_626577500_SkdU1LpQsy5pdQTp17DU8no8SsFoiPnD.jpg)', // Path to your image
      },
      clipPath: {
        'wave': 'polygon(100% 0, 100% 90%, 0 100%, 0 0)' // Define wave shape
      },
      keyframes: {
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        wave: 'wave 20s linear infinite',
      },
    },
  },
  plugins: [],
}
