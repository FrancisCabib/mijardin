# Florería Mi Jardín — Catálogo y administración

Monorepo con **backend Laravel** (API JSON + panel admin Inertia/Vue) y **catálogo público en React + Vite** (carpeta `astro-catalog/`, nombre histórico de la ruta), con cotizador por WhatsApp.

## Visión general

| Parte | Tecnología | Rol |
|--------|------------|-----|
| Raíz del repo | **Laravel 12**, PHP **^8.2** | API `GET /api/catalog-layout`, admin Inertia + Vue, Fortify (login), vista pública **`/catalog`** (mismos datos que el API) |
| `astro-catalog/` | **React 19 + Vite 6**, Node **>=22.12** | SPA del catálogo (hero, secciones, pedido en grupo); consume el JSON del API |

El equipo gestiona productos, categorías y secciones en **Laravel** (`/admin/...`). El visitante puede ver el catálogo en **React** (`npm run dev` en esa carpeta) o en **`/catalog`** dentro del mismo dominio Laravel.

## Estructura del proyecto

```
/
├── app/
│   ├── Catalog/
│   │   └── CatalogLayoutData.php   # Hero + secciones (compartido API + Inertia)
│   ├── Http/ ...
│   └── Models/ ...
├── routes/
│   ├── api.php                     # GET /api/catalog-layout
│   └── web.php                     # Admin, dashboard, /catalog
├── database/
├── resources/js/                   # Vue / Inertia (admin + /catalog)
├── astro-catalog/                  # React/Vite (nombre de carpeta histórico)
│   ├── src/
│   └── .env
├── .env
└── composer.json / package.json
```

## Requisitos

- **PHP** 8.2+ y [Composer](https://getcomposer.org/)
- **Node.js** para Laravel Vite y para el catálogo React (**Node >= 22.12** en `astro-catalog/package.json`)

## Backend Laravel

### Puesta en marcha

```bash
composer install
cp .env.example .env
php artisan key:generate
```

Configurá la base en `.env` (por defecto el ejemplo usa **SQLite** en `database/database.sqlite`). Luego:

```bash
php artisan migrate
php artisan db:seed
```

El seed crea (si no existe) el usuario `test@example.com` con contraseña `password` y ejecuta `DemoCatalogSeeder` (categorías, secciones y productos de ejemplo).

### Rutas útiles

- **`/`** — Redirige a login o dashboard según sesión
- **`/login`** — Acceso Fortify
- **`/dashboard`** — Atajos al admin y al catálogo público
- **`/catalog`** — Catálogo Inertia (mismo modelo de datos que `GET /api/catalog-layout`)
- **`GET /api/catalog-layout`** — JSON con `hero`, `sections`, categorías y servicios (uso del SPA React)
- **`/admin/services`**, **`/admin/categories`**, **`/admin/sections`**, **`/admin/tags`** — ABM (requiere `auth` + `verified`)

### Registro público (Fortify)

`FORTIFY_REGISTRATION_ENABLED` en `.env` controla si existe registro en **`/register`**. En producción suele dejarse en `false` si solo administradores crean usuarios.

### CORS

Si el SPA React se sirve desde **otro origen** que el API, configura `CORS_ALLOWED_ORIGINS` en Laravel con la URL del front (lista separada por comas, sin espacios). En desarrollo, el proxy de Vite en `astro-catalog` evita CORS al llamar a `/api/catalog-layout` en el mismo origen.

### Contrato del API

Ver [`docs/catalog-layout-api.md`](docs/catalog-layout-api.md).

---

## Frontend React (`astro-catalog/`)

Catálogo en el cliente: carga **`/api/catalog-layout`**, hero, filtros por sección, fichas y **pedido en grupo** (drawer) con envío por WhatsApp. Detalle de variables: [`astro-catalog/README.md`](astro-catalog/README.md).

### Desarrollo y build

```bash
cd astro-catalog
cp .env.example .env
npm install
npm run dev
npm run build
```

Por defecto Vite usa un puerto local distinto al de Laravel; configura `CATALOG_API_ORIGIN` / `VITE_CATALOG_API_URL` según [`astro-catalog/README.md`](astro-catalog/README.md).

### Producción del SPA

1. Definí **`VITE_CATALOG_API_URL`** (o serví el `dist/` bajo el mismo dominio que Laravel con rutas `/api/...`) para que el navegador pueda obtener el JSON en **HTTPS**.
2. **`CORS_ALLOWED_ORIGINS`** debe incluir el origen del sitio React si no comparten dominio.
3. No dejes URLs de desarrollo tipo `*.test` en variables de producción.

---

## Cotizador (pedido en grupo)

Lógica de despacho (Copiapó / Tierra Amarilla) y totales: `astro-catalog/src/lib/order.ts` y formulario en `astro-catalog/src/components/OrderDrawer.tsx`.

---

## WhatsApp

Configuración del número: variables `VITE_WHATSAPP_NUMBER` / entorno del catálogo React (ver `astro-catalog/README.md`).

---

## Solución de problemas

- **Catálogo vacío** — Revisa secciones activas con ventana de fechas vigente y categorías con servicios; comprueba `GET /api/catalog-layout`.
- **CORS en producción** — Origen del SPA debe estar permitido en Laravel si el API es otro dominio.
- **Usuario de demo** — No usar credenciales de seed en producción.

---

## Licencia y stack

Proyecto basado en Laravel (MIT según `composer.json`). Vue/Inertia y React según dependencias de cada parte del repo.
