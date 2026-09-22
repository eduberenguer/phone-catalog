import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { formatPrice } from "../../utils/format";

import styles from "./PhoneCard.module.css";

interface PhoneCardProps {
  product: Product;
  bordered?: boolean;
}

export function PhoneCard({ product, bordered = true }: PhoneCardProps) {
  return (
    <div className={bordered ? styles.card : styles.cardPlain}>
      <Link to={`/phone/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} />
        <span className={styles.brand}>{product.brand}</span>
        <div className={styles.info}>
          <p className={styles.name}>{product.name}</p>
          <span className={styles.price}>{formatPrice(product.basePrice)}</span>
        </div>
      </Link>
    </div>
  );
}
