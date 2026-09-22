import { Link } from "react-router-dom";
import { useCart } from "../../context/useCart";
import { LogoMark } from "./LogoMark";

import styles from "./Navbar.module.css";

export function Navbar() {
  const { totalItems } = useCart();
  const hasItems = totalItems > 0;

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo} aria-label="MBST, go to home">
        <LogoMark className={styles.logoMark} />
        <span>MBST</span>
      </Link>
      <Link
        className={styles.cartLink}
        to="/cart"
        aria-label={`Cart, ${totalItems} items`}
      >
        <svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          {hasItems ? (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.4706 4H9.76471V7.76471H6V20H18.2353V7.76471H14.4706V4ZM13.5294 7.76471V11.0588H14.4706V7.76471H13.5294ZM10.7059 7.76471V11.0588H9.76471V7.76471H10.7059ZM10.7059 7.76471H13.5294V4.94118H10.7059V7.76471Z"
              fill="currentColor"
            />
          ) : (
            <path
              d="M6 7.76471H18.2353V20H6V7.76471Z M9.76471 7.76471V4H14.4706V7.76471"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
          )}
        </svg>
        <span>{totalItems}</span>
      </Link>
    </header>
  );
}
