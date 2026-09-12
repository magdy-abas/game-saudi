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
          dark: "#0B3B24",
          primary: "#0F4C2E",
          emerald: "#14613B",
          light: "#1A7547",
          accent: "#22C55E",
        },
        rughfan: {
          gold: "#C58D38",
          goldLight: "#DFB06C",
          goldDark: "#9A6B22",
          sand: "#F7F3EB",
          sandLight: "#FCFAF6",
          sandDark: "#E8DFCF",
          brown: "#432C1A",
          cream: "#FFFDF9",
        }
      },
      fontFamily: {
        readex: ['"Readex Pro"', 'Tajawal', 'system-ui', 'sans-serif'],
        tajawal: ['Tajawal', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounceSoft 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
