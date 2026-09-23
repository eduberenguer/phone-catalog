import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useProducts } from "../../hooks/useProducts";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { PhoneGrid } from "../../components/PhoneGrid/PhoneGrid";
import { StatusMessage } from "../../components/StatusMessage/StatusMessage";

import styles from "./PhoneList.module.css";

export function PhoneList() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const { products, loading, error, retry } = useProducts(debouncedSearch);

  const showSkeleton = loading && products.length === 0;
  const isRefetching = loading && !showSkeleton;

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
          <button className={styles.retryButton} onClick={retry}>
            Retry
          </button>
        </div>
      )}

      {!error && (
        <div
          className={styles.results}
          data-loading={isRefetching || undefined}
        >
          <PhoneGrid products={products} isLoading={showSkeleton} />
        </div>
      )}
    </div>
  );
}
