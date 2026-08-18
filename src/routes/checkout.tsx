import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, CreditCard, Lock, ShoppingBag } from "lucide-react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { useCart } from "@/lib/cart";
import { formatQ } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout simulado — NOVASTYLE" },
      { name: "description", content: "Finaliza tu pedido NOVASTYLE en un checkout de demostración académica: resumen del pedido y pago simulado en Quetzales." },
      { property: "og:title", content: "Checkout simulado — NOVASTYLE" },
      { property: "og:description", content: "Resumen de pedido y pago simulado NOVASTYLE. Demostración académica, sin pagos reales." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

type Errors = Partial<Record<"name" | "card" | "exp" | "cvv", string>>;

function CheckoutPage() {
  const { items, subtotal, shipping, total, clear } = useCart();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const digits = card.replace(/\D/g, "");

  const validate = () => {
    const e: Errors = {};
    if (name.trim().length < 3) e.name = "Ingresa el nombre del titular.";
    if (digits.length !== 16) e.card = "El número de tarjeta debe tener 16 dígitos.";
    const m = exp.match(/^(\d{2})\/(\d{2})$/);
    if (!m || Number(m[1]) < 1 || Number(m[1]) > 12) e.exp = "Formato válido: MM/AA.";
    if (!/^\d{3,4}$/.test(cvv)) e.cvv = "CVV de 3 o 4 dígitos.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    // Demostración académica: no se envía ni guarda ningún dato bancario.
    setName(""); setCard(""); setExp(""); setCvv("");
    clear();
    setDone(true);
  };

  const inputCls = (bad?: string) =>
    `mt-1 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-colors focus:border-nova-purple ${bad ? "border-destructive" : "border-border"}`;

  return (
    <PageShell>
      <PageHeader eyebrow="Pedido" title="Checkout" subtitle="Revisa tu pedido y completa el pago simulado. Demostración académica." />
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          {done ? (
            <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-card">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-soft">
                <CheckCircle2 className="h-10 w-10 text-nova-purple" />
              </div>
              <h2 className="mt-6 text-2xl font-extrabold gradient-text">¡Compra simulada realizada con éxito! Gracias por elegir NOVASTYLE.</h2>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/productos" className="btn-glow rounded-full bg-gradient-brand px-6 py-3 text-xs font-bold uppercase tracking-wider text-white">Seguir comprando</Link>
                <Link to="/" className="rounded-full border border-input px-6 py-3 text-xs font-bold uppercase tracking-wider text-nova-purple">Volver al inicio</Link>
              </div>
              <p className="mt-6 text-[11px] text-muted-foreground">Demostración académica. No se procesan pagos reales.</p>
            </div>
          ) : items.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-card">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-soft">
                <ShoppingBag className="h-8 w-8 text-nova-purple" />
              </div>
              <p className="mt-4 font-semibold">Tu carrito está vacío</p>
              <p className="text-sm text-muted-foreground">Agrega productos para poder finalizar tu compra.</p>
              <button onClick={() => navigate({ to: "/productos" })} className="btn-glow mt-6 rounded-full bg-gradient-brand px-6 py-3 text-xs font-bold uppercase tracking-wider text-white">
                Ver productos
              </button>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
              <div className="rounded-3xl bg-white p-6 shadow-card">
                <h2 className="text-lg font-bold">Resumen del pedido</h2>
                <ul className="mt-4 space-y-4">
                  {items.map(({ key, product, qty, size, color }) => (
                    <li key={key} className="flex gap-3 rounded-2xl border border-border p-3">
                      <img src={product.image} alt={product.name} className="h-24 w-20 rounded-xl object-cover" />
                      <div className="flex flex-1 flex-col">
                        <span className="text-sm font-semibold">{product.name}</span>
                        <span className="text-xs text-muted-foreground">{product.categoryLabel}</span>
                        <span className="mt-1 text-xs font-semibold text-nova-purple">Talla {size} · {color}</span>
                        <div className="mt-auto flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Cantidad: {qty}</span>
                          <span className="font-bold text-nova-purple">{formatQ(product.price * qty)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 border-t pt-4 text-sm">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Subtotal</span><span className="font-semibold text-foreground">{formatQ(subtotal)}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-muted-foreground">
                    <span>Envío</span><span className="font-semibold text-foreground">{shipping === 0 ? "Gratis" : formatQ(shipping)}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t pt-3 text-lg">
                    <span className="font-medium">Total</span>
                    <span className="font-extrabold gradient-text">{formatQ(total)}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={onSubmit} noValidate className="h-fit rounded-3xl bg-white p-6 shadow-card">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-nova-purple" />
                  <h2 className="text-lg font-bold">Pago simulado</h2>
                </div>
                <div className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="ck-name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nombre del titular</label>
                    <input id="ck-name" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} placeholder="Melany Pérez" className={inputCls(errors.name)} />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="ck-card" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Número de tarjeta</label>
                    <input
                      id="ck-card" inputMode="numeric" autoComplete="off" value={card}
                      onChange={(e) => setCard(e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim())}
                      placeholder="4242 4242 4242 4242" className={inputCls(errors.card)}
                    />
                    {errors.card && <p className="mt-1 text-xs text-destructive">{errors.card}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="ck-exp" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Vence (MM/AA)</label>
                      <input
                        id="ck-exp" inputMode="numeric" autoComplete="off" value={exp}
                        onChange={(e) => {
                          const d = e.target.value.replace(/\D/g, "").slice(0, 4);
                          setExp(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
                        }}
                        placeholder="12/28" className={inputCls(errors.exp)}
                      />
                      {errors.exp && <p className="mt-1 text-xs text-destructive">{errors.exp}</p>}
                    </div>
                    <div>
                      <label htmlFor="ck-cvv" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">CVV</label>
                      <input id="ck-cvv" inputMode="numeric" autoComplete="off" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="123" className={inputCls(errors.cvv)} />
                      {errors.cvv && <p className="mt-1 text-xs text-destructive">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn-glow mt-6 w-full rounded-full bg-gradient-brand py-4 text-sm font-bold uppercase tracking-wider text-white">
                  Confirmar compra
                </button>
                <p className="mt-3 flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
                  <Lock className="h-3 w-3" /> Demostración académica. No se procesan pagos reales.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
