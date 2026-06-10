<?php

namespace App\Console\Commands;

use App\Models\CatalogSection;
use App\Models\Category;
use App\Models\Service;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class CleanupCatalogCommand extends Command
{
    protected $signature = 'catalog:cleanup-demo
                            {--clear-prices : Quitar precios de todos los servicios}';

    protected $description = 'Elimina secciones/categorías de prueba vacías y opcionalmente quita precios';

    public function handle(): int
    {
        $sectionSlugs = ['dia-del-padre', 'seccion-de-prueba'];
        $categorySlugs = ['general', 'categoria-de-prueba'];

        foreach ($sectionSlugs as $slug) {
            $section = CatalogSection::query()->where('slug', $slug)->first();

            if (! $section) {
                continue;
            }

            $section->categories()->detach();
            $section->delete();
            $this->info("Sección eliminada: {$slug}");
        }

        foreach ($categorySlugs as $slug) {
            $category = Category::query()->where('slug', $slug)->withCount('services')->first();

            if (! $category || $category->services_count > 0) {
                continue;
            }

            $category->sections()->detach();
            $category->delete();
            $this->info("Categoría eliminada: {$slug}");
        }

        CatalogSection::query()
            ->whereDoesntHave('categories', fn ($q) => $q->whereHas('services'))
            ->get()
            ->each(function (CatalogSection $section) {
                if (! Str::contains(Str::lower($section->name), ['prueba', 'padre'])) {
                    return;
                }

                $section->categories()->detach();
                $section->delete();
                $this->info("Sección huérfana eliminada: {$section->name}");
            });

        if ($this->option('clear-prices')) {
            $count = Service::query()->whereNotNull('price')->update(['price' => null]);
            $this->info("Precios eliminados en {$count} servicio(s).");
        }

        $this->info('Listo.');

        return self::SUCCESS;
    }
}
