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
          normal: '#FAA613',
          light: '#FCCA73',
          dark: '#DC8D04',
        },
        secondary: {
          normal: '#047AF1',
          light: '#4AA3FC',
          dark: '#01478D',
        },
        tertiary: {
          normal: '#6D466B',
          light: '#B49FCC',
          dark: '#412234',
        },
        green: {
          normal: '#2FBF71',
          light: '#6BDB9E',
          dark: '#20834D',
        },
        red: {
          normal: '#EF2D56',
          light: '#F35376',
          dark: '#BF0D34',
        },
        light: {
          1: '#F6FEDB',
          2: '#FEF5EF',
          3: '#F2F5FF',
        },
        dark: {
          1: '#352208',
          2: '#1F271B',
          3: '#0A2239',
        },
        white: {
          1: '#FFFFFF',
          2: '#F2F1F0',
          3: '#E6E4E1',
        },
        black: {
          1: '#252422',
          2: '#4A4845',
          3: '#5F5C59',
        },
      },
    },
  },
  plugins: [],
}
