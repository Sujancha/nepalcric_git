import type { Metadata } from "next";
import { Bebas_Neue, Mukta, Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CricketScrollJourney from "@/components/layout/CricketScrollJourney";

// Display Font (English Headlines)
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: ["400"],
  subsets: ["latin"],
});

// Editorial Body Font (Nepali & General)
const mukta = Mukta({
  variable: "--font-mukta",
  weight: ["500", "700", "800"],
  subsets: ["latin", "devanagari"],
});

// Stats & Labels
const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

// Tactical Monospace Accent 
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nepalcric.com"),
  title: {
    default: "NepalCric | अब हाम्रो पालो",
    template: "%s | NepalCric",
  },
  description: "The cinematic home of Nepali cricket. Stories, momentum, and the emotional heartbeat of the 12th Rhino.",
  openGraph: {
    type: "website",
    locale: "ne_NP",
    images: ["/og-default.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ne">
      <body className={`${bebasNeue.variable} ${mukta.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col pt-16">
          <Navbar />
          <CricketScrollJourney />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
