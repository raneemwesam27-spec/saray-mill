import type { Metadata } from "next";
import { Noto_Naskh_Arabic, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const notoArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
  preload: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-english",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "سراي ميل | Saray Mill",
  description:
    "متجر كويتي فاخر للمكسرات والتمور والقهوة — A premium Kuwaiti store for Nuts, Dates & Coffee",
  keywords: "مكسرات, تمور, قهوة, الكويت, سراي ميل, nuts, dates, coffee, Kuwait",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${notoArabic.variable} ${cormorant.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
