import type { ColorOption } from "../../types/product";

import styles from "./ColorSelector.module.css";

interface ColorSelectorProps {
  options: ColorOption[];
  selected: string | null;
  onChange: (name: string) => void;
}

export function ColorSelector({
  options,
  selected,
  onChange,
}: ColorSelectorProps) {
  return (
    <div role="radiogroup" aria-label="Color" className={styles.group}>
      {options.map((option) => (
        <button
          key={option.name}
          role="radio"
          aria-checked={selected === option.name}
          aria-label={option.name}
          className={`${styles.option} ${selected === option.name ? styles.selected : ""}`}
          style={{ backgroundColor: option.hexCode }}
          onClick={() => onChange(option.name)}
        />
      ))}
    </div>
  );
}
