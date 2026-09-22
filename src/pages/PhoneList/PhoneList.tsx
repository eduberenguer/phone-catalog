import { useState } from "react";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useProducts } from "../../hooks/useProducts";

import styles from "./PhoneList.module.css";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { PhoneGrid } from "../../components/PhoneGrid/PhoneGrid";
import { useLocation } from "react-router-dom";
import { StatusMessage } from "../../components/StatusMessage/StatusMessage";
import { Skeleton } from "../../components/Skeleton/Skeleton";

export function PhoneList() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const { products, loading, error, retry } = useProducts(debouncedSearch);

  const showSkeleton = loading && products.length === 0;

  return (
    <div>
      {location.state?.purchaseCompleted && (
        <StatusMessage message="Purchase completed" />
      )}

      <SearchBar value={search} onChange={setSearch} />
      <p className={styles.resultsCount} aria-live="polite">
        {products.length} results
      </p>

      {error && !loading && (
        <div className={styles.error}>
          <p>Error: {error.message}</p>
          <button onClick={retry}>Retry</button>
        </div>
      )}

      {showSkeleton && (
        <div className={styles.skeletonGrid}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      )}

      {!showSkeleton && !error && (
        <div className={styles.results} data-loading={loading || undefined}>
          <PhoneGrid products={products} />
        </div>
      )}
    </div>
  );
}
