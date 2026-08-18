/**
 * El logo vive en /public para que funcione igual en Lovable, Netlify,
 * build local y cualquier hosting estático (ruta absoluta, sin dependencias
 * del entorno de desarrollo).
 */
export const LOGO_URL = "/novastyle-logo.png";

export const BRAND = {
  name: "NOVASTYLE",
  slogan: "FASHION & APPAREL",
  phone: "+502 2200-1234",
  whatsapp: "+502 5555-9090",
  email: "hola@novastyle.gt",
  address: "6a Avenida 12-45, Zona 10, Ciudad de Guatemala",
  hours: "Lun–Sáb 10:00 – 20:00 · Dom 11:00 – 18:00",
};

export const SOCIAL = {
  instagram: "https://www.instagram.com/novastyleropa26?igsh=bmc0ODU2d3gzNDJp",
  tiktok: "https://www.tiktok.com/@novastyleropa26",
  youtube: "https://youtu.be/jGMG0ayMkzY",
};

export const NAV_LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/productos", label: "Productos" },
  { to: "/noticias", label: "Noticias" },
  { to: "/sobre-nosotros", label: "Sobre la empresa" },
  { to: "/contacto", label: "Contacto" },
  { to: "/ubicacion", label: "Ubicación" },
  { to: "/faq", label: "FAQ" },
  { to: "/invierta", label: "Invierta" },
  { to: "/blog", label: "Blog" },
  { to: "/redes-sociales", label: "Redes" },
] as const;

