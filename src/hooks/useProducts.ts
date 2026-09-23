import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { getProducts } from "../api/products";

export function useProducts(search: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    setError(null);

    getProducts({ search, signal: abortController.signal })
      .then((result) => {
        setProducts(result);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err);
        setIsLoading(false);
      });

    return () => abortController.abort();
  }, [search, reloadKey]);

  return {
    products,
    isLoading,
    error,
    retry: () => setReloadKey((prev) => prev + 1),
  };
}
