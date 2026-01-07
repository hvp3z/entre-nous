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
        // Bars theme - warm amber/copper
        bars: {
          50: '#fef7ee',
          100: '#fcecd6',
          200: '#f8d5ac',
          300: '#f3b878',
          400: '#ed9042',
          500: '#e8751d',
          600: '#d95b13',
          700: '#b44312',
          800: '#903617',
          900: '#742f15',
        },
        // Restaurants theme - rich burgundy
        restaurants: {
          50: '#fdf2f4',
          100: '#fce7eb',
          200: '#f9d0db',
          300: '#f4aabe',
          400: '#ec7a9b',
          500: '#df507a',
          600: '#cb3062',
          700: '#ab2352',
          800: '#8e214a',
          900: '#791f44',
        },
        // Kids theme - playful blue-green
        kids: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
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

