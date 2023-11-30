/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['src/**/*.{ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
    prefix: 'tw-',
    theme: {
        extend: {},
    },
    plugins: [],
};
