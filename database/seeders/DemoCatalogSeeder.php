<?php

namespace Database\Seeders;

use App\Models\CatalogSection;
use App\Models\Category;
use App\Models\Service;
use Illuminate\Database\Seeder;

class DemoCatalogSeeder extends Seeder
{
    /**
     * 3 categorías, 3 secciones (una categoría por sección) y 3 productos por categoría.
     * Idempotente: updateOrCreate por slug de categoría / slug de sección / título de servicio.
     */
    public function run(): void
    {
        $rows = [
            [
                'category' => [
                    'name' => 'Coronas fúnebres con cinta',
                    'slug' => 'ramos-y-bouquets',
                    'sort_order' => 1,
                ],
                'section' => [
                    'name' => 'Coronas fúnebres con cinta',
                    'slug' => 'ramos-destacados',
                    'description' => 'Coronas para ceremonia con cinta y texto a coordinar.',
                    'sort_order' => 1,
                ],
                'services' => [
                    [
                        'title' => 'Corona fúnebre con cinta y texto',
                        'subtitle' => 'Presentación elegante para velorio',
                        'price' => null,
                        'short_description' => 'Corona con flores de estación, cinta y dedicatoria según disponibilidad.',
                        'long_description' => 'Coordinamos color, flores y texto de cinta con anticipación. Entrega según horario acordado.',
                        'sort_order' => 1,
                    ],
                    [
                        'title' => 'Corona circular mediana con cinta',
                        'subtitle' => 'Tamaño estándar ceremonia',
                        'price' => null,
                        'short_description' => 'Corona mediana con cinta; flores según temporada y stock.',
                        'long_description' => 'Diseño armónico para condolencias; se confirma paleta al momento del pedido.',
                        'sort_order' => 2,
                    ],
                    [
                        'title' => 'Corona compacta con moño y cinta',
                        'subtitle' => 'Opción sobria',
                        'price' => null,
                        'short_description' => 'Corona más contenida con moño y cinta, ideal espacios reducidos.',
                        'long_description' => 'Incluye follaje y flores principales a elección según disponibilidad del día.',
                        'sort_order' => 3,
                    ],
                ],
            ],
            [
                'category' => [
                    'name' => 'Arreglos fúnebres con cintas',
                    'slug' => 'plantas-interior',
                    'sort_order' => 2,
                ],
                'section' => [
                    'name' => 'Arreglos fúnebres con cintas',
                    'slug' => 'verde-en-casa',
                    'description' => 'Pedestales, coronas abiertas y centros con cintas personalizadas.',
                    'sort_order' => 2,
                ],
                'services' => [
                    [
                        'title' => 'Arreglo fúnebre en pedestal con cintas',
                        'subtitle' => 'Altura y presencia',
                        'price' => null,
                        'short_description' => 'Arreglo vertical en pedestal con cintas y flores de temporada.',
                        'long_description' => 'Presentación formal para iglesia o velatorio; coordinar colores con anticipación.',
                        'sort_order' => 1,
                    ],
                    [
                        'title' => 'Corona abierta con cintas y moño',
                        'subtitle' => 'Forma abierta en L',
                        'price' => null,
                        'short_description' => 'Corona abierta con doble cinta y detalle de moño.',
                        'long_description' => 'Diseño clásico para condolencias; texto de cinta bajo disponibilidad de taller.',
                        'sort_order' => 2,
                    ],
                    [
                        'title' => 'Centro fúnebre bajo con cintas',
                        'subtitle' => 'Para mesa o frente de ataúd',
                        'price' => null,
                        'short_description' => 'Composición baja alargada con cintas combinadas.',
                        'long_description' => 'Útil para mesa principal o acompañamiento; flores sujetas a temporada.',
                        'sort_order' => 3,
                    ],
                ],
            ],
            [
                'category' => [
                    'name' => 'Arreglos para regalar',
                    'slug' => 'detalles-regalos',
                    'sort_order' => 3,
                ],
                'section' => [
                    'name' => 'Arreglos para regalar',
                    'slug' => 'pequenos-detalles',
                    'description' => 'Propuestas florales para obsequiar en cualquier ocasión.',
                    'sort_order' => 3,
                ],
                'services' => [
                    [
                        'title' => 'Caja sorpresa con flores',
                        'subtitle' => 'Compacto y elegante',
                        'price' => null,
                        'short_description' => 'Caja rígida con selección floral compacta, ideal para escritorio o mesa.',
                        'long_description' => 'Flores surtidas según temporada; avisar si hay preferencia de tonos.',
                        'sort_order' => 1,
                    ],
                    [
                        'title' => 'Terrario floral mini',
                        'subtitle' => 'Vidrio y musgo',
                        'price' => null,
                        'short_description' => 'Recipiente con mini composición y plantas de bajo mantenimiento.',
                        'long_description' => 'Dimensiones aproximadas 12 cm; incluye instrucciones de rocío.',
                        'sort_order' => 2,
                    ],
                    [
                        'title' => 'Set regalo: flores secas y tarjeta',
                        'subtitle' => 'Para escritorio o repisa',
                        'price' => null,
                        'short_description' => 'Mini atado de flores preservadas con sobre y tarjeta en blanco.',
                        'long_description' => 'Combinación de tonos neutros; ideal como complemento a un ramo mayor.',
                        'sort_order' => 3,
                    ],
                ],
            ],
        ];

        foreach ($rows as $row) {
            $category = Category::query()->updateOrCreate(
                ['slug' => $row['category']['slug']],
                [
                    'name' => $row['category']['name'],
                    'sort_order' => $row['category']['sort_order'],
                    'is_active' => true,
                ]
            );

            $section = CatalogSection::query()->updateOrCreate(
                ['slug' => $row['section']['slug']],
                [
                    'name' => $row['section']['name'],
                    'description' => $row['section']['description'],
                    'is_active' => true,
                    'sort_order' => $row['section']['sort_order'],
                    'starts_at' => null,
                    'ends_at' => null,
                ]
            );

            $section->categories()->sync([
                $category->id => ['sort_order' => 0],
            ]);

            Service::query()->where('category_id', $category->id)->delete();

            foreach ($row['services'] as $service) {
                Service::query()->updateOrCreate(
                    [
                        'category_id' => $category->id,
                        'title' => $service['title'],
                    ],
                    [
                        'subtitle' => $service['subtitle'],
                        'price' => $service['price'],
                        'short_description' => $service['short_description'],
                        'long_description' => $service['long_description'],
                        'is_active' => true,
                        'sort_order' => $service['sort_order'],
                    ]
                );
            }
        }
    }
}
