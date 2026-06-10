# React Catalog (SPA)

Documentación general del monorepo (Laravel + cotizador): ver [`../README.md`](../README.md).

Frontend en **React + Vite** (SPA, sin nav/footer) conectado al endpoint de Laravel:

- `GET /api/catalog-layout`

El catálogo se pide en el cliente al cargar la página (`fetch` con `cache: no-store`),
así que los datos siguen siendo dinámicos aunque el build sea estático.

> La carpeta sigue llamándose `astro-catalog` por compatibilidad de rutas, pero ya
> **no usa Astro**: es una app React/Vite.

## Requisitos

- Node `>=22.12.0`
- Laravel del mismo repo en Herd: `http://floreria-mi-jardin.test` (o la URL que te asigne Herd)

## Configuración

1. Copia `.env.example` a `.env` dentro de esta carpeta.
2. Variables principales:

```env
# Origen de Laravel para el proxy de /api en desarrollo (solo lo usa vite.config.ts)
CATALOG_API_ORIGIN=http://floreria-mi-jardin.test

# Déjala vacía para usar el proxy /api en desarrollo
VITE_CATALOG_API_URL=

VITE_WHATSAPP_NUMBER=56983125589
```

En **desarrollo** el navegador llama a `/api/catalog-layout` (mismo origen) y Vite lo
reenvía a Laravel mediante un proxy, así que **no hace falta CORS**.

En **producción**:

- Si sirves el SPA desde el **mismo dominio** que Laravel: deja `VITE_CATALOG_API_URL` vacía.
- Si el SPA está en **otro dominio**: pon la URL absoluta en `VITE_CATALOG_API_URL` y
  habilita CORS en Laravel para el dominio del SPA:

  ```env
  CORS_ALLOWED_ORIGINS=https://TU-DOMINIO-DEL-SPA
  ```

## Desarrollo

```sh
npm install
npm run dev
```

Servidor de desarrollo en `http://localhost:4321`.

## Build

```sh
npm run build     # genera dist/ (HTML + JS + CSS estáticos)
npm run preview   # sirve el build localmente para revisarlo
```

El resultado en `dist/` es un sitio estático: súbelo a cualquier hosting o sírvelo
detrás de Laravel/Nginx.

> **Cabeceras de seguridad:** al ser una SPA no hay middleware de servidor. El CSP y
> demás cabeceras (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`)
> que antes ponía `middleware.ts` ahora deben configurarse en la capa que sirve `dist/`
> (Nginx, Apache o el propio Laravel).

---

## Sistema visual · "Jardín Botánico"

Catálogo editorial sobre fondo verde-cream suave. Tipografía italiana, números de especimen estilo herbario, pétalos cayendo y marco floral acuarela en el hero.

### Paleta (CSS variables · `src/styles/global.css`)

| Variable | Valor | Uso |
|----------|-------|-----|
| `--ink-deep` | `#eef3e8` | Fondo sage cream base |
| `--cream` | `#1a1612` | Tinta principal (negro cálido) |
| `--electric` | `#4a7c59` | Acento principal — verde bosque (N°, precios, CTAs) |
| `--moss` | `#6d8158` | Musgo para hojas decorativas / glyphs |
| `--gold` | `#c69850` | Oro cálido para filetes / ornamentos |
| `--blood` | `#c04c74` | Rosa floral — acentos críticos (eliminar, sello) |
| `--ink-line` | `#c5cdb5` | Filete sage para divisores |

Body bg: gradiente radial de 3 capas sage-cream + base `#e3ecd2`.

### Tipografía (Bunny Fonts)

- **Display**: `Fraunces` italic, variable optical size — títulos, italic display
- **Mono**: `JetBrains Mono` — N°, precios, metadatos en mayúsculas
- **Body**: `Inter Tight` — descripciones, formularios

### Capas atmosféricas (`Layout.tsx` + `Atmosphere.tsx`)

| Capa | z-index | Función |
|------|---------|---------|
| `.site-parallax` (far/near) | 0 | Manchas radiales sage/rosa/oro con drift CSS |
| `.foliage-layer` | 1 | Hojas decorativas SVG en 4 esquinas (sway 12-15s); raíces y tallos con flores en esquinas inferiores |
| `.petal-layer` | 1 | 10 pétalos cayendo (4 tipos: rosa, oro, sage, blush) con 3 keyframes diferentes |
| `.vignette` | 1 | Viñeta cálida sutil en bordes |
| `.cursor-lantern` | 2 | "Candelabro cálido" que sigue el cursor (multiply blend) |
| `.sticky-section-marker` | 50 | N° de sección sticky arriba a la derecha |
| `.grain-overlay` | 200 | Grano de papel (SVG `<feTurbulence>`; `soft-light`, sin animación para evitar shimmering) |
| `.cursor-dot` | 220 | Aro verde bosque pequeño + hover morphing |

### Animaciones / interacciones

| Efecto | Implementación React |
|--------|----------------------|
| Fondo `.site-parallax` | Solo CSS `@keyframes` (sin JS) |
| Cursor linterna + dot | `Cursor.tsx` — lerp en RAF que se detiene al alcanzar el puntero |
| Hero word reveal | `Hero.tsx` — cada palabra en `<span class="reveal-word">`, stagger 90ms, clase `is-revealed` tras montar |
| Numeración de secciones / specimens | Calculada en render (`App.tsx` → `SectionBlock.tsx`) |
| Sticky section marker | `useStickyMarker.ts` — IntersectionObserver |
| Scroll reveal coreografiado | `useScrollReveal.ts` — IntersectionObserver añade `.is-visible` |
| Sello stamp al añadir | `ServiceCard.tsx` — estado local; SVG con `stroke-dasharray` animado, ~1.1s |

### Componentes

| Componente | Rol |
|------------|-----|
| `App.tsx` | Carga el catálogo, deriva el hero, arma secciones y filtro |
| `Layout.tsx` | Marco: atmósfera, marcador sticky, cursor, grano |
| `Hero.tsx` | Logo centrado; meta line; signature line; word reveal |
| `SectionBlock.tsx` | Header con N° de sección; grilla de cards |
| `SectionFilter.tsx` | Chips para filtrar por sección |
| `ServiceCard.tsx` | Card del producto; botón "Añadir" + WhatsApp; sello stamp |
| `OrderDrawer.tsx` | Cajón de pedido: carrito (localStorage), cotizador y envío por WhatsApp |
| `context/OrderContext.tsx` | Estado del pedido y del drawer |

### Marco floral del hero

PNG transparente en `public/image_web/21890575_Pink_purple_floral_frame_background_with_watercolor-Photoroom.png`. Se aplica como `background-image` en `::before` (original) y `::after` (mirror horizontal con `scaleX(-1)`) para crear marco floral simétrico en los 4 lados. Hero usa **full-bleed** (`width: 100vw; margin: calc(50% - 50vw)`) para escapar del `max-width: 1280px` de `.catalog-sheet`.

Si reemplazás la imagen, la resolución recomendada es **2880×1620 px** con flores en los 4 bordes y centro transparente generoso — eliminaría la necesidad del mirror (`::after`).

### Accesibilidad

- Toda la atmósfera y cursores respetan `prefers-reduced-motion`
- Cursor lantern + dot se desactivan en dispositivos sin hover (`@media (hover: none)`)
- Pétalos, foliage y site-parallax con `aria-hidden="true"`
- Selección de texto: bg verde bosque + texto cream
