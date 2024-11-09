/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shuffle: {
          '0%': { opacity: '0', transform: 'translateY(50px) scale(0.7)' }, // Start from below and scaled down
          '80%': { opacity: '0.5', transform: 'translateY(-10px) scale(1.02)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }  // End at normal position and size
        }
      },
      animation: {
        shuffle: 'shuffle 0.8s ease-in-out forwards', // Define the animation to 0.8s
      },
    },
  },
  plugins: [],
}
