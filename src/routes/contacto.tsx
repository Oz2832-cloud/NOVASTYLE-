import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageCircle, Phone, Clock, Send, CheckCircle2 } from "lucide-react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — NOVASTYLE" },
      { name: "description", content: "Escríbenos por WhatsApp, correo o llamada. Estamos para ayudarte." },
    ],
  }),
  component: ContactoPage,
});

function ContactoPage() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell>
      <PageHeader eyebrow="Estamos para ayudarte" title="Contacto" subtitle="Escríbenos por el canal que prefieras. Respondemos en menos de 24 horas." />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              {[
                { icon: MessageCircle, title: "WhatsApp", value: BRAND.whatsapp, href: `https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}`, color: "from-green-400 to-emerald-500" },
                { icon: Mail, title: "Correo", value: BRAND.email, href: `mailto:${BRAND.email}`, color: "from-nova-blue to-nova-purple" },
                { icon: Phone, title: "Teléfono", value: BRAND.phone, href: `tel:${BRAND.phone}`, color: "from-nova-purple to-nova-pink" },
                { icon: Clock, title: "Horario", value: BRAND.hours, color: "from-nova-pink to-nova-blue" },
              ].map((c) => (
                <a key={c.title} href={c.href ?? "#"} target={c.href?.startsWith("http") ? "_blank" : undefined} rel="noopener" className="hover-lift flex items-center gap-4 rounded-3xl bg-white p-6 shadow-card">
                  <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${c.color} text-white`}>
                    <c.icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{c.title}</div>
                    <div className="truncate text-base font-bold">{c.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-3xl bg-white p-8 shadow-card">
              <h2 className="text-2xl font-extrabold">Envíanos un mensaje</h2>
              <p className="mt-1 text-sm text-muted-foreground">Completa el formulario y te contactamos pronto.</p>
              <div className="mt-6 grid gap-4">
                <input required placeholder="Nombre completo" className="rounded-2xl border border-input bg-muted px-5 py-3 text-sm focus:border-nova-purple focus:outline-none" />
                <input required type="email" placeholder="Correo electrónico" className="rounded-2xl border border-input bg-muted px-5 py-3 text-sm focus:border-nova-purple focus:outline-none" />
                <input placeholder="Teléfono (opcional)" className="rounded-2xl border border-input bg-muted px-5 py-3 text-sm focus:border-nova-purple focus:outline-none" />
                <textarea required rows={5} placeholder="Cuéntanos en qué te ayudamos…" className="rounded-2xl border border-input bg-muted px-5 py-3 text-sm focus:border-nova-purple focus:outline-none" />
                <button type="submit" className="btn-glow inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand py-4 text-sm font-bold uppercase tracking-wider text-white">
                  <Send className="h-4 w-4" /> Enviar mensaje
                </button>
                {sent && (
                  <div className="flex items-center gap-2 rounded-2xl bg-green-50 p-3 text-sm text-green-700">
                    <CheckCircle2 className="h-4 w-4" /> ¡Mensaje enviado! Te responderemos pronto.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
