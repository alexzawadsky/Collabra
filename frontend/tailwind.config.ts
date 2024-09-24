import type { Config } from 'tailwindcss'

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                primary: ['primary', 'cursive'],
            },
            colors: {
                accent: {
                    DEFAULT: '#1B3F99',
                    dark: '#e3bb58',
                },
                navlink: {
                    active: '#f1f5f9',
                    hover: '#f8fafc',
                },
            },
            keyframes: {
                spin: {
                    '0%': { transform: 'rotate(0)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            },
            animation: {
                spin15: 'spin 15s linear infinite',
                spin10: 'spin 10s linear infinite',
                spin5: 'spin 5s linear infinite',
                spin: 'spin 1s linear infinite',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
            width: {
                slot: 'calc(100vw - 72px)',
            },
            maxWidth: {
                slot: 'calc(100vw - 72px)',
                screen: '100vw',
            },
            spacing: {
                nav: '72px',
                'nav-half': '36px',
            },
        },
    },
    plugins: [],
} satisfies Config
