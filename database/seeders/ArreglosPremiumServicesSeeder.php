<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Service;
use Illuminate\Database\Seeder;

class ArreglosPremiumServicesSeeder extends Seeder
{
    public function run(): void
    {
        $category = $this->resolveCategory();

        $rows = [
            [
                'sort_order' => 1,
                'title' => 'Arreglo premium con rosas y detalles decorativos',
                'subtitle' => 'Diseño especial para regalar',
                'short_description' => 'Arreglo premium con rosas, flores de complemento y detalles decorativos, ideal para sorprender con un regalo elegante y especial.',
                'long_description' => 'Arreglo floral premium elaborado con rosas, flores frescas de complemento, follaje natural y una presentación decorativa más elaborada. Su diseño está pensado para quienes buscan un regalo con mayor presencia, estilo y un toque especial para cumpleaños, aniversarios o celebraciones importantes.',
            ],
            [
                'sort_order' => 2,
                'title' => 'Bouquet premium multicolor',
                'subtitle' => 'Flores llamativas con presentación elegante',
                'short_description' => 'Bouquet premium con flores de distintos colores y detalles decorativos, perfecto para regalar en ocasiones especiales.',
                'long_description' => 'Bouquet floral premium confeccionado con flores frescas de colores variados, follaje natural y una presentación envolvente de mayor impacto visual. Es una excelente alternativa para regalar en celebraciones importantes, agradecimientos o momentos donde se quiera destacar con un detalle más elegante.',
            ],
            [
                'sort_order' => 3,
                'title' => 'Arreglo premium con mariposas decorativas',
                'subtitle' => 'Diseño floral delicado y llamativo',
                'short_description' => 'Arreglo premium con flores frescas y mariposas decorativas, ideal para sorprender con un detalle delicado, elegante y distinto.',
                'long_description' => 'Arreglo floral premium elaborado con flores frescas, follaje natural y detalles decorativos como mariposas, pensado para entregar un regalo con un acabado más especial. Su diseño combina color, delicadeza y presencia, siendo ideal para cumpleaños, saludos, celebraciones o regalos significativos.',
            ],
            [
                'sort_order' => 4,
                'title' => 'Arreglo floral premium para ocasión especial',
                'subtitle' => 'Presentación elegante y mayor presencia',
                'short_description' => 'Arreglo floral premium con flores seleccionadas y presentación elegante, pensado para regalos importantes y ocasiones especiales.',
                'long_description' => 'Arreglo floral premium confeccionado con flores frescas seleccionadas, follaje natural y una presentación más trabajada para destacar visualmente. Es una opción ideal para aniversarios, cumpleaños, felicitaciones o cualquier ocasión donde se quiera entregar un regalo más fino, vistoso y especial.',
            ],
        ];

        foreach ($rows as $row) {
            Service::query()->updateOrCreate(
                [
                    'category_id' => $category->id,
                    'title' => $row['title'],
                ],
                [
                    'subtitle' => $row['subtitle'],
                    'price' => null,
                    'short_description' => $row['short_description'],
                    'long_description' => $row['long_description'],
                    'sort_order' => $row['sort_order'],
                    'is_active' => true,
                ]
            );
        }
    }

    protected function resolveCategory(): Category
    {
        $bySlug = Category::query()
            ->where('slug', 'arreglos-premium')
            ->first();

        if ($bySlug) {
            return $bySlug;
        }

        $byName = Category::query()
            ->whereRaw('LOWER(name) LIKE ?', ['%premium%'])
            ->first();

        if ($byName) {
            return $byName;
        }

        throw new \RuntimeException(
            'No se encontró la categoría "Arreglos premium". Crea la categoría en el admin (slug sugerido: arreglos-premium) o ajusta resolveCategory() en ArreglosPremiumServicesSeeder.'
        );
    }
}
