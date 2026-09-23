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
        name="search"
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
          <svg aria-hidden="true" width="20" height="19" viewBox="0 0 20 19">
            <path
              d="M9.22887 9.36147L6 12.4289L6.62613 13.0237L9.855 9.95629L13.0839 13.0237L13.71 12.4289L10.4811 9.36147L13.71 6.29404L13.0839 5.69922L9.855 8.76664L6.62613 5.69922L6 6.29404L9.22887 9.36147Z"
              fill="currentColor"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
