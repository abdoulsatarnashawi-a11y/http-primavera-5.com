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
          DEFAULT: '#0d47a1',
          dark: '#0a2d6e',
          light: '#1976d2',
          glow: '#42a5f5',
        },
        accent: {
          DEFAULT: '#d32f2f',
          dark: '#b71c1c',
          light: '#ef5350',
          glow: '#ff5252',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#0f172a',
          muted: '#f1f5f9',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh': 'linear-gradient(135deg, #0a2d6e 0%, #0d47a1 40%, #1565c0 100%)',
        'hero-overlay': 'linear-gradient(105deg, rgba(10,45,110,0.92) 0%, rgba(13,71,161,0.75) 45%, rgba(211,47,47,0.35) 100%)',
        'cta-gradient': 'linear-gradient(135deg, #b71c1c 0%, #d32f2f 50%, #e53935 100%)',
        'card-shine': 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(25, 118, 210, 0.4)',
        'glow-red': '0 0 30px rgba(211, 47, 47, 0.4)',
        'card': '0 4px 24px rgba(10, 45, 110, 0.12)',
        'card-hover': '0 20px 40px rgba(10, 45, 110, 0.2)',
        'elevated': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-progress': 'slideProgress 5s linear forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'ken-burns': 'kenBurns 8s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(211, 47, 47, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(211, 47, 47, 0.6)' },
        },
        slideProgress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
