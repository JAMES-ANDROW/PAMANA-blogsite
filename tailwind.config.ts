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
        // Heritage-inspired palette
        'heritage': {
          'dark-brown': '#3d2817',
          'brown': '#6b4423',
          'beige': '#e8dcc8',
          'gold': '#c9a961',
          'forest': '#2d5016',
          'light-beige': '#f5f1e8',
        }
      },
      fontFamily: {
        'serif': ['Georgia', 'Garamond', 'serif'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      spacing: {
        'safe': 'clamp(1rem, 5vw, 2rem)',
      }
    },
  },
  plugins: [],
}
export default config
