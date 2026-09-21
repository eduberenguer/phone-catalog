import styles from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div>
      <input
        className={styles.input}
        type="text"
        aria-label="Search for a smartphone"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for a smartphone..."
      />
    </div>
  );
}
