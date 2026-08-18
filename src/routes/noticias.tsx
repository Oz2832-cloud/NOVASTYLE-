import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/noticias")({
  head: () => ({
    meta: [
      { title: "Noticias — NOVASTYLE" },
      { name: "description", content: "Descubre las últimas noticias de NOVASTYLE: colecciones, eventos, promociones y aperturas de sucursales." },
    ],
  }),
  component: NoticiasPage,
});

const NEWS = [
  { title: "Nueva colección Otoño 2026", date: "15 Ago 2026", excerpt: "Lanzamos más de 80 diseños inspirados en la vida urbana moderna.", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&auto=format&fit=crop&q=80", tag: "Colección", slug: "nueva-coleccion-otono" },
  { title: "Abrimos nueva sucursal en Xela", date: "8 Ago 2026", excerpt: "Ya puedes visitarnos en el Centro Comercial Pradera Xela, nivel 2.", img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=900&auto=format&fit=crop&q=80", tag: "Sucursal", slug: "comercio-de-moda-guatemala" },
  { title: "Runway Show NOVASTYLE 2026", date: "1 Ago 2026", excerpt: "Nuestro evento anual reunió a más de 500 fashionistas en Zona 10.", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&auto=format&fit=crop&q=80", tag: "Evento", slug: "nueva-coleccion-otono" },
  { title: "Promoción Aniversario NOVASTYLE", date: "22 Jul 2026", excerpt: "Hasta 50% de descuento en categorías seleccionadas durante la semana de aniversario.", img: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=900&auto=format&fit=crop&q=80", tag: "Promoción", slug: "comercio-de-moda-guatemala" },
  { title: "Tendencias de moda 2026", date: "9 Jul 2026", excerpt: "Descubre las 5 tendencias que dominarán tu clóset este año.", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&auto=format&fit=crop&q=80", tag: "Moda", slug: "sneakers-2026" },
  { title: "Colaboración exclusiva NOVA x Studio GT", date: "26 Jun 2026", excerpt: "Cápsula limitada de 12 piezas diseñadas junto al estudio guatemalteco Studio GT.", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop&q=80", tag: "Colaboración", slug: "capsule-wardrobe-mujer" },

];

function NoticiasPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Novedades" title="Noticias" subtitle="Lo más reciente de NOVASTYLE: colecciones, eventos, promociones y aperturas." />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {NEWS.map((n, i) => (
              <Reveal key={n.title} delay={i * 60}>
                <article className="hover-lift flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card">
                  <Link to="/blog/$slug" params={{ slug: n.slug }} className="block aspect-[16/10] overflow-hidden">
                    <img src={n.img} alt={n.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between text-xs">
                      <span className="rounded-full bg-gradient-brand px-3 py-1 font-bold text-white">{n.tag}</span>
                      <span className="inline-flex items-center gap-1 text-muted-foreground"><Calendar className="h-3 w-3" /> {n.date}</span>
                    </div>
                    <Link to="/blog/$slug" params={{ slug: n.slug }}>
                      <h3 className="mt-3 text-xl font-bold leading-tight hover:text-nova-purple">{n.title}</h3>
                    </Link>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{n.excerpt}</p>
                    <Link to="/blog/$slug" params={{ slug: n.slug }} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-nova-purple hover:underline">
                      Leer más <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-16">
            <div className="text-center">
              <div className="text-xs font-bold uppercase tracking-[0.35em] text-nova-purple">Blogs del proyecto</div>
              <h2 className="mt-3 text-3xl font-extrabold">Cinco blogs, un mismo proyecto</h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
                Cada integrante desarrolló su blog individual. Consulta cada uno desde aquí.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* BLOG 1 — Kevin */}
              <div className="hover-lift flex h-full flex-col rounded-3xl border border-border bg-white p-6 text-center shadow-card">
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-nova-purple">Blog 1</div>
                <p className="mt-3 text-lg font-extrabold">Kevin Irías</p>
                <p className="text-sm text-muted-foreground">Carné: 22005915</p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">Blog integrado en NOVASTYLE: artículos, videos, comentarios y bitácora de una semana.</p>
                <Link
                  to="/blog"
                  className="btn-glow mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-xs font-bold uppercase tracking-wider text-white"
                >
                  Ir al Blog <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {/* BLOG 2 — Melany */}
              <div className="hover-lift flex h-full flex-col rounded-3xl border border-border bg-white p-6 text-center shadow-card">
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-nova-purple">Blog 2</div>
                <p className="mt-3 text-lg font-extrabold">Pérez Villagran, Melany Yazmin</p>
                <p className="text-sm text-muted-foreground">Carné: 21005665</p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">Blog individual externo con contenido de moda y del proyecto NOVASTYLE.</p>
                <a
                  href="https://shiny-novastyle-d6b8d8.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-xs font-bold uppercase tracking-wider text-white"
                >
                  Visitar Blog <ArrowRight className="h-3 w-3" />
                </a>
              </div>

              {/* BLOG 3 — Alison */}
              <div className="hover-lift flex h-full flex-col rounded-3xl border border-border bg-white p-6 text-center shadow-card">
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-nova-purple">Blog 3</div>
                <p className="mt-3 text-lg font-extrabold">Alison Melisa Pérez Arauz</p>
                <p className="text-sm text-muted-foreground">Carné: 25002457</p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">Blog individual externo con publicaciones y evidencias del proyecto.</p>
                <a
                  href="https://novastyle.xo.je/blog/index.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-xs font-bold uppercase tracking-wider text-white"
                >
                  Visitar Blog <ArrowRight className="h-3 w-3" />
                </a>
              </div>


              {/* BLOG 4 — Luis */}
              <div className="hover-lift flex h-full flex-col rounded-3xl border border-border bg-white p-6 text-center shadow-card">
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-nova-purple">Blog 4</div>
                <p className="mt-3 text-lg font-extrabold">Luis Miguel Estrada Muñoz</p>
                <p className="text-sm text-muted-foreground">Carné: 12182072</p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">Blog individual externo del proyecto NOVASTYLE.</p>
                <a href="https://crystal-sartorial-archive-edit.base44.app/" target="_blank" rel="noopener noreferrer" className="btn-glow mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-xs font-bold uppercase tracking-wider text-white">Visitar Blog <ArrowRight className="h-3 w-3" /></a>
              </div>

              {/* BLOG 5 — Dulce */}
              <div className="hover-lift flex h-full flex-col rounded-3xl border border-border bg-white p-6 text-center shadow-card">
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-nova-purple">Blog 5</div>
                <p className="mt-3 text-lg font-extrabold">Dulce Saraí Guacamaya Córdova</p>
                <p className="text-sm text-muted-foreground">Carné: 24002462</p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">Blog individual externo del proyecto NOVASTYLE.</p>
                <a href="https://123nosvastyle.blogspot.com/p/como-encontrar-tu-mejor-estilo-guia.html" target="_blank" rel="noopener noreferrer" className="btn-glow mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-xs font-bold uppercase tracking-wider text-white">Visitar Blog <ArrowRight className="h-3 w-3" /></a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </PageShell>
  );
}
