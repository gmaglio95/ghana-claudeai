import type { Metadata } from "next";
import { Playfair_Display, Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import { WebsiteJsonLd } from "@/components/JsonLd";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ghana-claudeai.vercel.app"),
  title: {
    default: "Ghana Travel | Viaggia in Ghana con WeRoad",
    template: "%s | Ghana Travel",
  },
  description:
    "Scopri il Ghana: cultura autentica, natura selvaggia, spiagge e volontariato. Itinerari di gruppo con WeRoad a partire da €1200. Accra, Cape Coast, Kakum e molto altro.",
  keywords: [
    "viaggio Ghana",
    "Ghana WeRoad",
    "itinerario Ghana",
    "viaggi Africa occidentale",
    "Ghana avventura",
    "volontariato Ghana",
    "Cape Coast Ghana",
    "Kakum National Park",
    "Accra turismo",
    "viaggio di gruppo Africa",
  ],
  authors: [{ name: "Ghana Travel" }],
  creator: "Ghana Travel",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://ghana-claudeai.vercel.app",
    siteName: "Ghana Travel",
    title: "Ghana Travel | Viaggia in Ghana con WeRoad",
    description:
      "Scopri il Ghana: cultura autentica, natura selvaggia e avventure indimenticabili. Itinerari di gruppo con WeRoad a partire da €1200.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Viaggio in Ghana - Paesaggio africano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghana Travel | Viaggia in Ghana con WeRoad",
    description:
      "Scopri il Ghana: cultura autentica, natura selvaggia e avventure indimenticabili con WeRoad.",
    images: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&auto=format&fit=crop",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      className={`${playfair.variable} ${outfit.variable} ${spaceMono.variable}`}
    >
      <body className="bg-dark-bg text-text-primary font-body antialiased">
        <WebsiteJsonLd />
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}