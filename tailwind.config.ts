import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F7F6F2',
        surface: '#FFFFFF',
        'text-primary': '#181817',
        'text-secondary': '#6D6964',
        accent: '#D83A73',
        ai: '#7657F6',
        logistics: '#4D78FF',
        success: '#20A176',
        warning: '#F2A63B',
        danger: '#D94B52',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-fraunces)', 'Fraunces', 'Georgia', 'serif'],
      },
      borderRadius: {
        DEFAULT: '10px',
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '20px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(24,24,23,0.06), 0 1px 2px rgba(24,24,23,0.04)',
        elevated: '0 4px 16px rgba(24,24,23,0.08), 0 1px 4px rgba(24,24,23,0.04)',
        modal: '0 16px 48px rgba(24,24,23,0.14), 0 4px 12px rgba(24,24,23,0.08)',
      },
      animation: {
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'draw-path': 'draw-path 2s ease-out forwards',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
