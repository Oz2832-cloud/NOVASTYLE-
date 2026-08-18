import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Play, BookOpen, TrendingUp, Calendar, ChevronDown, ArrowRight, ClipboardList, Printer, FileText } from "lucide-react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { Comments, DemoOpinions } from "@/components/Comments";
import { ARTICLES, BLOG_VIDEOS, BITACORA, BITACORA_AUTHOR, BITACORA_RANGE } from "@/lib/blog";
import { BRAND, LOGO_URL } from "@/lib/brand";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog NOVASTYLE — Artículos, videos y bitácora" },
      { name: "description", content: "Artículos de moda, videos, consejos de estilo, comentarios y la bitácora de una semana del proyecto NOVASTYLE." },
      { property: "og:title", content: "Blog NOVASTYLE" },
      { property: "og:description", content: "Tendencias, lookbooks, videos y la bitácora del proyecto NOVASTYLE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [openDay, setOpenDay] = useState<string | null>("Lunes");
  const [playing, setPlaying] = useState<string | null>(null);
  const [printAll, setPrintAll] = useState(false);

  const doPrint = (kind: "blog" | "bitacora") => {
    setPrintAll(true);
    document.body.dataset.print = kind;
    const cleanup = () => {
      document.body.removeAttribute("data-print");
      setPrintAll(false);
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    setTimeout(() => {
      window.print();
      setTimeout(cleanup, 500);
    }, 250);
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Fashion Blog"
        title="Blog NOVASTYLE"
        subtitle="Artículos, noticias de moda, videos, comentarios y la bitácora de una semana de proyecto: todo en un solo lugar."
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Encabezado solo para impresión */}
          <div className="print-only print-doc-header">
            <img src={LOGO_URL} alt="NOVASTYLE" />
            <div style={{ fontWeight: 800, fontSize: 20, marginTop: 8 }}>{BRAND.name} | {BRAND.slogan}</div>
            <div className="print-doc-title-blog" style={{ fontSize: 16, fontWeight: 700 }}>BLOG</div>
            <div className="print-doc-title-bitacora" style={{ fontSize: 16, fontWeight: 700 }}>BITÁCORA DE 1 SEMANA — {BITACORA_RANGE}</div>
            <div style={{ fontSize: 13 }}>Autor: {BITACORA_AUTHOR.name} · Carné: {BITACORA_AUTHOR.carne}</div>
          </div>

          {/* Autor + impresión */}
          <div className="no-print mb-10 flex flex-col items-start justify-between gap-4 rounded-3xl bg-gradient-soft p-6 sm:flex-row sm:items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-nova-purple">Blog individual</div>
              <p className="mt-1 font-bold">{BITACORA_AUTHOR.name}</p>
              <p className="text-sm text-muted-foreground">Carné: {BITACORA_AUTHOR.carne}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => doPrint("blog")} className="btn-glow inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-xs font-bold uppercase tracking-wider text-white">
                <Printer className="h-4 w-4" /> Imprimir / Guardar Blog en PDF
              </button>
              <button onClick={() => doPrint("bitacora")} className="inline-flex items-center gap-2 rounded-full border border-nova-purple px-6 py-3 text-xs font-bold uppercase tracking-wider text-nova-purple transition hover:bg-nova-purple hover:text-white">
                <FileText className="h-4 w-4" /> Imprimir / Guardar Bitácora en PDF
              </button>
            </div>
          </div>

          {/* accesos rápidos */}
          <div className="no-print mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BookOpen, label: "Artículos", href: "#articulos" },
              { icon: TrendingUp, label: "Tendencias", href: "#articulos" },
              { icon: Play, label: "Videos de moda", href: "#videos" },
              { icon: ClipboardList, label: "Bitácora", href: "#bitacora" },
            ].map((c) => (
              <a key={c.label} href={c.href} className="hover-lift block rounded-2xl bg-gradient-soft p-5 text-center">
                <c.icon className="mx-auto h-8 w-8 text-nova-purple" />
                <div className="mt-2 text-sm font-bold">{c.label}</div>
              </a>
            ))}
          </div>

          {/* Artículos */}
          <div data-print-part="articulos">
          <h2 id="articulos" className="mb-8 scroll-mt-28 text-3xl font-extrabold">📝 Artículos</h2>
          <div className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((a, i) => (
              <Reveal key={a.slug} delay={i * 60}>
                <article className="hover-lift flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card">
                  <Link to="/blog/$slug" params={{ slug: a.slug }} className="block aspect-[16/10] overflow-hidden">
                    <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between text-xs">
                      <span className="rounded-full bg-nova-pink/10 px-3 py-1 font-bold text-nova-pink">{a.category}</span>
                      <span className="inline-flex items-center gap-1 text-muted-foreground"><Calendar className="h-3 w-3" /> {a.date}</span>
                    </div>
                    <Link to="/blog/$slug" params={{ slug: a.slug }}>
                      <h3 className="mt-3 text-xl font-bold leading-tight hover:text-nova-purple">{a.title}</h3>
                    </Link>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{a.excerpt}</p>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: a.slug }}
                      className="btn-glow mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
                    >
                      Leer artículo <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          </div>

          <div data-print-part="videos">
          {/* Videos */}
          <h2 id="videos" className="mb-2 scroll-mt-28 text-3xl font-extrabold">🎥 Videos de moda</h2>
          <p className="mb-8 text-sm text-muted-foreground">Haz clic en la miniatura para reproducir el video directamente desde la página.</p>
          <div className="mb-20 grid gap-8 md:grid-cols-2">
            {BLOG_VIDEOS.map((v) => (
              <div key={v.id} className="overflow-hidden rounded-3xl bg-white shadow-card">
                <div className="relative aspect-video bg-black">
                  {playing === v.id ? (
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={`https://www.youtube.com/embed/${v.id}?rel=0&autoplay=1`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <button onClick={() => setPlaying(v.id)} className="group absolute inset-0 h-full w-full" aria-label={`Reproducir ${v.title}`}>
                      <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} loading="lazy" className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100" />
                      <span className="absolute inset-0 grid place-items-center">
                        <span className="grid h-20 w-20 place-items-center rounded-full bg-white/90 shadow-glow transition group-hover:scale-110">
                          <Play className="h-9 w-9 fill-nova-purple text-nova-purple" />
                        </span>
                      </span>
                    </button>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-lg font-bold">{v.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
                  {playing !== v.id && (
                    <button onClick={() => setPlaying(v.id)} className="btn-glow mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white">
                      <Play className="h-3 w-3" /> Reproducir
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          </div>

          <DemoOpinions className="no-print mb-20" />

          {/* Bitácora */}
          <div data-print-part="bitacora" id="bitacora" className="scroll-mt-28 rounded-[2rem] bg-gradient-soft p-6 sm:p-10">
            <div className="text-xs font-bold uppercase tracking-[0.35em] text-nova-purple">Semana de desarrollo</div>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">🗒️ BITÁCORA DE 1 SEMANA</h2>
            <p className="mt-2 text-sm font-semibold text-nova-pink">{BITACORA_RANGE} · Autor: {BITACORA_AUTHOR.name} — Carné: {BITACORA_AUTHOR.carne}</p>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              Registro diario del proceso creativo y técnico detrás de NOVASTYLE. Haz clic en cada día para ver el detalle del avance.
            </p>

            <div className="mt-8 space-y-4">
              {BITACORA.map((d, i) => {
                const isOpen = printAll || openDay === d.day;
                return (
                  <div key={d.day} className="overflow-hidden rounded-3xl bg-white shadow-card">
                    <button
                      onClick={() => setOpenDay(isOpen ? null : d.day)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-4 p-5 text-left"
                    >
                      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${d.color} font-black text-white shadow-glow`}>{i + 1}</span>
                      <span className="flex-1">
                        <span className="block text-xs font-bold uppercase tracking-[0.3em] text-nova-purple">{d.day} · {d.date}</span>
                        <span className="block text-lg font-extrabold">{d.title}</span>
                        <span className="block text-sm text-muted-foreground">{d.summary}</span>
                      </span>
                      <ChevronDown className={`no-print h-5 w-5 shrink-0 text-nova-purple transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="border-t border-border px-5 pb-6 pt-4 sm:pl-21">
                        <ul className="space-y-2 text-sm">
                          {d.points.map((p) => (
                            <li key={p} className="flex items-start gap-3">
                              <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-brand text-[10px] font-bold text-white">✓</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <Comments topic="blog" />
        </div>
      </section>
    </PageShell>
  );
}
