/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Your content paths remain the same
  theme: {
    extend: {
      colors: {
        customBlue: "#020687",  // Custom blue color
        customGreen: "#10B981", // Custom green color
        customYellow: "#F59E0B", // Custom yellow color
        // Add any other custom colors here
      },
    },
  },
  plugins: [],
};
