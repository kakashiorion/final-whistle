/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', 'Poppins', 'Open Sans', 'Helvetica'],
        serif: ['Noto Serif', 'Didot', 'Garamond'],
      },
      colors: {
        primary: {
          normal: '#A56A03',
          light: '#FCCA73',
          dark: '#774D03',
        },
        secondary: {
          normal: '#0373E2',
          light: '#4AA3FC',
          dark: '#01478D',
        },
        tertiary: {
          normal: '#986198',
          light: '#B49FCC',
          dark: '#5D324C',
        },
        green: {
          normal: '#218751',
          light: '#36CE7A',
          dark: '#175E36',
        },
        red: {
          normal: '#E81140',
          light: '#F6849C',
          dark: '#8A0A26',
        },
        light: {
          1: '#FEFBFC',
          2: '#F7FDFA',
          3: '#F6FAFE',
        },
        dark: {
          1: '#290A14',
          2: '#06190E',
          3: '#07151D',
        },
        white: {
          1: '#FFFFFF',
          2: '#E8E8E8',
          3: '#CCCCCC',
          4: '#BBBBBB',
        },
        black: {
          1: '#101010',
          2: '#181818',
          3: '#222222',
          4: '#2F2F2F',
        },
      },
    },
  },
  plugins: [],
}
