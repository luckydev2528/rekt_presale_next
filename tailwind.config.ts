import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          main: 'var(--background-main)',
          section: 'var(--background-section)',
          card: 'var(--background-card)',
          presale: 'var(--background-presale)',
        },
        primary: {
          'deep-purple': 'var(--primary-deep-purple)',
          'bright-purple': 'var(--primary-bright-purple)',
          'electric-blue': 'var(--primary-electric-blue)',
          'hot-pink': 'var(--primary-hot-pink)',
          'vibrant-purple': 'var(--primary-vibrant-purple)',
          'light-purple': 'var(--primary-light-purple)',
        },
        secondary: {
          'lime-green': 'var(--secondary-lime-green)',
          'vibrant-teal': 'var(--secondary-vibrant-teal)',
          'electric-cyan': 'var(--secondary-electric-cyan)',
          teal: 'var(--secondary-teal)',
        },
        accent: {
          'hot-pink': 'var(--accent-hot-pink)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          accent: 'var(--text-accent)',
          highlight: 'var(--text-highlight)',
          'digital-green': 'var(--text-digital-green)',
        },
        utility: {
          success: 'var(--utility-success)',
          warning: 'var(--utility-warning)',
          error: 'var(--utility-error)',
          'glow-purple': 'var(--utility-glow-purple)',
          'glow-cyan': 'var(--utility-glow-cyan)',
          'glow-pink': 'var(--utility-glow-pink)',
        },
      },
      fontFamily: {
        primary: ['var(--font-orbitron)', 'monospace'],
        display: ['var(--font-audiowide)', 'monospace'],
        secondary: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'marquee': 'marquee 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-secondary': 'var(--gradient-secondary)',
        'gradient-button': 'var(--gradient-button)',
        'gradient-progress': 'var(--gradient-progress)',
        'gradient-border': 'var(--gradient-border)',
      },
    },
  },
  plugins: [],
}

export default config
