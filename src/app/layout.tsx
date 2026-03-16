import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NINJA POTATO | Find it. Snap it. Crunch it.",
    template: "%s | NINJA POTATO",
  },
  description:
    "NINJA POTATO is a shuriken-shaped fries brand for inbound visitors in Japan. Find our kitchen truck around major sightseeing areas.",
  applicationName: "NINJA POTATO",
  keywords: [
    "NINJA POTATO",
    "Tokyo street food",
    "shuriken fries",
    "Japan travel food",
    "kitchen truck",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "ja-JP": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    title: "NINJA POTATO | Find it. Snap it. Crunch it.",
    description:
      "Shuriken-shaped fries served from a mobile kitchen in Japan's busiest sightseeing areas.",
    siteName: "NINJA POTATO",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "NINJA POTATO | Find it. Snap it. Crunch it.",
    description:
      "Shuriken-shaped fries served from a mobile kitchen in Japan's busiest sightseeing areas.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5b82e",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
