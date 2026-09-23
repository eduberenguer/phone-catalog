import type { ProductDetail } from "../../types/product";

import styles from "./SpecsTable.module.css";

interface SpecsTableProps {
  product: ProductDetail;
}

const specLabels: Record<string, string> = {
  screen: "Screen",
  resolution: "Resolution",
  processor: "Processor",
  mainCamera: "Main camera",
  selfieCamera: "Selfie camera",
  battery: "Battery",
  os: "OS",
  screenRefreshRate: "Screen refresh rate",
  storage: "Storage",
};

export function SpecsTable({ product }: SpecsTableProps) {
  const rows: [string, string][] = [
    ["Brand", product.brand],
    ["Name", product.name],
    ["Description", product.description],
    ...Object.entries(product.specs)
      .filter(([, value]) => value !== undefined)
      .map(
        ([key, value]) =>
          [specLabels[key] ?? key, value as string] as [string, string],
      ),
  ];

  return (
    <div className={styles.table}>
      <h2 className={styles.heading}>Specifications</h2>
      <dl>
        {rows.map(([label, value]) => (
          <div key={label} className={styles.row}>
            <dt className={styles.label}>{label}</dt>
            <dd className={styles.value}>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
