import type { ProductDetail } from "../../types/product";
import { rawProducts } from "./products.mock";

export const rawProductDetail: ProductDetail = {
  id: "SMG-S24U",
  brand: "Samsung",
  name: "Galaxy S24 Ultra",
  basePrice: 1329,
  imageUrl: "",
  description: "A flagship phone.",
  rating: 4.5,
  specs: { screen: "6.8 inch" },
  storageOptions: [
    { capacity: "256GB", price: 1329 },
    { capacity: "512gb", price: 1429 },
  ],
  colorOptions: [
    {
      name: "Titanium Black",
      hexCode: "#000000",
      imageUrl: "http://api.test/black.webp",
    },
    {
      name: "Titanium Violet",
      hexCode: "#5b4b8a",
      imageUrl: "http://api.test/violet.webp",
    },
  ],
  similarProducts: rawProducts,
};
