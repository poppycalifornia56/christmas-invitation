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
  title: "Christmas Party Invitation",
  description: "Join us for a festive celebration!",
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
