import { useEffect, useState } from "react";
import { MessageCircle, Send, Trash2 } from "lucide-react";

type Comment = { id: string; name: string; email: string; text: string; date: string };

export function Comments({ topic, title = "Comentarios" }: { topic: string; title?: string }) {
  const key = `novastyle-comments-${topic}`;
  const [comments, setComments] = useState<Comment[]>([]);
  const [form, setForm] = useState({ name: "", email: "", text: "" });
  const [ok, setOk] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      setComments(raw ? JSON.parse(raw) : []);
    } catch {
      setComments([]);
    }
  }, [key]);

  const persist = (next: Comment[]) => {
    setComments(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      /* almacenamiento no disponible */
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    persist([
      {
        id: crypto.randomUUID(),
        name: form.name.trim(),
        email: form.email.trim(),
        text: form.text.trim(),
        date: new Date().toLocaleDateString("es-GT", { day: "2-digit", month: "short", year: "numeric" }),
      },
      ...comments,
    ]);
    setForm({ name: "", email: "", text: "" });
    setOk(true);
    setTimeout(() => setOk(false), 3000);
  };

  const remove = (id: string) => {
    persist(comments.filter((c) => c.id !== id));
    setConfirmId(null);
  };

  return (
    <section className="mt-16 no-print">
      <h2 className="flex items-center gap-2 text-2xl font-extrabold">
        <MessageCircle className="h-6 w-6 text-nova-purple" /> {title} ({comments.length})
      </h2>

      <form onSubmit={submit} className="mt-6 rounded-3xl bg-gradient-soft p-6 shadow-soft">
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Tu nombre"
            className="rounded-2xl border border-input bg-white px-4 py-3 text-sm focus:border-nova-purple focus:outline-none"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Tu correo (opcional)"
            className="rounded-2xl border border-input bg-white px-4 py-3 text-sm focus:border-nova-purple focus:outline-none"
          />
        </div>
        <textarea
          required
          rows={4}
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          placeholder="Escribe tu comentario…"
          className="mt-4 w-full rounded-2xl border border-input bg-white px-4 py-3 text-sm focus:border-nova-purple focus:outline-none"
        />
        <button type="submit" className="btn-glow mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3 text-sm font-bold uppercase tracking-wider text-white">
          <Send className="h-4 w-4" /> Publicar comentario
        </button>
        {ok && <span className="ml-4 text-sm font-semibold text-nova-purple">¡Gracias! Tu comentario fue publicado.</span>}
      </form>

      <ul className="mt-8 space-y-4">
        {comments.length === 0 && <li className="text-sm text-muted-foreground">Aún no hay comentarios. ¡Sé la primera persona en opinar!</li>}
        {comments.map((c) => (
          <li key={c.id} className="rounded-3xl bg-white p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand font-bold text-white">{c.name[0]?.toUpperCase()}</div>
              <div className="flex-1">
                <div className="font-bold">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.date}</div>
              </div>
              <button
                onClick={() => setConfirmId(c.id)}
                aria-label="Eliminar comentario"
                title="Eliminar comentario"
                className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed">{c.text}</p>

            {confirmId === c.id && (
              <div className="mt-4 rounded-2xl border border-border bg-muted p-4">
                <p className="text-sm font-semibold">¿Deseas eliminar este comentario?</p>
                <div className="mt-3 flex gap-3">
                  <button onClick={() => setConfirmId(null)} className="rounded-full border border-border bg-white px-5 py-2 text-xs font-bold uppercase tracking-wider">
                    Cancelar
                  </button>
                  <button onClick={() => remove(c.id)} className="rounded-full bg-destructive px-5 py-2 text-xs font-bold uppercase tracking-wider text-destructive-foreground">
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

const DEMO = [
  { n: "Andrea M.", t: "La calidad me sorprendió: la tela cae increíble y el color es igual al de la foto." },
  { n: "Luis R.", t: "Pedí el viernes y me llegó el sábado. Servicio rápido y empaque muy elegante." },
  { n: "Gaby S.", t: "Las tallas son exactas y la guía de tallas ayudó bastante. Ya voy por mi tercera compra." },
  { n: "Diego P.", t: "El estilo urbano de NOVASTYLE es justo lo que buscaba. Precios honestos." },
];

export function DemoOpinions({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="text-xs font-bold uppercase tracking-[0.3em] text-nova-purple">Opiniones de demostración</div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {DEMO.map((d) => (
          <figure key={d.n} className="hover-lift rounded-3xl bg-white p-6 shadow-card">
            <div className="text-sm text-nova-pink">★★★★★</div>
            <blockquote className="mt-3 text-sm leading-relaxed text-muted-foreground">“{d.t}”</blockquote>
            <figcaption className="mt-4 text-sm font-bold">{d.n}</figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Opiniones de demostración con fines académicos; no corresponden a reseñas verificadas de clientes reales.</p>
    </div>
  );
}
