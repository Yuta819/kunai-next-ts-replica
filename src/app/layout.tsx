import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NINJA POTATO | Findable Shuriken Fries in Tokyo",
  description:
    "NINJA POTATO is a shuriken-shaped fries brand for inbound visitors in Japan. Find our kitchen truck in top sightseeing areas.",
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
