import { Link } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";

import styles from "./NotFound.module.css";

export function NotFound() {
  usePageTitle("Page not found");

  return (
    <div className={styles.page}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>Page not found</p>
      <Link to="/" className={styles.link}>
        Back to home
      </Link>
    </div>
  );
}
