/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          900: '#0b0c10',
          800: '#1f2833',
          700: '#2c353f',
        },
        background: 'rgb(var(--background-rgb) / <alpha-value>)',
        foreground: 'rgb(var(--foreground-rgb) / <alpha-value>)',
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        border: 'rgb(var(--border-rgb) / <alpha-value>)',
        card: 'rgb(var(--card-rgb) / <alpha-value>)',
        secondary: 'rgb(var(--secondary-rgb) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--muted-foreground-rgb) / <alpha-value>)',
        'card-foreground': 'rgb(var(--card-foreground-rgb) / <alpha-value>)',
        popover: 'rgb(var(--popover-rgb) / <alpha-value>)',
        'popover-foreground': 'rgb(var(--popover-foreground-rgb) / <alpha-value>)',
        primary: 'rgb(var(--primary-rgb) / <alpha-value>)',
        'primary-foreground': 'rgb(var(--primary-foreground-rgb) / <alpha-value>)',
        'secondary-foreground': 'rgb(var(--secondary-foreground-rgb) / <alpha-value>)',
        muted: 'rgb(var(--muted-rgb) / <alpha-value>)',
        'accent-foreground': 'rgb(var(--accent-foreground-rgb) / <alpha-value>)',
        destructive: 'rgb(var(--destructive-rgb) / <alpha-value>)',
        'destructive-foreground': 'rgb(var(--destructive-foreground-rgb) / <alpha-value>)',
        input: 'rgb(var(--input-rgb) / <alpha-value>)',
        ring: 'rgb(var(--ring-rgb) / <alpha-value>)',
        'chart-1': 'rgb(var(--chart-1-rgb) / <alpha-value>)',
        'chart-2': 'rgb(var(--chart-2-rgb) / <alpha-value>)',
        'chart-3': 'rgb(var(--chart-3-rgb) / <alpha-value>)',
        'chart-4': 'rgb(var(--chart-4-rgb) / <alpha-value>)',
        'chart-5': 'rgb(var(--chart-5-rgb) / <alpha-value>)',
        'oklab-gray': 'oklab(0.686218 0.0000311732 0.0000137091 / 0.6)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.brand'),
              '&:hover': {
                color: theme('colors.brand'),
                filter: 'brightness(1.2)',
              },
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.gray.100'),
            },
            h3: {
              color: theme('colors.gray.200'),
            },
            strong: {
              color: theme('colors.white'),
            },
            code: {
              color: theme('colors.gray.300'),
              backgroundColor: theme('colors.obsidian.800'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
