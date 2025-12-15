import type { Metadata, Viewport } from "next";
import { Great_Vibes, Cinzel, Lato } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-christmas",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-heading",
});

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "GMS Frankfurt Christmas Celebration",
  description: "Join us for our Christmas Service on Sunday, 21st December 2025 at 12 PM!",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎄</text></svg>",
  },
  openGraph: {
    title: "GMS Frankfurt Christmas Celebration",
    description: "Join us for our Christmas Service on Sunday, 21st December 2025 at 12 PM!",
    type: "website",
    // images: ['/your-custom-image.png'],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${greatVibes.variable} ${cinzel.variable} ${lato.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
