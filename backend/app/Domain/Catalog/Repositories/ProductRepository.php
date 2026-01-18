<?php

namespace App\Domain\Catalog\Repositories;
use App\Domain\Catalog\Entities\Product;

interface ProductRepository
{
    public function findForUpdate(int $productId): ?Product;

    public function decrementStock(int $productId, int $quantity): void;
}
