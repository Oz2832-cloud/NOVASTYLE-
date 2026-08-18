import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { BackToTop } from "./BackToTop";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <CartDrawer />
      <BackToTop />
    </>
  );
}


export function PageHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-brand pb-16 pt-32 text-white">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,.35), transparent 40%), radial-gradient(circle at 80% 60%, rgba(255,255,255,.25), transparent 40%)" }} />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {eyebrow && <div className="text-xs font-bold uppercase tracking-[0.35em] text-white/80">{eyebrow}</div>}
        <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-white/90">{subtitle}</p>}
      </div>
    </section>
  );
}
