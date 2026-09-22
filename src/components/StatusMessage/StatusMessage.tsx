import { useEffect, useState } from "react";

import styles from "./StatusMessage.module.css";

export function StatusMessage({ message }: { message: string }) {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return visible ? (
    <p className={styles.message} role="status">
      {message}
    </p>
  ) : null;
}
