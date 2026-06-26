"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import type { CheckoutForm, DeliveryMethod, PaymentMethod } from "@/types";

const DELIVERY_FEE = 1.5;
const FREE_DELIVERY_THRESHOLD = 15;
const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || "96500000000";

const defaultForm: CheckoutForm = {
  fullName: "",
  phone: "",
  governorate: "",
  address: "",
  notes: "",
  deliveryMethod: "delivery",
  paymentMethod: "cash",
  whatsappConfirm: false,
};

export default function CheckoutPage() {
  const { t, isAr } = useLang();
  const { items, subtotal, clearCart } = useCart();

  const [form, setForm] = useState<CheckoutForm>(defaultForm);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const deliveryFee =
    form.deliveryMethod === "pickup"
      ? 0
      : subtotal >= FREE_DELIVERY_THRESHOLD
      ? 0
      : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const set = <K extends keyof CheckoutForm>(key: K, val: CheckoutForm[K]) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutForm, string>> = {};
    if (!form.fullName.trim()) newErrors.fullName = t.checkout.requiredField;
    if (!form.phone.trim()) newErrors.phone = t.checkout.requiredField;
    else if (!/^[+\d\s]{7,15}$/.test(form.phone.trim()))
      newErrors.phone = t.checkout.invalidPhone;
    if (form.deliveryMethod === "delivery") {
      if (!form.governorate) newErrors.governorate = t.checkout.requiredField;
      if (!form.address.trim()) newErrors.address = t.checkout.requiredField;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      `🛍️ طلب جديد — سراي ميل`,
      ``,
      `👤 الاسم: ${form.fullName}`,
      `📱 الهاتف: ${form.phone}`,
      form.deliveryMethod === "delivery"
        ? `🗺️ المحافظة: ${form.governorate}`
        : `🏪 استلام من المحل`,
      form.address ? `📍 العنوان: ${form.address}` : "",
      form.notes ? `📝 ملاحظات: ${form.notes}` : "",
      ``,
      `🛒 المنتجات:`,
      ...items.map(
        (i) => `• ${i.nameAr} (${i.weightLabel}) x${i.qty} — ${(i.price * i.qty).toFixed(3)} د.ك`
      ),
      ``,
      `💰 المجموع: ${subtotal.toFixed(3)} د.ك`,
      deliveryFee > 0 ? `🚗 التوصيل: ${deliveryFee.toFixed(3)} د.ك` : `🚗 التوصيل: مجاني`,
      `✅ الإجمالي: ${total.toFixed(3)} د.ك`,
      ``,
      `💳 طريقة الدفع: ${
        form.paymentMethod === "knet"
          ? "كي-نت"
          : form.paymentMethod === "applepay"
          ? "Apple Pay"
          : "الدفع عند الاستلام"
      }`,
    ]
      .filter(Boolean)
      .join("\n");
    return encodeURIComponent(lines);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (form.whatsappConfirm) {
      window.open(`https://wa.me/${WA_NUMBER}?text=${buildWhatsAppMessage()}`, "_blank");
    }

    clearCart();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-gold/10 border-2 border-gold/50 flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gold-light mb-3">{t.checkout.successTitle}</h2>
          <p className="text-cream-muted mb-8">{t.checkout.successBody}</p>
          <Link href="/" className="btn-gold inline-block">{t.checkout.backToHome}</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-cream-muted mb-6">{t.cart.empty}</p>
          <Link href="/shop" className="btn-gold inline-block">{t.cart.shopNow}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="section-title">{t.checkout.title}</h1>
          <div className="w-16 h-0.5 bg-gold mt-3" />
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Form */}
            <div className="flex-1 flex flex-col gap-6">

              {/* Delivery Info */}
              <div className="card-dark p-6">
                <h2 className="text-lg font-bold text-cream mb-5 pb-3 border-b border-gold/20">
                  {t.checkout.deliveryInfo}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-cream-muted text-sm mb-1.5">{t.checkout.fullName}</label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => set("fullName", e.target.value)}
                      className={`input-field ${errors.fullName ? "border-red-500" : ""}`}
                      placeholder={t.checkout.fullName}
                    />
                    {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Phone */}
                  <div className="sm:col-span-2">
                    <label className="block text-cream-muted text-sm mb-1.5">{t.checkout.phone}</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className={`input-field ${errors.phone ? "border-red-500" : ""}`}
                      placeholder="+965 XXXX XXXX"
                      dir="ltr"
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Governorate — only shown for delivery */}
                  {form.deliveryMethod === "delivery" && (
                    <div>
                      <label className="block text-cream-muted text-sm mb-1.5">{t.checkout.governorate}</label>
                      <select
                        value={form.governorate}
                        onChange={(e) => set("governorate", e.target.value)}
                        className={`input-field ${errors.governorate ? "border-red-500" : ""}`}
                      >
                        <option value="">{t.checkout.selectGov}</option>
                        {t.checkout.governorates.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                      {errors.governorate && <p className="text-red-400 text-xs mt-1">{errors.governorate}</p>}
                    </div>
                  )}

                  {/* Address */}
                  {form.deliveryMethod === "delivery" && (
                    <div className={form.deliveryMethod === "delivery" ? "sm:col-span-2" : ""}>
                      <label className="block text-cream-muted text-sm mb-1.5">{t.checkout.address}</label>
                      <textarea
                        value={form.address}
                        onChange={(e) => set("address", e.target.value)}
                        rows={3}
                        className={`input-field resize-none ${errors.address ? "border-red-500" : ""}`}
                        placeholder={t.checkout.address}
                      />
                      {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                    </div>
                  )}

                  {/* Notes */}
                  <div className="sm:col-span-2">
                    <label className="block text-cream-muted text-sm mb-1.5">{t.checkout.notes}</label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      rows={2}
                      className="input-field resize-none"
                      placeholder={t.checkout.notes}
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Method */}
              <div className="card-dark p-6">
                <h2 className="text-lg font-bold text-cream mb-5 pb-3 border-b border-gold/20">
                  {t.checkout.deliveryMethod}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {(["delivery", "pickup"] as DeliveryMethod[]).map((method) => (
                    <label
                      key={method}
                      className={`flex items-center gap-3 p-4 rounded border cursor-pointer transition-all duration-200 ${
                        form.deliveryMethod === method
                          ? "border-gold bg-gold/10"
                          : "border-gold/20 hover:border-gold/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value={method}
                        checked={form.deliveryMethod === method}
                        onChange={() => set("deliveryMethod", method)}
                        className="accent-gold"
                      />
                      <div>
                        <p className="text-cream text-sm font-semibold">
                          {method === "delivery" ? t.checkout.homeDelivery : t.checkout.pickup}
                        </p>
                        <p className="text-cream-muted text-xs">
                          {method === "delivery"
                            ? `${DELIVERY_FEE.toFixed(3)} ${t.checkout.kwd}`
                            : t.checkout.deliveryFree}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="card-dark p-6">
                <h2 className="text-lg font-bold text-cream mb-5 pb-3 border-b border-gold/20">
                  {t.checkout.paymentMethod}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {([
                    { key: "knet" as PaymentMethod, label: t.checkout.knet, icon: "💳" },
                    { key: "applepay" as PaymentMethod, label: t.checkout.applepay, icon: "" },
                    { key: "cash" as PaymentMethod, label: t.checkout.cash, icon: "💵" },
                  ]).map(({ key, label, icon }) => (
                    <label
                      key={key}
                      className={`flex items-center gap-3 p-4 rounded border cursor-pointer transition-all duration-200 ${
                        form.paymentMethod === key
                          ? "border-gold bg-gold/10"
                          : "border-gold/20 hover:border-gold/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={key}
                        checked={form.paymentMethod === key}
                        onChange={() => set("paymentMethod", key)}
                        className="accent-gold"
                      />
                      <span className="text-xl">{icon}</span>
                      <span className="text-cream text-sm font-semibold">{label}</span>
                    </label>
                  ))}
                </div>

                {/* Apple Pay placeholder notice */}
                {form.paymentMethod === "applepay" && (
                  <p className="text-xs text-cream-muted mt-3 bg-brown-mid px-3 py-2 rounded border border-gold/10">
                    {isAr ? "سيتم تفعيل Apple Pay قريباً" : "Apple Pay coming soon"}
                  </p>
                )}
                {form.paymentMethod === "knet" && (
                  <p className="text-xs text-cream-muted mt-3 bg-brown-mid px-3 py-2 rounded border border-gold/10">
                    {isAr ? "سيتم تفعيل بوابة كي-نت قريباً" : "KNET gateway coming soon"}
                  </p>
                )}
              </div>

              {/* WhatsApp confirmation toggle */}
              <label className="card-dark p-5 flex items-center gap-4 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={form.whatsappConfirm}
                    onChange={(e) => set("whatsappConfirm", e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                      form.whatsappConfirm ? "bg-[#25D366]" : "bg-brown-mid border border-gold/30"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 shadow ${
                        form.whatsappConfirm ? "start-6" : "start-0.5"
                      }`}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span className="text-cream text-sm">{t.checkout.whatsappConfirm}</span>
                </div>
              </label>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:w-72">
              <div className="card-dark p-6 sticky top-24">
                <h2 className="text-lg font-bold text-cream mb-5 pb-3 border-b border-gold/20">
                  {t.checkout.orderSummary}
                </h2>

                <div className="flex flex-col gap-2 mb-4 max-h-52 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.weightLabel}`}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-cream-muted">
                        {item.nameAr} ({item.weightLabel}) x{item.qty}
                      </span>
                      <span className="text-cream flex-shrink-0 ms-2">
                        {(item.price * item.qty).toFixed(3)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gold/20 pt-4 flex flex-col gap-2 mb-5">
                  <div className="flex justify-between text-sm text-cream-muted">
                    <span>{t.checkout.subtotal}</span>
                    <span>{subtotal.toFixed(3)} {t.checkout.kwd}</span>
                  </div>
                  <div className="flex justify-between text-sm text-cream-muted">
                    <span>{t.checkout.delivery}</span>
                    <span className={deliveryFee === 0 ? "text-green-400" : ""}>
                      {deliveryFee === 0
                        ? t.checkout.deliveryFree
                        : `${deliveryFee.toFixed(3)} ${t.checkout.kwd}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-lg text-cream border-t border-gold/20 pt-4 mb-6">
                  <span>{t.checkout.total}</span>
                  <span className="text-gold-light">{total.toFixed(3)} {t.checkout.kwd}</span>
                </div>

                <button type="submit" className="btn-gold w-full">
                  {t.checkout.placeOrder}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
