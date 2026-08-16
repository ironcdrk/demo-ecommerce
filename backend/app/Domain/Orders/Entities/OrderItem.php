<?php

namespace App\Domain\Orders\Entities;

class OrderItem
{
    private int $productId;
    private int $quantity;
    private float $price;

    public function __construct(
        int $productId,
        int $quantity,
        float $price
    ) {
        if ($quantity <= 0) {
            throw new \InvalidArgumentException('Quantity must be greater than 0');
        }

        if ($price < 0) {
            throw new \InvalidArgumentException('Price cannot be negative');
        }

        $this->productId = $productId;
        $this->quantity = $quantity;
        $this->price = $price;
    }

    public function productId(): int
    {
        return $this->productId;
    }

    public function quantity(): int
    {
        return $this->quantity;
    }

    public function price(): float
    {
        return $this->price;
    }

    public function subtotal(): float
    {
        return $this->price * $this->quantity;
    }
}