export default {
    content: [
        `~/components/**/*.{vue,js,ts}`,
        `~/layouts/**/*.vue`,
        `~/pages/**/*.vue`,
        `~/composables/**/*.{js,ts}`,
        `~/plugins/**/*.{js,ts}`,
        `~/utils/**/*.{js,ts}`,
        `~/App.{js,ts,vue}`,
        `~/app.{js,ts,vue}`,
        `~/Error.{js,ts,vue}`,
        `~/error.{js,ts,vue}`,
        `~/app.config.{js,ts}`,
    ],
    safelist: ['bg-green-500', 'bg-yellow-500', 'bg-blue-400', 'bg-pink-500', 'text-green-500', 'text-yellow-500', 'text-blue-400', 'text-pink-500'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                script: ['Pacifico', 'handwriting'],
                'script-extra': ['Comforter', 'handwriting'],
            },
            colors: {
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
                alternative: 'rgb(var(--color-alternative) / <alpha-value>)',
                secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
                success: 'rgb(var(--color-success) / <alpha-value>)',
                info: 'rgb(var(--color-info) / <alpha-value>)',
                warning: 'rgb(var(--color-warning) / <alpha-value>)',
                pending: 'rgb(var(--color-pending) / <alpha-value>)',
                danger: 'rgb(var(--color-danger) / <alpha-value>)',
                light: 'rgb(var(--color-light) / <alpha-value>)',
                dark: 'rgb(var(--color-dark) / <alpha-value>)',
                navy: "#000080", // Deep navy blue

            },
            container: {
                center: true,
            },
            maxWidth: {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
            },
            fontSize: {
                xs: '0.75rem',
                sm: '0.85rem',
                base: '1rem',
                xl: '1.25rem',
                '2xl': '1.563rem',
                '3xl': '1.953rem',
                '4xl': '2.441rem',
                '5xl': '3.052rem',
            },
            strokeWidth: {
                0.5: 0.5,
                1.5: 1.5,
                2.5: 2.5,
            },
            animation: {
                'spin-slow': 'spin 120s linear infinite',
                'bounce-slow': 'bounce 10s linear infinite',
            },
            fontWeight: {
                normal: '400',
                medium: '500',
                semibold: '600',
            },
            backgroundImage: {
                'hero-pattern': "url('/images/bg.svg')",
            },
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('tailwind-scrollbar'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/container-queries'),
    ],
};
