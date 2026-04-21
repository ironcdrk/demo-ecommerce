<?php

namespace App\Domain\Orders\Entities;

class Order
{
    private ?int $id;
    private ?int $userId;

    private string $customerName;
    private string $country;
    private string $city;

    private string $cardNumber;
    private string $cardMonth;
    private string $cardYear;

    /** @var OrderItem[] */
    private array $items = [];

    private float $total = 0;

    public function __construct(
        ?int $id,
        ?int $userId,
        string $customerName,
        string $country,
        string $city,
        string $cardNumber,
        string $cardMonth,
        string $cardYear
    ) {
        $this->id = $id;
        $this->userId = $userId;
        $this->customerName = $customerName;
        $this->country = $country;
        $this->city = $city;
        $this->cardNumber = $cardNumber;
        $this->cardMonth = $cardMonth;
        $this->cardYear = $cardYear;
    }

    public function addItem(OrderItem $item): void
    {
        $this->items[] = $item;
        $this->recalculateTotal();
    }

    private function recalculateTotal(): void
    {
        $this->total = array_reduce(
            $this->items,
            fn ($carry, OrderItem $item) => $carry + $item->subtotal(),
            0
        );
    }

    public function id(): ?int
    {
        return $this->id;
    }

    public function userId(): ?int
    {
        return $this->userId;
    }

    public function customerName(): string
    {
        return $this->customerName;
    }

    public function items(): array
    {
        return $this->items;
    }

    public function total(): float
    {
        return $this->total;
    }
}