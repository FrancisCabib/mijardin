<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Service;
use Illuminate\Database\Seeder;

class RamosGirasolesServicesSeeder extends Seeder
{
    public function run(): void
    {
        $category = $this->resolveCategory();

        $rows = [
            [
                'sort_order' => 1,
                'title' => 'Ramo con girasoles y rosas rojas',
                'subtitle' => 'Bouquet vibrante en tonos amarillos y rojos',
                'short_description' => 'Ramo con girasoles, rosas rojas y delicados detalles florales, ideal para regalar en cumpleaños, celebraciones o momentos especiales.',
                'long_description' => 'Ramo confeccionado con girasoles, rosas rojas, flores de complemento y follaje natural, envuelto en una presentación decorativa. Su combinación de colores intensos transmite alegría, energía y cariño, siendo una excelente opción para sorprender con un regalo especial.',
            ],
            [
                'sort_order' => 2,
                'title' => 'Ramo mixto con girasol y flores variadas',
                'subtitle' => 'Flores frescas en tonos cálidos y suaves',
                'short_description' => 'Ramo mixto con girasol, rosas y flores de complemento, pensado para regalar un detalle alegre, colorido y lleno de vida.',
                'long_description' => 'Bouquet floral elaborado con girasol, rosas, flores blancas y detalles en tonos suaves, acompañado de follaje natural y envoltorio decorativo. Su diseño armónico y llamativo lo convierte en una alternativa ideal para cumpleaños, felicitaciones, agradecimientos o fechas especiales.',
            ],
            [
                'sort_order' => 3,
                'title' => 'Bouquet de girasoles para regalar',
                'subtitle' => 'Arreglo floral alegre y llamativo',
                'short_description' => 'Bouquet con girasoles y flores de complemento, ideal para entregar un regalo lleno de color, alegría y calidez.',
                'long_description' => 'Bouquet floral confeccionado con girasoles frescos, flores decorativas y follaje natural, presentado en envoltorio especial. Es una opción perfecta para sorprender a alguien especial con un arreglo luminoso, cálido y muy llamativo en cualquier ocasión.',
            ],
            [
                'sort_order' => 4,
                'title' => 'Ramo con girasol, rosas y velo de novia',
                'subtitle' => 'Detalle floral delicado y colorido',
                'short_description' => 'Ramo con girasol, rosas y delicados detalles de velo de novia, ideal para regalar en momentos importantes y celebraciones especiales.',
                'long_description' => 'Ramo floral elaborado con girasol, rosas frescas, velo de novia y follaje natural, envuelto en una presentación decorativa. Su diseño combina delicadeza y color, siendo una hermosa alternativa para cumpleaños, aniversarios o simplemente para sorprender con un gesto especial.',
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
            ->where('slug', 'ramos-con-girasoles')
            ->first();

        if ($bySlug) {
            return $bySlug;
        }

        $byName = Category::query()
            ->whereRaw('LOWER(name) LIKE ?', ['%girasol%'])
            ->first();

        if ($byName) {
            return $byName;
        }

        throw new \RuntimeException(
            'No se encontró la categoría "Ramos con girasoles". Crea la categoría en el admin (slug sugerido: ramos-con-girasoles) o ajusta resolveCategory() en RamosGirasolesServicesSeeder.'
        );
    }
}
