import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	extend: {
			content: {
				separator: "'/'", // Custom content for the separator
			},
    		minHeight: {
    			'screen-without-header-footer': 'calc(100vh - var(--header-height) - var(--footer-height))'
    		},
    		zIndex: {
    			header: '50',
    			sidebar: '20',
    			drawer: '101',
				overlay: '100',
    			footer: '50',
    			backToTop: '90'
    		},
			fontFamily: {
				sans: ["var(--font-plex-sans)", "sans-serif"],
				mono: ["var(--font-plex-mono)", "monospace"],
				serif: ["var(--font-plex-serif)", "serif"],
	    		},
    		fontSize: {
    			'footer-font': '0.9375rem'
    		},
    		fontWeight: {
    			thin: '100',
    			extraLight: '200',
    			light: '300',
    			normal: '400',
    			medium: '500',
    			semiBold: '600',
    			bold: '700',
    			extraBold: '800',
    			black: '900'
    		},
    		colors: {
    			hakuji: '#f8fbf8',
    			rouiro: '#2b2b2b',
    			midnight: '#161827',
    			frost: '#e0e6f6',
    			charcoal: '#242424',
				darkbg:'#131313',
    			primary: {
    				DEFAULT: '#4768fa',
    				focus: '#153ff9',
    				content: '#161827'
    			},
    			secondary: {
    				DEFAULT: '#7b92b2',
    				focus: '#5b769a',
    				content: '#161827'
    			},
    			accent: {
    				DEFAULT: '#67cba0',
    				focus: '#41be88',
    				content: '#161827'
    			},
    			neutral: {
    				DEFAULT: '#161827',
    				focus: '#06060a',
    				content: '#eaf0f6'
    			},
    			base: {
    				'100': '#ffffff',
    				'200': '#f7fafd',
    				'300': '#eaf0f6',
    				content: '#161827'
    			},
    			info: '#1c92f2',
    			success: '#009485',
    			warning: '#ff9900',
    			error: '#ff5724',
    			dark: {
    				primary: '#ffffff',
    				focus: '#ffffff',
    				content: '#000000',
    				neutral: '#333333',
    				'neutral-focus': '#4d4d4d',
    				'neutral-content': '#ffffff',
    				base: {
    					'100': '#000000',
    					'200': '#333333',
    					'300': '#4d4d4d',
    					content: '#ffffff'
    				},
    				info: '#4A8FB1',
    				success: '#4CAF50',
    				warning: '#FFEB3B',
    				error: '#F44336'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
	plugins: [typography, animate],
} satisfies Config;