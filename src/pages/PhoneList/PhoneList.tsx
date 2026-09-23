import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useProducts } from "../../hooks/useProducts";
import { usePageTitle } from "../../hooks/usePageTitle";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { PhoneGrid } from "../../components/PhoneGrid/PhoneGrid";
import { StatusMessage } from "../../components/StatusMessage/StatusMessage";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

import styles from "./PhoneList.module.css";

export function PhoneList() {
  usePageTitle("Smartphones");
  const location = useLocation();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const { products, isLoading, error, retry } = useProducts(debouncedSearch);

  const showSkeleton = isLoading && products.length === 0;
  const isRefetching = isLoading && !showSkeleton;

  return (
    <div>
      {location.state?.purchaseCompleted && (
        <StatusMessage message="Purchase completed" />
      )}

      <SearchBar value={search} onChange={setSearch} />
      <p className={styles.resultsCount} aria-live="polite">
        {products.length} results
      </p>

      {error && !isLoading && (
        <ErrorMessage message={error.message} onRetry={retry} />
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
