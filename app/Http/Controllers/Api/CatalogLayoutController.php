<?php

namespace App\Http\Controllers\Api;

use App\Catalog\CatalogLayoutData;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class CatalogLayoutController extends Controller
{
    public function show(): JsonResponse
    {
        return response()->json(CatalogLayoutData::forApi());
    }
}
