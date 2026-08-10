import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const googleSans = localFont({
  src: [
    { path: "./fonts/static/GoogleSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/static/GoogleSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/static/GoogleSans-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-google-sans",
});

export const metadata: Metadata = {
  title: "Superblock - Create Account",
  description: "Create your Superblock account",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={googleSans.className}>{children}</body>
    </html>
  );
}
