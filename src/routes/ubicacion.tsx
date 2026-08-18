import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Clock, Navigation } from "lucide-react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/ubicacion")({
  head: () => ({
    meta: [
      { title: "Ubicación — NOVASTYLE" },
      { name: "description", content: "Encuéntranos en Zona 10, Ciudad de Guatemala. Horarios y dirección." },
    ],
  }),
  component: Ubicacion,
});

function Ubicacion() {
  return (
    <PageShell>
      <PageHeader eyebrow="Visítanos" title="Ubicación" subtitle="Nuestra tienda principal está en el corazón de la Zona 10." />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 overflow-hidden rounded-3xl shadow-card ring-1 ring-border">
              <iframe
                title="Ubicación NOVASTYLE"
                className="h-[500px] w-full"
                src="https://www.google.com/maps?q=Zona+10+Ciudad+de+Guatemala&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="space-y-4">
              <div className="hover-lift rounded-3xl bg-gradient-brand p-6 text-white shadow-card">
                <MapPin className="h-6 w-6" />
                <h3 className="mt-3 text-lg font-bold">Dirección</h3>
                <p className="mt-1 text-sm text-white/90">{BRAND.address}</p>
              </div>
              <div className="hover-lift rounded-3xl bg-white p-6 shadow-card">
                <Clock className="h-6 w-6 text-nova-purple" />
                <h3 className="mt-3 text-lg font-bold">Horario</h3>
                <p className="mt-1 text-sm text-muted-foreground">{BRAND.hours}</p>
              </div>
              <a href="https://www.google.com/maps/dir/?api=1&destination=Zona+10+Guatemala" target="_blank" rel="noopener" className="btn-glow flex items-center justify-center gap-2 rounded-full bg-gradient-sunset py-4 text-sm font-bold uppercase tracking-wider text-white">
                <Navigation className="h-4 w-4" /> Cómo llegar
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
