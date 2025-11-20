module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('./postcss/scope')({ scope: '.text-image-block' }),
    ],
};
