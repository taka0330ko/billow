import type { Metadata } from "next";
//Font Import
import { Manrope, Inter } from "next/font/google";

import "./globals.css";


const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Billow",
  description: "Chat base Subscription AI management App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${inter.variable} antialiased bg-lp-background min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
