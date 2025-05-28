/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-sans)',
      },
      colors: {
        // Colores basados en el logo de Publinetix
        primary: {
          50: '#f0fdff',
          100: '#ccf7fe',
          200: '#99eefd',
          300: '#5ddefa',
          400: '#22c8f0',
          500: '#0891b2', // Color principal del logo (tix)
          600: '#0e7490',
          700: '#155e75',
          800: '#164e63',
          900: '#083344',
          950: '#042f2e',
        },
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7', // Púrpura del gradiente
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Azul del gradiente
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626', // Negro del logo
          900: '#171717',
          950: '#0a0a0a',
        },
        // Mantener colores existentes para compatibilidad
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(8, 51, 68, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(8, 51, 68, 0.1), 0 1px 2px 0 rgba(8, 51, 68, 0.06)',
        'md': '0 4px 6px -1px rgba(8, 51, 68, 0.1), 0 2px 4px -1px rgba(8, 51, 68, 0.06)',
        'lg': '0 10px 15px -3px rgba(8, 51, 68, 0.1), 0 4px 6px -2px rgba(8, 51, 68, 0.05)',
        'xl': '0 20px 25px -5px rgba(8, 51, 68, 0.1), 0 10px 10px -5px rgba(8, 51, 68, 0.04)',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'draw-line': 'draw-line 2s ease-out forwards',
        'grow-up': 'grow-up 0.8s ease-out forwards',
        'grow-right': 'grow-right 0.8s ease-out forwards',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0ea5e9 0%, #0891b2 50%, #a855f7 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #22c8f0 0%, #5ddefa 100%)',
        'gradient-accent': 'linear-gradient(135deg, #a855f7 0%, #c084fc 100%)',
      },
    },
  },
  plugins: [],
};