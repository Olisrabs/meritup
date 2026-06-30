import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta", display: "swap" });

export const metadata: Metadata = {
  title: "MeritUp Waitlist: One Skill. One System. One Mentor.",
  description:
    "A clear, step-by-step path from zero to your first income online. MeritUp connects Nigerian university students with weekly mentorship and a proven earning system.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${plusJakarta.variable}`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
