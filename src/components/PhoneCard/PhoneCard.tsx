import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { formatPrice } from "../../utils/format";

import styles from "./PhoneCard.module.css";

export function PhoneCard({ product }: { product: Product }) {
  return (
    <div className={styles.card}>
      <Link to={`/phone/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} />
        <p>{product.name}</p>
        <div>
          <span className={styles.brand}>{product.brand}</span>
          <span className={styles.price}>{formatPrice(product.basePrice)}</span>
        </div>
      </Link>
    </div>
  );
}
