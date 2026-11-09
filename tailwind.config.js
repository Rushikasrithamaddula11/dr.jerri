/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#f7f4fb',
          100: '#eee8f7',
          200: '#dfd2f0',
          300: '#c7b3e4',
          400: '#a78bd2',
          500: '#8663be',
          600: '#6d48a6',
          700: '#563687',
          800: '#43266b',
          900: '#2e1a55', // Exact Dr. Jerri Logo Primary Violet
          950: '#1a0d33',
        },
        royal: {
          light: '#45277f',
          DEFAULT: '#2e1a55', // Exact Dr. Jerri Logo Brand Purple
          dark: '#1f103b',
          deep: '#140927',
          subtle: '#f5f1fa',
          border: '#e5daf2',
        },
        brandBlue: {
          DEFAULT: '#0153a2', // Exact Dr. Jerri Medical Cross Blue
          dark: '#013e79',
          light: '#166fc4',
          subtle: '#edf5fc',
          border: '#c4dff7',
        },
        brandGreen: {
          DEFAULT: '#00a651', // Exact Dr. Jerri Vitality Heart Green
          dark: '#00823f',
          light: '#05c462',
          subtle: '#eafaf1',
          border: '#b7edce',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
