<?php

namespace App\Domain\Orders\Repositories;

interface OrderRepository
{
    /**
     * @param array{
     *  customer_name:string,
     *  country:string,
     *  city:string,
     *  card_last_four:string,
     *  card_month:string,
     *  card_year:string,
     *  total:int|float,
     *  user_id?:int
     * } $orderData
     *
     * @param array<int, array{product_id:int, quantity:int, price:int|float}> $items
     */
    public function createWithItems(array $orderData, array $items): array;
}
