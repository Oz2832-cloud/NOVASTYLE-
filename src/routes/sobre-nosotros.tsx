import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Heart, Sparkles } from "lucide-react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { LOGO_URL, BRAND } from "@/lib/brand";

export const Route = createFileRoute("/sobre-nosotros")({
  head: () => ({
    meta: [
      { title: "Sobre la empresa — NOVASTYLE" },
      { name: "description", content: "Historia, misión, visión y valores de NOVASTYLE Fashion & Apparel." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <PageHeader eyebrow="Sobre la empresa" title="Somos NOVASTYLE" subtitle="Moda contemporánea con propósito. Vestimos a Guatemala con estilo, calidad y actitud." />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative">
                <div className="absolute inset-0 -translate-x-4 translate-y-4 rounded-3xl bg-gradient-brand" />
                <div className="relative overflow-hidden rounded-3xl bg-white p-10 text-center shadow-card">
                  <img src={LOGO_URL} alt="NOVASTYLE" className="mx-auto h-56 w-56 rounded-full object-cover ring-4 ring-nova-purple/20 shadow-glow" />
                  <div className="mt-6 text-2xl font-black">{BRAND.name}</div>
                  <div className="text-xs font-bold tracking-[0.3em] text-nova-purple">{BRAND.slogan}</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="text-xs font-bold uppercase tracking-[0.35em] text-nova-purple">Nuestra historia</div>
              <h2 className="mt-3 text-4xl font-extrabold">De un pequeño local a una marca nacional</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                NOVASTYLE nació en 2015 en la Ciudad de Guatemala con la idea de traer moda internacional accesible a nuestra comunidad. Hoy tenemos 6 sucursales y una tienda en línea que envía a todo el país.
              </p>
              <p className="mt-4 text-muted-foreground">
                Trabajamos con diseñadores locales e internacionales para ofrecerte prendas que se adaptan a tu estilo de vida, sin importar la ocasión.
              </p>
            </Reveal>
          </div>

          <div className="mt-24 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Target, title: "Misión", text: "Empoderar a nuestros clientes a expresar su identidad a través de la moda." },
              { icon: Eye, title: "Visión", text: "Ser la marca de moda contemporánea líder en Centroamérica para 2030." },
              { icon: Heart, title: "Valores", text: "Autenticidad, calidad, inclusión, sostenibilidad y pasión por lo que hacemos." },
              { icon: Sparkles, title: "Objetivos", text: "Expandir a 15 sucursales y lanzar una línea 100% eco-friendly." },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="hover-lift rounded-3xl bg-white p-6 shadow-card">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-white"><c.icon className="h-6 w-6" /></div>
                  <h3 className="mt-4 text-xl font-bold">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
