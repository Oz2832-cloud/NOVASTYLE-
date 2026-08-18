import { Link } from "@tanstack/react-router";
import { Star, Eye } from "lucide-react";
import { FALLBACK_IMAGE, type Product } from "@/lib/products";
import { SafeImage } from "@/components/SafeImage";
import { formatQ } from "@/lib/utils";

const badgeStyles: Record<string, string> = {
  Nuevo: "bg-gradient-sky text-white",
  Oferta: "bg-gradient-sunset text-white",
  "Más vendido": "bg-nova-pink text-white",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group hover-lift overflow-hidden rounded-3xl bg-card shadow-soft">
      <Link to="/producto/$id" params={{ id: product.slug }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <SafeImage
            src={product.image}
            fallback={FALLBACK_IMAGE[product.category]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />

          {product.badge && (
            <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${badgeStyles[product.badge]}`}>
              {product.badge}
            </span>
          )}
          <span className="btn-glow absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-nova-purple opacity-0 shadow-card transition-all duration-300 group-hover:opacity-100">
            <Eye className="h-4 w-4" /> Ver producto
          </span>
        </div>
      </Link>
      <div className="p-4">
        <div className="text-[10px] font-bold uppercase tracking-widest text-nova-purple">
          {product.categoryLabel} · {product.type}
        </div>
        <Link to="/producto/$id" params={{ id: product.slug }}>
          <h3 className="mt-1 text-base font-bold leading-tight hover:text-nova-purple">{product.name}</h3>
        </Link>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-extrabold gradient-text">{formatQ(product.price)}</span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-nova-pink text-nova-pink" /> {product.rating.toFixed(1)}
          </span>
        </div>
        <Link
          to="/producto/$id"
          params={{ id: product.slug }}
          className="btn-glow mt-3 block w-full rounded-full bg-gradient-brand py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white"
        >
          Ver producto
        </Link>
      </div>
    </article>
  );
}
