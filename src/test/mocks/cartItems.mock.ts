import type { CartItem } from "../../types/cart";

export const cartItems: CartItem[] = [
  {
    lineId: "line-1",
    productId: "SMG-S24U",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    imageUrl: "https://api.test/s24u.webp",
    storage: "256 GB",
    color: "Titanium Black",
    price: 1329,
  },
  {
    lineId: "line-2",
    productId: "APL-IP15P",
    name: "iPhone 15 Pro",
    brand: "Apple",
    imageUrl: "https://api.test/ip15p.webp",
    storage: "128 GB",
    color: "Blue Titanium",
    price: 1219,
  },
];
