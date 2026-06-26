export type Category = "nuts" | "dates" | "coffee";

export interface WeightOption {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  category: Category;
  featured: boolean;
  image: string;
  weights: WeightOption[];
}

export interface CartItem {
  productId: string;
  nameAr: string;
  nameEn: string;
  image: string;
  weightLabel: string;
  price: number;
  qty: number;
}

export type Lang = "ar" | "en";

export type DeliveryMethod = "delivery" | "pickup";
export type PaymentMethod = "knet" | "applepay" | "cash";

export interface CheckoutForm {
  fullName: string;
  phone: string;
  governorate: string;
  address: string;
  notes: string;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  whatsappConfirm: boolean;
}
