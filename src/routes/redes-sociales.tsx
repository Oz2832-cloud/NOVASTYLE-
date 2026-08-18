import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram, Youtube, ArrowRight } from "lucide-react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { SOCIAL } from "@/lib/brand";

export const Route = createFileRoute("/redes-sociales")({
  head: () => ({
    meta: [
      { title: "Síguenos — NOVASTYLE" },
      { name: "description", content: "Síguenos en Instagram y TikTok y mira nuestro video oficial en YouTube." },
      { property: "og:title", content: "Redes sociales — NOVASTYLE" },
      { property: "og:description", content: "Instagram, TikTok y YouTube oficiales de NOVASTYLE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Redes,
});

const SOCIALS = [
  { name: "Instagram", handle: "@novastyleropa26", url: SOCIAL.instagram, icon: Instagram, color: "from-[#f58529] via-[#dd2a7b] to-[#8134af]" },
  { name: "TikTok", handle: "@novastyleropa26", url: SOCIAL.tiktok, icon: null, color: "from-[#111827] via-[#ff0050] to-[#00f2ea]" },
  { name: "YouTube", handle: "NOVASTYLE Official", url: SOCIAL.youtube, icon: Youtube, color: "from-[#FF0000] to-[#c40000]" },
];

function Redes() {
  return (
    <PageShell>
      <PageHeader eyebrow="Comunidad" title="Síguenos" subtitle="Únete a la comunidad NOVASTYLE y sé el primero en ver drops, lookbooks y detrás de cámaras." />
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {SOCIALS.map((s, i) => (
              <Reveal key={s.name} delay={i * 60}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className={`hover-lift block rounded-3xl bg-gradient-to-br ${s.color} p-8 text-white shadow-card`}>
                  <div className="flex items-center gap-4">
                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/20 backdrop-blur">
                      {s.icon ? <s.icon className="h-8 w-8" /> : <span className="text-2xl font-black">TT</span>}
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold">{s.name}</div>
                      <div className="text-sm text-white/90">{s.handle}</div>
                    </div>
                  </div>
                  <div className="mt-6 text-sm font-semibold uppercase tracking-widest text-white/90">Seguir →</div>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 overflow-hidden rounded-3xl bg-white p-6 shadow-card">
            <h2 className="text-2xl font-extrabold">Nuestro video oficial</h2>
            <p className="mt-1 text-sm text-muted-foreground">Conoce al equipo y la propuesta de NOVASTYLE.</p>
            <a
              href="https://youtu.be/jGMG0ayMkzY"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-nova-purple px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-nova-purple transition hover:bg-nova-purple hover:text-white"
            >
              <Youtube className="h-4 w-4" /> Ver video en YouTube
            </a>
            <div className="mt-5 aspect-video overflow-hidden rounded-2xl">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/jGMG0ayMkzY?rel=0"
                title="NOVASTYLE — Video oficial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/blog" className="btn-glow inline-flex items-center gap-2 rounded-full bg-gradient-brand px-8 py-4 text-sm font-bold uppercase tracking-wider text-white">
              Ver más contenido en el Blog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
