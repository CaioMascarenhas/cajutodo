import { createTheme } from "@mui/material/styles";

// Use the CSS variable set by next/font (see src/app/layout.tsx)
// Fallbacks: Geist Sans (if present) and system sans-serif stack
const theme = createTheme({
	// palette: {
	// 	mode: 'dark',
	// 	background: {
	// 		default: '#0d1b2a',
	// 		paper: '#1b263b',
	// 	},
	// 	text: {
	// 		primary: '#e0e1dd',
	// 	},
	// },
	typography: {
		fontFamily:
			"var(--font-inter, 'Inter'), var(--font-geist-sans, 'Geist Sans'), Arial, Helvetica, sans-serif",
	},
});

export default theme;

