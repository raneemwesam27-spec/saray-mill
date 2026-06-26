"use client";

import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { t, isAr } = useLang();
  const { addItem } = useCart();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [added, setAdded] = useState(false);

  const selected = product.weights[selectedIdx];

  const handleAdd = () => {
    addItem({
      productId: product.id,
      nameAr: product.nameAr,
      nameEn: product.nameEn,
      image: product.image,
      weightLabel: selected.label,
      price: selected.price,
      qty: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="card-dark flex flex-col group">
      {/* Image */}
      <div className="relative aspect-square bg-brown-mid overflow-hidden">
        <Image
          src={product.image}
          alt={isAr ? product.nameAr : product.nameEn}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Fallback pattern */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <svg viewBox="0 0 100 100" className="w-24 h-24 text-gold" fill="currentColor">
            <circle cx="50" cy="50" r="40" />
            <circle cx="50" cy="50" r="25" fill="#1a0f08" />
            <circle cx="50" cy="50" r="10" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Name */}
        <div>
          <h3 className="text-cream font-semibold text-lg leading-tight">
            {isAr ? product.nameAr : product.nameEn}
          </h3>
          <p className="text-cream-muted text-sm">
            {isAr ? product.nameEn : product.nameAr}
          </p>
        </div>

        {/* Weight selector */}
        <div className="flex flex-wrap gap-2">
          {product.weights.map((w, i) => (
            <button
              key={w.label}
              onClick={() => setSelectedIdx(i)}
              className={`text-xs font-semibold px-3 py-1.5 rounded border transition-all duration-200 ${
                i === selectedIdx
                  ? "border-gold bg-gold/20 text-gold-light"
                  : "border-gold/30 text-cream-muted hover:border-gold/60"
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-gold-light font-bold text-xl">
            {selected.price.toFixed(3)}{" "}
            <span className="text-sm font-normal text-cream-muted">{t.shop.kwd}</span>
          </span>
          <button
            onClick={handleAdd}
            className={`text-sm font-semibold px-4 py-2 rounded transition-all duration-300 ${
              added
                ? "bg-green-700/80 text-white"
                : "bg-gold text-black-deep hover:bg-gold-light"
            }`}
          >
            {added ? t.shop.added : t.shop.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
}
