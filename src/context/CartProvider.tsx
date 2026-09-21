import { useEffect, useState } from "react";
import type { CartItem } from "../types/cart";
import { CartContext } from "./cart-context";

function readStoredCart(): CartItem[] {
  const storedCart = localStorage.getItem("phone-catalog:cart");
  if (storedCart) {
    try {
      return JSON.parse(storedCart) as CartItem[];
    } catch {
      return [];
    }
  }

  return [];
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readStoredCart);

  useEffect(() => {
    localStorage.setItem("phone-catalog:cart", JSON.stringify(items));
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
