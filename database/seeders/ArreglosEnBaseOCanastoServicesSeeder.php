<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Service;
use Illuminate\Database\Seeder;

class ArreglosEnBaseOCanastoServicesSeeder extends Seeder
{
    public function run(): void
    {
        $category = $this->resolveCategory();

        $rows = [
            [
                'sort_order' => 1,
                'title' => 'Arreglo floral en canasto',
                'subtitle' => 'Flores frescas con presentación decorativa',
                'short_description' => 'Arreglo floral en canasto con flores frescas y follaje natural, ideal para regalar en cumpleaños, visitas o celebraciones especiales.',
                'long_description' => 'Arreglo floral confeccionado en canasto decorativo, con una combinación de flores frescas y follaje natural. Su presentación lo convierte en una opción elegante y práctica para regalar en cumpleaños, aniversarios, agradecimientos o momentos donde se quiera entregar un detalle especial.',
            ],
            [
                'sort_order' => 2,
                'title' => 'Arreglo floral en base decorativa',
                'subtitle' => 'Detalle elegante para regalar',
                'short_description' => 'Arreglo floral en base decorativa, pensado para sorprender con un detalle delicado, colorido y de linda presentación.',
                'long_description' => 'Arreglo floral elaborado en base decorativa, con flores frescas, follaje natural y un diseño armónico. Es una excelente alternativa para regalar en celebraciones, cumpleaños, visitas o como muestra de cariño en distintas ocasiones.',
            ],
            [
                'sort_order' => 3,
                'title' => 'Canasto floral con flores mixtas',
                'subtitle' => 'Regalo floral para toda ocasión',
                'short_description' => 'Canasto floral con flores mixtas y detalles decorativos, ideal para regalar en momentos especiales y celebraciones.',
                'long_description' => 'Canasto floral confeccionado con flores frescas de distintos colores, acompañado de follaje natural y presentación decorativa. Su formato práctico y vistoso lo hace ideal para cumpleaños, agradecimientos, aniversarios o para sorprender con un regalo diferente.',
            ],
            [
                'sort_order' => 4,
                'title' => 'Arreglo en canasto con flores variadas',
                'subtitle' => 'Presentación delicada y colorida',
                'short_description' => 'Arreglo en canasto con flores variadas, diseñado para entregar un regalo floral elegante, alegre y especial.',
                'long_description' => 'Arreglo floral montado en canasto, elaborado con flores frescas, follaje natural y una presentación cuidada. Es una opción ideal para quienes buscan un detalle más armado y decorativo para cumpleaños, celebraciones o regalos con un toque especial.',
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
            ->whereIn('slug', [
                'arreglos-en-base-o-canasto',
                'arreglos-base-canasto',
            ])
            ->first();

        if ($bySlug) {
            return $bySlug;
        }

        $byName = Category::query()
            ->where(function ($query) {
                $query->whereRaw('LOWER(name) LIKE ?', ['%canasto%'])
                    ->orWhere(function ($q) {
                        $q->whereRaw('LOWER(name) LIKE ?', ['%base%'])
                            ->whereRaw('LOWER(name) LIKE ?', ['%arreglo%']);
                    });
            })
            ->first();

        if ($byName) {
            return $byName;
        }

        throw new \RuntimeException(
            'No se encontró la categoría "Arreglos en base o canasto". Crea la categoría en el admin (slug sugerido: arreglos-en-base-o-canasto) o ajusta resolveCategory() en ArreglosEnBaseOCanastoServicesSeeder.'
        );
    }
}
