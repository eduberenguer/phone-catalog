import type { Product } from "../../types/product";

export const rawProducts: Product[] = [
  {
    id: "SMG-S24U",
    brand: "Samsung",
    name: "Galaxy S24 Ultra",
    basePrice: 1329,
    imageUrl: "http://api.test/images/s24u.webp",
  },
  {
    id: "XMI-RN13P5G",
    brand: "Xiaomi",
    name: "Redmi Note 13 Pro 5G",
    basePrice: 399,
    imageUrl: "http://api.test/images/rn13.webp",
  },
  // Duplicate id, exactly like the real API returns for this product.
  {
    id: "XMI-RN13P5G",
    brand: "Xiaomi",
    name: "Redmi Note 13 Pro 5G",
    basePrice: 399,
    imageUrl: "http://api.test/images/rn13.webp",
  },
];
