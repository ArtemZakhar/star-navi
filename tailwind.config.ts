import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      yellow: '#FFE300',
      yellow_hover: '#bbb603',
      yellow_active: '#a7a426',
      primary: '#fff',
      grey_100: '#475569',
      grey_700: '#334155',
      transparent: 'transparent',
    },
    extend: {
      boxShadow: {
        xl: '2px 2px 7px #fff, -2px -2px 7px #fff',
      },
    },
  },
  plugins: [],
};
export default config;
