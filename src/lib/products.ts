export type CategoryKey =
  | "hombre"
  | "mujer"
  | "ninos"
  | "ninas"
  | "calzado"
  | "bolsos"
  | "joyeria"
  | "accesorios"
  | "fragancias"
  | "skincare"
  | "cuidado"
  | "maquillaje";

export type ColorOption = { name: string; hex: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  images: string[];
  category: CategoryKey;
  categoryLabel: string;
  type: string;
  style: string;
  material: string;
  availability: string;
  colors: ColorOption[];
  sizes: string[];
  rating: number;
  badge?: "Nuevo" | "Oferta" | "Más vendido";
  fragrance?: { ml: string; family: string; notes: string };
  care?: { size: string; skin: string; use: string; ingredients: string };
};

const categoryFallbackVisual = (label: string) => {
  const safe = label.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c] || c));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1125" viewBox="0 0 900 1125"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#2563eb"/><stop offset=".5" stop-color="#7c3aed"/><stop offset="1" stop-color="#ec4899"/></linearGradient></defs><rect width="900" height="1125" rx="48" fill="url(#g)"/><text x="70" y="135" fill="white" font-family="Arial,sans-serif" font-size="38" font-weight="700">NOVASTYLE</text><text x="450" y="555" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-size="72" font-weight="800">${safe}</text><text x="450" y="625" text-anchor="middle" fill="white" opacity=".78" font-family="Arial,sans-serif" font-size="28">Producto de catálogo</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

/** Imagen local de respaldo por categoría. Nunca carga fotografías externas. */
export const FALLBACK_IMAGE: Record<CategoryKey, string> = {
  hombre: categoryFallbackVisual("Hombre"),
  mujer: categoryFallbackVisual("Mujer"),
  ninos: categoryFallbackVisual("Niños"),
  ninas: categoryFallbackVisual("Niñas"),
  calzado: categoryFallbackVisual("Calzado"),
  bolsos: categoryFallbackVisual("Bolsos"),
  joyeria: categoryFallbackVisual("Joyería"),
  accesorios: categoryFallbackVisual("Accesorios"),
  fragancias: categoryFallbackVisual("Fragancias"),
  skincare: categoryFallbackVisual("Skincare"),
  cuidado: categoryFallbackVisual("Cuidado personal"),
  maquillaje: categoryFallbackVisual("Maquillaje"),
};

/**
 * Cada producto muestra únicamente fotografías verificables de esa misma prenda.
 * No se generan vistas "frontal/posterior/lateral" con fotos de otros productos.
 */
export const VIEW_LABELS = ["Fotografía del producto"];


const APPAREL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const KID_SIZES = ["2A", "4A", "6A", "8A", "10A", "12A"];
const SHOE_SIZES = ["35", "36", "37", "38", "39", "40", "41", "42", "43"];
const KID_SHOE_SIZES = ["22", "24", "26", "28", "30", "32"];
const ONE_SIZE = ["Única"];

const C: Record<string, ColorOption> = {
  blanco: { name: "Blanco", hex: "#f8fafc" },
  negro: { name: "Negro", hex: "#111827" },
  azul: { name: "Azul", hex: "#3B82F6" },
  celeste: { name: "Celeste", hex: "#38BDF8" },
  morado: { name: "Morado", hex: "#8B5CF6" },
  rosa: { name: "Rosa", hex: "#EC4899" },
  beige: { name: "Beige", hex: "#e7d8c3" },
  verde: { name: "Verde", hex: "#10b981" },
  gris: { name: "Gris", hex: "#9ca3af" },
  vino: { name: "Vino", hex: "#7f1d1d" },
  cafe: { name: "Café", hex: "#78350f" },
  dorado: { name: "Dorado", hex: "#d4af37" },
};

const CATEGORY_LABEL: Record<CategoryKey, string> = {
  hombre: "Hombre",
  mujer: "Mujer",
  ninos: "Niños",
  ninas: "Niñas",
  calzado: "Calzado",
  bolsos: "Bolsos",
  joyeria: "Joyería",
  accesorios: "Accesorios",
  fragancias: "Fragancias",
  skincare: "Skincare",
  cuidado: "Cuidado personal",
  maquillaje: "Maquillaje",
};

type Raw = {
  n: string;
  d: string;
  p: number;
  c: CategoryKey;
  t: string;
  s: string;
  m: string;
  col: string[];
  sz?: string[];
  r: number;
  b?: Product["badge"];
  f?: { ml: string; family: string; notes: string };
  k?: { size: string; skin: string; use: string; ing: string };
};

const RAW: Raw[] = [
  // ---------- HOMBRE ----------
  { n: "Nova Hoodie Oversize", d: "Sudadera oversize de algodón premium con capucha forrada.", p: 349, c: "hombre", t: "Hoodies", s: "Urbano", m: "80% algodón, 20% poliéster", col: ["negro", "gris", "azul"], r: 4.8, b: "Más vendido" },
  { n: "Urban T-Shirt", d: "Camiseta minimalista de corte relajado y tacto suave.", p: 189, c: "hombre", t: "Camisetas", s: "Casual", m: "100% algodón peinado", col: ["blanco", "negro", "celeste"], r: 4.6, b: "Nuevo" },
  { n: "Denim Jacket Classic", d: "Chaqueta de mezclilla lavado clásico con botones metálicos.", p: 499, c: "hombre", t: "Chaquetas", s: "Casual", m: "100% denim de algodón", col: ["azul", "negro"], r: 4.9, b: "Oferta" },
  { n: "Slim Jeans Índigo", d: "Jeans slim tiro medio con elastano para mayor comodidad.", p: 379, c: "hombre", t: "Jeans", s: "Casual", m: "98% algodón, 2% elastano", col: ["azul", "negro", "gris"], r: 4.6 },
  { n: "Bomber Satinada", d: "Bomber satinada estilo streetwear con puños acanalados.", p: 629, c: "hombre", t: "Chaquetas", s: "Urbano", m: "Poliéster satinado", col: ["negro", "verde", "vino"], r: 4.7, b: "Nuevo" },
  { n: "Cargo Pants Utility", d: "Pantalón cargo estilo utility con bolsillos laterales.", p: 439, c: "hombre", t: "Pantalones", s: "Urbano", m: "Gabardina de algodón", col: ["beige", "verde", "negro"], r: 4.5 },
  { n: "Camisa Oxford Blanca", d: "Camisa Oxford de corte regular ideal para ocasiones formales.", p: 329, c: "hombre", t: "Camisas", s: "Elegante", m: "100% algodón Oxford", col: ["blanco", "celeste"], r: 4.7 },
  { n: "Polo Piqué NOVA", d: "Polo de piqué con logo bordado y cuello estructurado.", p: 239, c: "hombre", t: "Polos", s: "Casual", m: "Piqué de algodón", col: ["azul", "blanco", "vino"], r: 4.5 },
  { n: "Jogger Tech Fleece", d: "Jogger deportivo de tejido térmico con puño elástico.", p: 359, c: "hombre", t: "Joggers", s: "Deportivo", m: "Fleece técnico reciclado", col: ["gris", "negro", "azul"], r: 4.7, b: "Más vendido" },
  { n: "Short Deportivo Runner", d: "Short ligero de secado rápido con bolsillo oculto.", p: 199, c: "hombre", t: "Shorts", s: "Deportivo", m: "Poliéster técnico", col: ["negro", "azul"], r: 4.4 },
  { n: "Suéter Tejido Nova", d: "Suéter tejido de punto fino, cuello redondo.", p: 419, c: "hombre", t: "Suéteres", s: "Elegante", m: "Mezcla lana-algodón", col: ["beige", "gris", "vino"], r: 4.6 },
  { n: "Conjunto Sport Nova", d: "Conjunto deportivo de sudadera y pantalón a juego.", p: 599, c: "hombre", t: "Conjuntos", s: "Deportivo", m: "Algodón french terry", col: ["gris", "negro"], r: 4.8, b: "Nuevo" },
  { n: "Sudadera Crewneck", d: "Sudadera cuello redondo con estampado minimalista.", p: 299, c: "hombre", t: "Sudaderas", s: "Urbano", m: "Algodón french terry", col: ["morado", "negro", "blanco"], r: 4.6 },
  { n: "Blazer Casual Slim", d: "Blazer slim sin forro, perfecto para looks smart casual.", p: 789, c: "hombre", t: "Ropa elegante", s: "Elegante", m: "Mezcla de lino y viscosa", col: ["azul", "beige"], r: 4.8 },
  { n: "Chaqueta Puffer Hombre", d: "Chaqueta acolchada ultraligera con relleno térmico.", p: 749, c: "hombre", t: "Chaquetas", s: "Casual", m: "Nylon con relleno térmico", col: ["negro", "azul"], r: 4.7 },

  // ---------- MUJER ----------
  { n: "Elegant Midi Dress", d: "Vestido midi satinado de edición limitada.", p: 459, c: "mujer", t: "Vestidos", s: "Elegante", m: "Satén de viscosa", col: ["rosa", "negro", "morado"], r: 4.9, b: "Nuevo" },
  { n: "Silk Blouse Perla", d: "Blusa de seda cuello V con caída fluida.", p: 429, c: "mujer", t: "Blusas", s: "Elegante", m: "Seda satinada", col: ["blanco", "beige", "celeste"], r: 4.8 },
  { n: "Wide Leg Pants", d: "Pantalón wide leg fluido de caída premium.", p: 389, c: "mujer", t: "Pantalones", s: "Elegante", m: "Crepé de poliéster", col: ["beige", "negro", "blanco"], r: 4.5, b: "Nuevo" },
  { n: "Cropped Hoodie", d: "Hoodie corta con estampado exclusivo NOVASTYLE.", p: 299, c: "mujer", t: "Hoodies", s: "Urbano", m: "Algodón french terry", col: ["rosa", "morado", "gris"], r: 4.7, b: "Más vendido" },
  { n: "Puffer Jacket Mujer", d: "Chaqueta acolchada ultraligera con capucha desmontable.", p: 749, c: "mujer", t: "Chaquetas", s: "Casual", m: "Nylon reciclado", col: ["blanco", "negro", "rosa"], r: 4.7 },
  { n: "Mom Jeans Vintage", d: "Jeans tiro alto corte mom de lavado vintage.", p: 399, c: "mujer", t: "Jeans", s: "Casual", m: "100% algodón denim", col: ["azul", "celeste"], r: 4.8, b: "Más vendido" },
  { n: "Falda Plisada Midi", d: "Falda plisada midi con cintura elástica.", p: 319, c: "mujer", t: "Faldas", s: "Elegante", m: "Poliéster plisado", col: ["negro", "beige", "morado"], r: 4.6 },
  { n: "Top Ribbed Basic", d: "Top acanalado de tirantes, ajuste segunda piel.", p: 159, c: "mujer", t: "Tops", s: "Casual", m: "Algodón acanalado", col: ["blanco", "negro", "verde"], r: 4.4 },
  { n: "Camiseta Boxy Fit", d: "Camiseta de corte boxy con hombro caído.", p: 189, c: "mujer", t: "Camisetas", s: "Casual", m: "Algodón orgánico", col: ["blanco", "celeste", "rosa"], r: 4.5 },
  { n: "Short Denim Alto", d: "Short de mezclilla tiro alto con deshilado.", p: 249, c: "mujer", t: "Shorts", s: "Casual", m: "Denim de algodón", col: ["azul", "blanco"], r: 4.5 },
  { n: "Sudadera Colorblock", d: "Sudadera colorblock inspirada en la paleta NOVA.", p: 329, c: "mujer", t: "Sudaderas", s: "Urbano", m: "Algodón mezclado", col: ["morado", "celeste", "rosa"], r: 4.7, b: "Nuevo" },
  { n: "Chaqueta Denim Crop", d: "Chaqueta de mezclilla corta con botones metálicos.", p: 489, c: "mujer", t: "Chaquetas", s: "Urbano", m: "Denim rígido", col: ["azul", "blanco"], r: 4.6 },
  { n: "Suéter Knit Suave", d: "Suéter de punto suave con cuello alto.", p: 399, c: "mujer", t: "Suéteres", s: "Elegante", m: "Mezcla acrílico-lana", col: ["beige", "rosa", "gris"], r: 4.7 },
  { n: "Conjunto Loungewear", d: "Conjunto de top y pantalón en tejido suave.", p: 549, c: "mujer", t: "Conjuntos", s: "Casual", m: "Modal y algodón", col: ["beige", "rosa"], r: 4.8, b: "Nuevo" },
  { n: "Legging Sport Nova", d: "Legging deportivo de compresión con cintura alta.", p: 279, c: "mujer", t: "Ropa deportiva", s: "Deportivo", m: "Poliamida y elastano", col: ["negro", "morado", "azul"], r: 4.8, b: "Más vendido" },
  { n: "Vestido Casual Floral", d: "Vestido corto de estampado floral y tirantes ajustables.", p: 359, c: "mujer", t: "Vestidos", s: "Casual", m: "Viscosa ligera", col: ["rosa", "celeste"], r: 4.6 },

  // ---------- NIÑOS ----------
  { n: "Camiseta Kids Rainbow", d: "Camiseta infantil de algodón orgánico con estampado.", p: 149, c: "ninos", t: "Camisetas", s: "Casual", m: "100% algodón orgánico", col: ["celeste", "blanco", "verde"], sz: KID_SIZES, r: 4.7, b: "Nuevo" },
  { n: "Conjunto Denim Niño", d: "Conjunto denim moderno de camisa y pantalón.", p: 329, c: "ninos", t: "Conjuntos", s: "Casual", m: "Denim suave", col: ["azul"], sz: KID_SIZES, r: 4.6 },
  { n: "Jeans Kids Comfort", d: "Jeans infantil con cintura ajustable interna.", p: 219, c: "ninos", t: "Jeans", s: "Casual", m: "Denim elástico", col: ["azul", "negro"], sz: KID_SIZES, r: 4.5 },
  { n: "Sudadera Kids Nova", d: "Sudadera infantil con capucha y bolsillo canguro.", p: 259, c: "ninos", t: "Sudaderas", s: "Urbano", m: "Algodón afelpado", col: ["azul", "gris"], sz: KID_SIZES, r: 4.7 },
  { n: "Chaqueta Niño Windbreaker", d: "Rompevientos infantil ligero e impermeable.", p: 299, c: "ninos", t: "Chaquetas", s: "Deportivo", m: "Nylon impermeable", col: ["celeste", "verde"], sz: KID_SIZES, r: 4.6 },
  { n: "Short Kids Play", d: "Short infantil de secado rápido para jugar.", p: 139, c: "ninos", t: "Shorts", s: "Deportivo", m: "Poliéster ligero", col: ["azul", "verde"], sz: KID_SIZES, r: 4.4 },
  { n: "Camisa Niño Cuadros", d: "Camisa infantil de cuadros con botones frontales.", p: 199, c: "ninos", t: "Camisas", s: "Casual", m: "Franela de algodón", col: ["vino", "azul"], sz: KID_SIZES, r: 4.5 },
  { n: "Pantalón Kids Jogger", d: "Jogger infantil cómodo con puño elástico.", p: 189, c: "ninos", t: "Pantalones", s: "Deportivo", m: "Algodón french terry", col: ["gris", "negro"], sz: KID_SIZES, r: 4.6 },

  // ---------- NIÑAS ----------
  { n: "Vestido Verano Niña", d: "Vestido de verano floral con vuelo y tirantes.", p: 219, c: "ninas", t: "Vestidos", s: "Casual", m: "Algodón ligero", col: ["rosa", "celeste"], sz: KID_SIZES, r: 4.8, b: "Más vendido" },
  { n: "Blusa Niña Volantes", d: "Blusa infantil con volantes y detalle bordado.", p: 179, c: "ninas", t: "Blusas", s: "Elegante", m: "Viscosa suave", col: ["blanco", "rosa"], sz: KID_SIZES, r: 4.6 },
  { n: "Falda Niña Plisada", d: "Falda plisada infantil con short interior.", p: 169, c: "ninas", t: "Faldas", s: "Casual", m: "Poliéster plisado", col: ["morado", "rosa"], sz: KID_SIZES, r: 4.5 },
  { n: "Conjunto Niña Nova", d: "Conjunto infantil de sudadera y legging a juego.", p: 289, c: "ninas", t: "Conjuntos", s: "Urbano", m: "Algodón mezclado", col: ["rosa", "morado"], sz: KID_SIZES, r: 4.7, b: "Nuevo" },
  { n: "Jeans Niña Skinny", d: "Jeans infantil skinny con bordado floral.", p: 229, c: "ninas", t: "Jeans", s: "Casual", m: "Denim elástico", col: ["azul", "celeste"], sz: KID_SIZES, r: 4.5 },
  { n: "Chaqueta Niña Peluche", d: "Chaqueta infantil de peluche suave y cálida.", p: 319, c: "ninas", t: "Chaquetas", s: "Casual", m: "Sherpa sintético", col: ["beige", "rosa"], sz: KID_SIZES, r: 4.7 },
  { n: "Camiseta Niña Estrella", d: "Camiseta infantil con estampado de estrella brillante.", p: 139, c: "ninas", t: "Camisetas", s: "Casual", m: "Algodón orgánico", col: ["blanco", "morado"], sz: KID_SIZES, r: 4.4 },
  { n: "Short Niña Verano", d: "Short infantil de verano con cintura elástica.", p: 129, c: "ninas", t: "Shorts", s: "Casual", m: "Algodón poplin", col: ["rosa", "blanco"], sz: KID_SIZES, r: 4.4 },

  // ---------- CALZADO ----------
  { n: "Runner Sneakers", d: "Zapatillas urbanas con suela ultra-light.", p: 699, c: "calzado", t: "Sneakers hombre", s: "Deportivo", m: "Malla técnica y goma EVA", col: ["blanco", "negro"], sz: SHOE_SIZES, r: 4.7, b: "Más vendido" },
  { n: "Chunky Sneakers", d: "Sneakers chunky de diseño futurista.", p: 779, c: "calzado", t: "Sneakers mujer", s: "Urbano", m: "Piel sintética y goma", col: ["blanco", "rosa"], sz: SHOE_SIZES, r: 4.6 },
  { n: "Leather Boots", d: "Botines de cuero con suela reforzada.", p: 849, c: "calzado", t: "Botas", s: "Elegante", m: "Cuero genuino", col: ["cafe", "negro"], sz: SHOE_SIZES, r: 4.9 },
  { n: "Heels Metallic", d: "Tacones metálicos edición fiesta.", p: 589, c: "calzado", t: "Zapatos elegantes", s: "Elegante", m: "Microfibra metalizada", col: ["dorado", "negro"], sz: SHOE_SIZES, r: 4.5, b: "Oferta" },
  { n: "Zapato Casual Hombre", d: "Zapato casual de piel con suela flexible.", p: 649, c: "calzado", t: "Zapatos casuales", s: "Casual", m: "Piel vacuna", col: ["cafe", "negro"], sz: SHOE_SIZES, r: 4.6 },
  { n: "Sandalias Verano Mujer", d: "Sandalias planas de tiras cruzadas.", p: 329, c: "calzado", t: "Sandalias", s: "Casual", m: "Piel sintética", col: ["beige", "negro"], sz: SHOE_SIZES, r: 4.4 },
  { n: "Sneakers Kids Color", d: "Zapatillas coloridas infantiles con velcro.", p: 289, c: "calzado", t: "Calzado niño", s: "Deportivo", m: "Textil y goma", col: ["azul", "verde"], sz: KID_SHOE_SIZES, r: 4.8 },
  { n: "Sneakers Niña Glitter", d: "Zapatillas infantiles con detalles brillantes.", p: 299, c: "calzado", t: "Calzado niña", s: "Casual", m: "Textil glitter y goma", col: ["rosa", "morado"], sz: KID_SHOE_SIZES, r: 4.7, b: "Nuevo" },
  { n: "Botas Trekking Nova", d: "Botas resistentes para exteriores con suela antideslizante.", p: 899, c: "calzado", t: "Botas", s: "Deportivo", m: "Nobuck y goma vibrante", col: ["cafe", "verde"], sz: SHOE_SIZES, r: 4.8 },
  { n: "Zapatilla Running Pro", d: "Zapatilla de running con amortiguación reactiva.", p: 819, c: "calzado", t: "Calzado deportivo", s: "Deportivo", m: "Knit técnico", col: ["celeste", "negro"], sz: SHOE_SIZES, r: 4.9, b: "Más vendido" },

  // ---------- BOLSOS ----------
  { n: "Crossbody Bag", d: "Bolso crossbody de piel vegana con correa ajustable.", p: 469, c: "bolsos", t: "Bolsos", s: "Elegante", m: "Piel vegana", col: ["negro", "beige"], sz: ONE_SIZE, r: 4.6 },
  { n: "Nova Backpack Tech", d: "Mochila resistente al agua con compartimento para laptop.", p: 549, c: "bolsos", t: "Mochilas", s: "Urbano", m: "Poliéster impermeable", col: ["negro", "gris"], sz: ONE_SIZE, r: 4.5 },
  { n: "Cartera Mini Nova", d: "Cartera compacta con cierre magnético y tarjetero.", p: 249, c: "bolsos", t: "Carteras", s: "Elegante", m: "Piel sintética", col: ["rosa", "negro"], sz: ONE_SIZE, r: 4.4 },
  { n: "Tote Bag Urbana", d: "Bolso tote amplio ideal para el día a día.", p: 379, c: "bolsos", t: "Bolsos", s: "Casual", m: "Lona de algodón", col: ["beige", "negro"], sz: ONE_SIZE, r: 4.6, b: "Nuevo" },
  { n: "Bolso Hombro Satinado", d: "Bolso de hombro satinado para ocasiones especiales.", p: 429, c: "bolsos", t: "Bolsos", s: "Elegante", m: "Satén estructurado", col: ["morado", "dorado"], sz: ONE_SIZE, r: 4.7 },

  // ---------- ACCESORIOS ----------
  { n: "Signature Cap", d: "Gorra bordada con logo NOVA metálico.", p: 129, c: "accesorios", t: "Gorras", s: "Urbano", m: "Sarga de algodón", col: ["negro", "azul"], sz: ONE_SIZE, r: 4.4, b: "Oferta" },
  { n: "Aviator Sunglasses", d: "Lentes aviador dorados con protección UV400.", p: 259, c: "accesorios", t: "Lentes", s: "Elegante", m: "Metal y lente polarizado", col: ["dorado", "negro"], sz: ONE_SIZE, r: 4.5 },
  { n: "Luxury Watch Nova", d: "Reloj minimalista con malla de acero.", p: 999, c: "accesorios", t: "Relojes", s: "Elegante", m: "Acero inoxidable", col: ["dorado", "gris"], sz: ONE_SIZE, r: 4.9, b: "Oferta" },
  { n: "Cinturón Piel Nova", d: "Cinturón de piel con hebilla grabada.", p: 219, c: "accesorios", t: "Cinturones", s: "Elegante", m: "Piel genuina", col: ["cafe", "negro"], sz: ONE_SIZE, r: 4.5 },
  { n: "Bufanda Tejida", d: "Bufanda tejida suave en tonos de la paleta NOVA.", p: 189, c: "accesorios", t: "Accesorios de moda", s: "Casual", m: "Acrílico suave", col: ["morado", "beige"], sz: ONE_SIZE, r: 4.4 },
  { n: "Set Joyería Minimal", d: "Set de collar y aretes de acabado dorado mate.", p: 279, c: "accesorios", t: "Accesorios de moda", s: "Elegante", m: "Acero con baño dorado", col: ["dorado"], sz: ONE_SIZE, r: 4.7, b: "Nuevo" },

  // ---------- MUJER (ampliación) ----------
  { n: "Blusa Satinada Nova", d: "Blusa satinada de manga larga con puño abotonado.", p: 369, c: "mujer", t: "Blusas", s: "Elegante", m: "Satén de poliéster", col: ["celeste", "beige"], r: 4.6 },
  { n: "Vestido Slip Elegante", d: "Vestido slip de tirantes finos y caída fluida.", p: 489, c: "mujer", t: "Vestidos", s: "Elegante", m: "Satén de viscosa", col: ["negro", "morado"], r: 4.7, b: "Nuevo" },
  { n: "Camisa Oversize Mujer", d: "Camisa oversize de popelina con bolsillo frontal.", p: 339, c: "mujer", t: "Camisas", s: "Casual", m: "Popelina de algodón", col: ["blanco", "celeste"], r: 4.5 },
  { n: "Falda Denim Midi", d: "Falda midi de mezclilla con abertura frontal.", p: 349, c: "mujer", t: "Faldas", s: "Urbano", m: "Denim rígido", col: ["azul"], r: 4.5 },
  { n: "Top Deportivo Nova", d: "Top deportivo de sujeción media y tejido transpirable.", p: 189, c: "mujer", t: "Ropa deportiva", s: "Deportivo", m: "Poliamida y elastano", col: ["morado", "negro"], r: 4.6 },
  { n: "Conjunto Sastre Mujer", d: "Conjunto de blazer y pantalón de vestir a juego.", p: 899, c: "mujer", t: "Ropa elegante", s: "Elegante", m: "Crepé de poliéster", col: ["beige", "negro"], r: 4.8, b: "Nuevo" },
  { n: "Hoodie Mujer Essential", d: "Hoodie clásica con capucha forrada y bolsillo canguro.", p: 329, c: "mujer", t: "Hoodies", s: "Casual", m: "Algodón french terry", col: ["gris", "rosa"], r: 4.6 },
  { n: "Suéter Cárdigan Nova", d: "Cárdigan de punto con botones y bolsillos laterales.", p: 429, c: "mujer", t: "Suéteres", s: "Casual", m: "Mezcla acrílico-lana", col: ["beige", "morado"], r: 4.6 },

  // ---------- HOMBRE (ampliación) ----------
  { n: "Camisa Lino Nova", d: "Camisa de lino de manga larga, fresca y ligera.", p: 379, c: "hombre", t: "Camisas", s: "Elegante", m: "100% lino", col: ["blanco", "beige"], r: 4.7 },
  { n: "Polo Rayas Nova", d: "Polo de piqué con rayas contrastantes y cuello tejido.", p: 259, c: "hombre", t: "Polos", s: "Casual", m: "Piqué de algodón", col: ["azul", "blanco"], r: 4.5 },
  { n: "Pantalón Chino Slim", d: "Chino slim de gabardina elástica con tiro medio.", p: 399, c: "hombre", t: "Pantalones", s: "Casual", m: "Gabardina elástica", col: ["beige", "negro"], r: 4.6 },
  { n: "Camiseta Gráfica Nova", d: "Camiseta con estampado gráfico exclusivo de la marca.", p: 199, c: "hombre", t: "Camisetas", s: "Urbano", m: "Algodón peinado", col: ["negro", "morado"], r: 4.5, b: "Nuevo" },
  { n: "Short Chino Hombre", d: "Short chino de corte recto con cinturón incluido.", p: 229, c: "hombre", t: "Shorts", s: "Casual", m: "Algodón gabardina", col: ["beige", "azul"], r: 4.4 },
  { n: "Conjunto Urbano Hombre", d: "Conjunto de sudadera y jogger en tejido afelpado.", p: 629, c: "hombre", t: "Conjuntos", s: "Urbano", m: "Algodón french terry", col: ["negro", "azul"], r: 4.7 },
  { n: "Suéter Cuello Alto", d: "Suéter de cuello alto en punto fino.", p: 439, c: "hombre", t: "Suéteres", s: "Elegante", m: "Mezcla lana-algodón", col: ["gris", "negro"], r: 4.6 },

  // ---------- NIÑOS / NIÑAS (ampliación) ----------
  { n: "Camisa Niña Bordada", d: "Camisa infantil con bordado floral en el cuello.", p: 209, c: "ninas", t: "Camisas", s: "Elegante", m: "Algodón poplin", col: ["blanco", "celeste"], sz: KID_SIZES, r: 4.5 },
  { n: "Pantalón Niña Cargo", d: "Pantalón cargo infantil con bolsillos laterales.", p: 219, c: "ninas", t: "Pantalones", s: "Urbano", m: "Gabardina de algodón", col: ["beige", "rosa"], sz: KID_SIZES, r: 4.4 },
  { n: "Sudadera Niña Nova", d: "Sudadera infantil con capucha y estampado brillante.", p: 259, c: "ninas", t: "Sudaderas", s: "Casual", m: "Algodón afelpado", col: ["rosa", "morado"], sz: KID_SIZES, r: 4.6 },
  { n: "Polo Niño Clásico", d: "Polo infantil de piqué con cuello estructurado.", p: 169, c: "ninos", t: "Polos", s: "Casual", m: "Piqué de algodón", col: ["azul", "blanco"], sz: KID_SIZES, r: 4.5 },
  { n: "Chaqueta Niño Denim", d: "Chaqueta de mezclilla infantil con botones metálicos.", p: 329, c: "ninos", t: "Chaquetas", s: "Casual", m: "Denim de algodón", col: ["azul"], sz: KID_SIZES, r: 4.6 },

  // ---------- CALZADO (ampliación) ----------
  { n: "Sneakers Retro Piel", d: "Sneakers retro de piel lisa con suela delgada.", p: 729, c: "calzado", t: "Sneakers hombre", s: "Casual", m: "Piel y goma", col: ["blanco", "cafe"], sz: SHOE_SIZES, r: 4.7 },
  { n: "Zapato Oxford Elegante", d: "Zapato Oxford de vestir con acabado pulido.", p: 899, c: "calzado", t: "Zapatos elegantes", s: "Elegante", m: "Cuero genuino", col: ["negro", "cafe"], sz: SHOE_SIZES, r: 4.8 },
  { n: "Sandalia Elegante Nova", d: "Sandalia de tacón bajo con tiras satinadas.", p: 449, c: "calzado", t: "Sandalias", s: "Elegante", m: "Satén y microfibra", col: ["dorado", "negro"], sz: SHOE_SIZES, r: 4.5 },
  { n: "Bota Niña Invierno", d: "Botín infantil forrado, cálido y antideslizante.", p: 349, c: "calzado", t: "Calzado niña", s: "Casual", m: "Sintético forrado", col: ["rosa", "cafe"], sz: KID_SHOE_SIZES, r: 4.6 },
  { n: "Tenis Niño Deportivo", d: "Tenis infantil deportivo de sujeción firme.", p: 319, c: "calzado", t: "Calzado niño", s: "Deportivo", m: "Malla y goma", col: ["azul", "negro"], sz: KID_SHOE_SIZES, r: 4.6 },

  // ---------- BOLSOS (ampliación) ----------
  { n: "Bolso Casual Bandolera", d: "Bandolera casual de lona con bolsillo frontal.", p: 329, c: "bolsos", t: "Bolsos", s: "Casual", m: "Lona resistente", col: ["beige", "verde"], sz: ONE_SIZE, r: 4.4 },
  { n: "Mochila Urbana Nova", d: "Mochila urbana compacta con cierres reforzados.", p: 469, c: "bolsos", t: "Mochilas", s: "Urbano", m: "Poliéster reciclado", col: ["negro", "azul"], sz: ONE_SIZE, r: 4.5 },
  { n: "Cartera Larga Elegante", d: "Cartera larga con múltiples tarjeteros y cierre.", p: 289, c: "bolsos", t: "Carteras", s: "Elegante", m: "Piel sintética", col: ["negro", "vino"], sz: ONE_SIZE, r: 4.5 },

  // ---------- JOYERÍA ----------
  { n: "Collar Cadena Dorada", d: "Collar de cadena fina con acabado dorado mate.", p: 249, c: "joyeria", t: "Collares", s: "Elegante", m: "Acero con baño de oro", col: ["dorado"], sz: ONE_SIZE, r: 4.7, b: "Nuevo" },
  { n: "Cadena Urbana Plata", d: "Cadena urbana de eslabón grueso, acabado plata.", p: 289, c: "joyeria", t: "Cadenas", s: "Urbano", m: "Acero inoxidable", col: ["gris"], sz: ONE_SIZE, r: 4.6 },
  { n: "Pulsera Minimal Nova", d: "Pulsera minimalista ajustable de acabado brillante.", p: 179, c: "joyeria", t: "Pulseras", s: "Elegante", m: "Acero quirúrgico", col: ["dorado", "gris"], sz: ONE_SIZE, r: 4.5 },
  { n: "Brazalete Rígido", d: "Brazalete rígido de superficie lisa y cierre oculto.", p: 219, c: "joyeria", t: "Brazaletes", s: "Elegante", m: "Latón con baño dorado", col: ["dorado"], sz: ONE_SIZE, r: 4.4 },
  { n: "Anillo Set Trío", d: "Set de tres anillos apilables de distintos grosores.", p: 199, c: "joyeria", t: "Anillos", s: "Casual", m: "Acero con baño dorado", col: ["dorado", "gris"], sz: ONE_SIZE, r: 4.6 },
  { n: "Aretes Aro Clásicos", d: "Aretes de aro medianos, ligeros y cómodos.", p: 159, c: "joyeria", t: "Aretes", s: "Casual", m: "Acero hipoalergénico", col: ["dorado"], sz: ONE_SIZE, r: 4.5 },
  { n: "Aretes Perla Nova", d: "Aretes con perla sintética y base dorada.", p: 189, c: "joyeria", t: "Aretes", s: "Elegante", m: "Perla sintética y acero", col: ["blanco", "dorado"], sz: ONE_SIZE, r: 4.6 },
  { n: "Collar Colgante Piedra", d: "Collar con colgante de piedra facetada.", p: 269, c: "joyeria", t: "Collares", s: "Elegante", m: "Acero y cristal", col: ["morado", "dorado"], sz: ONE_SIZE, r: 4.5 },

  // ---------- FRAGANCIAS ----------
  { n: "Nova Bloom Eau de Parfum", d: "Fragancia femenina floral luminosa de larga duración.", p: 549, c: "fragancias", t: "Fragancia mujer", s: "Elegante", m: "Eau de Parfum 100 ml", col: ["rosa"], sz: ONE_SIZE, r: 4.8, b: "Nuevo", f: { ml: "100 ml", family: "Floral frutal", notes: "Peonía, pera y almizcle blanco" } },
  { n: "Nova Velvet Nuit", d: "Fragancia femenina oriental para la noche.", p: 629, c: "fragancias", t: "Fragancia mujer", s: "Elegante", m: "Eau de Parfum 90 ml", col: ["morado"], sz: ONE_SIZE, r: 4.7, f: { ml: "90 ml", family: "Oriental amaderada", notes: "Vainilla, pachulí y ámbar" } },
  { n: "Nova Blue Intense", d: "Fragancia masculina fresca con fondo amaderado.", p: 579, c: "fragancias", t: "Fragancia hombre", s: "Urbano", m: "Eau de Toilette 100 ml", col: ["azul"], sz: ONE_SIZE, r: 4.8, b: "Más vendido", f: { ml: "100 ml", family: "Aromática fougère", notes: "Bergamota, lavanda y cedro" } },
  { n: "Nova Noir Homme", d: "Fragancia masculina intensa y elegante para la noche.", p: 659, c: "fragancias", t: "Fragancia hombre", s: "Elegante", m: "Eau de Parfum 100 ml", col: ["negro"], sz: ONE_SIZE, r: 4.7, f: { ml: "100 ml", family: "Amaderada especiada", notes: "Cardamomo, cuero y vetiver" } },
  { n: "Nova Citrus Unisex", d: "Fragancia unisex cítrica y fresca para uso diario.", p: 489, c: "fragancias", t: "Fragancia unisex", s: "Casual", m: "Eau de Toilette 75 ml", col: ["celeste"], sz: ONE_SIZE, r: 4.6, f: { ml: "75 ml", family: "Cítrica fresca", notes: "Limón, neroli y musgo" } },
  { n: "Nova White Musk", d: "Fragancia unisex de almizcle suave y envolvente.", p: 519, c: "fragancias", t: "Fragancia unisex", s: "Casual", m: "Eau de Parfum 80 ml", col: ["blanco"], sz: ONE_SIZE, r: 4.6, f: { ml: "80 ml", family: "Almizclada", notes: "Almizcle blanco, iris y sándalo" } },
  { n: "Nova Rose Gold", d: "Fragancia femenina afrutada con fondo dulce.", p: 559, c: "fragancias", t: "Fragancia mujer", s: "Elegante", m: "Eau de Parfum 90 ml", col: ["dorado", "rosa"], sz: ONE_SIZE, r: 4.7, f: { ml: "90 ml", family: "Floral dulce", notes: "Rosa, frambuesa y praliné" } },

  // ---------- ROPA (nueva colección 2026) ----------
  { n: "Hoodie Rojo Statement", d: "Hoodie de felpa gruesa con capucha doble y cordón grueso.", p: 389, c: "hombre", t: "Hoodies", s: "Urbano", m: "Algodón felpa gruesa", col: ["vino", "negro"], r: 4.7, b: "Nuevo" },
  { n: "Chaqueta Piel Urbana", d: "Chaqueta tipo piel de corte recto con cierre frontal.", p: 899, c: "hombre", t: "Chaquetas", s: "Urbano", m: "Piel sintética premium", col: ["cafe", "negro"], r: 4.8 },
  { n: "Jeans Straight Denim Lab", d: "Jeans de corte recto en denim rígido de alto gramaje.", p: 419, c: "hombre", t: "Jeans", s: "Casual", m: "Denim 13 oz", col: ["azul", "gris"], r: 4.6 },
  { n: "Look Urbano Lentes Nova", d: "Camisa blanca de corte relajado con acabado suave.", p: 349, c: "hombre", t: "Camisas", s: "Urbano", m: "Algodón lavado", col: ["blanco", "celeste"], r: 4.5 },
  { n: "Básicos Esenciales Nova", d: "Set de básicos de punto en tonos neutros, fáciles de combinar.", p: 459, c: "mujer", t: "Básicos", s: "Casual", m: "Punto de algodón", col: ["beige", "blanco", "gris"], r: 4.6, b: "Nuevo" },

  // ---------- NIÑOS / NIÑAS (nueva colección) ----------
  { n: "Conjunto Deportivo Niño Track", d: "Conjunto deportivo infantil con detalles contrastantes.", p: 299, c: "ninos", t: "Conjuntos", s: "Deportivo", m: "Poliéster técnico", col: ["verde", "azul"], sz: KID_SIZES, r: 4.7, b: "Nuevo" },
  { n: "Mochila y Look Kids Explorer", d: "Conjunto infantil de exterior con capucha y forro suave.", p: 339, c: "ninos", t: "Chaquetas", s: "Casual", m: "Algodón afelpado", col: ["beige", "verde"], sz: KID_SIZES, r: 4.6 },
  { n: "Vestido Niña Party", d: "Vestido infantil de fiesta con falda amplia y lazo.", p: 289, c: "ninas", t: "Vestidos", s: "Elegante", m: "Poliéster con forro", col: ["rosa", "morado"], sz: KID_SIZES, r: 4.8 },

  // ---------- CALZADO (nueva colección) ----------
  { n: "Sneakers Blancos Minimal", d: "Sneakers blancos de silueta limpia para uso diario.", p: 649, c: "calzado", t: "Sneakers mujer", s: "Casual", m: "Piel sintética y goma", col: ["blanco"], sz: SHOE_SIZES, r: 4.7, b: "Más vendido" },
  { n: "Sneakers Street Pro", d: "Zapatillas urbanas de caña media con suela acolchada.", p: 759, c: "calzado", t: "Sneakers hombre", s: "Urbano", m: "Malla y piel sintética", col: ["blanco", "azul"], sz: SHOE_SIZES, r: 4.7 },
  { n: "Tenis Running Air Nova", d: "Tenis de running con cámara de aire y ajuste envolvente.", p: 869, c: "calzado", t: "Calzado deportivo", s: "Deportivo", m: "Knit y espuma reactiva", col: ["blanco", "azul"], sz: SHOE_SIZES, r: 4.8 },
  { n: "Tenis Trainer Nova", d: "Tenis de entrenamiento con suela de tracción multidireccional.", p: 799, c: "calzado", t: "Calzado deportivo", s: "Deportivo", m: "Textil técnico", col: ["gris", "negro"], sz: SHOE_SIZES, r: 4.6 },
  { n: "Sneakers Runner Colorblock", d: "Zapatillas colorblock con lengüeta acolchada.", p: 699, c: "calzado", t: "Sneakers mujer", s: "Deportivo", m: "Malla transpirable", col: ["blanco", "rosa"], sz: SHOE_SIZES, r: 4.6, b: "Nuevo" },
  { n: "Sneakers Metallic Edition", d: "Sneakers de acabado metalizado para looks nocturnos.", p: 829, c: "calzado", t: "Sneakers mujer", s: "Elegante", m: "Sintético metalizado", col: ["gris", "dorado"], sz: SHOE_SIZES, r: 4.5 },
  { n: "Mocasines Nova Suede", d: "Mocasines de ante con puntera afinada y suela flexible.", p: 719, c: "calzado", t: "Mocasines", s: "Elegante", m: "Ante sintético", col: ["beige", "cafe"], sz: SHOE_SIZES, r: 4.6 },

  // ---------- BOLSOS (nueva colección) ----------
  { n: "Bolso Estructurado Perla", d: "Bolso estructurado con solapa y cierre metálico.", p: 589, c: "bolsos", t: "Bolsos elegantes", s: "Elegante", m: "Piel vegana texturizada", col: ["gris", "beige"], sz: ONE_SIZE, r: 4.7, b: "Nuevo" },
  { n: "Bolso Tejido Artesanal", d: "Bolso tejido de asa redonda, ideal para verano.", p: 429, c: "bolsos", t: "Bolsos casuales", s: "Casual", m: "Fibra tejida", col: ["beige", "celeste"], sz: ONE_SIZE, r: 4.5 },
  { n: "Bolso Acolchado Rubí", d: "Bolso acolchado con cadena dorada desmontable.", p: 649, c: "bolsos", t: "Bolsos elegantes", s: "Elegante", m: "Piel sintética acolchada", col: ["vino", "negro"], sz: ONE_SIZE, r: 4.8 },
  { n: "Bolso Satchel Nova", d: "Bolso satchel con asa superior y bandolera ajustable.", p: 559, c: "bolsos", t: "Bolsos de mano", s: "Elegante", m: "Piel vegana", col: ["rosa", "beige"], sz: ONE_SIZE, r: 4.6 },
  { n: "Bolso Hombro Camel", d: "Bolso de hombro en tono camel con interior forrado.", p: 499, c: "bolsos", t: "Bolsos de hombro", s: "Casual", m: "Piel vegana suave", col: ["cafe", "beige"], sz: ONE_SIZE, r: 4.6 },
  { n: "Tote Lona Everyday", d: "Tote de lona resistente con asas reforzadas.", p: 259, c: "bolsos", t: "Bolsos grandes", s: "Casual", m: "Lona de algodón", col: ["beige", "blanco"], sz: ONE_SIZE, r: 4.4, b: "Oferta" },

  // ---------- JOYERÍA (nueva colección) ----------
  { n: "Collar Perlas Clásico", d: "Collar de perlas sintéticas con cierre de acero.", p: 299, c: "joyeria", t: "Collares", s: "Elegante", m: "Perlas sintéticas y acero", col: ["blanco", "dorado"], sz: ONE_SIZE, r: 4.7 },
  { n: "Set Anillos Piedra Natural", d: "Set de anillos con piedras naturales de tonos suaves.", p: 259, c: "joyeria", t: "Anillos", s: "Casual", m: "Latón dorado y piedra", col: ["dorado", "verde"], sz: ONE_SIZE, r: 4.6, b: "Nuevo" },
  { n: "Gargantilla Delicada", d: "Gargantilla fina de cadena delicada y ajuste regulable.", p: 219, c: "joyeria", t: "Gargantillas", s: "Elegante", m: "Acero con baño de oro", col: ["dorado"], sz: ONE_SIZE, r: 4.6 },
  { n: "Anillo Statement Nova", d: "Anillo statement de superficie pulida y perfil ancho.", p: 239, c: "joyeria", t: "Anillos", s: "Elegante", m: "Acero quirúrgico", col: ["dorado", "gris"], sz: ONE_SIZE, r: 4.5 },
  { n: "Aretes Cobre Moderno", d: "Aretes geométricos de acabado cobrizo mate.", p: 189, c: "joyeria", t: "Aretes", s: "Urbano", m: "Aleación con baño cobrizo", col: ["dorado", "cafe"], sz: ONE_SIZE, r: 4.4 },
  { n: "Set Joyería Gemas", d: "Set de piezas con gemas de colores en montura plateada.", p: 349, c: "joyeria", t: "Sets de joyería", s: "Elegante", m: "Aleación y cristal", col: ["morado", "gris"], sz: ONE_SIZE, r: 4.7, b: "Más vendido" },
  { n: "Pulsera Charms Nova", d: "Pulsera con charms intercambiables de acabado dorado.", p: 229, c: "joyeria", t: "Pulseras", s: "Casual", m: "Acero con baño dorado", col: ["dorado"], sz: ONE_SIZE, r: 4.5 },

  // ---------- ACCESORIOS (nueva colección) ----------
  { n: "Sombreros Colección Nova", d: "Sombrero de ala ancha con banda decorativa.", p: 249, c: "accesorios", t: "Sombreros", s: "Elegante", m: "Fieltro sintético", col: ["beige", "negro"], sz: ONE_SIZE, r: 4.5, b: "Nuevo" },
  { n: "Termo Acero Nova", d: "Termo de acero con acabado mate, ideal para el día a día.", p: 189, c: "accesorios", t: "Complementos", s: "Urbano", m: "Acero inoxidable", col: ["cafe", "gris"], sz: ONE_SIZE, r: 4.4 },

  // ---------- FRAGANCIAS (ampliación) ----------
  { n: "Nova Amber Wood", d: "Fragancia unisex amaderada con fondo ambarino cálido.", p: 599, c: "fragancias", t: "Fragancia unisex", s: "Elegante", m: "Eau de Parfum 100 ml", col: ["dorado"], sz: ONE_SIZE, r: 4.7, f: { ml: "100 ml", family: "Amaderada ambarina", notes: "Ámbar, sándalo y haba tonka" } },
  { n: "Nova Golden Oud", d: "Fragancia oriental intensa con notas de oud y especias.", p: 689, c: "fragancias", t: "Fragancia unisex", s: "Elegante", m: "Eau de Parfum 90 ml", col: ["dorado", "cafe"], sz: ONE_SIZE, r: 4.8, b: "Nuevo", f: { ml: "90 ml", family: "Oriental especiada", notes: "Oud, azafrán y ámbar" } },
  { n: "Nova Black Set Hombre", d: "Set de fragancia masculina con eau de parfum y presentación de regalo.", p: 759, c: "fragancias", t: "Fragancia hombre", s: "Elegante", m: "Eau de Parfum 100 ml", col: ["negro"], sz: ONE_SIZE, r: 4.7, f: { ml: "100 ml", family: "Amaderada aromática", notes: "Pimienta negra, vetiver y ámbar" } },
  { n: "Nova Fleur de Nuit", d: "Fragancia femenina floral nocturna de estela envolvente.", p: 629, c: "fragancias", t: "Fragancia mujer", s: "Elegante", m: "Eau de Parfum 90 ml", col: ["morado", "rosa"], sz: ONE_SIZE, r: 4.7, f: { ml: "90 ml", family: "Floral oriental", notes: "Jazmín, vainilla y almizcle" } },
  { n: "Nova Fresh Bloom EDT", d: "Fragancia femenina fresca y juvenil para uso diario.", p: 459, c: "fragancias", t: "Fragancia mujer", s: "Casual", m: "Eau de Toilette 75 ml", col: ["rosa", "celeste"], sz: ONE_SIZE, r: 4.6, f: { ml: "75 ml", family: "Floral fresca", notes: "Bergamota, peonía y almizcle" } },

  // ---------- SKINCARE ----------
  { n: "Gel Limpiador Purificante", d: "Gel limpiador facial de textura ligera y enjuague fácil.", p: 189, c: "skincare", t: "Limpieza facial", s: "Skincare", m: "Fórmula cosmética sin fragancia añadida", col: ["blanco"], sz: ONE_SIZE, r: 4.7, b: "Nuevo", k: { size: "150 ml", skin: "Piel mixta a grasa", use: "Aplica sobre rostro húmedo, masajea y enjuaga con agua tibia.", ing: "Glicerina y extracto de té verde" } },
  { n: "Espuma Limpiadora Suave", d: "Espuma limpiadora facial de tacto sedoso para uso diario.", p: 175, c: "skincare", t: "Limpieza facial", s: "Skincare", m: "Fórmula cosmética suave", col: ["blanco", "morado"], sz: ONE_SIZE, r: 4.6, k: { size: "120 ml", skin: "Piel sensible", use: "Usa mañana y noche; masajea 30 segundos y enjuaga.", ing: "Pantenol y avena coloidal" } },
  { n: "Bálsamo Limpiador Nova", d: "Bálsamo desmaquillante que se transforma en aceite al contacto.", p: 219, c: "skincare", t: "Limpieza facial", s: "Skincare", m: "Textura bálsamo", col: ["negro", "beige"], sz: ONE_SIZE, r: 4.7, k: { size: "100 ml", skin: "Todo tipo de piel", use: "Masajea en seco, emulsiona con agua y retira.", ing: "Aceites vegetales y vitamina E" } },
  { n: "Agua Micelar Nova Clean", d: "Agua micelar para retirar maquillaje sin frotar en exceso.", p: 149, c: "skincare", t: "Limpieza facial", s: "Skincare", m: "Solución micelar", col: ["blanco"], sz: ONE_SIZE, r: 4.5, k: { size: "250 ml", skin: "Todo tipo de piel", use: "Aplica con algodón y desliza suavemente.", ing: "Agua de rosas y glicerina" } },
  { n: "Crema Hidratante Diaria", d: "Crema hidratante de textura ligera y rápida absorción.", p: 259, c: "skincare", t: "Hidratación", s: "Skincare", m: "Crema cosmética", col: ["blanco", "rosa"], sz: ONE_SIZE, r: 4.8, b: "Más vendido", k: { size: "50 ml", skin: "Piel normal a seca", use: "Aplica por la mañana sobre el rostro limpio.", ing: "Ácido hialurónico y ceramidas" } },
  { n: "Gel Hidratante Oil Free", d: "Gel hidratante de acabado mate, sin sensación grasa.", p: 239, c: "skincare", t: "Hidratación", s: "Skincare", m: "Gel cosmético", col: ["blanco", "celeste"], sz: ONE_SIZE, r: 4.6, k: { size: "50 ml", skin: "Piel grasa", use: "Aplica una capa fina mañana y noche.", ing: "Niacinamida y aloe" } },
  { n: "Crema de Noche Reconfort", d: "Crema de noche de textura envolvente para rutina nocturna.", p: 299, c: "skincare", t: "Hidratación", s: "Skincare", m: "Crema cosmética rica", col: ["negro", "blanco"], sz: ONE_SIZE, r: 4.7, k: { size: "50 ml", skin: "Piel seca", use: "Aplica antes de dormir con un ligero masaje.", ing: "Manteca de karité y escualano" } },
  { n: "Loción Facial Equilibrio", d: "Loción facial ligera para completar la limpieza diaria.", p: 199, c: "skincare", t: "Hidratación", s: "Skincare", m: "Loción cosmética", col: ["blanco"], sz: ONE_SIZE, r: 4.5, k: { size: "100 ml", skin: "Piel mixta", use: "Aplica con algodón tras la limpieza.", ing: "Agua de hamamelis y pantenol" } },
  { n: "Sérum Hidratante Hialurónico", d: "Sérum ligero de acabado fresco para el uso diario.", p: 329, c: "skincare", t: "Sérums", s: "Skincare", m: "Sérum cosmético", col: ["blanco", "dorado"], sz: ONE_SIZE, r: 4.8, b: "Nuevo", k: { size: "30 ml", skin: "Todo tipo de piel", use: "Aplica 3 gotas sobre rostro limpio antes de hidratar.", ing: "Ácido hialurónico de bajo peso" } },
  { n: "Sérum Iluminador Vitamina C", d: "Sérum cosmético de acabado luminoso para la rutina de mañana.", p: 359, c: "skincare", t: "Sérums", s: "Skincare", m: "Sérum cosmético", col: ["dorado", "blanco"], sz: ONE_SIZE, r: 4.7, k: { size: "30 ml", skin: "Piel apagada", use: "Usa por la mañana y continúa con protector solar.", ing: "Vitamina C estabilizada" } },
  { n: "Sérum Antioxidante Botánico", d: "Sérum de extractos botánicos con textura sedosa.", p: 349, c: "skincare", t: "Sérums", s: "Skincare", m: "Sérum cosmético", col: ["dorado", "verde"], sz: ONE_SIZE, r: 4.6, k: { size: "30 ml", skin: "Todo tipo de piel", use: "Aplica por la noche antes de la crema.", ing: "Té verde y vitamina E" } },
  { n: "Sérum Calmante Centella", d: "Sérum calmante de textura acuosa y absorción inmediata.", p: 339, c: "skincare", t: "Sérums", s: "Skincare", m: "Sérum cosmético", col: ["blanco", "verde"], sz: ONE_SIZE, r: 4.7, k: { size: "30 ml", skin: "Piel sensible", use: "Aplica tras la limpieza, mañana y noche.", ing: "Centella asiática y pantenol" } },
  { n: "Protector Solar Facial SPF 50", d: "Protector solar facial de acabado invisible y textura ligera.", p: 289, c: "skincare", t: "Protección solar", s: "Skincare", m: "Emulsión SPF 50", col: ["blanco"], sz: ONE_SIZE, r: 4.9, b: "Más vendido", k: { size: "50 ml", skin: "Todo tipo de piel", use: "Aplica como último paso de la mañana y reaplica según necesidad.", ing: "Filtros solares y niacinamida" } },
  { n: "Protector Solar Gel SPF 30", d: "Protector solar en gel de rápida absorción para uso diario.", p: 249, c: "skincare", t: "Protección solar", s: "Skincare", m: "Gel SPF 30", col: ["rosa", "blanco"], sz: ONE_SIZE, r: 4.6, k: { size: "60 ml", skin: "Piel mixta a grasa", use: "Aplica sobre rostro y cuello antes de la exposición solar.", ing: "Filtros solares y aloe" } },
  { n: "Contorno de Ojos Hidratante", d: "Crema de contorno de ojos ligera y de tacto fresco.", p: 279, c: "skincare", t: "Contorno de ojos", s: "Skincare", m: "Crema cosmética", col: ["blanco", "morado"], sz: ONE_SIZE, r: 4.6, k: { size: "15 ml", skin: "Todo tipo de piel", use: "Aplica con toques suaves alrededor del ojo.", ing: "Cafeína y ácido hialurónico" } },
  { n: "Gel Contorno Efecto Frío", d: "Gel de contorno con aplicador metálico de efecto fresco.", p: 259, c: "skincare", t: "Contorno de ojos", s: "Skincare", m: "Gel cosmético", col: ["celeste", "blanco"], sz: ONE_SIZE, r: 4.5, k: { size: "15 ml", skin: "Piel sensible", use: "Desliza el aplicador de dentro hacia fuera.", ing: "Pepino y cafeína" } },
  { n: "Mascarilla Hidratante Nova", d: "Mascarilla facial hidratante de uso semanal.", p: 199, c: "skincare", t: "Mascarillas", s: "Skincare", m: "Mascarilla cosmética", col: ["verde", "blanco"], sz: ONE_SIZE, r: 4.7, k: { size: "75 ml", skin: "Todo tipo de piel", use: "Aplica una capa, deja 10 minutos y retira.", ing: "Aguacate y glicerina" } },
  { n: "Mascarilla de Arcilla Detox", d: "Mascarilla de arcilla para una limpieza profunda semanal.", p: 209, c: "skincare", t: "Mascarillas", s: "Skincare", m: "Arcilla cosmética", col: ["cafe", "verde"], sz: ONE_SIZE, r: 4.6, k: { size: "75 ml", skin: "Piel grasa", use: "Aplica en zona T, deja 8 minutos y enjuaga.", ing: "Arcilla caolín y carbón" } },
  { n: "Sheet Masks Set x5", d: "Set de cinco mascarillas de tela para rutinas rápidas.", p: 179, c: "skincare", t: "Mascarillas", s: "Skincare", m: "Set de 5 unidades", col: ["blanco", "rosa"], sz: ONE_SIZE, r: 4.5, b: "Oferta", k: { size: "5 × 25 ml", skin: "Todo tipo de piel", use: "Coloca la mascarilla 15 minutos y masajea el excedente.", ing: "Aloe, colágeno vegetal y té verde" } },
  { n: "Exfoliante Facial Suave", d: "Exfoliante facial de partículas finas para uso semanal.", p: 219, c: "skincare", t: "Exfoliación", s: "Skincare", m: "Exfoliante cosmético", col: ["rosa", "blanco"], sz: ONE_SIZE, r: 4.5, k: { size: "100 ml", skin: "Piel normal", use: "Masajea con movimientos circulares y enjuaga.", ing: "Microesferas de jojoba" } },
  { n: "Tónico Exfoliante Nocturno", d: "Tónico cosmético de uso nocturno para una piel de aspecto uniforme.", p: 269, c: "skincare", t: "Exfoliación", s: "Skincare", m: "Tónico cosmético", col: ["beige", "blanco"], sz: ONE_SIZE, r: 4.6, k: { size: "150 ml", skin: "Piel mixta", use: "Aplica con algodón 2 o 3 noches por semana.", ing: "AHA suaves y pantenol" } },

  // ---------- CUIDADO PERSONAL ----------
  { n: "Crema Corporal Nutritiva", d: "Crema corporal de textura envolvente para piel suave.", p: 189, c: "cuidado", t: "Cuerpo", s: "Cuidado personal", m: "Crema corporal", col: ["verde", "blanco"], sz: ONE_SIZE, r: 4.7, k: { size: "250 ml", skin: "Piel seca", use: "Aplica tras la ducha con la piel ligeramente húmeda.", ing: "Manteca de karité y avena" } },
  { n: "Body Lotion Nova Silk", d: "Loción corporal ligera de rápida absorción y aroma suave.", p: 159, c: "cuidado", t: "Cuerpo", s: "Cuidado personal", m: "Loción corporal", col: ["blanco"], sz: ONE_SIZE, r: 4.6, k: { size: "300 ml", skin: "Todo tipo de piel", use: "Aplica diariamente sobre cuerpo limpio.", ing: "Glicerina y aceite de almendra" } },
  { n: "Aceite Corporal Coco Nova", d: "Aceite corporal de acabado satinado y aroma tropical.", p: 199, c: "cuidado", t: "Cuerpo", s: "Cuidado personal", m: "Aceite corporal", col: ["blanco", "beige"], sz: ONE_SIZE, r: 4.6, b: "Nuevo", k: { size: "200 ml", skin: "Piel seca", use: "Masajea unas gotas sobre la piel húmeda.", ing: "Aceite de coco virgen" } },
  { n: "Set Spa Baño Relax", d: "Set de baño con esponja, sales y jabón artesanal.", p: 289, c: "cuidado", t: "Baño", s: "Cuidado personal", m: "Set de baño", col: ["beige", "blanco"], sz: ONE_SIZE, r: 4.8, k: { size: "Set de 4 piezas", skin: "Todo tipo de piel", use: "Utiliza durante el baño y enjuaga con agua tibia.", ing: "Sales minerales y aceites esenciales" } },
  { n: "Gel de Ducha Botánico", d: "Gel de ducha de espuma suave con aroma fresco.", p: 149, c: "cuidado", t: "Baño", s: "Cuidado personal", m: "Gel de ducha", col: ["verde", "blanco"], sz: ONE_SIZE, r: 4.5, k: { size: "400 ml", skin: "Todo tipo de piel", use: "Aplica sobre esponja húmeda y enjuaga.", ing: "Extractos botánicos" } },
  { n: "Kit Afeitado Nova Grooming", d: "Kit de afeitado con brocha, gel y accesorios de cuidado.", p: 349, c: "cuidado", t: "Baño", s: "Cuidado personal", m: "Kit de grooming", col: ["negro", "gris"], sz: ONE_SIZE, r: 4.7, k: { size: "Set de 3 piezas", skin: "Piel sensible", use: "Aplica el gel con la brocha y afeita en el sentido del vello.", ing: "Aloe y glicerina" } },
  { n: "Bálsamo Labial Nova Care", d: "Bálsamo labial de textura cremosa y acabado natural.", p: 89, c: "cuidado", t: "Labios", s: "Cuidado personal", m: "Bálsamo labial", col: ["rosa", "dorado"], sz: ONE_SIZE, r: 4.6, k: { size: "8 ml", skin: "Labios secos", use: "Aplica las veces que lo necesites durante el día.", ing: "Manteca de cacao y vitamina E" } },
  { n: "Labial Hidratante Satin", d: "Labial de color con acabado satinado y sensación cómoda.", p: 139, c: "maquillaje", t: "Labios", s: "Maquillaje", m: "Labial cosmético", col: ["rosa", "vino"], sz: ONE_SIZE, r: 4.7, b: "Más vendido", k: { size: "4 g", skin: "Todo tipo de labios", use: "Aplica directamente sobre los labios.", ing: "Aceite de jojoba" } },
  { n: "Shampoo Nutritivo Nova", d: "Shampoo de uso frecuente para un cabello suave y manejable.", p: 169, c: "cuidado", t: "Cabello", s: "Cuidado personal", m: "Shampoo", col: ["blanco"], sz: ONE_SIZE, r: 4.5, k: { size: "400 ml", skin: "Cabello normal", use: "Masajea en cuero cabelludo húmedo y enjuaga.", ing: "Pantenol y keratina vegetal" } },
  { n: "Mascarilla Capilar Intensa", d: "Mascarilla capilar de uso semanal para cabello suave.", p: 219, c: "cuidado", t: "Cabello", s: "Cuidado personal", m: "Mascarilla capilar", col: ["beige", "blanco"], sz: ONE_SIZE, r: 4.6, k: { size: "300 ml", skin: "Cabello seco", use: "Aplica de medios a puntas, deja 5 minutos y enjuaga.", ing: "Aceite de argán" } },
  { n: "Aceite Capilar Brillo Nova", d: "Aceite capilar ligero para dar brillo y controlar el frizz.", p: 189, c: "cuidado", t: "Cabello", s: "Cuidado personal", m: "Aceite capilar", col: ["dorado"], sz: ONE_SIZE, r: 4.5, k: { size: "100 ml", skin: "Cabello mixto", use: "Aplica unas gotas en puntas sobre cabello seco o húmedo.", ing: "Argán y macadamia" } },
  { n: "Crema de Manos Nova Soft", d: "Crema de manos de absorción rápida y aroma delicado.", p: 99, c: "cuidado", t: "Cuerpo", s: "Cuidado personal", m: "Crema de manos", col: ["rosa", "blanco"], sz: ONE_SIZE, r: 4.5, k: { size: "75 ml", skin: "Todo tipo de piel", use: "Aplica cuantas veces sea necesario durante el día.", ing: "Glicerina y karité" } },
  { n: "Set Brochas Beauty Nova", d: "Set de brochas de fibra suave para maquillaje diario.", p: 259, c: "maquillaje", t: "Belleza", s: "Maquillaje", m: "Set de brochas", col: ["rosa", "dorado"], sz: ONE_SIZE, r: 4.6, k: { size: "Set de 8 piezas", skin: "Todo tipo de piel", use: "Lava las brochas periódicamente con jabón suave.", ing: "Fibra sintética" } },
  { n: "Paleta Sombras Nova Glam", d: "Paleta de sombras de tonos versátiles, mate y satinados.", p: 319, c: "maquillaje", t: "Belleza", s: "Maquillaje", m: "Paleta de sombras", col: ["morado", "dorado"], sz: ONE_SIZE, r: 4.7, b: "Nuevo", k: { size: "12 tonos", skin: "Todo tipo de piel", use: "Aplica con brocha y difumina al gusto.", ing: "Pigmentos minerales" } },
  { n: "Base Cobertura Natural", d: "Base de maquillaje de acabado natural y cobertura media.", p: 289, c: "maquillaje", t: "Belleza", s: "Maquillaje", m: "Base de maquillaje", col: ["beige", "cafe"], sz: ONE_SIZE, r: 4.5, k: { size: "30 ml", skin: "Todo tipo de piel", use: "Aplica con esponja o brocha desde el centro del rostro.", ing: "Escualano y vitamina E" } },
  { n: "Kit Belleza Esencial", d: "Kit de belleza con productos esenciales para el día a día.", p: 399, c: "maquillaje", t: "Belleza", s: "Maquillaje", m: "Kit cosmético", col: ["rosa", "negro"], sz: ONE_SIZE, r: 4.6, k: { size: "Set de 6 piezas", skin: "Todo tipo de piel", use: "Utiliza cada producto según su indicación.", ing: "Fórmulas cosméticas" } },
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Solo la fotografía real del producto (misma prenda). */
function gallery(main: string) {
  return [img(main, 1000)];
}

/**
 * Líneas de colección: cada base se ofrece además en variantes de colorway
 * y edición. La fotografía siempre corresponde a la misma prenda base,
 * nunca se mezclan fotos de productos distintos.
 */
const LINES: { suffix: string; delta: number; style?: string; badge?: Product["badge"]; col?: string[] }[] = [
  { suffix: "Edición Nocturna", delta: 60, style: "Elegante", col: ["negro", "vino", "morado"] },
  { suffix: "Colección Cápsula", delta: -30, badge: "Oferta", col: ["blanco", "beige", "celeste"] },
  { suffix: "Línea Signature", delta: 120, badge: "Nuevo", style: "Premium", col: ["negro", "dorado", "gris"] },
  { suffix: "Colección Resort", delta: 20, col: ["celeste", "rosa", "blanco"] },
  { suffix: "Edición Metropolitan", delta: 45, style: "Urbano", col: ["gris", "azul", "negro"] },
  { suffix: "Línea Esencial", delta: -50, badge: "Oferta", col: ["blanco", "negro"] },
  { suffix: "Edición Limitada", delta: 150, badge: "Más vendido", col: ["morado", "rosa", "dorado"] },
];

/** Presentaciones adicionales para fragancias (mini, travel y sets). */
const FRAGRANCE_LINES: { suffix: string; ml: string; delta: number; badge?: Product["badge"] }[] = [
  { suffix: "Travel Size 30 ml", ml: "30 ml", delta: -280 },
  { suffix: "Mini 15 ml", ml: "15 ml", delta: -360, badge: "Oferta" },
  { suffix: "Set de Regalo", ml: "100 ml + 15 ml", delta: 190, badge: "Nuevo" },
];

const VARIANTS: Raw[] = RAW.flatMap((r, idx) => {
  if (r.c === "fragancias") {
    return FRAGRANCE_LINES.map((l) => ({
      ...r,
      n: `${r.n} · ${l.suffix}`,
      d: `${r.d} Presentación ${l.ml}.`,
      p: Math.max(129, r.p + l.delta),
      m: r.m.replace(/\d+\s?ml.*/, l.ml),
      b: l.badge,
      f: r.f ? { ...r.f, ml: l.ml } : undefined,
    }));
  }
  // 3 variantes por prenda base, rotando las líneas de colección
  return [0, 1, 2].map((k) => {
    const l = LINES[(idx + k) % LINES.length];
    return {
      ...r,
      n: `${r.n} · ${l.suffix}`,
      p: Math.max(89, r.p + l.delta),
      s: l.style ?? r.s,
      b: l.badge,
      col: l.col ?? r.col,
      r: Math.min(5, Math.round((r.d.length % 5 === 0 ? r.r + 0.1 : r.r - 0.1) * 10) / 10),
    };
  });
});

const PRODUCT_POOL: Raw[] = [...RAW, ...VARIANTS];
const QUOTAS: Record<CategoryKey, number> = { hombre: 26, mujer: 30, ninos: 10, ninas: 10, calzado: 14, bolsos: 10, joyeria: 8, accesorios: 8, fragancias: 8, skincare: 10, cuidado: 8, maquillaje: 8 };
const ALL_RAW: Raw[] = (Object.keys(QUOTAS) as CategoryKey[]).flatMap((category) => PRODUCT_POOL.filter((p) => p.c === category).slice(0, QUOTAS[category]));

const productVisual = (name: string, categoryLabel: string, idx: number) => {
  const esc = (v: string) => v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c] || c));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1125" viewBox="0 0 900 1125"><defs><linearGradient id="g${idx}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0f172a"/><stop offset=".52" stop-color="#6d28d9"/><stop offset="1" stop-color="#db2777"/></linearGradient></defs><rect width="900" height="1125" rx="44" fill="url(#g${idx})"/><text x="64" y="105" fill="white" font-family="Arial,sans-serif" font-size="32" font-weight="700">NOVASTYLE</text><text x="64" y="165" fill="white" opacity=".72" font-family="Arial,sans-serif" font-size="24">${esc(categoryLabel)}</text><text x="450" y="535" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-size="44" font-weight="800">${esc(name).slice(0, 34)}</text><text x="450" y="600" text-anchor="middle" fill="white" opacity=".75" font-family="Arial,sans-serif" font-size="25">Visual exclusivo del producto</text><text x="450" y="990" text-anchor="middle" fill="white" opacity=".5" font-family="Arial,sans-serif" font-size="20">#${String(idx + 1).padStart(3, "0")}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};


const REAL_PRODUCT_PHOTOS: Record<string, string> = {
  "Elegant Midi Dress": "https://images.pexels.com/photos/25841789/pexels-photo-25841789.jpeg?auto=compress&cs=tinysrgb&w=900",
  "Silk Blouse Perla": "https://images.pexels.com/photos/4831692/pexels-photo-4831692.jpeg?auto=compress&cs=tinysrgb&w=900",
  "Wide Leg Pants": "https://images.pexels.com/photos/8102501/pexels-photo-8102501.jpeg?auto=compress&cs=tinysrgb&w=900",
  "Cropped Hoodie": "https://images.pexels.com/photos/6995869/pexels-photo-6995869.jpeg?auto=compress&cs=tinysrgb&w=900",
  "Puffer Jacket Mujer": "https://images.pexels.com/photos/13513247/pexels-photo-13513247.jpeg?auto=compress&cs=tinysrgb&w=900",
  "Mom Jeans Vintage": "https://images.pexels.com/photos/15576193/pexels-photo-15576193.jpeg?auto=compress&cs=tinysrgb&w=900",
  "Falda Plisada Midi": "https://images.pexels.com/photos/17371754/pexels-photo-17371754.jpeg?auto=compress&cs=tinysrgb&w=900",
  "Top Ribbed Basic": "https://images.pexels.com/photos/17391659/pexels-photo-17391659.jpeg?auto=compress&cs=tinysrgb&w=900",
  "Camiseta Boxy Fit": "https://images.pexels.com/photos/31747194/pexels-photo-31747194.jpeg?auto=compress&cs=tinysrgb&w=900",
  "Short Denim Alto": "https://images.pexels.com/photos/17371755/pexels-photo-17371755.jpeg?auto=compress&cs=tinysrgb&w=900",
};

const realPhotoFor = (name: string) => REAL_PRODUCT_PHOTOS[name];

const CATEGORY_REAL_PHOTOS: Record<CategoryKey, string[]> = {
  hombre: ["photo-1516257984-b1b4d707412e","photo-1506629082955-511b1aa562c8","photo-1617137968427-85924c800a22"],
  mujer: ["photo-1485231183945-fffde7cc051e","photo-1529139574466-a303027c1d8b","photo-1539109136881-3be0616acf4b"],
  ninos: ["photo-1503919545889-aef636e10ad4","photo-1519238263530-99bdd11df2ea"],
  ninas: ["photo-1518831959646-742c3a14ebf7","photo-1471286174890-9c112ffca5b4"],
  calzado: ["photo-1549298916-b41d501d3772","photo-1542291026-7eec264c27ff","photo-1608231387042-66d1773070a5"],
  bolsos: ["photo-1548036328-c9fa89d128fa","photo-1584917865442-de89df76afd3","photo-1594223274512-ad4803739b7c"],
  joyeria: ["photo-1611652022419-a9419f74343d","photo-1599643478518-a784e5dc4c8f","photo-1515562141207-7a88fb7ce338"],
  accesorios: ["photo-1523170335258-f5ed11844a49","photo-1523779917675-b6ed3a42a561"],
  fragancias: ["photo-1541643600914-78b084683601","photo-1592945403244-b3fbafd7f539","photo-1615634260167-c8cdede054de"],
  skincare: ["photo-1556228578-8c89e6adf883","photo-1571781926291-c477ebfd024b","photo-1598440947619-2c35fc9aa908"],
  cuidado: ["photo-1556229010-6c3f2c9ca5f8","photo-1608248543803-ba4f8c70ae0b"],
  maquillaje: ["photo-1596462502278-27bfdc403348","photo-1522335789203-aabd1fc54bc9","photo-1512496015851-a90fb38ba796"],
};

const categoryPhotoFor = (category: CategoryKey, idx: number) => {
  const pool = CATEGORY_REAL_PHOTOS[category];
  return img(pool[idx % pool.length], 900);
};

export const PRODUCTS: Product[] = ALL_RAW.map((r, idx) => ({

  id: `p${idx + 1}`,
  slug: slugify(r.n),
  name: r.n,
  description: r.d,
  longDescription: r.f
    ? `${r.d} Presentación de ${r.f.ml}. Familia olfativa ${r.f.family.toLowerCase()}, con notas de ${r.f.notes.toLowerCase()}. Una creación propia de NOVASTYLE, pensada para acompañar tu estilo de día y de noche.`
    : `${r.d} Confeccionada en ${r.m.toLowerCase()}, esta pieza de la línea ${r.s.toLowerCase()} de NOVASTYLE combina comodidad y diseño contemporáneo. Ideal para crear looks versátiles todos los días. Lavado recomendado a máquina en frío; no usar blanqueador.`,
  price: r.p,
  image: realPhotoFor(r.n.split(" · ")[0]) ?? categoryPhotoFor(r.c, idx),
  images: [realPhotoFor(r.n.split(" · ")[0]) ?? categoryPhotoFor(r.c, idx)],
  category: r.c,
  categoryLabel: CATEGORY_LABEL[r.c],
  type: r.t,
  style: r.s,
  material: r.m,
  availability: idx % 11 === 0 ? "Últimas unidades" : "Disponible en stock",
  colors: r.col.map((k) => C[k]).filter(Boolean),
  sizes: r.sz ?? APPAREL_SIZES,
  rating: r.r,
  badge: r.b,
  fragrance: r.f,
  care: r.k ? { size: r.k.size, skin: r.k.skin, use: r.k.use, ingredients: r.k.ing } : undefined,
}));

export const CATEGORIES: { key: string; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "hombre", label: "Hombre" },
  { key: "mujer", label: "Mujer" },
  { key: "ninos", label: "Niños" },
  { key: "ninas", label: "Niñas" },
  { key: "calzado", label: "Calzado" },
  { key: "bolsos", label: "Bolsos" },
  { key: "joyeria", label: "Joyería" },
  { key: "accesorios", label: "Accesorios" },
  { key: "fragancias", label: "Fragancias" },
  { key: "skincare", label: "Skincare" },
  { key: "cuidado", label: "Cuidado personal" },
  { key: "maquillaje", label: "Maquillaje" },
];

export const getProduct = (id: string) =>
  PRODUCTS.find((p) => p.id === id || p.slug === id);

export const relatedProducts = (p: Product, n = 6) =>
  PRODUCTS.filter((x) => x.id !== p.id && (x.category === p.category || x.style === p.style)).slice(0, n);

export const SIZE_GUIDE = {
  adulto: {
    title: "Ropa adulto (cm)",
    head: ["Talla", "Pecho", "Cintura", "Cadera"],
    rows: [
      ["XS", "82-86", "64-68", "88-92"],
      ["S", "87-91", "69-73", "93-97"],
      ["M", "92-97", "74-79", "98-103"],
      ["L", "98-103", "80-85", "104-109"],
      ["XL", "104-110", "86-92", "110-116"],
      ["XXL", "111-117", "93-99", "117-123"],
    ],
  },
  ninos: {
    title: "Ropa infantil",
    head: ["Talla", "Edad", "Estatura (cm)"],
    rows: [
      ["2A", "2 años", "88-94"],
      ["4A", "4 años", "100-106"],
      ["6A", "6 años", "112-118"],
      ["8A", "8 años", "124-130"],
      ["10A", "10 años", "136-142"],
      ["12A", "12 años", "148-154"],
    ],
  },
  calzado: {
    title: "Calzado (cm de plantilla)",
    head: ["Talla", "Longitud"],
    rows: [
      ["35", "22.5"],
      ["36", "23.0"],
      ["37", "23.5"],
      ["38", "24.5"],
      ["39", "25.0"],
      ["40", "25.5"],
      ["41", "26.5"],
      ["42", "27.0"],
      ["43", "27.5"],
    ],
  },
};
