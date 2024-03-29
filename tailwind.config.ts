import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        mainColor: '#FF395C',
        mainColorHoverStart: '#D90766',
        mainColorMiddle: '#E41C5E',
        mainColorHoverEnd: '#E61F51',
        mainSearchColorStart: '#F52E56',
        mainSearchColorEnd: '#F32B55',
        mainBlack: '#222222',
        mainGray: '#717171',
        navigatorOneLayoutColor: '#EBEBEB',
        navigatorTwoLayoutColor: '#D9D9D9',
        mainHoverColor: '#f7f7f7',
        'transparent-70': 'rgba(255, 255, 255, 0.7)',
        'transparent-90': 'rgba(255, 255, 255, 0.9)',
      },
      aspectRatio: {
        custom: '1.0525', // 여기서 'custom'은 사용자가 원하는 이름으로 변경 가능
      },
    },
  },
  plugins: [],
}
export default config
