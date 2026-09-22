import type { ProductDetail } from "../../types/product";

export const product: ProductDetail = {
  id: "SMG-S24U",
  brand: "Samsung",
  name: "Galaxy S24 Ultra",
  basePrice: 1329,
  imageUrl: "https://api.test/black.webp",
  description: "A flagship phone.",
  rating: 4.5,
  specs: { screen: "6.8 inch" },
  storageOptions: [
    { capacity: "256 GB", price: 1329 },
    { capacity: "512 GB", price: 1429 },
  ],
  colorOptions: [
    {
      name: "Titanium Black",
      hexCode: "#000000",
      imageUrl: "https://api.test/black.webp",
    },
    {
      name: "Titanium Violet",
      hexCode: "#5b4b8a",
      imageUrl: "https://api.test/violet.webp",
    },
  ],
  similarProducts: [],
};
