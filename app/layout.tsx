
import type { Metadata } from "next";
import { OnboardingProvider } from "./onboardingContext/page";
import "./globals.css";

export const metadata: Metadata = {
  title: "Superblock",
  description: "Superblock signup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><OnboardingProvider>{children}</OnboardingProvider></body>
    </html>
  );
}

