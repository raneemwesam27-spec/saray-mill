"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";
import type { Product, Category } from "@/types";

const products = productsData as Product[];

type Filter = "all" | Category;

function ShopContent() {
  const { t } = useLang();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialFilter = (searchParams.get("category") as Filter) || "all";
  const [filter, setFilter] = useState<Filter>(initialFilter);

  useEffect(() => {
    const param = (searchParams.get("category") as Filter) || "all";
    setFilter(param);
  }, [searchParams]);

  const handleFilter = (f: Filter) => {
    setFilter(f);
    router.replace(f === "all" ? "/shop" : `/shop?category=${f}`, { scroll: false });
  };

  const filtered =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t.shop.filterAll },
    { key: "nuts", label: t.shop.filterNuts },
    { key: "dates", label: t.shop.filterDates },
    { key: "coffee", label: t.shop.filterCoffee },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="section-title">{t.shop.title}</h1>
          <div className="gold-divider" />
        </div>

        {/* Filter Bar */}
        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => handleFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                filter === f.key
                  ? "border-gold bg-gold text-black-deep"
                  : "border-gold/30 text-cream-muted hover:border-gold/60 hover:text-cream"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-cream-muted">
            {t.shop.noProducts}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
