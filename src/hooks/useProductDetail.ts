import { useEffect, useState } from "react";
import type { ProductDetail } from "../types/product";
import { getProductById } from "../api/products";
import { ApiError } from "../api/client";

export function useProductDetail(productId: string) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    setError(null);
    setIsNotFound(false);

    getProductById(productId, abortController.signal)
      .then((productDetail) => {
        setProduct(productDetail);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        if (err instanceof ApiError && err.status === 404) {
          setIsNotFound(true);
        } else {
          setError(err.message);
        }
        setIsLoading(false);
      });
    return () => {
      abortController.abort();
    };
  }, [productId]);

  return {
    product,
    isLoading,
    error,
    isNotFound,
  };
}
