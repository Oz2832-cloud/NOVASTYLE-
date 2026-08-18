export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  gallery: string[];
  videoId?: string;
  body: string[];
};

const u = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const ARTICLES: Article[] = [
  {
    slug: "estilizar-hoodie-oversize",
    title: "10 formas de estilizar una hoodie oversize",
    category: "Tendencias",
    date: "5 Ago 2026",
    author: "Equipo NOVASTYLE",
    excerpt: "La hoodie dejó de ser solo ropa de casa: hoy es la pieza más versátil del clóset urbano.",
    image: u("photo-1556821840-3a63f95609a7"),
    gallery: [u("photo-1620799140408-edc6dcb6d633"), u("photo-1516257984-b1b4d707412e"), u("photo-1483118714900-540cf339fd46")],
    videoId: "5HPPywo7ukA",
    body: [
      "La hoodie oversize es hoy una de las prendas más democráticas de la moda: funciona igual con jeans anchos, faldas midi o pantalones de vestir. En NOVASTYLE la trabajamos en algodón premium con caída estructurada para que el volumen se vea intencional y no descuidado.",
      "Primer truco: juega con proporciones. Si la parte de arriba es amplia, equilibra con una prenda inferior más ajustada, como un legging o un jean slim. Al contrario, si combinas hoodie oversize con cargo pants, marca la cintura con un cinturón visible.",
      "Segundo truco: capas. Una chaqueta de mezclilla o un blazer encima de la hoodie crea un look smart casual perfecto para la ciudad. Añade sneakers blancos y una mochila técnica y tendrás un outfit funcional de lunes a viernes.",
      "Tercer truco: color. Nuestra paleta azul, celeste, morado y rosa permite combinaciones monocromáticas muy fotogénicas. Usa un tono base neutro y deja que la hoodie sea el punto de color del conjunto.",
      "Por último, cuida la prenda: lavado en frío, secado a la sombra y planchado a baja temperatura mantienen el algodón suave temporada tras temporada.",
    ],
  },
  {
    slug: "elegir-jeans-perfectos",
    title: "Guía definitiva: cómo elegir los jeans perfectos",
    category: "Consejos",
    date: "4 Ago 2026",
    author: "Equipo NOVASTYLE",
    excerpt: "Tiro, lavado, corte y elasticidad: los cuatro factores que definen si un jean te queda bien.",
    image: u("photo-1542272604-787c3835535d"),
    gallery: [u("photo-1541099649105-f69ad21f3246"), u("photo-1591047139829-d91aecb6caea"), u("photo-1516257984-b1b4d707412e")],
    videoId: "5HPPywo7ukA",
    body: [
      "El jean correcto empieza por el tiro. El tiro alto alarga visualmente la pierna y es ideal para siluetas de reloj de arena; el tiro medio es el más versátil y favorece a casi todos los cuerpos; el tiro bajo funciona mejor en looks urbanos con prendas superiores amplias.",
      "El corte define el carácter del outfit: skinny para looks pegados y sencillos, slim para el día a día, straight para un aire clásico y wide leg o mom para propuestas más actuales y cómodas.",
      "Revisa siempre la composición. Un denim 100% algodón es rígido y se moldea con el uso; una mezcla con 2% de elastano ofrece recuperación y comodidad inmediata, ideal si pasas muchas horas de pie.",
      "El lavado también comunica: los tonos índigo oscuros se ven más formales, los lavados claros y vintage son informales y veraniegos, y el negro es el comodín para la noche.",
      "Nuestro consejo final: prueba sentándote. Si el jean incomoda en la cintura al sentarte, no es tu talla, por mucho que se vea bien de pie.",
    ],
  },
  {
    slug: "sneakers-2026",
    title: "Sneakers 2026: los modelos que dominarán el año",
    category: "Calzado",
    date: "3 Ago 2026",
    author: "Equipo NOVASTYLE",
    excerpt: "Del chunky futurista al running técnico: así se camina esta temporada.",
    image: u("photo-1542291026-7eec264c27ff"),
    gallery: [u("photo-1595950653106-6c9ebd614d3a"), u("photo-1600185365483-26d7a4cc7519"), u("photo-1465453869711-7e174808ace9")],
    videoId: "5HPPywo7ukA",
    body: [
      "El sneaker dejó de ser un accesorio deportivo para convertirse en el centro del outfit. En 2026 tres siluetas concentran la atención: el chunky de suela alta, el runner técnico de perfil bajo y el modelo retro de piel lisa.",
      "El chunky funciona muy bien con jeans anchos y faldas midi porque compensa el volumen. Elige colores claros para primavera y tonos rosados o morados si quieres alinear tu calzado con la paleta NOVASTYLE.",
      "El runner técnico es la opción más cómoda: malla transpirable, amortiguación reactiva y peso reducido. Es el mejor aliado para caminar la ciudad todo el día.",
      "Para el trabajo o eventos casuales, el sneaker retro de piel con suela delgada acompaña perfecto a un blazer y pantalón de vestir.",
      "Consejo de cuidado: alterna tus pares. Dejar descansar 24 horas un sneaker prolonga la vida de la entresuela y evita malos olores.",
    ],
  },
  {
    slug: "moda-masculina-esencial",
    title: "Moda masculina: 8 prendas esenciales para tu clóset",
    category: "Moda masculina",
    date: "2 Ago 2026",
    author: "Equipo NOVASTYLE",
    excerpt: "Con ocho piezas bien elegidas puedes construir más de treinta combinaciones distintas.",
    image: u("photo-1516257984-b1b4d707412e"),
    gallery: [u("photo-1602810318383-e386cc2a3ccf"), u("photo-1507003211169-0a1dd7228f2d"), u("photo-1552902865-b72c031ac5ea")],
    body: [
      "Un clóset masculino eficiente no necesita ser grande, necesita ser coherente. Empieza por una camisa blanca Oxford: sirve para la oficina, para una cena y hasta para un look casual con las mangas dobladas.",
      "Añade dos camisetas neutras de algodón peinado, un polo de piqué, un jean índigo, un pantalón chino o cargo en tono beige, una hoodie, un blazer sin forro y una chaqueta de mezclilla.",
      "La clave es que todas las piezas compartan una misma familia cromática, de modo que cualquier combinación funcione sin pensarlo demasiado.",
      "Para el calzado, dos pares bastan: un sneaker blanco limpio y un zapato casual de piel café.",
      "Invierte en calidad más que en cantidad. Una prenda bien confeccionada dura años y se ve mejor desde el primer día.",
    ],
  },
  {
    slug: "capsule-wardrobe-mujer",
    title: "Cómo armar un capsule wardrobe con 20 prendas",
    category: "Moda femenina",
    date: "1 Ago 2026",
    author: "Equipo NOVASTYLE",
    excerpt: "Menos prendas, más outfits: el método para vestir bien sin saturar el clóset.",
    image: u("photo-1490481651871-ab68de25d43d"),
    gallery: [u("photo-1595777457583-95e059d581b8"), u("photo-1594633312681-425c7b97ccd1"), u("photo-1583496661160-fb5886a13d77")],
    videoId: "5HPPywo7ukA",
    body: [
      "El capsule wardrobe consiste en seleccionar un número reducido de prendas que combinen entre sí. Empieza definiendo tu paleta: dos neutros base, un color de acento y un metálico para la noche.",
      "Incluye tres prendas superiores básicas (blusa de seda, top acanalado, camiseta boxy), tres inferiores (jean mom, pantalón wide leg, falda plisada) y dos vestidos, uno casual y uno elegante.",
      "Suma capas: una chaqueta de mezclilla, un suéter de punto y un blazer. Con eso ya puedes cubrir clima fresco y ocasiones formales.",
      "Los accesorios multiplican las combinaciones: un bolso crossbody neutro, una cartera para la noche y un set de joyería minimal cambian por completo la lectura de un mismo outfit.",
      "Revisa tu cápsula cada temporada y reemplaza únicamente lo que se desgastó. Es la forma más sostenible y económica de vestir bien.",
    ],
  },
  {
    slug: "accesorios-que-transforman",
    title: "Accesorios que transforman cualquier outfit",
    category: "Accesorios",
    date: "31 Jul 2026",
    author: "Equipo NOVASTYLE",
    excerpt: "Un cinturón, unos lentes y el bolso correcto pueden cambiar por completo un look sencillo.",
    image: u("photo-1523170335258-f5ed11844a49"),
    gallery: [u("photo-1572635196237-14b3f281503f"), u("photo-1548036328-c9fa89d128fa"), u("photo-1524592094714-0f0654e20314")],
    body: [
      "Los accesorios son la forma más económica de renovar el clóset. Un cinturón de piel marca la cintura y estructura un vestido amplio; unos lentes aviador aportan actitud a un look básico.",
      "El bolso define el registro del outfit: el tote es informal y práctico, el crossbody es urbano y liviano, y el bolso satinado eleva cualquier conjunto para la noche.",
      "Los relojes minimalistas funcionan como joyería discreta y combinan tanto con ropa deportiva como con un blazer.",
      "Regla práctica: elige una sola pieza protagonista. Si el bolso es llamativo, mantén la joyería sencilla.",
      "En NOVASTYLE encontrarás gorras, cinturones, lentes, relojes y sets de joyería pensados para integrarse con toda la colección.",
    ],
  },
  {
    slug: "nueva-coleccion-otono",
    title: "Nueva colección Otoño 2026: detrás de cámaras",
    category: "Nuevas colecciones",
    date: "30 Jul 2026",
    author: "Equipo NOVASTYLE",
    excerpt: "Así se produjo la sesión fotográfica de nuestra colección más ambiciosa.",
    image: u("photo-1483985988355-763728e1935b"),
    gallery: [u("photo-1509631179647-0177331693ae"), u("photo-1441984904996-e0b6ba687e04"), u("photo-1445205170230-053b83016050")],
    videoId: "5HPPywo7ukA",
    body: [
      "La colección Otoño 2026 nació de una idea simple: llevar la energía de la ciudad a prendas cómodas y ponibles. Trabajamos con una paleta de azul brillante, celeste, morado y rosa sobre bases neutras.",
      "La producción tomó tres jornadas en Ciudad de Guatemala. Buscamos locaciones con arquitectura moderna y luz natural para resaltar las texturas de los tejidos.",
      "Más de sesenta prendas fueron seleccionadas, ajustadas y fotografiadas en cinco vistas cada una: frontal, posterior, lateral, detalle de tela y en uso.",
      "Ese material es justamente el que hoy puedes explorar en cada ficha de producto de la tienda, para que compres con la mayor información posible.",
      "La colección completa ya está disponible en el catálogo, con envíos a toda Guatemala.",
    ],
  },
  {
    slug: "comercio-de-moda-guatemala",
    title: "El comercio de moda en Guatemala: oportunidades 2026",
    category: "Comercio de moda",
    date: "29 Jul 2026",
    author: "Equipo NOVASTYLE",
    excerpt: "El e-commerce de moda crece a doble dígito en la región. Estas son las claves del negocio.",
    image: u("photo-1607083206968-13611e3d76db"),
    gallery: [u("photo-1441984904996-e0b6ba687e04"), u("photo-1445205170230-053b83016050"), u("photo-1509631179647-0177331693ae")],
    body: [
      "El comercio electrónico de moda en Centroamérica crece de forma sostenida gracias a la penetración móvil y a métodos de pago más accesibles.",
      "Para una marca joven, la diferenciación ya no está solo en el producto sino en la experiencia: fichas completas, fotografías múltiples, guías de tallas claras y atención rápida por redes sociales.",
      "La logística es el segundo factor decisivo. Entregas en 24 horas dentro de la capital y políticas de cambio sin costo generan confianza y recompra.",
      "El contenido editorial —artículos, lookbooks y videos— sostiene la relación con el cliente entre una compra y otra.",
      "NOVASTYLE apuesta por ese modelo: catálogo amplio, contenido propio y una comunidad activa en Instagram y TikTok.",
    ],
  },
  {
    slug: "estilo-personal-autentico",
    title: "Cómo construir un estilo personal auténtico",
    category: "Estilo",
    date: "30 Jul 2026",
    author: "Kevin Oswaldo Irías Rosales",
    excerpt: "Una guía práctica para elegir prendas, colores y accesorios que representen tu personalidad.",
    image: u("photo-1483985988355-763728e1935b"),
    gallery: [u("photo-1490481651871-ab68de25d43d"), u("photo-1445205170230-053b83016050")],
    body: [
      "Construir un estilo personal empieza por observar qué prendas realmente disfrutas usar. Más que seguir cada tendencia, conviene identificar colores, cortes y materiales con los que te sientes cómodo y que funcionan con tu rutina.",
      "Una base versátil puede combinar prendas neutras con una o dos piezas protagonistas. Un buen jean, una camisa o camiseta de calidad, calzado cómodo y accesorios bien elegidos permiten crear combinaciones diferentes sin saturar el clóset.",
      "Los accesorios ayudan a comunicar personalidad. Un bolso estructurado, una cadena minimalista, unos lentes o un par de sneakers pueden cambiar por completo un conjunto sencillo.",
      "La clave es probar, combinar y ajustar. El estilo auténtico no depende de usar lo más nuevo, sino de seleccionar conscientemente aquello que representa quién eres.",
    ],
  },
  {
    slug: "tendencias-adaptadas-a-tu-estilo",
    title: "Tendencias de moda y cómo adaptarlas a tu estilo",
    category: "Tendencias",
    date: "1 Ago 2026",
    author: "Kevin Oswaldo Irías Rosales",
    excerpt: "Cómo incorporar tendencias actuales sin perder comodidad, personalidad ni versatilidad.",
    image: u("photo-1509631179647-0177331693ae"),
    gallery: [u("photo-1441984904996-e0b6ba687e04"), u("photo-1506629082955-511b1aa562c8")],
    body: [
      "Las tendencias funcionan mejor cuando se adaptan a la persona y no al contrario. Antes de comprar una pieza llamativa, piensa cómo combinarla con prendas que ya tienes y en cuántas ocasiones podrías utilizarla.",
      "La moda urbana permite mezclar prendas amplias, sneakers y accesorios; un look elegante puede incorporar la misma tendencia mediante un blazer, un bolso o una paleta de color más sobria.",
      "También puedes experimentar con una sola tendencia a la vez. Si eliges un color intenso o una silueta protagonista, mantén el resto del conjunto más simple para conseguir equilibrio visual.",
      "NOVASTYLE propone variedad para que cada tendencia pueda interpretarse de forma personal, desde ropa y calzado hasta joyería, fragancias y accesorios.",
    ],
  },
  {
    slug: "moda-belleza-cuidado-personal",
    title: "Moda, belleza y cuidado personal: una experiencia completa",
    category: "Belleza",
    date: "4 Ago 2026",
    author: "Kevin Oswaldo Irías Rosales",
    excerpt: "Vestir, cuidar la piel y elegir accesorios forman parte de una experiencia de estilo más completa.",
    image: u("photo-1596462502278-27bfdc403348"),
    gallery: [u("photo-1556228578-8c89e6adf883"), u("photo-1541643600914-78b084683601")],
    body: [
      "La imagen personal va más allá de una sola prenda. Ropa, calzado, accesorios, fragancias, maquillaje y cuidado personal pueden convivir en una experiencia de compra coherente y práctica.",
      "Una rutina sencilla de cuidado de la piel puede comenzar con limpieza, hidratación y protección solar, mientras que el maquillaje puede utilizarse como una herramienta de expresión para quien desee incorporarlo.",
      "Fragancias, joyería y bolsos terminan de definir el carácter de un look. Por eso NOVASTYLE reúne diferentes categorías dentro de un mismo catálogo, facilitando combinaciones según ocasión y estilo.",
      "El objetivo es ofrecer opciones variadas sin imponer una única forma de vestir o cuidarse: cada persona puede construir una selección que responda a sus preferencias.",
    ],
  },

];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);

export const BLOG_VIDEOS = [
  { id: "IVVPQLpcNsA", title: "Moda y estilo: inspiración 1", desc: "Contenido audiovisual de moda seleccionado para el Blog." },
  { id: "GsyTVrbgfYI", title: "Moda y estilo: inspiración 2", desc: "Ideas y referencias visuales para explorar nuevas combinaciones." },
  { id: "ixCUD5Z-lBs", title: "Moda y estilo: inspiración 3", desc: "Video de moda incorporado como recurso del Blog." },
  { id: "W5PRZuaQ3VM", title: "Moda y estilo: inspiración 4", desc: "Contenido complementario sobre tendencias y estilo." },
  { id: "9JsTj1Ymi_I", title: "YouTube Short de moda", desc: "Formato corto con inspiración visual de moda." },
  { id: "yeC7hI7S7es", title: "Moda y estilo: inspiración 5", desc: "Recurso audiovisual complementario para el Blog." },
];

export const BITACORA_AUTHOR = { name: "Kevin Oswaldo Irías Rosales", carne: "22005915" };
export const BITACORA_RANGE = "Del 27 de julio al 5 de agosto de 2026";

export type BitacoraDay = {
  day: string;
  date: string;
  title: string;
  summary: string;
  points: string[];
  color: string;
};

export const BITACORA: BitacoraDay[] = [
  { day: "Día 1", date: "27 de julio de 2026", title: "Planificación de mi Blog", summary: "Definición del objetivo, temas y organización del Blog individual.", points: ["Se definió el propósito del Blog dentro de NOVASTYLE.", "Se seleccionaron temas de moda, estilo, belleza y cuidado personal.", "Se organizó una estructura con artículos, videos, comentarios y bitácora.", "Se planificó una cronología editorial coherente para la semana."], color: "from-nova-blue to-nova-sky" },
  { day: "Día 2", date: "28 de julio de 2026", title: "Diseño y estructura", summary: "Organización visual del Blog manteniendo la identidad de NOVASTYLE.", points: ["Se adaptó el diseño del Blog a los colores y tipografías de NOVASTYLE.", "Se organizaron tarjetas de artículos y navegación interna.", "Se prepararon espacios para videos, comentarios y bitácora.", "Se revisó la lectura en computadora y dispositivos móviles."], color: "from-nova-sky to-nova-purple" },
  { day: "Día 3", date: "30 de julio de 2026", title: "Creación de artículos", summary: "Redacción y organización del contenido editorial del Blog.", points: ["Se redactaron artículos sobre estilo personal y tendencias.", "Se incorporó contenido relacionado con moda, belleza y cuidado personal.", "Se añadieron introducciones, subtítulos y conclusiones.", "Se asignaron imágenes y fechas editoriales coherentes a cada publicación."], color: "from-nova-purple to-nova-pink" },
  { day: "Día 4", date: "31 de julio de 2026", title: "Imágenes y videos", summary: "Incorporación de recursos visuales y audiovisuales relacionados con moda.", points: ["Se revisaron imágenes principales y galerías de los artículos.", "Se incorporaron videos de YouTube en la sección Videos de Moda.", "Se preparó una alternativa de enlace externo para videos que no permitan reproducción embebida.", "Se comprobó que el contenido multimedia fuera responsive."], color: "from-nova-pink to-nova-rose" },
  { day: "Día 5", date: "1 de agosto de 2026", title: "Funcionalidades del Blog", summary: "Activación y prueba de navegación, comentarios y accesos al contenido.", points: ["Se comprobaron los botones Leer artículo y Regresar al Blog.", "Se verificó el sistema de comentarios y su opción de eliminación.", "Se revisó el acceso al Blog desde el apartado Noticias.", "Se probaron enlaces, videos y botones de impresión."], color: "from-nova-rose to-nova-blue" },
  { day: "Día 6", date: "3 de agosto de 2026", title: "Revisión y correcciones", summary: "Pruebas de contenido, navegación y adaptación a diferentes pantallas.", points: ["Se revisaron textos, ortografía y fechas del Blog.", "Se comprobaron enlaces y contenido audiovisual.", "Se revisó la visualización en computadora, tablet y celular.", "Se corrigieron detalles para mantener una experiencia clara y consistente."], color: "from-nova-blue to-nova-purple" },
  { day: "Día 7", date: "5 de agosto de 2026", title: "Revisión final y publicación", summary: "Preparación de la versión final del Blog y comprobación de su acceso público.", points: ["Se realizó una revisión final de artículos, videos, comentarios y bitácora.", "Se seleccionó una plataforma adecuada para la publicación en Internet.", "Se preparó la versión final y se verificó mediante un enlace público.", "Se comprobó que el Blog pudiera consultarse correctamente desde diferentes dispositivos."], color: "from-nova-purple to-nova-pink" },
];
