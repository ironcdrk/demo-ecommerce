<?php

namespace App\Domain\Catalog\Exceptions;

use RuntimeException;

final class InsufficientStockException extends RuntimeException
{
    public function __construct(public readonly int $productId, public readonly string $productName)
    {
        parent::__construct("Not enough stock for product {$productName}");
    }
}
