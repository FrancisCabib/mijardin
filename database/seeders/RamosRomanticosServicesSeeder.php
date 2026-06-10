<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Service;
use Illuminate\Database\Seeder;

class RamosRomanticosServicesSeeder extends Seeder
{
    public function run(): void
    {
        $category = $this->resolveCategory();

        $rows = [
            [
                'sort_order' => 1,
                'title' => 'Ramo romántico de rosas rosadas',
                'subtitle' => 'Bouquet delicado en tonos suaves',
                'short_description' => 'Ramo romántico elaborado con rosas rosadas y follaje decorativo, ideal para sorprender con un detalle delicado y especial.',
                'long_description' => 'Ramo romántico confeccionado con rosas rosadas, flores de complemento y follaje natural, envuelto en una presentación decorativa. Su diseño suave y elegante lo convierte en una excelente opción para cumpleaños, aniversarios, celebraciones o para expresar cariño de una manera especial.',
            ],
            [
                'sort_order' => 2,
                'title' => 'Ramo romántico de rosas rojas',
                'subtitle' => 'Detalle clásico para regalar',
                'short_description' => 'Ramo romántico con rosas rojas y presentación decorativa, perfecto para sorprender en aniversarios, fechas especiales o momentos importantes.',
                'long_description' => 'Ramo romántico elaborado con rosas rojas, follaje natural y envoltorio decorativo, pensado para transmitir amor, admiración y cercanía. Es una alternativa clásica y significativa para regalar en aniversarios, cumpleaños, celebraciones o simplemente para sorprender a alguien especial.',
            ],
            [
                'sort_order' => 3,
                'title' => 'Ramo romántico mixto en tonos rosados',
                'subtitle' => 'Flores suaves y presentación elegante',
                'short_description' => 'Ramo romántico con flores en tonos rosados y detalles delicados, ideal para regalar en ocasiones especiales.',
                'long_description' => 'Ramo romántico confeccionado con una combinación de flores en tonos rosados, acompañado de follaje natural y presentación envolvente. Su estilo delicado y armonioso lo hace ideal para expresar cariño, gratitud o afecto en cumpleaños, visitas, celebraciones o fechas importantes.',
            ],
            [
                'sort_order' => 4,
                'title' => 'Bouquet romántico de rosas y flores de complemento',
                'subtitle' => 'Arreglo floral delicado para sorprender',
                'short_description' => 'Bouquet romántico con rosas y flores decorativas, pensado para entregar un regalo especial con una presentación elegante.',
                'long_description' => 'Bouquet romántico elaborado con rosas, flores de complemento y follaje natural, envuelto en una presentación decorativa y delicada. Es una opción ideal para regalar en aniversarios, cumpleaños, muestras de cariño o cualquier ocasión donde se quiera entregar un detalle con estilo y dedicación.',
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
            ->where('slug', 'ramos-romanticos')
            ->first();

        if ($bySlug) {
            return $bySlug;
        }

        $byName = Category::query()
            ->whereRaw('LOWER(name) LIKE ?', ['%romantic%'])
            ->first();

        if ($byName) {
            return $byName;
        }

        throw new \RuntimeException(
            'No se encontró la categoría "Ramos románticos". Crea la categoría en el admin (slug sugerido: ramos-romanticos) o ajusta resolveCategory() en RamosRomanticosServicesSeeder.'
        );
    }
}
