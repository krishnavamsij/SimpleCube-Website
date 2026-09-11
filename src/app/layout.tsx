import type { Metadata } from "next";
import { Andika, Inter, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import { GlobalAnalyticsTracker } from '@/components/global-analytics-tracker';
// AIRA chatbot temporarily hidden from this build
// import { AskAiraWidget } from '@/components/ask-aira-widget';
import { Suspense } from 'react';

import "./globals.css";

/**
 * SimpleCube brand typography (BrandBoard)
 * Primary typeface: Andika — applied as --font-andika / --font-sans / --font-display
 * Inter kept for UI surfaces that need the original site metrics (e.g. footer)
 * Mono retained for rare code/timeline UI only.
 */
const andika = Andika({
  variable: "--font-andika",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | SimpleCube",
    default: "SimpleCube — Code that scales. Teams that listen. | Custom Software, Salesforce, Digital Transformation",
  },
  description: "Based in Texas, SimpleCube delivers custom software, Salesforce integrations, and digital transformation with lean, Agile execution.",
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
    url: "https://hyniva.com",
    siteName: "SimpleCube",
    title: "SimpleCube — Code that scales. Teams that listen.",
    description: "Custom software, Salesforce integrations, and digital transformation — Texas roots, boutique precision.",
    images: [
      {
        url: "https://hyniva.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "SimpleCube — Code that scales. Teams that listen.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SimpleCube — Code that scales. Teams that listen.",
    description: "Custom software, Salesforce integrations, and digital transformation — Texas roots, boutique precision.",
    images: ["https://hyniva.com/og-image.png"],
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
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MJWKM7QC');
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18306532184"
          strategy="afterInteractive"
        />
        <Script id="google-ads-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18306532184');
          `}
        </Script>
      </head>
      <body
        className={`${andika.variable} ${inter.variable} ${geistMono.variable} antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MJWKM7QC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {children}
        <Suspense fallback={null}>
          <GlobalAnalyticsTracker />
        </Suspense>
        {/* AIRA chatbot temporarily hidden from this build */}
        {/* <AskAiraWidget /> */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  );
}
