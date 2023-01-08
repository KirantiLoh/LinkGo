/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "primary": {
                    100: "#7779ff",
                    800: "#2c2f5f",
                    900: "#2e026d",
                    DEFAULT: "#6365f1"
                },
                "secondary": {
                    900: "#15162c"
                }
            },
            screens: {
                xs: "425px"
            }
        },
    },
    plugins: [],
};