import type { Product } from "../../types/product";
import { PhoneCard } from "../PhoneCard/PhoneCard";

import styles from "./PhoneGrid.module.css";

export function PhoneGrid({ products }: { products: Product[] }) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <PhoneCard key={product.id} product={product} />
      ))}
    </div>
  );
}
