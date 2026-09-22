import { Link } from "react-router-dom";
import styles from "./BackLink.module.css";

export function BackLink() {
  return (
    <Link to="/" className={styles.link}>
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M15 18L9 12L15 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      BACK
    </Link>
  );
}
