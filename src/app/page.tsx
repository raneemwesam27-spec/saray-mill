"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import ProductCard from "@/components/ProductCard";
import LogoImage from "@/components/LogoImage";
import productsData from "@/data/products.json";
import type { Product } from "@/types";

const products = productsData as Product[];
const featured = products.filter((p) => p.featured);

const INSTAGRAM_PLACEHOLDERS = Array.from({ length: 6 }, (_, i) => i);

export default function HomePage() {
  const { t } = useLang();

  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-black-deep">
        {/* Radial gold glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px]" />
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-gold/8 blur-[80px]" />
        </div>

        {/* Decorative border corners */}
        <div className="absolute top-24 left-8 w-12 h-12 border-t-2 border-s-2 border-gold/40" />
        <div className="absolute top-24 right-8 w-12 h-12 border-t-2 border-e-2 border-gold/40" />
        <div className="absolute bottom-24 left-8 w-12 h-12 border-b-2 border-s-2 border-gold/40" />
        <div className="absolute bottom-24 right-8 w-12 h-12 border-b-2 border-e-2 border-gold/40" />

        <div className="relative z-10 px-6 animate-[fadeIn_1s_ease-out]">
          {/* Logo */}
          <div className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-6 rounded-full overflow-hidden">
            <LogoImage fallbackClass="text-5xl" />
          </div>

          {/* Store name */}
          <h1 className="text-5xl md:text-7xl font-bold text-cream mb-3 tracking-wide">
            {t.storeName}
          </h1>

          {/* Tagline */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-px bg-gold" />
            <p className="text-gold-light text-xl md:text-2xl tracking-[0.2em] font-medium">
              {t.tagline}
            </p>
            <div className="w-12 h-px bg-gold" />
          </div>

          {/* CTA */}
          <Link
            href="/shop"
            className="inline-block btn-gold text-base md:text-lg px-10 py-4"
          >
            {t.hero.cta}
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-muted text-xs animate-bounce">
          <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">{t.featured.title}</h2>
          <div className="gold-divider" />
          <p className="text-cream-muted mt-2">{t.featured.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/shop" className="btn-outline-gold inline-block">
            {t.featured.viewAll}
          </Link>
        </div>
      </section>

      {/* ── Our Story ─────────────────────────────────────── */}
      <section className="bg-brown-dark py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Decorative gold element */}
            <div className="flex-shrink-0 flex flex-col items-center gap-3">
              <div className="w-px h-16 bg-gradient-to-b from-transparent to-gold" />
              <div className="w-16 h-16 rounded-full border-2 border-gold/50 flex items-center justify-center">
                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent" />
            </div>

            {/* Text */}
            <div>
              <h2 className="section-title mb-4">{t.story.title}</h2>
              <p className="text-cream-muted leading-relaxed text-lg mb-8">
                {t.story.body}
              </p>
              <div className="flex flex-wrap gap-4">
                {t.story.values.map((v, i) => (
                  <span
                    key={i}
                    className="border border-gold/40 text-gold px-4 py-1.5 rounded-full text-sm"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Instagram Strip ───────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-cream mb-2">
            {t.instagram.title}
          </h2>
          <a
            href="https://instagram.com/saraymill"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-light transition-colors duration-200 text-lg font-medium"
          >
            {t.instagram.handle}
          </a>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-3 max-w-6xl mx-auto scrollbar-thin">
          {INSTAGRAM_PLACEHOLDERS.map((i) => (
            <a
              key={i}
              href="https://instagram.com/saraymill"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-40 h-40 md:w-48 md:h-48 bg-brown-dark border border-gold/20
                         rounded-lg overflow-hidden hover:border-gold/60 transition-all duration-300
                         hover:scale-105 flex items-center justify-center group"
            >
              <svg
                className="w-10 h-10 text-gold/20 group-hover:text-gold/40 transition-colors duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
