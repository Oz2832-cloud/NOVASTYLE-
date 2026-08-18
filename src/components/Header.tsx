import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { BRAND, LOGO_URL, NAV_LINKS } from "@/lib/brand";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-white/95 backdrop-blur-md shadow-soft"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={LOGO_URL} alt="NOVASTYLE" className="h-11 w-11 rounded-full object-cover ring-2 ring-white shadow-soft" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className={cn("text-lg font-extrabold tracking-tight", scrolled || open ? "text-foreground" : "text-white drop-shadow")}>
              {BRAND.name}
            </span>
            <span className={cn("text-[10px] font-semibold tracking-[0.2em]", scrolled || open ? "text-nova-purple" : "text-white/90")}>
              {BRAND.slogan}
            </span>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                scrolled ? "text-foreground/80 hover:text-nova-purple hover:bg-muted" : "text-white/95 hover:bg-white/15",
              )}
              activeProps={{ className: "!text-nova-purple !bg-muted" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Carrito"
            className={cn(
              "relative grid h-11 w-11 place-items-center rounded-full transition-all btn-glow",
              scrolled ? "bg-gradient-brand text-white" : "bg-white text-nova-purple",
            )}
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-nova-pink px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full xl:hidden transition-colors",
              scrolled || open ? "bg-muted text-foreground" : "bg-white/20 text-white",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-border bg-white shadow-card animate-fade-up">
          <div className="mx-auto grid max-w-7xl gap-1 px-4 py-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-nova-purple"
                activeProps={{ className: "!text-nova-purple !bg-muted" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
