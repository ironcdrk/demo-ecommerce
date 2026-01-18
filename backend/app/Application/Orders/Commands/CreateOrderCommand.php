<?php

namespace App\Application\Orders\Commands;

final class CreateOrderCommand
{
    /**
     * @param array<int, array{product_id:int, quantity:int}> $items
     */
    public function __construct(
        public readonly int $userId,
        public readonly string $customerName,
        public readonly string $country,
        public readonly string $city,
        public readonly string $cardNumber,
        public readonly string $cardMonth,
        public readonly string $cardYear,
        public readonly array $items,
    ) {}
}
