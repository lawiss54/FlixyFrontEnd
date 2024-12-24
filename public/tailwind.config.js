// tailwind.config.js
//const flowbite = require("flowbite-react/tailwind");
const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    //flowbite.content(),
    "./index.html",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
  theme: {
    
  	extend: {
  			buttonMain: '#FBBF24',
  			textOne: '#334155',
        blueFiroziP: '#0EA5E9',
        blueFiroziD: {
          100: "#CEFBFD",
          200: "#9DF2FC",
          300: "#6CDFF8",
          400: "#47C8F1",
          500: "#0EA5E9",
          600: "#0A80C8",
          700: "#0760A7",
          800: "#044487",
          900: "#02316F",
        },
        greenSuccess: "#7EE038",
        greenSuccessD: {
          100: "#EFFDD7",
          200: "#DCFBB0",
          300: "#C1F587",
          400: "#A6EC67",
          500: "#7EE038",
          600: "#5FC028",
          700: "#44A11C",
          800: "#2D8111",
          900: "#1C6B0A",
        },
        blueInfo: '#3DB7FF',
        blueInfoD: {
          100: "#D8FAFF",
          200: "#B1F0FF",
          300: "#8AE2FF",
          400: "#6DD1FF",
          500: "#3DB7FF",
          600: "#2C8FDB",
          700: "#1E6CB7",
          800: "#134C93",
          900: "#0B367A",
        },
        orangeWarning: "#FC9F00",
        orangeWarningD: {
          100: "#FEF3CB",
          200: "#FEE498",
          300: "#FED165",
          400: "#FDBE3F",
          500: "#FC9F00",
          600: "#D88000",
          700: "#B56400",
          800: "#924B00",
          900: "#783A00",
        },
        redDenger: "#FF572D",
        redDengerD: {
          100: "#FFE0D3",
          200: "#FFBBA8",
          300: "#FF8D7C",
          400: "#FF625C",
          500: "#FF2631",
          600: "#DB1B36",
          700: "#B71338",
          800: "#930C37",
          900: "#7A0736"
        }
  		},
  	animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			"caret-blink": "caret-blink 1.25s ease-out infinite",
  		}
  	},
  plugins: [
    require('@tailwindcss/forms'),
    require("tailwindcss-animate"),
    nextui()
  ]
};