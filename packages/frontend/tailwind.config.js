/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      theme: {
        fontFamily: {
          sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
          hacen: ["Hacen", ...defaultTheme.fontFamily.sans],
        },
      },
      screens: {
        xs: "320px",
        "3xl": "1700px",
        "4xl": "1920px",
        ...defaultTheme.screens,
      },
      colors: {
        primary: "#751813",
        secondary: "#FDE7D9",
        "background-primary": "#F9D3C8",
        "background-secondary": "#FFEEE1",
        "background-tertiary": "#FEE2CF",
        "body-primary": "#871B2A",
        "body-secondary": "#ACACAC",
      },
      fontSize: {
        "responsive-cover": "clamp(2.5rem, 7vw, 5rem)",
        "responsive-cover-sm": "clamp(2rem, 6vw, 4rem)",
        "responsive-subCover": "clamp(1.7rem, 3vw, 3rem)",
        "responsive-2xl": "clamp(2rem, 3.8vw, 3rem)",
        "responsive-xl": "clamp(1.9rem, 3.5vw, 2.2rem)",
        "responsive-2lg": "clamp(1.6rem, 3vw, 1.9rem)",
        "responsive-lg": "clamp(1.5rem, 2.7vw, 1.6rem)",
        "responsive-md": "clamp(1.3rem, 2.5vw, 1.4rem)",
        "responsive-2md": "clamp(1.1rem, 2.0vw, 1.2rem)",
        "responsive-sm": "clamp(1.1rem, 1.75vw, 1.3rem)",
        "responsive-2sm": "clamp(0.95rem, 1.5vw, 1.1rem)",
        "responsive-xs": "clamp(0.9rem, 1.4vw, 1rem)",
        "responsive-2xs": "clamp(0.85rem, 1vw, 0.9rem)",
        "responsive-3xs": "clamp(0.75rem, 0.75vw, 0.8rem)",
      },
      backgroundImage: {
        "gradient-90deg": "linear-gradient(90deg, #68BB3D, #50A133)",

        "gradient-t-dark":
          "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.0) 100%)",

        "gradient-background":
          "linear-gradient(90deg, rgba(254, 226, 207, 0.2), rgba(173, 106, 96, 0.2), rgba(117, 24, 19, 0.2))",
        
        "gradient-background-light":
          "linear-gradient(90deg, rgba(254, 226, 207, 0.1), rgba(173, 106, 96, 0.1), rgba(117, 24, 19, 0.1))",

        "sheet-paper": "url('/assets/imgs/sheet-paper.png')",
      },
      boxShadow: {
        "custom-glow":
          "0px -10px 20px 5px rgba(255,255,255,0.5), 0px -10px 20px 5px rgba(255,255,255,0.3), 0px -1px 10px 5px rgba(255,255,255,0.3), 0px -3px 5px 5px rgba(255,255,255,0.3)",
        bottom:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
      decorationThickness: {
        1: "1px",
        2: "2px",
        3: "3px",
        4: "4px",
        5: "5px",
      },
      transitionProperty: {
        border: "border",
        height: "height",
      },

      keyframes: {
        appear: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
      animation: {
        appear: "appear 1s ease-out forwards",
      },
      textShadow: {
        default: "2px 2px 4px rgba(0, 0, 0, 0.1)",
        md: "3px 3px 6px rgba(0, 0, 0, 0.15)",
        lg: "4px 4px 8px rgba(0, 0, 0, 0.2)",
        xl: "5px 5px 10px rgba(0, 0, 0, 0.25)",
      },
      wordBreak: {
        "break-all": "break-all",
      },
      boxShadow: {
        r: "7px 0px 7px -5px rgba(0, 0, 0, .2)",
        l: "-17px 0px 7px -5px rgba(0, 0, 0, .2)",
        t: "0px -7px 7px -5px rgba(0, 0, 0, .2)",
        b: "0px 7px 7px -5px rgba(0, 0, 0, .2)",

        tr: "7px -7px 7px -5px rgba(0, 0, 0, .2)",
        tl: "-7px -7px 7px -5px rgba(0, 0, 0, .2)",
        br: "7px 7px 7px -5px rgba(0, 0, 0, .2)",
        bl: "-7px 7px 7px -5px rgba(0, 0, 0, .2)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        "text-shadow-none": {
          textShadow: "none",
        },
        ".text-shadow": {
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
        },
        ".text-shadow-md": {
          textShadow: "3px 3px 6px rgba(0, 0, 0, 0.15)",
        },
        ".text-shadow-lg": {
          textShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)",
        },
        ".text-shadow-xl": {
          textShadow: "5px 5px 10px rgba(0, 0, 0, 0.25)",
        },
        ".marker-primary": {
          color: "#730F20" /* Change this to your desired color */,
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
