import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kunai Replica",
  description: "Next.js faithful replica of kunai.framer.website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
