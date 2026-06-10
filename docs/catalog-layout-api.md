# Catalog Layout API

Endpoint pensado para consumir desde Astro (SSR o estático según configuración).

## Endpoint

- `GET /api/catalog-layout`

La URL completa suele ser `{APP_URL}/api/catalog-layout` (ej. `http://floreria-mi-jardin.test/api/catalog-layout`).

## Respuesta base (forma real del backend)

El payload lo arma `App\Http\Controllers\Api\CatalogLayoutController`. Ejemplo orientativo:

```json
{
  "meta": {
    "generated_at": "2026-03-16T15:00:00+00:00",
    "timezone": "America/Santiago"
  },
  "hero": {
    "pre_headline": "Plantas, flores y regalos",
    "headline": "",
    "sub_headline": "Texto destacado configurable (Laravel `.env` / `config/catalog.php`).",
    "cta_text": "Ver catálogo",
    "cta_url": "#catalogo"
  },
  "sections": [
    {
      "id": 1,
      "name": "Día del Padre",
      "slug": "dia-del-padre",
      "description": "Promoción temporal",
      "is_active": true,
      "starts_at": "2026-06-01T00:00:00+00:00",
      "ends_at": "2026-06-20T23:59:59+00:00",
      "categories": [
        {
          "id": 3,
          "name": "Regalos",
          "slug": "regalos",
          "services": [
            {
              "id": 10,
              "title": "Servicio ejemplo",
              "subtitle": "Subtítulo",
              "short_description": "Resumen corto",
              "long_description": "Detalle largo",
              "price": 25990,
              "price_formatted": "$25.990",
              "image_url": "https://...",
              "tags": [
                { "id": 2, "name": "Promo", "slug": "promo" }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

**Importante:** los servicios **no** van colgando directamente de la sección; solo bajo **`categories[].services[]`**.

## Reglas que aplica el backend

- Solo incluye secciones `is_active = true`.
- Solo incluye secciones vigentes según `starts_at` y `ends_at` (respecto al instante actual).
- Orden de secciones: `sort_order`, luego `id`.
- Solo incluye categorías activas.
- Solo incluye servicios activos; orden coherentes dentro de cada categoría.
