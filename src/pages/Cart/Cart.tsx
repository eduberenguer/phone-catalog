import { useNavigate } from "react-router-dom";
import { CartItemRow } from "../../components/CartItemRow/CartItemRow";
import { useCart } from "../../context/useCart";
import { usePageTitle } from "../../hooks/usePageTitle";
import { formatPrice } from "../../utils/format";

import styles from "./Cart.module.css";

export function Cart() {
  usePageTitle("Cart");
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const isEmpty = items.length === 0;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Cart ({items.length})</h1>

      {!isEmpty &&
        items.map((item) => <CartItemRow key={item.lineId} item={item} />)}

      <div className={styles.footer}>
        {!isEmpty && (
          <p className={styles.total}>
            <span>TOTAL</span>
            <span>{formatPrice(totalPrice)}</span>
          </p>
        )}

        <button className={styles.continueButton} onClick={() => navigate("/")}>
          CONTINUE SHOPPING
        </button>

        {!isEmpty && (
          <button
            className={styles.payButton}
            onClick={() => {
              clearCart();
              navigate("/", { state: { purchaseCompleted: true } });
            }}
          >
            PAY
          </button>
        )}
      </div>
    </div>
  );
}
