import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { BRAND, LOGO_URL, SOCIAL } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="mt-24 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#3b0764] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="NOVASTYLE" className="h-14 w-14 rounded-full object-cover ring-2 ring-white/30" />
              <div>
                <div className="text-xl font-extrabold">{BRAND.name}</div>
                <div className="text-[11px] font-semibold tracking-[0.2em] text-nova-pink">{BRAND.slogan}</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/70">
              Moda contemporánea para quienes viven con estilo. Envíos a toda Guatemala.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">Explorar</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/productos" className="hover:text-nova-pink">Productos</Link></li>
              <li><Link to="/noticias" className="hover:text-nova-pink">Noticias</Link></li>
              <li><Link to="/blog" className="hover:text-nova-pink">Blog</Link></li>
              <li><Link to="/faq" className="hover:text-nova-pink">Preguntas frecuentes</Link></li>
              <li><Link to="/blog" hash="bitacora" className="hover:text-nova-pink">Bitácora</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">Empresa</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/sobre-nosotros" className="hover:text-nova-pink">Sobre la empresa</Link></li>
              <li><Link to="/invierta" className="hover:text-nova-pink">Invierta con nosotros</Link></li>
              <li><Link to="/ubicacion" className="hover:text-nova-pink">Ubicación</Link></li>
              <li><Link to="/contacto" className="hover:text-nova-pink">Contacto</Link></li>
              <li><Link to="/redes-sociales" className="hover:text-nova-pink">Síguenos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">Contacto</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-nova-pink" />{BRAND.address}</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-nova-pink" />{BRAND.phone}</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-nova-pink" />{BRAND.email}</li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-nova-pink transition"><Instagram className="h-4 w-4" /></a>
              <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-nova-pink transition font-bold text-xs">TT</a>
              <a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-nova-pink transition"><Youtube className="h-4 w-4" /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <span>© 2026 NOVASTYLE — {BRAND.slogan}. Todos los derechos reservados.</span>
          <span>Hecho con ♥ en Guatemala</span>
        </div>
      </div>
    </footer>
  );
}
