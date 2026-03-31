import type { Metadata } from "next";
import { Playfair_Display, Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";

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
  title: "Ghana Travel | Viaggia in Ghana con WeRoad",
  description:
    "Scopri il Ghana: cultura autentica, paesaggi mozzafiato e avventure indimenticabili. Itinerari con WeRoad a partire da €1200.",
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