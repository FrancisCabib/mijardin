<script setup lang="ts">
import { Head, Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { home } from '@/routes';
import admin from '@/routes/admin';

type CatalogTag = {
    id: number;
    name: string;
    slug: string;
};

type CatalogService = {
    id: number;
    title: string;
    subtitle: string | null;
    short_description: string;
    long_description: string | null;
    price: number | null;
    price_formatted: string | null;
    image_url: string | null;
    tags: CatalogTag[];
};

type CatalogCategory = {
    id: number;
    name: string;
    slug: string;
    services: CatalogService[];
};

type CatalogSection = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    is_active: boolean;
    starts_at: string | null;
    ends_at: string | null;
    categories: CatalogCategory[];
};

const props = defineProps<{
    hero: {
        pre_headline: string;
        headline: string;
        sub_headline: string;
        cta_text: string;
        cta_url: string;
    };
    sections: CatalogSection[];
}>();

const page = usePage();
const hasAuth = !!page.props.auth?.user;
const appName =
    (page.props.app as { name?: string } | undefined)?.name ??
    'Florería Mi Jardín';

const pageTitle = computed(() =>
    props.hero.headline.trim() !== ''
        ? props.hero.headline
        : 'Catálogo de servicios',
);

const serviceCount = computed(() => {
    let n = 0;

    for (const section of props.sections) {
        for (const category of section.categories) {
            n += category.services.length;
        }
    }

    return n;
});
</script>

<template>
    <Head :title="pageTitle" />

    <div
        class="relative min-h-screen overflow-x-hidden bg-stone-50/65 text-stone-900 dark:bg-stone-950/65 dark:text-stone-100"
    >
        <div aria-hidden="true" class="catalog-parallax">
            <div
                class="catalog-parallax__layer catalog-parallax__layer--far"
            ></div>
            <div
                class="catalog-parallax__layer catalog-parallax__layer--near"
            ></div>
            <div class="catalog-parallax__veil"></div>
        </div>

        <div class="relative z-10">
            <header
                class="sticky top-0 z-10 border-b border-stone-200 bg-white/90 backdrop-blur dark:border-stone-800 dark:bg-stone-950/90"
            >
                <div
                    class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6"
                >
                    <Link
                        :href="home().url"
                        class="text-lg font-semibold text-stone-900 hover:text-stone-600 dark:text-stone-100 dark:hover:text-stone-300"
                    >
                        {{ appName }}
                    </Link>
                    <nav class="flex items-center gap-4" aria-label="Principal">
                        <Link
                            v-if="hasAuth"
                            :href="admin.services.index().url"
                            class="rounded-md border border-stone-300 px-3 py-1.5 text-sm font-medium transition hover:bg-stone-100 dark:border-stone-600 dark:hover:bg-stone-800"
                        >
                            Administrar
                        </Link>
                    </nav>
                </div>
            </header>

            <main
                id="catalogo"
                class="mx-auto max-w-6xl px-4 py-12 sm:px-6"
                tabindex="-1"
            >
                <p
                    class="mb-2 text-sm font-medium tracking-wide text-emerald-700 uppercase dark:text-emerald-400"
                >
                    {{ hero.pre_headline }}
                </p>
                <h1 class="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
                    {{
                        hero.headline.trim() !== ''
                            ? hero.headline
                            : 'Nuestros servicios'
                    }}
                </h1>
                <p class="mb-8 max-w-2xl text-stone-600 dark:text-stone-400">
                    {{ hero.sub_headline }}
                </p>
                <p v-if="hero.cta_text.trim() !== ''" class="mb-12">
                    <a
                        :href="hero.cta_url"
                        class="inline-flex rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-stone-950"
                    >
                        {{ hero.cta_text }}
                    </a>
                </p>

                <div
                    v-if="serviceCount === 0"
                    class="rounded-xl border border-dashed border-stone-300 p-12 text-center text-stone-500 dark:border-stone-600"
                >
                    <p class="text-lg">No hay servicios publicados aún.</p>
                </div>

                <div v-else class="space-y-16">
                    <section
                        v-for="section in sections"
                        :key="section.id"
                        class="space-y-4"
                        :aria-labelledby="`section-${section.id}`"
                    >
                        <div>
                            <h2
                                :id="`section-${section.id}`"
                                class="text-2xl font-semibold tracking-tight"
                            >
                                {{ section.name }}
                            </h2>
                            <p
                                v-if="section.description"
                                class="mt-1 text-stone-600 dark:text-stone-400"
                            >
                                {{ section.description }}
                            </p>
                        </div>

                        <div
                            v-for="category in section.categories"
                            :key="category.id"
                            class="space-y-5 border-t border-stone-200 pt-8 dark:border-stone-700"
                        >
                            <h3 class="text-xl font-semibold tracking-tight">
                                {{ category.name }}
                            </h3>

                            <div
                                class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                            >
                                <article
                                    v-for="service in category.services"
                                    :key="service.id"
                                    class="group overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md dark:border-stone-700 dark:bg-stone-900"
                                >
                                    <div
                                        v-if="service.image_url"
                                        class="aspect-video overflow-hidden bg-stone-100 dark:bg-stone-800"
                                    >
                                        <img
                                            :src="service.image_url"
                                            :alt="service.title"
                                            class="h-full w-full object-cover transition group-hover:scale-105"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                    <div
                                        v-else
                                        class="flex aspect-video items-center justify-center bg-stone-100 text-stone-400 dark:bg-stone-800"
                                    >
                                        <span
                                            class="text-4xl"
                                            aria-hidden="true"
                                            >—</span
                                        >
                                    </div>
                                    <div class="p-5">
                                        <div
                                            class="mb-2 flex flex-wrap gap-1.5"
                                        >
                                            <span
                                                v-for="tag in service.tags"
                                                :key="tag.id"
                                                class="rounded-full bg-stone-200 px-2 py-0.5 text-xs font-medium text-stone-600 dark:bg-stone-700 dark:text-stone-300"
                                            >
                                                {{ tag.name }}
                                            </span>
                                        </div>
                                        <p
                                            class="mb-1 text-xs text-stone-500 dark:text-stone-400"
                                        >
                                            Ref. {{ service.id }}
                                        </p>
                                        <h4 class="mb-1 text-xl font-semibold">
                                            {{ service.title }}
                                        </h4>
                                        <p
                                            v-if="service.subtitle"
                                            class="mb-2 text-sm text-stone-600 dark:text-stone-400"
                                        >
                                            {{ service.subtitle }}
                                        </p>
                                        <p
                                            v-if="service.price_formatted"
                                            class="mb-2 font-medium text-stone-900 dark:text-stone-100"
                                        >
                                            {{ service.price_formatted }}
                                        </p>
                                        <p
                                            class="line-clamp-3 text-sm text-stone-600 dark:text-stone-400"
                                        >
                                            {{ service.short_description }}
                                        </p>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    </div>
</template>
