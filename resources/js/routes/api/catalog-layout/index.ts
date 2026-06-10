import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\CatalogLayoutController::show
 * @see app/Http/Controllers/Api/CatalogLayoutController.php:11
 * @route '/api/catalog-layout'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/catalog-layout',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\CatalogLayoutController::show
 * @see app/Http/Controllers/Api/CatalogLayoutController.php:11
 * @route '/api/catalog-layout'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CatalogLayoutController::show
 * @see app/Http/Controllers/Api/CatalogLayoutController.php:11
 * @route '/api/catalog-layout'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\CatalogLayoutController::show
 * @see app/Http/Controllers/Api/CatalogLayoutController.php:11
 * @route '/api/catalog-layout'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\CatalogLayoutController::show
 * @see app/Http/Controllers/Api/CatalogLayoutController.php:11
 * @route '/api/catalog-layout'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\CatalogLayoutController::show
 * @see app/Http/Controllers/Api/CatalogLayoutController.php:11
 * @route '/api/catalog-layout'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\CatalogLayoutController::show
 * @see app/Http/Controllers/Api/CatalogLayoutController.php:11
 * @route '/api/catalog-layout'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const catalogLayout = {
    show: Object.assign(show, show),
}

export default catalogLayout