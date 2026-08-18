import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PageShell, PageHeader } from "@/components/PageShell";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Preguntas frecuentes — NOVASTYLE" },
      { name: "description", content: "Todo lo que necesitas saber sobre pagos, envíos, cambios y devoluciones." },
    ],
  }),
  component: FAQ,
});

const FAQS = [
  { q: "¿Qué métodos de pago aceptan?", a: "Aceptamos tarjetas Visa, Mastercard, American Express, transferencias bancarias, depósitos y pago contra entrega en la Ciudad de Guatemala." },
  { q: "¿Cuánto tarda el envío?", a: "En Ciudad de Guatemala entregamos en 24 horas. Para el resto del país el tiempo es de 2 a 4 días hábiles." },
  { q: "¿Puedo cambiar una prenda si no me queda?", a: "Sí, tienes 15 días desde la compra para cambiar tu prenda sin costo, siempre que esté en su empaque original y sin uso." },
  { q: "¿Cómo funciona la política de devoluciones?", a: "Puedes solicitar reembolso completo dentro de los primeros 8 días. El monto se devuelve al mismo método de pago." },
  { q: "¿Hacen envíos internacionales?", a: "Actualmente enviamos a Guatemala, El Salvador y Honduras. Otros países bajo solicitud." },
  { q: "¿Los precios incluyen IVA?", a: "Sí, todos los precios en Quetzales (Q) ya incluyen el 12% de IVA." },
  { q: "¿Ofrecen meses sin intereses?", a: "Sí, en compras mayores a Q500 puedes pagar a 3 o 6 meses sin intereses con tarjetas participantes." },
  { q: "¿Cómo sé mi talla?", a: "En cada producto encontrarás una tabla de tallas detallada. También puedes escribirnos por WhatsApp y te asesoramos." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <PageShell>
      <PageHeader eyebrow="Ayuda" title="Preguntas frecuentes" subtitle="Resolvemos tus dudas sobre pagos, envíos, cambios y devoluciones." />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-soft">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left hover:bg-muted/50"
                >
                  <span className="font-bold">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-nova-purple transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && (
                  <div className="px-6 pb-6 text-sm text-muted-foreground animate-fade-up">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
