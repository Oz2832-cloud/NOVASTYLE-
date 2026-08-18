import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatQ } from "@/lib/utils";

export function CartDrawer() {
  const { open, setOpen, items, remove, setQty, subtotal, shipping, total, clear } = useCart();
  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b p-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-nova-purple" />
            <h3 className="text-lg font-bold">Tu carrito</h3>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Cerrar" className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"><X className="h-4 w-4" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-soft">
                  <ShoppingBag className="h-8 w-8 text-nova-purple" />
                </div>
                <p className="mt-4 font-semibold">Tu carrito está vacío</p>
                <p className="text-sm text-muted-foreground">Explora nuestras colecciones y encuentra tu próximo look.</p>
                <Link to="/productos" onClick={() => setOpen(false)} className="btn-glow mt-5 inline-block rounded-full bg-gradient-brand px-6 py-3 text-xs font-bold uppercase tracking-wider text-white">
                  Ver productos
                </Link>
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(({ key, product, qty, size, color }) => (
                <li key={key} className="flex gap-3 rounded-2xl border border-border p-3">
                  <Link to="/producto/$id" params={{ id: product.slug }} onClick={() => setOpen(false)}>
                    <img src={product.image} alt={product.name} className="h-24 w-20 rounded-xl object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link to="/producto/$id" params={{ id: product.slug }} onClick={() => setOpen(false)} className="text-sm font-semibold hover:text-nova-purple">
                          {product.name}
                        </Link>
                        <div className="text-xs text-muted-foreground">{product.categoryLabel}</div>
                        <div className="mt-1 text-xs font-semibold text-nova-purple">Talla {size} · {color}</div>
                      </div>
                      <button onClick={() => remove(key)} aria-label="Eliminar" className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border">
                        <button onClick={() => setQty(key, qty - 1)} aria-label="Restar" className="grid h-8 w-8 place-items-center hover:bg-muted rounded-l-full"><Minus className="h-3 w-3" /></button>
                        <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                        <button onClick={() => setQty(key, qty + 1)} aria-label="Sumar" className="grid h-8 w-8 place-items-center hover:bg-muted rounded-r-full"><Plus className="h-3 w-3" /></button>
                      </div>
                      <div className="text-sm font-bold text-nova-purple">{formatQ(product.price * qty)}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-5">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Subtotal</span><span className="font-semibold text-foreground">{formatQ(subtotal)}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
              <span>Envío</span><span className="font-semibold text-foreground">{shipping === 0 ? "Gratis" : formatQ(shipping)}</span>
            </div>
            <div className="mt-3 mb-4 flex items-center justify-between border-t pt-3 text-lg">
              <span className="font-medium">Total</span>
              <span className="font-extrabold gradient-text">{formatQ(total)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="btn-glow block w-full rounded-full bg-gradient-brand py-4 text-center text-sm font-bold uppercase tracking-wider text-white"
            >
              Finalizar compra
            </Link>
            <Link to="/productos" onClick={() => setOpen(false)} className="mt-2 block w-full rounded-full py-2 text-center text-xs font-semibold text-nova-purple hover:underline">
              Seguir comprando
            </Link>
            <button onClick={clear} className="mt-1 w-full rounded-full py-2 text-xs text-muted-foreground hover:text-destructive">Vaciar carrito</button>
          </div>
        )}
      </aside>
    </>
  );
}
