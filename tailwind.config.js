import typographyPlugin from '@tailwindcss/typography';

/**
 * @see https://tailwindcss.com/docs/configuration
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'selector',
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '2rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2.5rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }]
    },
    extend: {
      colors: {
        velocity: {
          '50': '#edf8ff',
          '100': '#d8efff',
          '200': '#b9e2ff',
          '300': '#89d2ff',
          '400': '#51b7ff',
          '500': '#2997ff',
          '600': '#1278fe',
          '700': '#0b61ee',
          '800': '#104dbd',
          '900': '#144494',
          '950': '#112b5a'
        }
      },
      maxWidth: {
        '8xl': '88rem'
      }
    }
  },
  plugins: [typographyPlugin]
};
