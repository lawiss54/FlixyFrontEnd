/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
    darkMode: ["class"],
    content: [
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
      "./index.html",
      "./src/**/**/**/**/**/**/**/**.{ts,tsx,js,jsx}",
  ],
  theme: {
    screens: {
        'xs': '0px',        // Extra Small Devices
        'sm': '576px',      // Small Devices
        'md': '768px',      // Medium Devices
        'lg': '992px',      // Large Devices
        'xl': '1200px',     // Extra Large (الافتراضي)
      },
  	extend: {
  	  
      keyframes: {
        jump7456: {
          '0%': { transform: 'translateY(0) rotate(0)' },
          '25%': { transform: 'translateY(9px) rotate(22.5deg)' },
          '50%': { transform: 'translateY(18px) scale(1, .9) rotate(45deg)' },
          '75%': { transform: 'translateY(9px) rotate(67.5deg)' },
          '100%': { transform: 'translateY(0) rotate(90deg)' },
        },
        shadow324: {
          '0%, 100%': { transform: 'scale(1, 1)' },
          '50%': { transform: 'scale(1.2, 1)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        'jump7456': 'jump7456 1s ease-in-out infinite',
        'shadow324': 'shadow324 1.5s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
      },
  	  boxShadow: {
        myShadow1: "4.1px -5px 0 0 rgb(221, 228, 239)",
        myShadow2: "-4.1px -5px 0 0 rgb(221, 228, 239)",
      },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
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
  		}
  	},
  	fontFamily: {
  	  "primary": ["Gabarito", "serif"],
  	},
  },
  plugins: [
    require("tailwindcss-animate"),
    
    nextui(),
  ],
}

