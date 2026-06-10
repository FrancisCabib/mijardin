<?php

use App\Catalog\CatalogLayoutData;

test('catalog layout payload has hero and sections', function () {
    $data = CatalogLayoutData::forInertia();

    expect($data)->toHaveKeys(['hero', 'sections']);
    expect($data['hero'])->toHaveKeys([
        'pre_headline',
        'headline',
        'sub_headline',
        'cta_text',
        'cta_url',
    ]);
    expect($data['sections'])->toBeArray();
});
