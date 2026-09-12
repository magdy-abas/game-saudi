/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saudi: {
          dark: "#082416",
          primary: "#0D3E25",
          emerald: "#125433",
          light: "#1A6F44",
          accent: "#22C55E",
        },
        rughfan: {
          gold: "#C58D38",
          goldLight: "#DFB06C",
          goldDark: "#9A6B22",
          sand: "#F7F3EB",
          sandLight: "#FCFAF6",
          sandDark: "#E8DFCF",
          brown: "#3C2615",
          cream: "#FFFDF9",
        }
      },
      fontFamily: {
        almarai: ['"Almarai"', 'Tajawal', 'system-ui', 'sans-serif'],
        tajawal: ['Tajawal', 'Almarai', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounceSoft 2s infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
