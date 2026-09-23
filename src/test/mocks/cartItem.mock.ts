import type { CartItem } from "../../types/cart";

export const item: Omit<CartItem, "lineId"> = {
  productId: "SMG-S24U",
  name: "Galaxy S24 Ultra",
  brand: "Samsung",
  imageUrl: "https://api.test/s24u.webp",
  storage: "256 GB",
  color: "Titanium Black",
  price: 1329,
};
