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
- Primer intento: se reconstruyó `404.html` con el mismo header/nav y footer que
  `index.html` (antes le faltaban por completo, y el título usaba `<h1>` en vez de `<h2>`).
- Ese primer intento seguía viéndose sin estilos en producción. La causa real: GitHub Pages
  sirve tu `404.html` para cualquier URL que no existe, pero el navegador resuelve las rutas
  *relativas* de ese archivo (`css/styles.css`, `index.html`, etc.) contra la URL que el
  visitante pidió, no contra la carpeta real donde vive `404.html`. Si alguien cae en
  `teotlteam.github.io/teotl-team/alternative/`, una ruta relativa como `css/styles.css` se
  busca en `.../teotl-team/alternative/css/styles.css`, que no existe — por eso el CSS nunca
  cargaba y la página se veía con los estilos por defecto del navegador.
- Solución: todas las rutas internas de `404.html` (CSS, manifest, favicon, imágenes, links
  del menú y footer, scripts) ahora son **absolutas**, con el prefijo `/teotl-team/`
  (ej. `/teotl-team/css/styles.css`).
- **Importante para el futuro:** ese prefijo `/teotl-team/` asume que el sitio sigue viviendo
  en `teotlteam.github.io/teotl-team/`. Si algún día mueves el sitio a un dominio propio que
  sirva desde la raíz (ej. `teotlteam.com/`), hay que quitar ese prefijo de `404.html`
  (dejar `/css/styles.css`, `/index.html`, etc.) o el mismo problema va a repetirse al revés.
- Se agregó `<meta name="robots" content="noindex">` para que Google no indexe esta página.
- Se cargan `consent.js` y `app.js` igual que en el resto del sitio, para que el menú móvil,
  el botón "volver arriba" y el enlace de WhatsApp funcionen igual aquí.

### Botón "volver arriba" circular
- El botón flotante `.top` tenía forma cuadrada; ahora es circular (`border-radius:50%`),
  con el mismo tratamiento de sombra/hover-escala que las flechas circulares del carrusel
  y tamaño de 44px (área táctil mínima recomendada).

### Páginas nuevas de confirmación de cita
- **`bienvenida.html`** — se muestra cuando un usuario nuevo agenda su primera cita. Reusa
  el bloque `.cta` (igual que el 404 y el CTA final del home) para el título/confirmación,
  y la cuadrícula numerada `.process .steps` de la sección "Proceso" del home —forzada a una
  sola columna— para los 4 pasos. Los 3 enlaces del paso "02" (registro, historia clínica,
  agendar valoración) usan el mismo subrayado animado que "Ver reseñas"/"Abrir en Maps", en
  vez de pegar las URL como texto plano.
- **`seguimiento.html`** — se muestra cuando un usuario recurrente agenda su sesión de
  seguimiento. Es un solo bloque `.cta` con un círculo de confirmación nuevo (`.check-badge`,
  un `✓` en el color de marca — no se agregó ningún set de iconos nuevo), el mensaje de
  agradecimiento y la frase final destacada en cursiva.
- Ambas páginas tienen `<meta name="robots" content="noindex">` (son transaccionales, no
  deben indexarse) y usan rutas absolutas `/teotl-team/...` igual que `404.html`, por la
  misma razón documentada arriba.
- Cambios en `css/styles.css` para que funcionaran: se extendió la regla de título grande de
  `.cta` para que también aplique a `<h1>` (antes solo a `<h2>`, y estas páginas usan `<h1>`
  como título principal por semántica/accesibilidad), y se agregó la nueva clase
  `.check-badge` para el círculo de confirmación de `seguimiento.html`.
- Pendiente de tu lado: configurar en Cal.com (o donde gestiones las reservas) que redirija
  a `/teotl-team/bienvenida.html` después de una reserva de cliente nuevo, y a
  `/teotl-team/seguimiento.html` después de una reserva de seguimiento — yo no tengo acceso
  a esa configuración.

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
