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
  description: "Experience the Hyniva Difference: direct access to expertise, personalized attention and transparent value for your technology needs.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://products.hyniva.com",
    siteName: "Hyniva",
    title: "Hyniva — Your Strategic Tech Partner",
    description: "Direct access to expertise, personalized attention and transparent value for your technology needs.",
    images: [
      {
        url: "https://products.hyniva.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hyniva — Your Strategic Tech Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyniva — Your Strategic Tech Partner",
    description: "Direct access to expertise, personalized attention and transparent value for your technology needs.",
    images: ["https://products.hyniva.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha384-8763676C9EF3823BF0FAD41BF2D911CE1A20CCD9D57FBA097A3D99DE5D38682631E3E95043934230CA0F2589760E9078"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
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
