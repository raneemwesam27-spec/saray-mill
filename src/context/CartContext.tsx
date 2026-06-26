"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { CartItem } from "@/types";

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, weightLabel: string) => void;
  updateQty: (productId: string, weightLabel: string, qty: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "saray-mill-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (incoming: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) =>
          i.productId === incoming.productId &&
          i.weightLabel === incoming.weightLabel
      );
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], qty: updated[idx].qty + incoming.qty };
        return updated;
      }
      return [...prev, incoming];
    });
  };

  const removeItem = (productId: string, weightLabel: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.weightLabel === weightLabel)
      )
    );
  };

  const updateQty = (productId: string, weightLabel: string, qty: number) => {
    if (qty <= 0) {
      removeItem(productId, weightLabel);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.weightLabel === weightLabel
          ? { ...i, qty }
          : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart, itemCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
