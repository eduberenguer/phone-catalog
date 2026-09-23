import { Link } from "react-router-dom";
import { useCart } from "../../context/useCart";
import type { CartItem } from "../../types/cart";
import { formatPrice } from "../../utils/format";

import styles from "./CartItemRow.module.css";

export function CartItemRow({ item }: { item: CartItem }) {
  const { removeItem } = useCart();

  return (
    <div className={styles.row}>
      <Link to={`/phone/${item.productId}`} className={styles.imageLink}>
        <img src={item.imageUrl} alt={item.name} className={styles.image} />
      </Link>
      <div className={styles.info}>
        <div className={styles.details}>
          <p className={styles.name}>{item.name}</p>
          <p className={styles.variant}>
            {item.storage} | {item.color.toUpperCase()}
          </p>
          <p className={styles.price}>{formatPrice(item.price)}</p>
        </div>
        <button
          className={styles.remove}
          aria-label={`Remove ${item.name}`}
          onClick={() => removeItem(item.lineId)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
