<?php

namespace App\Domain\Catalog\Entities;

use App\Domain\Catalog\Exceptions\InsufficientStockException;

final class Product
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly float $price,
        private int $stock,
    ) {}

    public function stock(): int
    {
        return $this->stock;
    }

    public function assertHasStock(int $qty): void
    {
        if ($qty <= 0) {
            throw new \InvalidArgumentException('Quantity must be >= 1');
        }

        if ($this->stock < $qty) {
            throw new InsufficientStockException($this->id, $this->name, $this->stock, $qty);
        }
    }

    public function decreaseStock(int $qty): void
    {
        $this->assertHasStock($qty);
        $this->stock -= $qty;
    }
}
