import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Calendar, User, Play } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Comments } from "@/components/Comments";
import { getArticle, ARTICLES, type Article } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Artículo no disponible — NOVASTYLE" }, { name: "robots", content: "noindex" }] };
    }
    const a = loaderData.article;
    return {
      meta: [
        { title: `${a.title} — Blog NOVASTYLE` },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:image", content: a.image },
        { name: "twitter:image", content: a.image },
      ],
    };
  },
  notFoundComponent: ArticleNotFound,
  component: ArticlePage,
});

function ArticleNotFound() {
  return (
    <PageShell>
      <div className="grid min-h-[70vh] place-items-center px-4 pt-32 text-center">
        <div>
          <h1 className="text-3xl font-extrabold">Artículo no encontrado</h1>
          <Link to="/blog" className="btn-glow mt-6 inline-block rounded-full bg-gradient-brand px-8 py-4 text-sm font-bold uppercase tracking-wider text-white">
            Volver al Blog
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

function ArticlePage() {
  const { article } = Route.useLoaderData() as { article: Article };
  const [playing, setPlaying] = useState(false);
  const more = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <PageShell>
      <header className="relative isolate overflow-hidden pb-14 pt-32 text-white">
        <img src={article.image} alt={article.title} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1e1b4b]/95 via-[#3b0764]/80 to-nova-blue/70" />
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-white/90 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Volver al Blog
          </Link>
          <span className="mt-6 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-widest backdrop-blur">{article.category}</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">{article.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/85">
            <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" /> {article.date}</span>
            <span className="inline-flex items-center gap-1"><User className="h-4 w-4" /> {article.author}</span>
          </div>
        </div>
      </header>

      <article className="py-14">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <p className="text-xl font-medium leading-relaxed text-foreground/90">{article.excerpt}</p>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
            {article.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          {article.videoId && (
            <section className="mt-12">
              <h2 className="mb-4 text-2xl font-extrabold">🎬 Video relacionado</h2>
              <div className="relative aspect-video overflow-hidden rounded-3xl bg-black shadow-glow ring-4 ring-white">
                {playing ? (
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube.com/embed/${article.videoId}?rel=0&autoplay=1`}
                    title={article.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <button onClick={() => setPlaying(true)} className="group absolute inset-0 h-full w-full" aria-label="Reproducir video">
                    <img src={`https://img.youtube.com/vi/${article.videoId}/hqdefault.jpg`} alt="" className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100" />
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid h-20 w-20 place-items-center rounded-full bg-white/90 shadow-glow transition group-hover:scale-110">
                        <Play className="h-9 w-9 fill-nova-purple text-nova-purple" />
                      </span>
                    </span>
                  </button>
                )}
              </div>
            </section>
          )}

          {article.gallery.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-4 text-2xl font-extrabold">📸 Galería</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {article.gallery.map((g) => (
                  <img key={g} src={g} alt={article.title} loading="lazy" className="hover-lift aspect-[4/5] w-full rounded-2xl object-cover shadow-card" />
                ))}
              </div>
            </section>
          )}

          <Comments topic={article.slug} />

          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-extrabold">Sigue leyendo</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {more.map((a) => (
                <Link key={a.slug} to="/blog/$slug" params={{ slug: a.slug }} className="hover-lift block overflow-hidden rounded-2xl bg-white shadow-card">
                  <img src={a.image} alt={a.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                  <div className="p-4">
                    <div className="text-xs font-bold text-nova-pink">{a.category}</div>
                    <div className="mt-1 text-sm font-bold leading-snug">{a.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-12 text-center">
            <Link to="/blog" className="btn-glow inline-flex items-center gap-2 rounded-full bg-gradient-brand px-8 py-4 text-sm font-bold uppercase tracking-wider text-white">
              <ArrowLeft className="h-4 w-4" /> Volver al Blog
            </Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
