import styles from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        aria-label="Search for a smartphone"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for a smartphone..."
      />
      {value && (
        <button
          type="button"
          className={styles.clearButton}
          aria-label="Clear search"
          onClick={() => onChange("")}
        >
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
            <path
              d="M3 3L13 13M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
