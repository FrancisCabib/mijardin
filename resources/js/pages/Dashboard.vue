<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { LifeBuoy } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { useAdminTour } from '@/composables/useAdminTour';
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import admin from '@/routes/admin';
import catalog from '@/routes/catalog';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

const { start: startAdminTour } = useAdminTour();

const handleStartTour = () => {
    void startAdminTour();
};
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div
            class="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-1"
        >
            <div
                data-tour="dashboard-intro"
                class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
            >
                <div>
                    <h1 class="text-2xl font-semibold tracking-tight">Panel</h1>
                    <p class="mt-1 text-sm text-muted-foreground">
                        Gestiona el catálogo o abre la vista pública de
                        servicios.
                    </p>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    class="shrink-0"
                    @click="handleStartTour"
                >
                    <LifeBuoy class="mr-2 h-4 w-4" />
                    Hacer el tour
                </Button>
            </div>

            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                    prefetch
                    data-tour="dashboard-public"
                    :href="catalog.show().url"
                    class="group flex flex-col rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm transition hover:border-sidebar-border hover:shadow-md dark:border-sidebar-border"
                >
                    <span class="text-sm font-medium text-muted-foreground"
                        >Público</span
                    >
                    <span class="mt-2 text-lg font-semibold">Ver catálogo</span>
                    <span class="mt-1 text-sm text-muted-foreground"
                        >Misma información que el JSON del API (secciones y
                        hero).</span
                    >
                </Link>

                <Link
                    prefetch
                    :href="admin.services.index().url"
                    class="group flex flex-col rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm transition hover:border-sidebar-border hover:shadow-md dark:border-sidebar-border"
                >
                    <span class="text-sm font-medium text-muted-foreground"
                        >Admin</span
                    >
                    <span class="mt-2 text-lg font-semibold">Servicios</span>
                    <span class="mt-1 text-sm text-muted-foreground"
                        >Alta, edición, orden y fotos.</span
                    >
                </Link>

                <Link
                    prefetch
                    :href="admin.sections.index().url"
                    class="group flex flex-col rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm transition hover:border-sidebar-border hover:shadow-md dark:border-sidebar-border"
                >
                    <span class="text-sm font-medium text-muted-foreground"
                        >Admin</span
                    >
                    <span class="mt-2 text-lg font-semibold">Secciones</span>
                    <span class="mt-1 text-sm text-muted-foreground"
                        >Ventanas de fechas y grupos del catálogo.</span
                    >
                </Link>

                <Link
                    prefetch
                    :href="admin.categories.index().url"
                    class="group flex flex-col rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm transition hover:border-sidebar-border hover:shadow-md dark:border-sidebar-border"
                >
                    <span class="text-sm font-medium text-muted-foreground"
                        >Admin</span
                    >
                    <span class="mt-2 text-lg font-semibold">Categorías</span>
                    <span class="mt-1 text-sm text-muted-foreground"
                        >Organiza servicios por línea u ocasión.</span
                    >
                </Link>

                <Link
                    prefetch
                    :href="admin.tags.index().url"
                    class="group flex flex-col rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm transition hover:border-sidebar-border hover:shadow-md dark:border-sidebar-border"
                >
                    <span class="text-sm font-medium text-muted-foreground"
                        >Admin</span
                    >
                    <span class="mt-2 text-lg font-semibold">Etiquetas</span>
                    <span class="mt-1 text-sm text-muted-foreground"
                        >Etiquetas para fichas y filtros.</span
                    >
                </Link>
            </div>
        </div>
    </AppLayout>
</template>
