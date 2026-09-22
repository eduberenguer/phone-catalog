import { useEffect, useState } from "react";

import styles from "./StatusMessage.module.css";

export function StatusMessage({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLeaving(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <p
      className={`${styles.message} ${leaving ? styles.leaving : ""}`}
      role="status"
      onAnimationEnd={() => leaving && setVisible(false)}
    >
      {message}
    </p>
  );
}
