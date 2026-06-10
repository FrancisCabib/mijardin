import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CatalogSectionController::index
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:17
 * @route '/admin/sections'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/sections',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CatalogSectionController::index
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:17
 * @route '/admin/sections'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CatalogSectionController::index
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:17
 * @route '/admin/sections'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CatalogSectionController::index
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:17
 * @route '/admin/sections'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CatalogSectionController::index
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:17
 * @route '/admin/sections'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CatalogSectionController::index
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:17
 * @route '/admin/sections'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CatalogSectionController::index
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:17
 * @route '/admin/sections'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\CatalogSectionController::store
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:44
 * @route '/admin/sections'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/sections',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CatalogSectionController::store
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:44
 * @route '/admin/sections'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CatalogSectionController::store
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:44
 * @route '/admin/sections'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\CatalogSectionController::store
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:44
 * @route '/admin/sections'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CatalogSectionController::store
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:44
 * @route '/admin/sections'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\CatalogSectionController::update
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:62
 * @route '/admin/sections/{section}'
 */
export const update = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/sections/{section}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\CatalogSectionController::update
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:62
 * @route '/admin/sections/{section}'
 */
update.url = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { section: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { section: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    section: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        section: typeof args.section === 'object'
                ? args.section.id
                : args.section,
                }

    return update.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CatalogSectionController::update
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:62
 * @route '/admin/sections/{section}'
 */
update.put = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\CatalogSectionController::update
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:62
 * @route '/admin/sections/{section}'
 */
update.patch = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\CatalogSectionController::update
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:62
 * @route '/admin/sections/{section}'
 */
    const updateForm = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CatalogSectionController::update
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:62
 * @route '/admin/sections/{section}'
 */
        updateForm.put = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\CatalogSectionController::update
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:62
 * @route '/admin/sections/{section}'
 */
        updateForm.patch = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\CatalogSectionController::destroy
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:80
 * @route '/admin/sections/{section}'
 */
export const destroy = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/sections/{section}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CatalogSectionController::destroy
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:80
 * @route '/admin/sections/{section}'
 */
destroy.url = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { section: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { section: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    section: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        section: typeof args.section === 'object'
                ? args.section.id
                : args.section,
                }

    return destroy.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CatalogSectionController::destroy
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:80
 * @route '/admin/sections/{section}'
 */
destroy.delete = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\CatalogSectionController::destroy
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:80
 * @route '/admin/sections/{section}'
 */
    const destroyForm = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CatalogSectionController::destroy
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:80
 * @route '/admin/sections/{section}'
 */
        destroyForm.delete = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Admin\CatalogSectionController::reorder
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:87
 * @route '/admin/sections/reorder'
 */
export const reorder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/admin/sections/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CatalogSectionController::reorder
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:87
 * @route '/admin/sections/reorder'
 */
reorder.url = (options?: RouteQueryOptions) => {
    return reorder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CatalogSectionController::reorder
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:87
 * @route '/admin/sections/reorder'
 */
reorder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\CatalogSectionController::reorder
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:87
 * @route '/admin/sections/reorder'
 */
    const reorderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorder.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CatalogSectionController::reorder
 * @see app/Http/Controllers/Admin/CatalogSectionController.php:87
 * @route '/admin/sections/reorder'
 */
        reorderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reorder.url(options),
            method: 'post',
        })
    
    reorder.form = reorderForm
const CatalogSectionController = { index, store, update, destroy, reorder }

export default CatalogSectionController