
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       
primary: '#6366F1',      // Electric Indigo
        secondary: '#34D399',    // Mint Green
        tertiary: '#FB923C',     // Coral Orange
        quaternary: '#1E293B',   // Gunmetal Gray
        background: '#F1F5F9',   // Soft Charcoal
        text: '#0F172A',         // Deep Slate
        hoverrow: '#E2E8F0',     // Misty Blue

      },
    },
  },
  plugins: [],
};


