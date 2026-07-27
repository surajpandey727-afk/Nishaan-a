import type { Config } from 'tailwindcss'

/**
 * NISHAAN-A — design tokens
 * Every colour below is either a locked brand value or derived from Ox Blood.
 * No hue is introduced that does not exist in the brand palette.
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Locked */
        ox: {
          DEFAULT: '#3E000C', // Ox Blood — page background
          deep: '#2C0008', // recessed surfaces, footer
          raise: '#4A0812', // cards, hover
          raise2: '#571120', // pressed, active
        },
        ivory: {
          DEFAULT: '#F7EFEC', // primary text
          mark: '#FDFEEC', // the marks' own ivory — never recoloured
        },
        /* Derived, semantic */
        line: 'rgb(247 239 236 / 0.13)',
        'line-strong': 'rgb(247 239 236 / 0.26)',
        muted: 'rgb(247 239 236 / 0.66)',
        subtle: 'rgb(247 239 236 / 0.44)',
        faint: 'rgb(247 239 236 / 0.28)',
      },
      fontFamily: {
        sans: ['var(--font-avantgarde)', 'Century Gothic', 'Avant Garde', 'URW Gothic', 'sans-serif'],
      },
      fontSize: {
        eyebrow: ['0.68rem', { lineHeight: '1.5', letterSpacing: '0.24em' }],
        caption: ['0.78rem', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.7' }],
        lead: ['clamp(1.02rem,1.35vw,1.28rem)', { lineHeight: '1.62' }],
        h3: ['clamp(1.15rem,1.7vw,1.4rem)', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        h2: ['clamp(2rem,4.3vw,3.5rem)', { lineHeight: '0.98', letterSpacing: '-0.028em' }],
        h1: ['clamp(2.9rem,7.6vw,6.6rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
      },
      spacing: {
        gutter: 'clamp(22px,5vw,88px)',
        section: 'clamp(48px,6.5vw,98px)',
      },
      maxWidth: { shell: '1320px', measure: '56ch', lede: '52ch' },
      borderRadius: { pill: '999px', card: '3px' },
      boxShadow: {
        raise: '0 30px 80px -40px rgb(0 0 0 / 0.85)',
        focus: '0 0 0 1.5px #F7EFEC',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.22,1,0.36,1)',
        exit: 'cubic-bezier(0.4,0,1,1)',
      },
      transitionDuration: { fast: '220ms', base: '450ms', slow: '1000ms', reveal: '1100ms' },
      keyframes: {
        'sweep': {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(220%)' },
        },
      },
      animation: { sweep: 'sweep 1.6s cubic-bezier(0.22,1,0.36,1) forwards' },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
