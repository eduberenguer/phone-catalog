import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductDetail } from "../../hooks/useProductDetail";
import { NotFound } from "../NotFound/NotFound";
import { BackLink } from "../../components/BackLink/BackLink";
import { SpecsTable } from "../../components/SpecsTable/SpecsTable";
import { SimilarProducts } from "../../components/SimilarProducts/SimilarProducts";
import { StorageSelector } from "../../components/StorageSelector/StorageSelector";
import { ColorSelector } from "../../components/ColorSelector/ColorSelector";
import { formatPrice } from "../../utils/format";
import { useCart } from "../../context/useCart";

import styles from "./PhoneDetail.module.css";

export function PhoneDetail() {
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const { product, isLoading, error, isNotFound } = useProductDetail(id ?? "");
  const { addItem } = useCart();
  const navigate = useNavigate();

  if (!id) {
    return <div>Product ID is missing</div>;
  }

  if (isNotFound) {
    return <NotFound />;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return null;
  }

  const selectedStorageOption = product.storageOptions.find(
    (option) => option.capacity === selectedStorage,
  );
  const displayedPrice = selectedStorageOption
    ? formatPrice(selectedStorageOption.price)
    : `From ${formatPrice(Math.min(...product.storageOptions.map((o) => o.price)))}`;

  const displayedImage =
    product.colorOptions.find((color) => color.name === selectedColor)
      ?.imageUrl ?? product.imageUrl;

  const canAddToCart = Boolean(selectedStorage && selectedColor);

  function handleAddToCart() {
    if (!selectedStorageOption || !selectedColor || !product) return;

    addItem({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      imageUrl: displayedImage,
      storage: selectedStorageOption.capacity,
      color: selectedColor,
      price: selectedStorageOption.price,
    });

    navigate("/cart");
  }

  return (
    <div className={styles.page}>
      <BackLink />

      <div className={styles.layout}>
        <img src={displayedImage} alt={product.name} className={styles.image} />

        <div className={styles.info}>
          <h1>{product.name}</h1>
          <p className={styles.price}>{displayedPrice}</p>

          <div>
            <h2>Storage. How much space do you need?</h2>
            <StorageSelector
              options={product.storageOptions}
              selected={selectedStorage}
              onChange={setSelectedStorage}
            />
          </div>

          <div>
            <h2>Color. Pick your favourite.</h2>
            <ColorSelector
              options={product.colorOptions}
              selected={selectedColor}
              onChange={setSelectedColor}
            />
            {selectedColor && <p>{selectedColor}</p>}
          </div>

          <button
            className={styles.addButton}
            disabled={!canAddToCart}
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>

      <SpecsTable product={product} />
      <SimilarProducts products={product.similarProducts} />
    </div>
  );
}
