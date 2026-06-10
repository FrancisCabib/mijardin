<?php

use App\Http\Controllers\Api\CatalogLayoutController;
use Illuminate\Support\Facades\Route;

Route::get('catalog-layout', [CatalogLayoutController::class, 'show'])
    ->name('api.catalog-layout.show');
