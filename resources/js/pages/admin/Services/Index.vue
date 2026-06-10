<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import {
    ChevronDown,
    ChevronUp,
    FolderTree,
    GripVertical,
    Pencil,
    Plus,
    Tag,
    Trash2,
} from 'lucide-vue-next';
import { computed } from 'vue';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/AppLayout.vue';
import { formatCLP } from '@/lib/utils';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

type ServiceItem = {
    id: number;
    category: string;
    title: string;
    subtitle?: string;
    price?: number | null;
    short_description: string;
    image_url?: string;
    is_active: boolean;
    sort_order: number;
    tags: { id: number; name: string }[];
};

type PaginatorLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedServices = {
    data: ServiceItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginatorLink[];
};

const props = defineProps<{
    services: PaginatedServices;
    servicePerPageOptions: number[];
}>();

/** Solo con una página tiene sentido reordenar con flechas (evita pisar sort_order del resto). */
const canReorder = computed(() => props.services.last_page <= 1);

const groupedServices = computed(() => {
    const groups = new Map<
        string,
        Array<{ item: ServiceItem; index: number }>
    >();

    for (const [index, service] of props.services.data.entries()) {
        const key = service.category || 'General';

        if (!groups.has(key)) {
            groups.set(key, []);
        }

        groups.get(key)!.push({ item: service, index });
    }

    return Array.from(groups.entries()).map(([category, services]) => ({
        category,
        services,
    }));
});

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.services.index() },
    { title: 'Servicios', href: admin.services.index() },
];

function moveUp(index: number) {
    if (!canReorder.value || index <= 0) {
        return;
    }

    const newOrder = [...props.services.data];
    [newOrder[index - 1], newOrder[index]] = [
        newOrder[index],
        newOrder[index - 1],
    ];
    submitReorder(newOrder);
}

function moveDown(index: number) {
    if (!canReorder.value || index >= props.services.data.length - 1) {
        return;
    }

    const newOrder = [...props.services.data];
    [newOrder[index], newOrder[index + 1]] = [
        newOrder[index + 1],
        newOrder[index],
    ];
    submitReorder(newOrder);
}

function submitReorder(services: ServiceItem[]) {
    const order = services.reduce<Record<number, number>>((acc, s, i) => {
        acc[s.id] = i;

        return acc;
    }, {});

    router.post(admin.services.reorder.url(), { order });
}

function toggleActive(id: number) {
    router.patch(admin.services.toggleActive.url(id));
}

function destroy(id: number) {
    if (!confirm('¿Eliminar este servicio?')) {
        return;
    }

    router.delete(admin.services.destroy.url(id));
}

function changePerPage(value: string) {
    const per_page = Number(value);
    router.get(
        admin.services.index.url({
            query: {
                per_page,
                page: 1,
            },
        }),
        {},
        { preserveScroll: true },
    );
}
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <Head title="Servicios - Admin" />

        <div class="flex flex-col gap-6">
            <div
                data-tour="services-header"
                class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"
            >
                <div class="min-w-0">
                    <h1 class="text-2xl font-semibold tracking-tight">
                        Servicios
                    </h1>
                    <p class="text-muted-foreground">
                        Gestiona los servicios del catálogo.
                        <template v-if="canReorder">
                            Usa las flechas para cambiar el orden
                            global.</template
                        >
                        <template v-else>
                            Con varias páginas, ajusta el orden con el campo
                            «orden» al editar cada servicio.</template
                        >
                    </p>
                </div>
                <div
                    class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end lg:shrink-0"
                >
                    <label
                        v-if="services.total > 0"
                        class="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                        <span class="whitespace-nowrap">Por página</span>
                        <select
                            class="h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground shadow-xs focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                            :value="services.per_page"
                            aria-label="Cantidad de servicios por página"
                            @change="
                                changePerPage(
                                    ($event.target as HTMLSelectElement).value,
                                )
                            "
                        >
                            <option
                                v-for="n in servicePerPageOptions"
                                :key="n"
                                :value="n"
                            >
                                {{ n }}
                            </option>
                        </select>
                    </label>
                    <div class="flex flex-wrap gap-2">
                        <Link :href="admin.categories.index()">
                            <Button variant="outline">
                                <FolderTree class="mr-2 size-4" />
                                Categorías
                            </Button>
                        </Link>
                        <Link :href="admin.tags.index()">
                            <Button variant="outline">
                                <Tag class="mr-2 size-4" />
                                Etiquetas
                            </Button>
                        </Link>
                        <Link
                            data-tour="services-new-button"
                            :href="admin.services.create()"
                        >
                            <Button>
                                <Plus class="mr-2 size-4" />
                                Nuevo servicio
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div
                v-if="$page.props.flash?.success"
                class="rounded-lg bg-green-50 p-3 text-sm text-green-800 dark:bg-green-950 dark:text-green-200"
            >
                {{ $page.props.flash.success }}
            </div>

            <div data-tour="services-list" class="space-y-6">
                <div
                    v-for="group in groupedServices"
                    :key="group.category"
                    class="space-y-3"
                >
                    <h2
                        class="text-sm font-semibold tracking-wide text-muted-foreground uppercase"
                    >
                        {{ group.category }}
                    </h2>

                    <div class="grid gap-4">
                        <Card
                            v-for="service in group.services"
                            :key="service.item.id"
                        >
                            <CardHeader class="pb-2">
                                <div
                                    class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
                                >
                                    <div class="flex flex-1 items-start gap-3">
                                        <div
                                            v-if="canReorder"
                                            class="flex flex-col gap-1"
                                        >
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                class="size-8 shrink-0 cursor-grab"
                                                :disabled="service.index === 0"
                                                @click="moveUp(service.index)"
                                            >
                                                <ChevronUp class="size-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                class="size-8 shrink-0 cursor-grab"
                                                :disabled="
                                                    service.index ===
                                                    services.data.length - 1
                                                "
                                                @click="moveDown(service.index)"
                                            >
                                                <ChevronDown class="size-4" />
                                            </Button>
                                        </div>
                                        <div
                                            v-if="service.item.image_url"
                                            class="size-16 shrink-0 overflow-hidden rounded-md bg-muted"
                                        >
                                            <img
                                                :src="service.item.image_url"
                                                :alt="service.item.title"
                                                class="size-full object-cover"
                                            />
                                        </div>
                                        <div class="min-w-0 flex-1">
                                            <div
                                                class="flex items-center gap-2"
                                            >
                                                <span
                                                    v-if="
                                                        !service.item.is_active
                                                    "
                                                    class="rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-800 dark:bg-amber-900/50 dark:text-amber-200"
                                                >
                                                    Inactivo
                                                </span>
                                            </div>
                                            <CardTitle class="mt-1 text-lg">{{
                                                service.item.title
                                            }}</CardTitle>
                                            <CardDescription
                                                v-if="service.item.subtitle"
                                            >
                                                {{ service.item.subtitle }}
                                            </CardDescription>
                                            <p
                                                v-if="service.item.price"
                                                class="mt-1 text-sm font-semibold text-primary"
                                            >
                                                {{
                                                    formatCLP(
                                                        service.item.price,
                                                    )
                                                }}
                                            </p>
                                            <div
                                                v-if="service.item.tags?.length"
                                                class="mt-2 flex flex-wrap gap-1"
                                            >
                                                <span
                                                    v-for="tag in service.item
                                                        .tags"
                                                    :key="tag.id"
                                                    class="rounded-full bg-primary/10 px-2 py-0.5 text-xs"
                                                >
                                                    {{ tag.name }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex shrink-0 gap-2">
                                        <Link
                                            :href="
                                                admin.services.edit(
                                                    service.item.id,
                                                )
                                            "
                                        >
                                            <Button variant="outline" size="sm">
                                                <Pencil class="mr-1 size-4" />
                                                Editar
                                            </Button>
                                        </Link>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger as-child>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                >
                                                    <GripVertical
                                                        class="size-4"
                                                    />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    @click="
                                                        toggleActive(
                                                            service.item.id,
                                                        )
                                                    "
                                                >
                                                    {{
                                                        service.item.is_active
                                                            ? 'Desactivar'
                                                            : 'Activar'
                                                    }}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    class="text-destructive"
                                                    @click="
                                                        destroy(service.item.id)
                                                    "
                                                >
                                                    <Trash2
                                                        class="mr-2 size-4"
                                                    />
                                                    Eliminar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>
                </div>

                <div
                    v-if="!services.data.length"
                    class="flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center"
                >
                    <p class="text-muted-foreground">No hay servicios aún.</p>
                    <Link :href="admin.services.create()" class="mt-2">
                        <Button variant="outline">Crear primer servicio</Button>
                    </Link>
                </div>

                <div
                    v-if="services.total > 0"
                    class="flex flex-col gap-3 rounded-xl border px-4 py-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
                >
                    <span>
                        Mostrando {{ services.from }}–{{ services.to }} de
                        {{ services.total }} servicios
                    </span>
                    <nav
                        v-if="services.last_page > 1"
                        class="flex flex-wrap justify-center gap-1 sm:justify-end"
                        aria-label="Paginación"
                    >
                        <template
                            v-for="link in services.links"
                            :key="link.label"
                        >
                            <Link
                                v-if="link.url"
                                :href="link.url"
                                preserve-scroll
                                class="inline-flex min-w-[2rem] items-center justify-center rounded-md px-2 py-1 text-xs font-medium transition-colors"
                                :class="
                                    link.active
                                        ? 'pointer-events-none bg-primary text-primary-foreground'
                                        : 'hover:bg-muted'
                                "
                            >
                                <!-- eslint-disable-next-line vue/no-v-html -->
                                <span v-html="link.label" />
                            </Link>
                            <span
                                v-else
                                class="inline-flex min-w-[2rem] cursor-not-allowed items-center justify-center rounded-md px-2 py-1 text-xs opacity-40"
                                v-html="link.label"
                            />
                        </template>
                    </nav>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
