<?php

namespace App\Domain\Catalog\Exceptions;

use RuntimeException;

final class ProductNotFoundException extends RuntimeException
{
    public function __construct(public readonly int $productId)
    {
        parent::__construct("Product not found: {$productId}");
    }
}
