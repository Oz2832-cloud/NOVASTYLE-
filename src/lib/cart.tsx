import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "./products";

export type CartItem = {
  key: string;
  product: Product;
  qty: number;
  size: string;
  color: string;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  add: (p: Product, opts?: { size?: string; color?: string; qty?: number }) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "novastyle-cart-v2";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add: CartCtx["add"] = (p, opts) => {
    const size = opts?.size ?? p.sizes[0] ?? "Única";
    const color = opts?.color ?? p.colors[0]?.name ?? "Único";
    const qty = opts?.qty ?? 1;
    const key = `${p.id}|${size}|${color}`;
    setItems((cur) => {
      const found = cur.find((x) => x.key === key);
      if (found) return cur.map((x) => (x.key === key ? { ...x, qty: x.qty + qty } : x));
      return [...cur, { key, product: p, qty, size, color }];
    });
    setOpen(true);
  };
  const remove = (key: string) => setItems((c) => c.filter((x) => x.key !== key));
  const setQty = (key: string, qty: number) =>
    setItems((c) => c.map((x) => (x.key === key ? { ...x, qty: Math.max(1, qty) } : x)));
  const clear = () => setItems([]);
  const count = items.reduce((s, x) => s + x.qty, 0);
  const subtotal = items.reduce((s, x) => s + x.qty * x.product.price, 0);
  const shipping = subtotal === 0 || subtotal >= 500 ? 0 : 35;
  const total = subtotal + shipping;

  return (
    <Ctx.Provider value={{ items, count, subtotal, shipping, total, add, remove, setQty, clear, open, setOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used within CartProvider");
  return v;
}
