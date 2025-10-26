import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Exo } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./contexts/themeProvider";
import { AlertProvider } from "./contexts/alertContext";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Caju TODO List",
  description: "todo list para organizar os melhores eventos!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} ${exo.variable} antialiased`}
      > 
        <AlertProvider>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </AlertProvider>
        <Analytics />
      </body>
    </html>
  );
}
