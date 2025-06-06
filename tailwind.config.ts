import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'sm': '540px',
        'md': '668px',
        'lg': '924px',
        'xl': '1180px',
        '2xl': '1436px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config 