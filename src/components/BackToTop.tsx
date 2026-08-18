import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Botón discreto "Volver arriba" para catálogos largos. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver arriba"
      className="btn-glow no-print fixed bottom-6 left-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-gradient-brand text-white shadow-glow"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
