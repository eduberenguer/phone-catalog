import type { Product, ProductDetail } from "../types/product";
import { request } from "./client";
import { dedupeById, mapProduct, mapProductDetail } from "./mappers";

interface GetProductsOptions {
  search?: string;
  limit?: number;
  signal?: AbortSignal;
}

export async function getProducts({
  search,
  limit = 20,
  signal,
}: GetProductsOptions = {}): Promise<Product[]> {
  const params = new URLSearchParams({ limit: String(limit) });

  if (search) {
    params.set("search", search);
  }

  const raw = await request<Product[]>(
    `/products?${params.toString()}`,
    signal,
  );

  return dedupeById(raw).map(mapProduct);
}

export async function getProductById(
  id: string,
  signal?: AbortSignal,
): Promise<ProductDetail> {
  const raw = await request<ProductDetail>(`/products/${id}`, signal);
  return mapProductDetail(raw);
}
