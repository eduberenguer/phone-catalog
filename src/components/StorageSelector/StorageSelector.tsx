import type { StorageOption } from "../../types/product";

import styles from "./StorageSelector.module.css";

interface StorageSelectorProps {
  options: StorageOption[];
  selected: string | null;
  onChange: (capacity: string) => void;
}

export function StorageSelector({
  options,
  selected,
  onChange,
}: StorageSelectorProps) {
  return (
    <div role="radiogroup" aria-label="Storage" className={styles.group}>
      {options.map((option) => (
        <button
          key={option.capacity}
          role="radio"
          aria-checked={selected === option.capacity}
          className={`${styles.option} ${selected === option.capacity ? styles.selected : ""}`}
          onClick={() => onChange(option.capacity)}
        >
          {option.capacity}
        </button>
      ))}
    </div>
  );
}
