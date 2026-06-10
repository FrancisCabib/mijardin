import { router } from '@inertiajs/vue3';
import { driver } from 'driver.js';
import type { Config, Driver, DriveStep } from 'driver.js';
import 'driver.js/dist/driver.css';

/**
 * Onboarding del panel admin.
 *
 * Diseño:
 * - Tour multipágina que recorre Dashboard → Etiquetas → Categorías →
 *   Secciones → Servicios → vuelta a Dashboard.
 * - Cada "capítulo" se corresponde con una ruta. Cuando termina, el tour
 *   navega a la siguiente página y arranca Driver.js de nuevo.
 * - Cualquier usuario autenticado puede lanzarlo desde el menú de usuario
 *   o desde el botón "Hacer el tour" del dashboard. Es repetible.
 */

const TOUR_BASE: Config = {
    animate: true,
    showProgress: true,
    allowClose: true,
    overlayOpacity: 0.55,
    stagePadding: 6,
    stageRadius: 8,
    smoothScroll: true,
    nextBtnText: 'Siguiente',
    prevBtnText: 'Atrás',
    doneBtnText: 'Continuar',
    progressText: 'Paso {{current}} de {{total}}',
};

type Chapter = {
    /** URL a la que el tour debe llevar al usuario antes de iniciar el capítulo. */
    path: string;
    /** Texto del botón de cierre del último paso del capítulo. */
    finalButtonText: string;
    /** Paso del capítulo (Driver.js DriveStep). */
    steps: DriveStep[];
};

const CHAPTERS: Chapter[] = [
    {
        path: '/dashboard',
        finalButtonText: 'Empezar',
        steps: [
            {
                element: '[data-tour="dashboard-intro"]',
                popover: {
                    title: '¡Bienvenido al panel!',
                    description:
                        'Te voy a guiar paso a paso para que conozcas cómo se arma el catálogo: etiquetas, categorías, secciones y servicios. Puedes repetir este recorrido cuando quieras desde tu menú de usuario.',
                    side: 'bottom',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="sidebar"]',
                popover: {
                    title: 'Menú de navegación',
                    description:
                        'Desde aquí accedes a las áreas de administración. Vamos a recorrerlas en orden: primero Etiquetas.',
                    side: 'right',
                    align: 'start',
                },
            },
        ],
    },
    {
        path: '/admin/tags',
        finalButtonText: 'Ir a Categorías',
        steps: [
            {
                element: '[data-tour="tags-create-form"]',
                popover: {
                    title: 'Paso 1 · Crear etiquetas',
                    description:
                        'Las etiquetas son distintivos cortos como "Nuevo", "Promo" o "Sin stock" que se muestran en cada ficha del catálogo.',
                    side: 'bottom',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="tags-create-input"]',
                popover: {
                    title: 'Escribe el nombre',
                    description:
                        'Aquí pones un nombre corto y descriptivo, por ejemplo: Nuevo.',
                    side: 'bottom',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="tags-create-submit"]',
                popover: {
                    title: 'Crea la etiqueta',
                    description:
                        'Pulsa "Crear" y la etiqueta queda lista para asignar a servicios.',
                    side: 'left',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="tags-table"]',
                popover: {
                    title: 'Tus etiquetas',
                    description:
                        'Aquí ves todas las etiquetas y a cuántos servicios están asignadas. Puedes editarlas o eliminarlas en cualquier momento.',
                    side: 'top',
                    align: 'start',
                },
            },
        ],
    },
    {
        path: '/admin/categories',
        finalButtonText: 'Ir a Secciones',
        steps: [
            {
                element: '[data-tour="categories-create-form"]',
                popover: {
                    title: 'Paso 2 · Crear categorías',
                    description:
                        'Las categorías agrupan tus servicios por tipo: "Ramos", "Plantas", "Regalos", etc. Un servicio pertenece a una categoría.',
                    side: 'bottom',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="categories-create-input"]',
                popover: {
                    title: 'Nombre de la categoría',
                    description: 'Por ejemplo: Ramos.',
                    side: 'bottom',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="categories-create-submit"]',
                popover: {
                    title: 'Crea la categoría',
                    description:
                        'La categoría queda disponible para usarla en secciones y al crear servicios.',
                    side: 'left',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="categories-table"]',
                popover: {
                    title: 'Tus categorías',
                    description:
                        'Aquí están todas las categorías y la cantidad de servicios en cada una.',
                    side: 'top',
                    align: 'start',
                },
            },
        ],
    },
    {
        path: '/admin/sections',
        finalButtonText: 'Ir a Servicios',
        steps: [
            {
                element: '[data-tour="sections-create-form"]',
                popover: {
                    title: 'Paso 3 · Crear secciones',
                    description:
                        'Las secciones son los bloques que ve el cliente en el catálogo (por ejemplo "Día de la Madre" o "Catálogo general"). Tú decides qué categorías muestra cada sección y en qué orden.',
                    side: 'bottom',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="sections-name-input"]',
                popover: {
                    title: 'Nombre de la sección',
                    description:
                        'Ponle un nombre claro. Será visible en el catálogo público.',
                    side: 'bottom',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="sections-dates"]',
                popover: {
                    title: 'Vigencia (opcional)',
                    description:
                        'Si la sección es de campaña, define fecha de inicio y fin. Si las dejas vacías, queda activa de forma permanente.',
                    side: 'top',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="sections-categories"]',
                popover: {
                    title: 'Elige qué categorías muestra',
                    description:
                        'Marca una o varias categorías. Una misma categoría puede aparecer en distintas secciones.',
                    side: 'top',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="sections-create-submit"]',
                popover: {
                    title: 'Crea la sección',
                    description:
                        'Al guardar, la sección aparece en el listado de abajo. Si está activa y tiene categorías con servicios, ya se ve en el catálogo público.',
                    side: 'top',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="sections-list"]',
                popover: {
                    title: 'Tus secciones',
                    description:
                        'Aquí controlas el orden, el estado y la vigencia de cada sección. Las inactivas no se muestran al cliente.',
                    side: 'top',
                    align: 'start',
                },
            },
        ],
    },
    {
        path: '/admin/services',
        finalButtonText: 'Crear un servicio',
        steps: [
            {
                element: '[data-tour="services-header"]',
                popover: {
                    title: 'Paso 4 · Crear servicios',
                    description:
                        'Esta es la sección principal. Aquí están todos los productos del catálogo, agrupados por la categoría a la que pertenecen.',
                    side: 'bottom',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="services-list"]',
                popover: {
                    title: 'Lista de servicios',
                    description:
                        'Desde aquí editas, activas/desactivas y reordenas tus servicios. Solo los servicios activos aparecen en el catálogo público.',
                    side: 'top',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="services-new-button"]',
                popover: {
                    title: 'Nuevo servicio',
                    description:
                        'Vamos a abrir el formulario para crear un servicio nuevo. Pulsa "Continuar" y te acompaño campo por campo.',
                    side: 'bottom',
                    align: 'end',
                },
            },
        ],
    },
    {
        path: '/admin/services/create',
        finalButtonText: 'Listo, ver el catálogo',
        steps: [
            {
                element: '[data-tour="services-form-heading"]',
                popover: {
                    title: 'Crear servicio',
                    description:
                        'Vamos a revisar cada campo. Los marcados con * son obligatorios, el resto es opcional.',
                    side: 'bottom',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="services-form-category"]',
                popover: {
                    title: 'Categoría',
                    description:
                        'Elige a qué categoría pertenece. Es lo que decide en qué bloque del catálogo se muestra. Si te faltan categorías, vuelve al paso anterior y crea una.',
                    side: 'bottom',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="services-form-title"]',
                popover: {
                    title: 'Título',
                    description:
                        'Nombre del producto tal como lo verá el cliente. Sé claro y corto, por ejemplo: "Ramo primavera".',
                    side: 'bottom',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="services-form-subtitle"]',
                popover: {
                    title: 'Subtítulo (opcional)',
                    description:
                        'Una línea complementaria que aparece bajo el título, por ejemplo: "12 rosas + lirios".',
                    side: 'bottom',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="services-form-price"]',
                popover: {
                    title: 'Precio y orden',
                    description:
                        'Precio en pesos chilenos (entero). Si lo dejas vacío, el catálogo no muestra precio. "Orden de aparición" sirve para destacar productos dentro de la misma categoría.',
                    side: 'top',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="services-form-description"]',
                popover: {
                    title: 'Descripción corta',
                    description:
                        'Es lo que se ve en la tarjeta del catálogo (máx. 500 caracteres). Más abajo puedes agregar una descripción larga para más detalle.',
                    side: 'top',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="services-form-image"]',
                popover: {
                    title: 'Imagen principal',
                    description:
                        'Sube una foto del producto. Formatos JPG, PNG o GIF, máximo 2MB. Una buena foto cuadrada o apaisada se ve mejor en las tarjetas.',
                    side: 'top',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="services-form-tag"]',
                popover: {
                    title: 'Etiqueta (opcional)',
                    description:
                        'Asigna una etiqueta para destacar el producto, como "Nuevo" o "Promo". Si no necesitas destacarlo, deja "Sin tag".',
                    side: 'top',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="services-form-active"]',
                popover: {
                    title: '¿Activo?',
                    description:
                        'Si lo dejas activo, el servicio aparece en el catálogo público en cuanto lo guardes. Puedes desmarcarlo para crearlo en borrador y revisarlo antes.',
                    side: 'top',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="services-form-submit"]',
                popover: {
                    title: 'Guardar el servicio',
                    description:
                        'Pulsa "Crear servicio" cuando termines. Volverás a la lista con tu nuevo servicio ya cargado.',
                    side: 'top',
                    align: 'start',
                },
            },
        ],
    },
    {
        path: '/dashboard',
        finalButtonText: 'Finalizar',
        steps: [
            {
                element: '[data-tour="dashboard-public"]',
                popover: {
                    title: 'Revisa la vista pública',
                    description:
                        'Cuando tengas todo creado, abre "Ver catálogo" para comprobar cómo lo ve el cliente. Es la misma información que sirve el API.',
                    side: 'top',
                    align: 'start',
                },
            },
            {
                element: '[data-tour="user-menu"]',
                popover: {
                    title: 'Repetir el tour',
                    description:
                        'Desde tu menú de usuario, "Ver tour del panel" reinicia este recorrido cuando lo necesites.',
                    side: 'top',
                    align: 'end',
                },
            },
        ],
    },
];

const isStepReady = (selector: string): boolean => {
    return (
        typeof document !== 'undefined' &&
        document.querySelector(selector) !== null
    );
};

const waitForElement = (
    selector: string,
    timeoutMs = 4000,
): Promise<boolean> => {
    if (isStepReady(selector)) {
        return Promise.resolve(true);
    }

    return new Promise((resolve) => {
        const start = Date.now();

        const interval = window.setInterval(() => {
            if (isStepReady(selector)) {
                window.clearInterval(interval);
                resolve(true);

                return;
            }

            if (Date.now() - start > timeoutMs) {
                window.clearInterval(interval);
                resolve(false);
            }
        }, 80);
    });
};

const navigateTo = (path: string): Promise<void> => {
    return new Promise((resolve) => {
        if (window.location.pathname.replace(/\/+$/, '') === path) {
            resolve();

            return;
        }

        router.visit(path, {
            preserveScroll: false,
            onFinish: () => resolve(),
        });
    });
};

let activeDriver: Driver | null = null;
let userAborted = false;

const destroyActiveDriver = () => {
    if (activeDriver) {
        const d = activeDriver;
        activeDriver = null;
        d.destroy();
    }
};

const runChapter = async (index: number): Promise<void> => {
    if (index >= CHAPTERS.length) {
        return;
    }

    const chapter = CHAPTERS[index];
    const isLastChapter = index === CHAPTERS.length - 1;

    await navigateTo(chapter.path);

    const firstSelector = chapter.steps[0]?.element;

    if (typeof firstSelector === 'string') {
        const found = await waitForElement(firstSelector);

        if (!found) {
            // Si no aparece el primer elemento del capítulo, salta al siguiente
            // para no dejar al usuario bloqueado.
            await runChapter(index + 1);

            return;
        }
    }

    if (userAborted) {
        return;
    }

    const stepsWithLastButton: DriveStep[] = chapter.steps.map((step, i) => {
        const isLastStep = i === chapter.steps.length - 1;

        if (!isLastStep) {
            return step;
        }

        return {
            ...step,
            popover: {
                ...step.popover,
                doneBtnText: chapter.finalButtonText,
                showButtons: isLastChapter
                    ? ['previous', 'close']
                    : ['previous', 'next'],
                nextBtnText: chapter.finalButtonText,
                onNextClick: (_el, _step, { driver: drv }) => {
                    drv.destroy();
                },
            },
        };
    });

    await new Promise<void>((resolve) => {
        const drive = driver({
            ...TOUR_BASE,
            steps: stepsWithLastButton,
            onCloseClick: (_el, _step, { driver: drv }) => {
                userAborted = true;
                drv.destroy();
            },
            onDestroyed: () => {
                activeDriver = null;
                resolve();
            },
        });

        activeDriver = drive;
        drive.drive();
    });

    if (userAborted) {
        return;
    }

    await runChapter(index + 1);
};

export type UseAdminTourReturn = {
    start: () => Promise<void>;
};

export function useAdminTour(): UseAdminTourReturn {
    const start = async () => {
        if (typeof window === 'undefined') {
            return;
        }

        userAborted = false;
        destroyActiveDriver();
        await runChapter(0);
    };

    return { start };
}
