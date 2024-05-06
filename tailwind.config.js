/** @type {import('tailwindcss').Config} */

import {fontFamily} from 'tailwindcss/defaultTheme';

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		boxShadow: {
			neu1: 'inset 0.2em 0.2em 0.4em var(--tax-nigeria-primary-color), inset -0.2em -0.2em 0.4em #fff',
			neu2: '0.2em 0.2em 0.4em var(--tax-nigeria-primary-color), -0.2em -0.2em 0.4em #fff',
			neu3: '0.2em 0.2em 0.4em #ccc, -0.2em -0.2em 0.4em #f1f1f1',
		},
		screens: {
			xs: '10px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1440px',
		},
		container: {
			padding: {
				DEFAULT: '1rem',
				sm: '1.5rem',
				lg: '2rem',
				xl: '3rem',
				'2xl': '3.5rem',
			},
		},
		extend: {
			colors: {
				dark: '#141414',
				primary: 'var(--tax-nigeria-primary-color)',
				'primary-dark': 'var(--tax-nigeria-primary-color-dark)',
				'primary-light': 'var(--tax-nigeria-primary-color-light)',
			},
			fontFamily: {
				primary: ["'Poppins'", ...fontFamily.serif],
			},
			fontSize: {
				xs: '.75rem',
				sm: '.875rem',
				tiny: '.875rem',
				base: '1rem',
				lg: '1.125rem',
				xl: '1.25rem',
				'2xl': '1.5rem',
				'3xl': '1.875rem',
				'4xl': '2.25rem',
				'5xl': '3rem',
				'6xl': '4rem',
				'7xl': '5rem',
			},
		},
	},
	plugins: [],
};
