import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Editorial base colors
        editorial: {
          black: '#1a1a1a',
          white: '#fafafa',
          gray: '#525252',
        },
        // Bars theme - Cognac (cuivre doré)
        bars: {
          50: '#fdf8f3',
          100: '#f9ede0',
          200: '#f2d9c0',
          300: '#e8c099',
          400: '#d4a06a',
          500: '#b87333',
          600: '#a5672d',
          700: '#8a5626',
          800: '#6e451f',
          900: '#533418',
        },
        // Restaurants theme - Terracotta (terre cuite classique)
        restaurants: {
          50: '#fdf7f4',
          100: '#faece4',
          200: '#f4d6c7',
          300: '#ebbb9f',
          400: '#d99569',
          500: '#c2703a',
          600: '#ae6534',
          700: '#92542c',
          800: '#754424',
          900: '#58331b',
        },
        // Kids theme - Brique (chaleureux, doux)
        kids: {
          50: '#faf6f4',
          100: '#f5ebe6',
          200: '#ead4ca',
          300: '#dbb8a8',
          400: '#c4907a',
          500: '#a65d3f',
          600: '#955438',
          700: '#7c462f',
          800: '#633826',
          900: '#4a2a1d',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;

