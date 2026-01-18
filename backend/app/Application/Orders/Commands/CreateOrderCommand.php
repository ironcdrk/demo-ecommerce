<?php

namespace App\Application\Orders\Commands;

class CreateOrderCommand
{
    public function __construct(
        public readonly int $userId,
        public readonly array $data
    ) {}
}
