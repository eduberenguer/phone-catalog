import { useState } from "react";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useProducts } from "../../hooks/useProducts";

import styles from "./PhoneList.module.css";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { PhoneGrid } from "../../components/PhoneGrid/PhoneGrid";

export function PhoneList() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const { products, loading, error, retry } = useProducts(debouncedSearch);

  return (
    <div className={styles.phoneList}>
      <SearchBar value={search} onChange={setSearch} />

      {loading && <div className={styles.loading}>Loading...</div>}

      {!loading && error && (
        <div className={styles.error}>
          <p>Error: {error.message}</p>
          <button onClick={retry}>Retry</button>
        </div>
      )}

      {!loading && !error && <PhoneGrid products={products} />}
    </div>
  );
}
