import { useCart } from "../../context/useCart";
import type { CartItem } from "../../types/cart";
import { formatPrice } from "../../utils/format";

import styles from "./CartItemRow.module.css";

export function CartItemRow({ item }: { item: CartItem }) {
  const { removeItem } = useCart();

  return (
    <div className={styles.row}>
      <img src={item.imageUrl} alt={item.name} />
      <div className={styles.info}>
        <p>{item.name}</p>
        <p>
          {item.storage} | {item.color.toUpperCase()}
        </p>
        <p>{formatPrice(item.price)}</p>
      </div>
      <button
        className={styles.remove}
        aria-label={`Remove ${item.name}`}
        onClick={() => removeItem(item.lineId)}
      >
        Remove
      </button>
    </div>
  );
}
