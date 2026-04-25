import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: 'var(--color-brand-red)',
          'red-hover': 'var(--color-brand-red-hover)',
          'red-light': 'var(--color-brand-red-light)',
          navy: 'var(--color-brand-navy)',
          'navy-medium': 'var(--color-brand-navy-medium)',
          slate: 'var(--color-brand-slate)',
          orange: 'var(--color-brand-orange)',
        },
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
          card: 'var(--color-bg-card)',
          'card-hover': 'var(--color-bg-card-hover)',
          hero: 'var(--color-bg-hero)',
          footer: 'var(--color-bg-footer)',
          overlay: 'var(--color-bg-overlay)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
          accent: 'var(--color-text-accent)',
          hero: 'var(--color-text-hero)',
        },
        border: {
          default: 'var(--color-border-default)',
          light: 'var(--color-border-light)',
          focus: 'var(--color-border-focus)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
} satisfies Config
