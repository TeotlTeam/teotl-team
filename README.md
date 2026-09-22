# Teotl Team — Documentación del sitio

## Qué es esto
Sitio estático (HTML/CSS/JS, sin backend) para el negocio de nutrición y entrenamiento
personal "Teotl Team", alojado en GitHub Pages (`teotlteam.github.io/teotl-team`).
Contacto vía WhatsApp/Instagram/Facebook/TikTok — no hay formularios propios ni base de datos.

Este ZIP contiene **una sola versión del sitio**, ya consolidada: es la que en la
conversación llamamos "mixta", ahora colocada directamente en la raíz. Las versiones
previas ("home" original y "alternative") ya no están incluidas — si necesitas
recuperarlas, dímelo y te las regenero a partir del ZIP que subiste al inicio.

## Datos clave del sitio (para no perderlos de vista)

- **Nombre del negocio:** Teotl Team
- **Responsable / entrenador:** Enrique Ugalde — IFBB Pro Trainer, credencial PTMX2022-0189
- **Dirección:** Guadalupe Victoria 126, Tlalpan Centro, Tlalpan, CDMX, CP 14000
- **WhatsApp:** +52 1 55 7785 8914 (enlace usado en el sitio: `https://wa.me/message/LVVZT2WI5NTMI1`)
- **Correo de contacto:** teotlteam+site@gmail.com (cambiado desde teotlteam@gmail.com — ver bitácora)
- **Redes:** Instagram `@teotl_team`, Facebook, TikTok `@teotlteam`
- **Google Analytics (GA4):** `G-FHLXQK0F8D` — su carga depende del consentimiento de
  cookies (ver bitácora)
- **Dominio en robots.txt/sitemap.xml:** actualmente `teotlteam.github.io/teotl-team`;
  reemplázalo cuando compres un dominio propio (ej. `teotlteam.com`) — pendiente.

## Bitácora de cambios

### Diseño: fusión de dos estilos visuales que existían por separado
- Botones con forma de píldora (`border-radius:999px`) y sombra suave.
- Flechas circulares en el carrusel de fotos de playeras, con efecto de escala al hover.
- Subrayado animado en los enlaces "Ver reseñas" / "Abrir en Google Maps" (conservando el
  ícono `↗` como indicador de enlace externo).
- Hover tipo píldora en los enlaces del menú de navegación.
- Header fijo (`position:fixed`) que se oscurece con un fondo semitransparente al hacer
  scroll.
- Menú móvil animado (`max-height`/`opacity` en vez de aparecer/desaparecer de golpe), con
  bloqueo del scroll de fondo mientras está abierto.
- Estados `:focus-visible` en botones, menú y enlaces subrayados, para navegación por
  teclado.
- `scroll-padding-top` (86px en escritorio / 72px en móvil) para que los enlaces internos
  (`#servicios`, `#proceso`, etc.) no queden tapados por el header fijo.

### Optimización de imágenes
- Se generaron versiones WebP en varios anchos (480/768/1200 + tamaño original) de las 6
  fotos de playeras, la foto de Enrique y la imagen del hero.
- Se envolvieron en `<picture>` con `srcset`/`sizes`, manteniendo el JPG original como
  *fallback* para navegadores que no soporten WebP.
- Se agregó un pequeño reset CSS para que `<picture>` no rompiera el `object-fit` que ya
  tenían esas imágenes.
- Nota honesta: el ahorro real depende de la conexión de cada visitante; es una optimización
  estándar, no una cifra garantizada.

### Datos estructurados Schema.org
- Se agregó un bloque JSON-LD (`LocalBusiness` + `Person`) en `index.html` y `en.html` con
  nombre, descripción, dirección, teléfono, imagen, redes sociales (`sameAs`) y los datos de
  Enrique como `employee`.
- **No se incluyó horario** (`openingHoursSpecification`) porque el sitio dice "por consulta"
  y no hay horas fijas publicadas — se prefirió omitir el dato antes que inventarlo.
- Es una buena práctica de SEO; no hay garantía de que Google la use para mostrar resultados
  enriquecidos.

### Banner de cookies / consentimiento
- `js/consent.js` implementa Google Consent Mode (`analytics_storage: denied` por defecto) y
  un banner bilingüe (según el `lang` del HTML) con botones "Aceptar"/"Rechazar".
- El script de Google Analytics (`gtag.js`) ya no se carga automáticamente: solo se inyecta
  si el usuario acepta, y la elección se guarda en `localStorage` (`teotl-cookie-consent`).
- Estilos del banner (`.cookie-banner`, `.cookie-actions`, `.cookie-decline`) agregados en
  `css/styles.css`, acordes a la paleta del sitio.
- No hay certeza de si un aviso de este tipo es obligatorio bajo la LFPDPPP para este caso
  específico — se implementó como buena práctica de transparencia, no como asesoría legal.

### robots.txt y sitemap
- `robots.txt` apunta correctamente a `sitemap.xml` (no a la raíz del sitio).

### Página de error 404
- `404.html` no tenía la misma estructura que el resto del sitio: le faltaban el `<head>`
  bien formado (favicon, manifest, fuentes), el header con navegación y el footer, y el
  título usaba `<h1>` en vez de `<h2>` (por lo que no heredaba el estilo grande de `.cta`).
- Se reconstruyó con el mismo header/nav y footer que `index.html`, más un mensaje de error
  con botón para volver al inicio y otro para escribir por WhatsApp.
- Se agregó `<meta name="robots" content="noindex">` para que Google no indexe esta página
  (buena práctica estándar en páginas 404, no la tenía ninguna versión anterior).
- Se cargan `consent.js` y `app.js` igual que en el resto del sitio, para que el menú móvil,
  el botón "volver arriba" y el enlace de WhatsApp funcionen igual aquí.

### Corrección de correo
- Se reemplazó `teotlteam@gmail.com` → `teotlteam+site@gmail.com` en todos los archivos
  donde aparecía (`index.html`, `en.html`, `privacidad.html`, `aviso-privacidad.html`,
  `terminos.html`).

## Pendientes que quedaron señalados pero sin resolver
- Reemplazar el dominio `teotlteam.github.io/teotl-team` en `robots.txt`/`sitemap.xml`/JSON-LD
  cuando se compre un dominio propio.
- Revisar los textos legales (`privacidad.html`, `terminos.html`, `aviso-privacidad.html`)
  con asesoría legal antes de uso comercial.
- Confirmar si el aviso de cookies es obligatorio bajo la LFPDPPP para este caso.
- El sitio no se probó visualmente en un navegador real — se recomienda abrirlo localmente
  (y en un celular) antes de publicar, sobre todo el header al hacer scroll, el menú móvil y
  el banner de cookies.
