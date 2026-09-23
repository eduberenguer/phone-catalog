import type { Product } from "../../types/product";
import { PhoneCard } from "../PhoneCard/PhoneCard";
import { Skeleton } from "../Skeleton/Skeleton";

import styles from "./PhoneGrid.module.css";

const SKELETON_COUNT = 10;

interface PhoneGridProps {
  products: Product[];
  isLoading?: boolean;
}

export function PhoneGrid({ products, isLoading = false }: PhoneGridProps) {
  return (
    <div className={styles.grid}>
      {isLoading
        ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <Skeleton key={index} />
          ))
        : products.map((product) => (
            <PhoneCard key={product.id} product={product} />
          ))}
    </div>
  );
}
