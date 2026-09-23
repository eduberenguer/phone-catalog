import { useEffect, useState } from "react";
import type { ProductDetail } from "../types/product";
import { getProductById } from "../api/products";
import { ApiError } from "../api/client";

export function useProductDetail(productId: string) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    setError(null);
    setIsNotFound(false);

    getProductById(productId, abortController.signal)
      .then((result) => {
        setProduct(result);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        if (err instanceof ApiError && err.status === 404) {
          setIsNotFound(true);
        } else {
          setError(err);
        }
        setIsLoading(false);
      });

    return () => abortController.abort();
  }, [productId, reloadKey]);

  return {
    product,
    isLoading,
    error,
    isNotFound,
    retry: () => setReloadKey((prev) => prev + 1),
  };
}
