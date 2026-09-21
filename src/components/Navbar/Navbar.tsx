import { Link } from "react-router-dom";
import { useCart } from "../../context/useCart";

import styles from "./Navbar.module.css";

export function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className={styles.header}>
      <Link to="/">MBST</Link>
      <Link
        className={styles.cartLink}
        to="/cart"
        aria-label={`Cart, ${totalItems} items`}
      >
        <span aria-hidden="true">🛒</span>
        <span>{totalItems}</span>
      </Link>
    </header>
  );
}
