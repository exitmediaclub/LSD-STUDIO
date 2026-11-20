import type { Metadata } from "next";
import "./globals.css";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "LSD STUDIO — Creative Design Portfolio",
    template: "%s · LSD STUDIO",
  },
  description: "Portofolio LSD STUDIO: illustration, logofolio, design graphic, social media handling, branding, dan game.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="grain">
        <TopBanner />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
