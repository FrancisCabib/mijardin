<?php

use App\Http\Controllers\Admin\CatalogSectionController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\CatalogController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return auth()->check()
        ? redirect()->route('dashboard')
        : redirect()->route('login');
})->name('home');

Route::get('/catalog', [CatalogController::class, 'show'])->name('catalog.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'Dashboard')->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('services', ServiceController::class);
        Route::post('services/reorder', [ServiceController::class, 'reorder'])->name('services.reorder');
        Route::patch('services/{service}/toggle-active', [ServiceController::class, 'toggleActive'])->name('services.toggle-active');
        Route::resource('tags', TagController::class)->except(['show', 'create', 'edit']);
        Route::resource('categories', CategoryController::class)->except(['show', 'create', 'edit']);
        Route::resource('sections', CatalogSectionController::class)->except(['show', 'create', 'edit']);
        Route::post('sections/reorder', [CatalogSectionController::class, 'reorder'])->name('sections.reorder');
    });
});

require __DIR__.'/settings.php';
