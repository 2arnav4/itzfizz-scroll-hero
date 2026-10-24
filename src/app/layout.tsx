import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome Itzfizz | Scroll Hero",
  description: "A scroll-driven hero section built with Next.js, Tailwind and GSAP ScrollTrigger.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body className="bg-night text-white">
        {/* Without JavaScript the intro never runs, so show everything. */}
        <noscript>
          <style>{".intro-hidden{opacity:1}"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
