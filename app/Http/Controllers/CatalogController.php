<?php

namespace App\Http\Controllers;

use App\Catalog\CatalogLayoutData;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('Catalog', CatalogLayoutData::forInertia());
    }
}
