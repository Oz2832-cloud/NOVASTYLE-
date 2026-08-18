import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/lib/products";

type Search = { categoria?: string; q?: string };

const PAGE_SIZE = 24;

const PRICE_RANGES = [
  { key: "todos", label: "Todos los precios", min: 0, max: Infinity },
  { key: "0-200", label: "Hasta Q200", min: 0, max: 200 },
  { key: "200-400", label: "Q200 – Q400", min: 200, max: 400 },
  { key: "400-700", label: "Q400 – Q700", min: 400, max: 700 },
  { key: "700+", label: "Más de Q700", min: 700, max: Infinity },
];

export const Route = createFileRoute("/productos")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    categoria: typeof search.categoria === "string" ? search.categoria : undefined,
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Productos — NOVASTYLE" },
      { name: "description", content: "Catálogo completo NOVASTYLE: hombre, mujer, niños, niñas, calzado, bolsos, joyería, accesorios y fragancias. Precios en Quetzales." },
      { property: "og:title", content: "Productos — NOVASTYLE" },
      { property: "og:description", content: "99 productos seleccionados con moda, belleza y cuidado personal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductosPage,
});

function ProductosPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/productos" });
  const filter = search.categoria ?? "todos";
  const [query, setQuery] = useState(search.q ?? "");
  const [type, setType] = useState("todos");
  const [size, setSize] = useState("todas");
  const [color, setColor] = useState("todos");
  const [price, setPrice] = useState("todos");
  const [page, setPage] = useState(1);

  const inCategory = useMemo(
    () => PRODUCTS.filter((p) => filter === "todos" || p.category === filter),
    [filter],
  );

  const types = useMemo(
    () => ["todos", ...Array.from(new Set(inCategory.map((p) => p.type)))],
    [inCategory],
  );
  const sizes = useMemo(
    () => ["todas", ...Array.from(new Set(inCategory.flatMap((p) => p.sizes)))],
    [inCategory],
  );
  const colors = useMemo(() => {
    const map = new Map<string, string>();
    inCategory.forEach((p) => p.colors.forEach((c) => map.set(c.name, c.hex)));
    return Array.from(map, ([name, hex]) => ({ name, hex }));
  }, [inCategory]);

  const filtered = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.key === price) ?? PRICE_RANGES[0];
    const q = query.trim().toLowerCase();
    return inCategory.filter(
      (p) =>
        (type === "todos" || p.type === type) &&
        (size === "todas" || p.sizes.includes(size)) &&
        (color === "todos" || p.colors.some((c) => c.name === color)) &&
        p.price >= range.min &&
        p.price <= range.max &&
        (q === "" ||
          p.name.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.style.toLowerCase().includes(q)),
    );
  }, [inCategory, type, size, color, price, query]);

  useEffect(() => {
    setPage(1);
  }, [filter, type, size, color, price, query]);

  const resetSubfilters = () => {
    setType("todos");
    setSize("todas");
    setColor("todos");
    setPrice("todos");
  };

  const setCategory = (key: string) => {
    resetSubfilters();
    navigate({ search: { categoria: key === "todos" ? undefined : key, q: query || undefined } });
  };

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const shown = filtered.slice(start, start + PAGE_SIZE);
  const goToPage = (next: number) => {
    setPage(Math.max(1, Math.min(next, totalPages)));
    if (typeof window !== "undefined") window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Catálogo"
        title="Productos"
        subtitle={`Explora nuestra colección de ${PRODUCTS.length} productos cuidadosamente seleccionados entre moda para mujer, hombre, niños y niñas, calzado, bolsos, joyería, accesorios, fragancias, skincare, cuidado personal y maquillaje.`}
      />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setCategory(c.key)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${filter === c.key ? "bg-gradient-brand text-white shadow-glow" : "bg-muted text-foreground hover:bg-secondary"}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre o categoría…"
              className="w-full max-w-xs rounded-full border border-input bg-white px-5 py-2.5 text-sm focus:border-nova-purple focus:outline-none"
            />
          </div>

          {types.length > 2 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${type === t ? "border-transparent bg-nova-purple text-white" : "border-border text-muted-foreground hover:border-nova-purple hover:text-nova-purple"}`}
                >
                  {t === "todos" ? "Todos los tipos" : t}
                </button>
              ))}
            </div>
          )}

          <div className="mb-6 grid gap-4 rounded-3xl bg-muted/50 p-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className="text-xs font-bold uppercase tracking-widest text-nova-purple">
              Talla
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="mt-1 w-full rounded-full border border-input bg-white px-4 py-2 text-sm font-medium normal-case tracking-normal text-foreground focus:border-nova-purple focus:outline-none"
              >
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s === "todas" ? "Todas las tallas" : s}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-xs font-bold uppercase tracking-widest text-nova-purple">
              Precio
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 w-full rounded-full border border-input bg-white px-4 py-2 text-sm font-medium normal-case tracking-normal text-foreground focus:border-nova-purple focus:outline-none"
              >
                {PRICE_RANGES.map((r) => (
                  <option key={r.key} value={r.key}>
                    {r.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="text-xs font-bold uppercase tracking-widest text-nova-purple">
              Color
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setColor("todos")}
                  className={`rounded-full border px-3 py-1 text-[11px] font-semibold normal-case tracking-normal ${color === "todos" ? "border-transparent bg-nova-purple text-white" : "border-border text-muted-foreground"}`}
                >
                  Todos
                </button>
                {colors.map((c) => (
                  <button
                    key={c.name}
                    title={c.name}
                    aria-label={c.name}
                    onClick={() => setColor(c.name)}
                    className={`h-7 w-7 rounded-full border-2 transition hover:scale-110 ${color === c.name ? "border-nova-purple ring-2 ring-nova-purple/30" : "border-border"}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="mb-6 text-sm text-muted-foreground">
            {PRODUCTS.length} productos disponibles · mostrando {filtered.length ? start + 1 : 0}–{Math.min(start + shown.length, filtered.length)} de {filtered.length}
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {shown.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>

          {filtered.length > PAGE_SIZE && (
            <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Paginación de productos">
              <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)} className="rounded-full border px-4 py-2 text-sm font-semibold disabled:opacity-40">← Anterior</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((n) => totalPages <= 7 || n === 1 || n === totalPages || Math.abs(n - currentPage) <= 1)
                .map((n, idx, arr) => (
                  <span key={n} className="flex items-center gap-2">
                    {idx > 0 && n - arr[idx - 1] > 1 && <span className="px-1 text-muted-foreground">…</span>}
                    <button onClick={() => goToPage(n)} aria-current={n === currentPage ? "page" : undefined} className={`h-10 min-w-10 rounded-full px-3 text-sm font-bold ${n === currentPage ? "bg-gradient-brand text-white shadow-glow" : "border border-border bg-white text-foreground hover:border-nova-purple"}`}>{n}</button>
                  </span>
                ))}
              <button disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)} className="rounded-full border px-4 py-2 text-sm font-semibold disabled:opacity-40">Siguiente →</button>
            </nav>
          )}

          {filtered.length === 0 && (
            <div className="mt-16 text-center">
              <p className="text-lg font-bold">Sin resultados para tu búsqueda</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Prueba con otra categoría, talla o color, o limpia los filtros.
              </p>
              <button
                onClick={() => {
                  resetSubfilters();
                  setQuery("");
                }}
                className="btn-glow mt-6 rounded-full bg-gradient-brand px-8 py-3 text-sm font-bold uppercase tracking-wider text-white"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
