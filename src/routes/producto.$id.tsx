import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Ruler, Star, ShoppingBag, Truck, RefreshCw, ShieldCheck, X, Minus, Plus } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Comments } from "@/components/Comments";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { getProduct, relatedProducts, VIEW_LABELS, SIZE_GUIDE, FALLBACK_IMAGE, type Product } from "@/lib/products";
import { SafeImage } from "@/components/SafeImage";

import { useCart } from "@/lib/cart";
import { formatQ } from "@/lib/utils";

export const Route = createFileRoute("/producto/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Producto no disponible — NOVASTYLE" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} — NOVASTYLE` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — NOVASTYLE` },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:image", content: p.image },
        { name: "twitter:image", content: p.image },
      ],
    };
  },
  notFoundComponent: ProductNotFound,
  component: ProductPage,
});

function ProductNotFound() {
  return (
    <PageShell>
      <div className="grid min-h-[70vh] place-items-center px-4 pt-32 text-center">
        <div>
          <h1 className="text-3xl font-extrabold">Producto no encontrado</h1>
          <p className="mt-2 text-muted-foreground">Puede que ya no esté disponible en el catálogo.</p>
          <Link to="/productos" className="btn-glow mt-6 inline-block rounded-full bg-gradient-brand px-8 py-4 text-sm font-bold uppercase tracking-wider text-white">
            Volver al catálogo
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

function sizeGuideFor(p: Product) {
  if (p.category === "calzado") return SIZE_GUIDE.calzado;
  if (p.category === "ninos" || p.category === "ninas") return SIZE_GUIDE.ninos;
  return SIZE_GUIDE.adulto;
}

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { add } = useCart();
  const [index, setIndex] = useState(0);
  const [color, setColor] = useState(product.colors[0]?.name ?? "Único");
  const [size, setSize] = useState<string | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [guide, setGuide] = useState(false);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  const related = useMemo(() => relatedProducts(product, 6), [product]);
  const guideData = sizeGuideFor(product);

  const next = () => setIndex((i) => (i + 1) % product.images.length);
  const prev = () => setIndex((i) => (i - 1 + product.images.length) % product.images.length);

  const handleAdd = () => {
    if (!size) {
      setError("Selecciona una talla antes de continuar.");
      return;
    }
    setError("");
    add(product, { size, color, qty });
  };

  return (
    <PageShell>
      <div className="bg-gradient-soft pt-28 pb-6">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
            <Link to="/" className="hover:text-nova-purple">Inicio</Link><span>/</span>
            <Link to="/productos" className="hover:text-nova-purple">Productos</Link><span>/</span>
            <Link to="/productos" search={{ categoria: product.category }} className="hover:text-nova-purple">{product.categoryLabel}</Link>
            <span>/</span><span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="py-10">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:px-8">
          {/* Galería */}
          <div>
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted shadow-card"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
              }}
              onMouseLeave={() => setZoom(null)}
            >
              <SafeImage
                src={product.images[index]}
                fallback={FALLBACK_IMAGE[product.category]}
                alt={`${product.name} — ${VIEW_LABELS[index] ?? "fotografía"}`}
                className="h-full w-full object-cover object-center transition-transform duration-300"
                style={zoom ? { transform: "scale(2)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-nova-purple">
                {VIEW_LABELS[index] ?? "Fotografía del producto"}
              </span>
              {product.images.length > 1 && (
                <>
                  <button onClick={prev} aria-label="Anterior" className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-card hover:bg-white">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button onClick={next} aria-label="Siguiente" className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-card hover:bg-white">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {product.images.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => setIndex(i)}
                    aria-label={VIEW_LABELS[i] ?? `Fotografía ${i + 1}`}
                    className={`aspect-square overflow-hidden rounded-2xl ring-2 transition ${i === index ? "ring-nova-purple" : "ring-transparent hover:ring-nova-sky"}`}
                  >
                    <SafeImage src={src} fallback={FALLBACK_IMAGE[product.category]} alt={VIEW_LABELS[i] ?? ""} loading="lazy" className="h-full w-full object-cover object-center" />
                  </button>
                ))}
              </div>
            )}
            <p className="mt-2 text-center text-xs text-muted-foreground">Pasa el cursor sobre la imagen para hacer zoom.</p>
          </div>


          {/* Info */}
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-nova-purple">{product.categoryLabel} · {product.type}</div>
            <h1 className="mt-2 text-4xl font-extrabold leading-tight">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-nova-pink text-nova-pink" /> {product.rating.toFixed(1)}
              </span>
              {product.badge && <span className="rounded-full bg-gradient-brand px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">{product.badge}</span>}
            </div>
            <div className="mt-4 text-4xl font-black gradient-text">{formatQ(product.price)}</div>
            <p className="mt-4 text-base text-muted-foreground">{product.longDescription}</p>

            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-muted p-3"><dt className="text-xs font-bold uppercase text-muted-foreground">Categoría</dt><dd className="font-semibold">{product.categoryLabel}</dd></div>
              <div className="rounded-2xl bg-muted p-3"><dt className="text-xs font-bold uppercase text-muted-foreground">Estilo</dt><dd className="font-semibold">{product.style}</dd></div>
              <div className="rounded-2xl bg-muted p-3"><dt className="text-xs font-bold uppercase text-muted-foreground">Material</dt><dd className="font-semibold">{product.material}</dd></div>
              <div className="rounded-2xl bg-muted p-3"><dt className="text-xs font-bold uppercase text-muted-foreground">Disponibilidad</dt><dd className="font-semibold text-nova-purple">{product.availability}</dd></div>
            </dl>

            {product.fragrance && (
              <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-gradient-soft p-3"><dt className="text-xs font-bold uppercase text-muted-foreground">Tamaño</dt><dd className="font-semibold">{product.fragrance.ml}</dd></div>
                <div className="rounded-2xl bg-gradient-soft p-3"><dt className="text-xs font-bold uppercase text-muted-foreground">Familia olfativa</dt><dd className="font-semibold">{product.fragrance.family}</dd></div>
                <div className="col-span-2 rounded-2xl bg-gradient-soft p-3"><dt className="text-xs font-bold uppercase text-muted-foreground">Notas principales</dt><dd className="font-semibold">{product.fragrance.notes}</dd></div>
              </dl>
            )}


            {/* Colores */}
            <div className="mt-6">
              <div className="text-sm font-bold">Color: <span className="font-normal text-muted-foreground">{color}</span></div>
              <div className="mt-2 flex flex-wrap gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => { setColor(c.name); setIndex((i) => (i + 1) % product.images.length); }}
                    aria-label={c.name}
                    title={c.name}
                    className={`h-10 w-10 rounded-full border-2 transition ${color === c.name ? "border-nova-purple scale-110" : "border-border"}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Tallas */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold">{product.sizes.length === 1 ? "Presentación" : "Selecciona tu talla"}</div>
                {product.sizes.length > 1 && <button onClick={() => setGuide(true)} className="inline-flex items-center gap-1 text-xs font-bold text-nova-purple hover:underline">
                  <Ruler className="h-3 w-3" /> Guía de tallas
                </button>}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSize(s); setError(""); }}
                    className={`min-w-14 rounded-full border px-4 py-2 text-sm font-semibold transition ${size === s ? "border-transparent bg-gradient-brand text-white shadow-glow" : "border-border hover:border-nova-purple"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {error && <p className="mt-2 text-sm font-semibold text-destructive">{error}</p>}
            </div>

            {/* Cantidad + carrito */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-full border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Quitar" className="grid h-11 w-11 place-items-center rounded-l-full hover:bg-muted"><Minus className="h-4 w-4" /></button>
                <span className="w-10 text-center font-bold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Agregar" className="grid h-11 w-11 place-items-center rounded-r-full hover:bg-muted"><Plus className="h-4 w-4" /></button>
              </div>
              <button onClick={handleAdd} className="btn-glow inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-brand px-8 py-4 text-sm font-bold uppercase tracking-wider text-white">
                <ShoppingBag className="h-4 w-4" /> Agregar al carrito
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3 text-xs">
              <div className="flex items-center gap-2 rounded-2xl bg-gradient-soft p-3"><Truck className="h-4 w-4 text-nova-purple" /> Envío gratis desde Q500</div>
              <div className="flex items-center gap-2 rounded-2xl bg-gradient-soft p-3"><RefreshCw className="h-4 w-4 text-nova-purple" /> Cambios en 15 días</div>
              <div className="flex items-center gap-2 rounded-2xl bg-gradient-soft p-3"><ShieldCheck className="h-4 w-4 text-nova-purple" /> Compra protegida</div>
            </div>
          </div>
        </div>
      </section>

      {/* Opiniones */}
      <section className="pb-4">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Comments topic={`producto-${product.id}`} title="Opiniones del producto" />
        </div>
      </section>

      {/* Relacionados */}
      <section className="bg-gradient-soft py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-8 text-3xl font-extrabold">También te puede gustar</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 50}><ProductCard product={p} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Modal guía de tallas */}
      {guide && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setGuide(false)}>
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-extrabold">Guía de tallas</h3>
                <p className="text-sm text-muted-foreground">{guideData.title} — medidas orientativas.</p>
              </div>
              <button onClick={() => setGuide(false)} aria-label="Cerrar" className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-brand text-white">
                    {guideData.head.map((h) => <th key={h} className="px-3 py-2 text-left first:rounded-l-xl last:rounded-r-xl">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {guideData.rows.map((r) => (
                    <tr key={r[0]} className="border-b last:border-0">
                      {r.map((cell, i) => <td key={i} className="px-3 py-2">{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">¿Entre dos tallas? Recomendamos elegir la mayor para un ajuste más cómodo.</p>
            <button onClick={() => setGuide(false)} className="btn-glow mt-5 w-full rounded-full bg-gradient-brand py-3 text-sm font-bold uppercase tracking-wider text-white">Entendido</button>
          </div>
        </div>
      )}
    </PageShell>
  );
}
