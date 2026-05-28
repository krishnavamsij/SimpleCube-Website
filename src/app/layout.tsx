import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import { GlobalAnalyticsTracker } from '@/components/global-analytics-tracker';
import ChatbotWidget from '@/components/chatbot-widget';
import { Suspense } from 'react';

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
    url: "https://hyniva.com",
    siteName: "Hyniva",
    title: "Hyniva — Your Strategic Tech Partner",
    description: "Direct access to expertise, personalized attention and transparent value for your technology needs.",
    images: [
      {
        url: "https://hyniva.com/og-image.png",
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
      </head>
      <body
        className={`${inter.variable} ${bricolage.variable} ${geistMono.variable} antialiased`}
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
        <ChatbotWidget />
        <Suspense fallback={null}>
          <GlobalAnalyticsTracker />
        </Suspense>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  );
}
