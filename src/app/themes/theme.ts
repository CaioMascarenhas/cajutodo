import { createTheme } from "@mui/material/styles";

// Use the CSS variable set by next/font (see src/app/layout.tsx)
// Fallbacks: Geist Sans (if present) and system sans-serif stack
const theme = createTheme({
	typography: {
		fontFamily:
			"var(--font-inter, 'Inter'), var(--font-geist-sans, 'Geist Sans'), Arial, Helvetica, sans-serif",
	},
});

export default theme;

