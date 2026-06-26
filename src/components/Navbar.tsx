"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import LogoImage from "@/components/LogoImage";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const { itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black-deep/95 backdrop-blur-md shadow-lg shadow-black/50 border-b border-gold/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
              <LogoImage fallbackClass="text-lg" />
            </div>
            <span className="text-gold-light font-bold text-lg md:text-xl tracking-wide">
              {t.storeName}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-cream hover:text-gold-light transition-colors duration-200 text-sm tracking-wide"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/shop"
              className="text-cream hover:text-gold-light transition-colors duration-200 text-sm tracking-wide"
            >
              {t.nav.shop}
            </Link>
            <Link
              href="/about"
              className="text-cream hover:text-gold-light transition-colors duration-200 text-sm tracking-wide"
            >
              {t.nav.about}
            </Link>
          </div>

          {/* Right side: Lang toggle + Cart + Hamburger */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="text-xs font-semibold border border-gold/40 text-gold px-2.5 py-1 rounded
                         hover:border-gold hover:bg-gold/10 transition-all duration-200"
            >
              {lang === "ar" ? "EN" : "ع"}
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-cream hover:text-gold transition-colors duration-200"
              aria-label={t.nav.cart}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -end-1 bg-gold text-black-deep text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-cream hover:text-gold transition-colors duration-200 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gold/20 bg-black-deep/98 pb-4">
            <div className="flex flex-col gap-1 pt-2">
              {[
                { href: "/", label: t.nav.home },
                { href: "/shop", label: t.nav.shop },
                { href: "/about", label: t.nav.about },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-cream hover:text-gold hover:bg-brown-dark/50 transition-colors duration-200 rounded"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
