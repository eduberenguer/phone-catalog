import { useEffect, useState } from "react";
import type { CartItem } from "../types/cart";
import { CartContext } from "./cart-context";

const STORAGE_KEY = "phone-catalog:cart";

function readStoredCart(): CartItem[] {
  try {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    return storedCart ? (JSON.parse(storedCart) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function writeStoredCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    return;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readStoredCart);

  useEffect(() => {
    writeStoredCart(items);
  }, [items]);

  const addItem = (item: Omit<CartItem, "lineId">) => {
    const newItem: CartItem = {
      ...item,
      lineId: crypto.randomUUID(),
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const removeItem = (lineId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.lineId !== lineId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.length;
  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}
