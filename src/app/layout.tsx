import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "MeritUp: Learn Tech. Earn Money. Join the Waitlist.",
  description:
    "MeritUp is Africa's premier tech skills platform for youths and individuals ready to earn from technology. Join our exclusive waitlist and refer friends to unlock rewards.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable} suppressHydrationWarning>{children}</body>
    </html>
  );
}
