/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",      // Quan trọng: Phải có /src/
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Quan trọng: Phải có /src/
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",  // Thêm cái này nếu bạn viết CSS trong Context
  ],
  theme: {
    extend: {
      colors: {
        vinuni: {
          blue: "#003366",
          gold: "#C5A25D",
        }
      }
    },
  },
  plugins: [],
}