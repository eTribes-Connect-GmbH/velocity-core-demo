import type { Config } from 'tailwindcss';
import tailwindForms from '@tailwindcss/forms';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {},
  plugins: [tailwindForms]
} satisfies Config;
