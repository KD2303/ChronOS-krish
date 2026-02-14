/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-primary': '#4F46E5',
                'brand-secondary': '#818CF8',
                'brand-dark': '#1E1E2D', // Sidebar
                'brand-light': '#F5F6FA', // Background
                'text-main': '#333333',
                'text-secondary': '#828282',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
