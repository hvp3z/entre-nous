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
          surface: '#F9FAFB',
          surfaceAlt: '#F3F4F6',
        },
        // Orange/Corail gradient palette
        orange: {
          50: '#FFF8F0',
          100: '#FFE4CC',
          200: '#FFC999',
          300: '#FFA866',
          400: '#FF8F33',
          500: '#F97316',
          600: '#E55A0D',
          700: '#CC4A0B',
          800: '#B33A09',
          900: '#992A07',
        },
        coral: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FFC9CD',
          300: '#FFA3AA',
          400: '#FF7D87',
          500: '#FB7185',
          600: '#F43F5E',
          700: '#E11D48',
          800: '#BE123C',
          900: '#9F1239',
        },
        // Bars theme - Orange/Corail
        bars: {
          50: '#FFF8F0',
          100: '#FFE4CC',
          200: '#FFC999',
          300: '#FFA866',
          400: '#FF8F33',
          500: '#F97316',
          600: '#E55A0D',
          700: '#CC4A0B',
          800: '#B33A09',
          900: '#992A07',
        },
        // Restaurants theme - Orange/Corail
        restaurants: {
          50: '#FFF8F0',
          100: '#FFE4CC',
          200: '#FFC999',
          300: '#FFA866',
          400: '#FF8F33',
          500: '#F97316',
          600: '#E55A0D',
          700: '#CC4A0B',
          800: '#B33A09',
          900: '#992A07',
        },
        // Cafes theme - Orange/Corail
        cafes: {
          50: '#FFF8F0',
          100: '#FFE4CC',
          200: '#FFC999',
          300: '#FFA866',
          400: '#FF8F33',
          500: '#F97316',
          600: '#E55A0D',
          700: '#CC4A0B',
          800: '#B33A09',
          900: '#992A07',
        },
        // Kids theme - Orange/Corail
        kids: {
          50: '#FFF8F0',
          100: '#FFE4CC',
          200: '#FFC999',
          300: '#FFA866',
          400: '#FF8F33',
          500: '#F97316',
          600: '#E55A0D',
          700: '#CC4A0B',
          800: '#B33A09',
          900: '#992A07',
        },
      },
      fontFamily: {
        display: ['var(--font-libre-baskerville)', 'serif'],
        sans: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
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

