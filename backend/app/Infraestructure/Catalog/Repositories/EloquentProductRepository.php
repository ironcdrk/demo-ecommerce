<?php

namespace App\Infraestructure\Catalog\Repositories;

use App\Domain\Catalog\Entities\Product as DomainProduct;
use App\Domain\Catalog\Repositories\ProductRepository;
use App\Infraestructure\Catalog\Models\ProductModel;

final class EloquentProductRepository implements ProductRepository
{
    public function findForUpdate(int $productId): ?DomainProduct
    {
        $m = ProductModel::query()
            ->select(['id','name','price','stock'])
            ->whereKey($productId)
            ->lockForUpdate()
            ->first();

        return $m
            ? new DomainProduct((int)$m->id, (string)$m->name, (float)$m->price, (int)$m->stock)
            : null;
    }

    public function save(DomainProduct $product): void
    {
        ProductModel::query()
            ->whereKey($product->id)
            ->update(['stock' => $product->stock()]);
    }
}
