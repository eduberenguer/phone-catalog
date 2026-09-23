import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { getProducts } from "../api/products";

export function useProducts(search: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    getProducts({ search, signal: controller.signal })
      .then((products) => {
        setProducts(products);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err);
        setLoading(false);
      });

    return () => controller.abort();
  }, [search, reloadKey]);

  return {
    products,
    loading,
    error,
    retry: () => setReloadKey((prev) => prev + 1),
  };
}
