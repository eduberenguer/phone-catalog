import { useEffect, useRef } from "react";
import type { Product } from "../../types/product";
import { PhoneCard } from "../PhoneCard/PhoneCard";

import styles from "./SimilarProducts.module.css";

interface SimilarProductsProps {
  products: Product[];
}

export function SimilarProducts({ products }: SimilarProductsProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  function updateThumb() {
    const carousel = carouselRef.current;
    const thumb = thumbRef.current;
    if (!carousel || !thumb) return;

    const { scrollLeft, scrollWidth, clientWidth } = carousel;
    thumb.style.width = `${(clientWidth / scrollWidth) * 100}%`;
    thumb.style.left = `${(scrollLeft / scrollWidth) * 100}%`;
  }

  useEffect(() => {
    updateThumb();
  }, [products]);

  if (products.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Similar items</h2>
      <div className={styles.carousel} ref={carouselRef} onScroll={updateThumb}>
        {products.map((product) => (
          <div key={product.id} className={styles.item}>
            <PhoneCard product={product} bordered={false} />
          </div>
        ))}
      </div>
      <div className={styles.scrollTrack}>
        <div className={styles.scrollThumb} ref={thumbRef} />
      </div>
    </section>
  );
}
