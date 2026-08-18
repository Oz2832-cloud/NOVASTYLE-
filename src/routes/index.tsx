import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Star, Flame, Heart, Gift, ShoppingBag, Play } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { PRODUCTS } from "@/lib/products";
import { LOGO_URL, BRAND } from "@/lib/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOVASTYLE — Fashion & Apparel | Tienda de ropa moderna" },
      { name: "description", content: "Descubre la nueva colección NOVASTYLE. Hoodies, jeans, vestidos, sneakers y accesorios con envíos a toda Guatemala." },
      { property: "og:title", content: "NOVASTYLE — Fashion & Apparel" },
      { property: "og:description", content: "La nueva colección ya está aquí. Descúbrela." },
    ],
  }),
  component: Home,
});

const CATEGORIES = [
  { label: "Moda Hombre", cat: "hombre", img: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=900&auto=format&fit=crop&q=80", gradient: "from-nova-blue to-nova-purple" },
  { label: "Moda Mujer", cat: "mujer", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&auto=format&fit=crop&q=80", gradient: "from-nova-pink to-nova-purple" },
  { label: "Niños", cat: "ninos", img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=900&auto=format&fit=crop&q=80", gradient: "from-nova-sky to-nova-blue" },
  { label: "Niñas", cat: "ninas", img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=900&auto=format&fit=crop&q=80", gradient: "from-nova-pink to-nova-rose" },
  { label: "Calzado", cat: "calzado", img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=900&auto=format&fit=crop&q=80", gradient: "from-nova-purple to-nova-pink" },
  { label: "Bolsos", cat: "bolsos", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&auto=format&fit=crop&q=80", gradient: "from-nova-blue to-nova-sky" },
  { label: "Joyería", cat: "joyeria", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&auto=format&fit=crop&q=80", gradient: "from-nova-purple to-nova-rose" },
  { label: "Fragancias", cat: "fragancias", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&auto=format&fit=crop&q=80", gradient: "from-nova-blue to-nova-pink" },
  { label: "Accesorios", cat: "accesorios", img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=900&auto=format&fit=crop&q=80", gradient: "from-nova-sky to-nova-purple" },
  { label: "Nueva Colección", cat: "todos", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop&q=80", gradient: "from-nova-pink to-nova-blue" },
];

const TESTIMONIALS = [
  { name: "Andrea M.", role: "Zona 10, Guatemala", text: "El vestido que compré llegó impecable y en menos de 48 horas. Ya es mi tienda favorita.", rating: 5 },
  { name: "Carlos R.", role: "Xela", text: "Calidad increíble por el precio. La hoodie se ve premium y el envío fue rapidísimo.", rating: 5 },
  { name: "Sofía L.", role: "Antigua Guatemala", text: "Amo el diseño de la tienda y las promociones. Siempre encuentro algo nuevo.", rating: 5 },
];

function Home() {
  const featured = PRODUCTS.slice(0, 8);
  const bestsellers = PRODUCTS.filter((p) => p.badge === "Más vendido").slice(0, 4);

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative isolate min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-brand" />
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(1000px 500px at 10% 10%, rgba(255,255,255,.28), transparent 60%), radial-gradient(700px 500px at 90% 80%, rgba(255,255,255,.18), transparent 60%)" }} />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-floaty" />
        <div className="absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-nova-pink/40 blur-3xl animate-floaty" style={{ animationDelay: "-3s" }} />

        <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-32 lg:grid-cols-2 lg:px-8">
          <div className="text-white animate-fade-up">
            <div className="mb-6 flex items-center gap-3">
              <img src={LOGO_URL} alt="NOVASTYLE" className="h-20 w-20 rounded-full object-cover ring-4 ring-white/40 shadow-glow" />
              <div>
                <div className="text-3xl font-black tracking-tight">{BRAND.name}</div>
                <div className="text-xs font-bold tracking-[0.3em] text-white/80">{BRAND.slogan}</div>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Colección Otoño 2026</span>
            </div>
            <h1 className="mt-6 text-5xl font-black leading-[0.95] sm:text-6xl lg:text-7xl">
              Viste la <span className="italic">nueva</span><br />
              era del <span className="underline decoration-nova-pink decoration-8 underline-offset-4">estilo</span>.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/90">
              Descubre ropa, calzado y accesorios para hombre, mujer y niños. Diseños modernos, calidad premium, envíos a toda Guatemala.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/productos" className="btn-glow inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold uppercase tracking-wider text-nova-purple shadow-glow">
                <ShoppingBag className="h-4 w-4" /> Comprar Ahora
              </Link>
              <Link to="/productos" className="btn-glow inline-flex items-center gap-2 rounded-full border-2 border-white/70 bg-white/10 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur hover:bg-white/20">
                Nueva Colección <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 flex gap-8 text-white/90">
              <div><div className="text-3xl font-extrabold">+500</div><div className="text-xs uppercase tracking-widest">Diseños</div></div>
              <div><div className="text-3xl font-extrabold">4.9★</div><div className="text-xs uppercase tracking-widest">Rating</div></div>
              <div><div className="text-3xl font-extrabold">24h</div><div className="text-xs uppercase tracking-widest">Envío rápido</div></div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -left-10 top-10 h-72 w-56 overflow-hidden rounded-3xl shadow-glow ring-4 ring-white/30 animate-floaty">
              <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80" alt="" className="h-full w-full object-cover" />
            </div>
            <div className="ml-24 h-[520px] w-[340px] overflow-hidden rounded-[2rem] shadow-glow ring-4 ring-white/30">
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&auto=format&fit=crop&q=80" alt="" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -right-4 bottom-20 h-56 w-44 overflow-hidden rounded-3xl shadow-glow ring-4 ring-white/30 animate-floaty" style={{ animationDelay: "-2s" }}>
              <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop&q=80" alt="" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Promo band */}
      <div className="relative overflow-hidden bg-foreground py-3 text-center text-xs font-bold uppercase tracking-[0.35em] text-white sm:text-sm">
        <div className="marquee-shimmer absolute inset-0" />
        ✨ Envío gratis desde Q500 · 🚚 Entrega en 24h · 💳 3 y 6 meses sin intereses · 🔥 Cambios sin costo en 15 días
      </div>

      {/* Categorías */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <div className="mb-12 text-center">
              <div className="text-xs font-bold uppercase tracking-[0.35em] text-nova-purple">👕 Categorías</div>
              <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Explora tu estilo</h2>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.label} delay={i * 60}>
                <Link to="/productos" search={{ categoria: c.cat === "todos" ? undefined : c.cat }} className="group relative block h-72 overflow-hidden rounded-3xl shadow-card hover-lift">
                  <img src={c.img} alt={c.label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${c.gradient} opacity-70 mix-blend-multiply`} />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <div className="text-2xl font-extrabold">{c.label}</div>
                    <div className="mt-1 inline-flex items-center gap-2 text-sm font-semibold opacity-90 group-hover:gap-3 transition-all">Ver colección <ArrowRight className="h-4 w-4" /></div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="bg-gradient-soft py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.35em] text-nova-pink">✨ Nueva Colección</div>
                <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Productos destacados</h2>
              </div>
              <Link to="/productos" className="btn-glow inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-bold text-white">
                Ver todo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 50}><ProductCard product={p} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Promociones */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { icon: Flame, title: "🔥 Más vendidos", text: "Los favoritos de la comunidad NOVASTYLE.", color: "from-nova-pink to-nova-purple", cat: "todos" },
              { icon: Heart, title: "💖 Mujer", text: "Vestidos, blusas, jeans y más para ellas.", color: "from-nova-purple to-nova-blue", cat: "mujer" },
              { icon: Gift, title: "🎁 Fragancias", text: "Eau de parfum para mujer, hombre y unisex.", color: "from-nova-sky to-nova-blue", cat: "fragancias" },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <Link to="/productos" search={{ categoria: c.cat === "todos" ? undefined : c.cat }} className={`hover-lift block rounded-3xl bg-gradient-to-br ${c.color} p-8 text-white shadow-card`}>
                  <c.icon className="h-8 w-8" />
                  <h3 className="mt-4 text-2xl font-extrabold">{c.title}</h3>
                  <p className="mt-2 text-sm text-white/90">{c.text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest">Explorar <ArrowRight className="h-3 w-3" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      {bestsellers.length > 0 && (
        <section className="bg-muted py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Reveal>
              <div className="mb-12 text-center">
                <div className="text-xs font-bold uppercase tracking-[0.35em] text-nova-purple">🔥 Trending</div>
                <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Más vendidos</h2>
              </div>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {bestsellers.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Video de moda */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <div className="mb-10 text-center">
              <div className="text-xs font-bold uppercase tracking-[0.35em] text-nova-pink">🎬 Fashion Film</div>
              <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Vive la nueva colección</h2>
            </div>
          </Reveal>
          <div className="relative aspect-video overflow-hidden rounded-3xl shadow-glow ring-4 ring-white">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/5HPPywo7ukA?rel=0"
              title="NOVASTYLE Fashion Film"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="bg-gradient-soft py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <div className="mb-12 text-center">
              <div className="text-xs font-bold uppercase tracking-[0.35em] text-nova-purple">⭐ Opiniones</div>
              <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Lo que dicen de NOVASTYLE</h2>
              <p className="mt-3 text-sm text-muted-foreground">Opiniones de demostración con fines académicos.</p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="hover-lift rounded-3xl bg-white p-8 shadow-card">
                  <div className="flex gap-1 text-nova-pink">
                    {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="mt-4 text-base leading-relaxed">"{t.text}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-brand text-white font-bold">{t.name[0]}</div>
                    <div>
                      <div className="font-bold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs del equipo */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <Reveal>
            <div className="rounded-[2rem] border border-nova-purple/15 bg-white p-8 text-center shadow-card sm:p-10">
              <div className="text-xs font-bold uppercase tracking-[0.35em] text-nova-purple">✍️ Blogs del equipo</div>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Conoce los 5 blogs de NOVASTYLE</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Los cinco blogs individuales de los integrantes de NOVASTYLE están disponibles en el apartado Noticias, con sus autores y enlaces correspondientes.</p>
              <Link to="/noticias" className="btn-glow mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white">
                Ver blogs en Noticias <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-brand p-12 text-center text-white shadow-glow sm:p-16">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/15 blur-2xl" />
            <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-nova-pink/40 blur-2xl" />
            <div className="relative">
              <div className="text-xs font-bold uppercase tracking-[0.35em] text-white/80">📰 Últimas Noticias</div>
              <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Únete a la comunidad NOVASTYLE</h2>
              <p className="mx-auto mt-4 max-w-xl text-white/90">Sé el primero en enterarte de nuevas colecciones, drops exclusivos y descuentos.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/noticias" className="btn-glow rounded-full bg-white px-7 py-4 text-sm font-bold uppercase tracking-wider text-nova-purple">Ver noticias</Link>
                <Link to="/blog" className="btn-glow rounded-full border-2 border-white/70 bg-white/10 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur">Leer el blog</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
