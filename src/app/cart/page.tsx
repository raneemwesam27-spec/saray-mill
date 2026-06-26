"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

const DELIVERY_FEE = 1.5;
const FREE_DELIVERY_THRESHOLD = 15;

export default function CartPage() {
  const { t } = useLang();
  const { items, removeItem, updateQty, subtotal } = useCart();

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full border-2 border-gold/30 flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gold/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-cream mb-2">{t.cart.empty}</h2>
          <p className="text-cream-muted mb-8">{t.cart.emptySubtitle}</p>
          <Link href="/shop" className="btn-gold inline-block">
            {t.cart.shopNow}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="section-title">{t.cart.title}</h1>
          <div className="w-16 h-0.5 bg-gold mt-3" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items list */}
          <div className="flex-1 flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.weightLabel}`}
                className="card-dark flex items-center gap-4 p-4"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-brown-mid">
                  <Image
                    src={item.image}
                    alt={item.nameAr}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-cream font-semibold truncate">{item.nameAr}</p>
                  <p className="text-cream-muted text-sm truncate">{item.nameEn}</p>
                  <p className="text-gold text-sm mt-0.5">{item.weightLabel}</p>
                </div>

                {/* Qty controls */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => updateQty(item.productId, item.weightLabel, item.qty - 1)}
                    className="w-8 h-8 border border-gold/40 rounded text-gold hover:bg-gold/10 transition-colors flex items-center justify-center text-lg"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-cream font-semibold">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.productId, item.weightLabel, item.qty + 1)}
                    className="w-8 h-8 border border-gold/40 rounded text-gold hover:bg-gold/10 transition-colors flex items-center justify-center text-lg"
                  >
                    +
                  </button>
                </div>

                {/* Line total */}
                <div className="text-end flex-shrink-0 min-w-[80px]">
                  <p className="text-gold-light font-bold">
                    {(item.price * item.qty).toFixed(3)}
                  </p>
                  <p className="text-cream-muted text-xs">{t.cart.kwd}</p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.productId, item.weightLabel)}
                  className="text-cream-muted hover:text-red-400 transition-colors duration-200 flex-shrink-0 p-1"
                  aria-label={t.cart.remove}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}

            <Link
              href="/shop"
              className="text-gold-light hover:text-gold text-sm transition-colors duration-200 flex items-center gap-1 mt-2"
            >
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              {t.cart.continueShopping}
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80">
            <div className="card-dark p-6 sticky top-24">
              <h2 className="text-xl font-bold text-cream mb-6 pb-4 border-b border-gold/20">
                {t.cart.title}
              </h2>

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between text-cream-muted text-sm">
                  <span>{t.cart.subtotal}</span>
                  <span>{subtotal.toFixed(3)} {t.cart.kwd}</span>
                </div>
                <div className="flex justify-between text-cream-muted text-sm">
                  <span>{t.cart.delivery}</span>
                  <span className={deliveryFee === 0 ? "text-green-400" : ""}>
                    {deliveryFee === 0
                      ? t.cart.deliveryFree
                      : `${deliveryFee.toFixed(3)} ${t.cart.kwd}`}
                  </span>
                </div>

                {subtotal < FREE_DELIVERY_THRESHOLD && (
                  <p className="text-xs text-gold/70 bg-gold/5 border border-gold/20 rounded px-3 py-2">
                    {t.cart.freeAbove}
                  </p>
                )}
              </div>

              <div className="flex justify-between text-cream font-bold text-lg border-t border-gold/20 pt-4 mb-6">
                <span>{t.cart.total}</span>
                <span className="text-gold-light">{total.toFixed(3)} {t.cart.kwd}</span>
              </div>

              <Link href="/checkout" className="btn-gold w-full text-center block">
                {t.cart.checkout}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
