<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Service;
use Illuminate\Database\Seeder;

class RamosMixtosColoridosServicesSeeder extends Seeder
{
    public function run(): void
    {
        $category = $this->resolveCategory();

        $rows = [
            [
                'sort_order' => 1,
                'title' => 'Ramo mixto colorido para regalar',
                'subtitle' => 'Flores variadas en tonos vivos',
                'short_description' => 'Ramo mixto con flores de distintos colores, ideal para sorprender con un regalo alegre, fresco y lleno de vida.',
                'long_description' => 'Ramo floral elaborado con una combinación de flores frescas en distintos tonos, acompañado de follaje natural y presentación decorativa. Su diseño colorido y llamativo lo convierte en una excelente alternativa para cumpleaños, celebraciones, felicitaciones o para regalar un detalle especial.',
            ],
            [
                'sort_order' => 2,
                'title' => 'Bouquet multicolor con rosas y flores mixtas',
                'subtitle' => 'Arreglo floral alegre y decorativo',
                'short_description' => 'Bouquet multicolor con rosas y flores de complemento, pensado para regalar un detalle lleno de color y personalidad.',
                'long_description' => 'Bouquet floral confeccionado con rosas, flores mixtas de distintos colores y follaje natural, envuelto en una presentación decorativa. Su estilo alegre y vistoso lo hace ideal para cumpleaños, agradecimientos, celebraciones o para sorprender con un regalo floral diferente.',
            ],
            [
                'sort_order' => 3,
                'title' => 'Ramo colorido con flores variadas',
                'subtitle' => 'Detalle floral para toda ocasión',
                'short_description' => 'Ramo con flores variadas y colores vivos, ideal para regalar en cumpleaños, visitas, saludos o momentos especiales.',
                'long_description' => 'Ramo floral armado con una mezcla de flores frescas, colores vibrantes y follaje natural, presentado en envoltorio decorativo. Es una opción versátil y atractiva para regalar en distintas ocasiones, transmitiendo alegría, cercanía y buenos deseos.',
            ],
            [
                'sort_order' => 4,
                'title' => 'Arreglo floral mixto en tonos vibrantes',
                'subtitle' => 'Combinación alegre y llamativa',
                'short_description' => 'Arreglo floral mixto con tonos intensos y flores variadas, perfecto para sorprender con un regalo especial y colorido.',
                'long_description' => 'Arreglo floral elaborado con flores frescas de distintos colores, acompañado de follaje natural y una presentación decorativa. Su composición llamativa y armoniosa lo convierte en una hermosa alternativa para celebraciones, cumpleaños, felicitaciones o regalos espontáneos.',
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
            ->where('slug', 'ramos-mixtos-coloridos')
            ->first();

        if ($bySlug) {
            return $bySlug;
        }

        $byName = Category::query()
            ->where(function ($query) {
                $query->whereRaw('LOWER(name) LIKE ?', ['%mixto%color%'])
                    ->orWhereRaw('LOWER(name) LIKE ?', ['%mixtos%color%']);
            })
            ->first();

        if ($byName) {
            return $byName;
        }

        throw new \RuntimeException(
            'No se encontró la categoría "Ramos mixtos coloridos". Crea la categoría en el admin (slug sugerido: ramos-mixtos-coloridos) o ajusta resolveCategory() en RamosMixtosColoridosServicesSeeder.'
        );
    }
}
