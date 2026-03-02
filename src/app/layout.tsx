import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Hyniva",
    default: "Hyniva — Your Strategic Tech Partner | AI, Cloud, Digital Transformation",
  },
  description: "Experience the Hyniva Difference: direct access to expertise, personalized attention, and transparent value for your technology needs.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.hyniva.com",
    siteName: "Hyniva",
    title: "Hyniva — Your Strategic Tech Partner",
    description: "Direct access to expertise, personalized attention, and transparent value for your technology needs.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${bricolage.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
