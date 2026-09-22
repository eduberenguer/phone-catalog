import type { Product } from "../../types/product";
import { PhoneCard } from "../PhoneCard/PhoneCard";
import styles from "./SimilarProducts.module.css";

interface SimilarProductsProps {
  products: Product[];
}

export function SimilarProducts({ products }: SimilarProductsProps) {
  if (products.length === 0) return null;

  return (
    <section>
      <h2>Similar items</h2>
      <div className={styles.carousel}>
        {products.map((product) => (
          <div key={product.id} className={styles.item}>
            <PhoneCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
