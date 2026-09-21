import type { Product, ProductDetail } from "../types/product";

export function toHttps(url: string): string {
  return url.replace(/^http:/, "https:");
}

export function dedupeById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) {
      return false;
    }
    seen.add(item.id);
    return true;
  });
}

export function normalizeCapacity(capacity: string): string {
  const match = capacity.match(/^(\d+)\s*(GB|TB)$/i);
  if (match) {
    const [, number, unit] = match;
    return `${number} ${unit.toUpperCase()}`;
  }
  return capacity;
}

export function mapProduct(raw: Product): Product {
  return { ...raw, imageUrl: toHttps(raw.imageUrl) };
}

export function mapProductDetail(raw: ProductDetail): ProductDetail {
  return {
    ...raw,
    imageUrl: toHttps(raw.imageUrl),
    colorOptions: raw.colorOptions.map((color) => ({
      ...color,
      imageUrl: toHttps(color.imageUrl),
    })),
    storageOptions: raw.storageOptions.map((option) => ({
      ...option,
      capacity: normalizeCapacity(option.capacity),
    })),
    similarProducts: dedupeById(raw.similarProducts).map(mapProduct),
  };
}
