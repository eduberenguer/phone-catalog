import { useNavigate } from "react-router-dom";
import { CartItemRow } from "../../components/CartItemRow/CartItemRow";
import { useCart } from "../../context/useCart";
import { formatPrice } from "../../utils/format";

import styles from "./Cart.module.css";

export function Cart() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) return <p className={styles.empty}>Empty cart</p>;

  return (
    <div>
      <h1>Cart ({items.length})</h1>
      {items.map((item) => {
        return <CartItemRow key={item.lineId} item={item} />;
      })}
      <footer className={styles.footer}>
        <div>
          <p className={styles.total}>TOTAL {formatPrice(totalPrice)}</p>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.continueButton}
            onClick={() => navigate("/")}
          >
            CONTINUE SHOPPING
          </button>
          <button
            className={styles.payButton}
            onClick={() => {
              clearCart();
              navigate("/", { state: { purchaseCompleted: true } });
            }}
          >
            PAY
          </button>
        </div>
      </footer>
    </div>
  );
}
