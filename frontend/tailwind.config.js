/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        vscodeBg: '#1e1e1e',   // VS Code editor background
        vscodeText: '#d4d4d4', // Default text
        vscodeAccent: '#569cd6', // Keywords, headings
        vscodeCode: '#9cdcfe',   // Functions, variables
      },
      fontFamily: {
        code: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
