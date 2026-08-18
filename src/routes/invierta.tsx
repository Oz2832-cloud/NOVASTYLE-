import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Users, Globe, Award } from "lucide-react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/invierta")({
  head: () => ({
    meta: [
      { title: "Invierta con nosotros — NOVASTYLE" },
      { name: "description", content: "Conoce las oportunidades de inversión en NOVASTYLE. Beneficios, mercado y crecimiento." },
    ],
  }),
  component: Invierta,
});

function Invierta() {
  return (
    <PageShell>
      <PageHeader eyebrow="Oportunidad" title="Invierta con NOVASTYLE" subtitle="Súmate al crecimiento de una de las marcas de moda con mayor proyección en Centroamérica." />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: TrendingUp, title: "Crecimiento sostenido", text: "38% de crecimiento anual promedio en los últimos 3 años." },
              { icon: Users, title: "Comunidad activa", text: "+120,000 clientes fieles y 250K seguidores en redes." },
              { icon: Globe, title: "Expansión regional", text: "Plan de apertura en El Salvador y Honduras para 2027." },
              { icon: Award, title: "Marca reconocida", text: "Premiada como Mejor Retail Fashion 2025 en Guatemala." },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 60}>
                <div className="hover-lift rounded-3xl bg-white p-6 shadow-card">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-white"><c.icon className="h-6 w-6" /></div>
                  <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.35em] text-nova-pink">Beneficios</div>
                <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">¿Por qué invertir con nosotros?</h2>
                <ul className="mt-6 space-y-3 text-base">
                  {[
                    "Retorno estimado del 22% anual sobre inversión.",
                    "Participación en utilidades semestrales.",
                    "Reportes financieros transparentes cada trimestre.",
                    "Acceso preferente a nuevas colecciones y eventos VIP.",
                    "Mercado en crecimiento: e-commerce +45% anual en la región.",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-1 grid h-6 w-6 place-items-center rounded-full bg-gradient-brand text-xs font-bold text-white">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a href="mailto:inversiones@novastyle.gt" className="btn-glow mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-8 py-4 text-sm font-bold uppercase tracking-wider text-white">
                  Solicitar información
                </a>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.35em] text-nova-purple">Canal oficial de YouTube</div>
                <h3 className="mt-3 text-2xl font-extrabold">Conoce el proyecto en video</h3>
                <p className="mt-2 text-sm text-muted-foreground">Reproduce el video oficial de presentación del equipo NOVASTYLE.</p>
                <div className="mt-6 flex justify-center">
                  <div className="overflow-hidden rounded-2xl shadow-glow ring-4 ring-white" style={{ width: 480, maxWidth: "100%" }}>
                    <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src="https://www.youtube.com/embed/jGMG0ayMkzY?rel=0"
                        title="NOVASTYLE — Video oficial del equipo"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <a
                    href="https://youtu.be/jGMG0ayMkzY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-nova-purple px-6 py-3 text-xs font-bold uppercase tracking-wider text-nova-purple transition hover:bg-nova-purple hover:text-white"
                  >
                    Ver video en YouTube
                  </a>
                  <p className="mt-2 text-xs text-muted-foreground">Si el reproductor no carga, abre el video directamente en YouTube.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
