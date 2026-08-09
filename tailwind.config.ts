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
        primary: {
          DEFAULT: '#0c2340',
          dark: '#071525',
          light: '#1a3a5c',
        },
        accent: {
          DEFAULT: '#8b1a1a',
          dark: '#5c1010',
          light: '#a52a2a',
        },
      },
    },
  },
  plugins: [],
};
export default config;
