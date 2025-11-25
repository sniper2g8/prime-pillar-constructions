import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5fa',
          100: '#d9e4ef',
          200: '#b3c9df',
          300: '#8daecf',
          400: '#4d7ba8',
          500: '#1a3a5c',
          600: '#162f4a',
          700: '#112438',
          800: '#0d1926',
          900: '#080d14',
        },
        secondary: {
          50: '#f5f7f9',
          100: '#e8ecf0',
          200: '#d1d9e1',
          300: '#a8b7c5',
          400: '#7f94a6',
          500: '#5a7186',
          600: '#485a6b',
          700: '#364350',
          800: '#242d36',
          900: '#12161b',
        },
        accent: {
          400: '#fbbf24',
          500: '#d69e2e',
          600: '#b45309',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        }
      },
    },
  },
  plugins: [],
};

export default config;