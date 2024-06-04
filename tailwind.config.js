/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        gradientPrimary:
          "linear-gradient(180deg, #080808 20.82%, rgba(112, 99, 60, 0.89) 100%);",
      },

      color: {
        primary: "#CBB26A",
      },
      backgroundColor: {
        primary: "#CBB26A",
      },
      borderRadius: {
        xl: "20px",
        large: "10px",
      },
      boxShadow: {
        xl: "0px 10px 15px 0px rgba(203, 178, 106, 0.30)",
      },
    },
  },
  plugins: [],
};
