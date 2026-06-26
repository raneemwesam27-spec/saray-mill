"use client";

import { useLang } from "@/context/LanguageContext";

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || "96500000000";

const valueIcons = [
  /* Quality */
  <svg key="q" className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>,
  /* Authenticity */
  <svg key="a" className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>,
  /* Freshness */
  <svg key="f" className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>,
];

export default function AboutPage() {
  const { t } = useLang();

  return (
    <div className="pt-20 overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-28 bg-brown-dark text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold/5 blur-[100px]" />
        </div>
        <div className="relative z-10 px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px bg-gold" />
            <span className="text-gold text-sm tracking-[0.3em] uppercase">Saray Mill</span>
            <div className="w-10 h-px bg-gold" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-cream mb-4">{t.about.title}</h1>
          <p className="text-gold-light text-lg md:text-xl">{t.about.heroSubtitle}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title mb-4">{t.about.storyTitle}</h2>
        <div className="w-16 h-0.5 bg-gold mb-8" />
        <div className="flex flex-col gap-6 text-cream-muted leading-relaxed text-lg">
          <p>{t.about.storyP1}</p>
          <p>{t.about.storyP2}</p>
          <p>{t.about.storyP3}</p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brown-dark py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">{t.about.valuesTitle}</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.about.values.map((val, i) => (
              <div
                key={i}
                className="card-dark p-8 text-center group hover:border-gold/60 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-4 group-hover:border-gold/70 transition-colors duration-300">
                  {valueIcons[i]}
                </div>
                <h3 className="text-gold-light font-bold text-xl mb-3">{val.title}</h3>
                <p className="text-cream-muted text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">{t.about.contactTitle}</h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-dark p-6 flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center flex-shrink-0 group-hover:border-[#25D366]/70 transition-colors duration-300">
              <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div>
              <p className="text-cream-muted text-xs mb-0.5">{t.about.whatsapp}</p>
              <p className="text-cream font-semibold" dir="ltr">+965 0000 0000</p>
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/saraymill"
            target="_blank"
            rel="noopener noreferrer"
            className="card-dark p-6 flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center flex-shrink-0 group-hover:border-pink-500/70 transition-colors duration-300">
              <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div>
              <p className="text-cream-muted text-xs mb-0.5">{t.about.instagram}</p>
              <p className="text-cream font-semibold">@saraymill</p>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+96500000000"
            className="card-dark p-6 flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:border-gold/70 transition-colors duration-300">
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <div>
              <p className="text-cream-muted text-xs mb-0.5">{t.about.phone}</p>
              <p className="text-cream font-semibold" dir="ltr">+965 0000 0000</p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:info@saraymill.com"
            className="card-dark p-6 flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:border-gold/70 transition-colors duration-300">
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div>
              <p className="text-cream-muted text-xs mb-0.5">{t.about.email}</p>
              <p className="text-cream font-semibold">info@saraymill.com</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
