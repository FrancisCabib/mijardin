<?php

namespace App\Catalog;

use App\Models\CatalogSection;
use App\Models\Category;
use Illuminate\Support\Carbon;

final class CatalogLayoutData
{
    /**
     * @return array{hero: array<string, string>, sections: array<int, array<string, mixed>>}
     */
    public static function forInertia(): array
    {
        return [
            'hero' => self::hero(),
            'sections' => self::sections(),
        ];
    }

    /**
     * @return array{meta: array{generated_at: string, timezone: string}, hero: array<string, string>, sections: array<int, array<string, mixed>>}
     */
    public static function forApi(): array
    {
        return [
            'meta' => [
                'generated_at' => Carbon::now()->toIso8601String(),
                'timezone' => (string) config('app.timezone'),
            ],
            'hero' => self::hero(),
            'sections' => self::sections(),
        ];
    }

    /**
     * @return array<string, string>
     */
    private static function hero(): array
    {
        $heroText = function (array $keys, string $fallback): string {
            foreach ($keys as $key) {
                $value = config($key);

                if (is_string($value) && trim($value) !== '') {
                    return $value;
                }
            }

            return $fallback;
        };

        return [
            'pre_headline' => $heroText(
                ['catalog.hero.pre_headline'],
                'Plantas, flores y regalos',
            ),
            'headline' => $heroText(
                ['catalog.hero.headline', 'catalog.hero.title'],
                '',
            ),
            'sub_headline' => $heroText(
                ['catalog.hero.sub_headline', 'catalog.hero.subtitle', 'catalog.hero.info_text'],
                'Flores frescas, plantas y regalos con cariño para cada ocasión.',
            ),
            'cta_text' => $heroText(
                ['catalog.hero.cta_text'],
                'Ver catálogo',
            ),
            'cta_url' => $heroText(
                ['catalog.hero.cta_url'],
                '#catalogo',
            ),
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private static function sections(): array
    {
        $sections = CatalogSection::query()
            ->active()
            ->ordered()
            ->visibleNow()
            ->with([
                'categories' => fn ($query) => $query
                    ->where('categories.is_active', true)
                    ->orderBy('categories.sort_order')
                    ->orderBy('categories.id'),
                'categories.services' => fn ($query) => $query
                    ->where('services.is_active', true)
                    ->ordered()
                    ->with(['tags:id,name,slug']),
            ])
            ->get();

        return $sections->map(function (CatalogSection $section) {
            return [
                'id' => $section->id,
                'name' => $section->name,
                'slug' => $section->slug,
                'description' => $section->description,
                'is_active' => $section->is_active,
                'starts_at' => $section->starts_at?->toIso8601String(),
                'ends_at' => $section->ends_at?->toIso8601String(),
                'categories' => $section->categories->map(function (Category $category) {
                    return [
                        'id' => $category->id,
                        'name' => $category->name,
                        'slug' => $category->slug,
                        'services' => $category->services->map(fn ($service) => [
                            'id' => $service->id,
                            'title' => $service->title,
                            'subtitle' => $service->subtitle,
                            'short_description' => $service->short_description,
                            'long_description' => $service->long_description,
                            'price' => $service->price,
                            'price_formatted' => is_null($service->price)
                                ? null
                                : '$'.number_format((int) $service->price, 0, ',', '.'),
                            'image_url' => $service->image_url,
                            'tags' => $service->tags->map(fn ($tag) => [
                                'id' => $tag->id,
                                'name' => $tag->name,
                                'slug' => $tag->slug,
                            ])->values()->all(),
                        ])->values()->all(),
                    ];
                })->values()->all(),
            ];
        })->values()->all();
    }
}
