<?php

namespace App\Infraestructure\Orders\Repositories;

use App\Domain\Orders\Repositories\OrderRepository;
use App\Infraestructure\Orders\Models\Order as OrderModel;
use App\Infraestructure\Orders\Models\OrderItem as OrderItemModel;
use Illuminate\Support\Facades\DB;

class EloquentOrderRepository implements OrderRepository
{
    /**
     * @param array{
     *  customer_name:string,
     *  country:string,
     *  city:string,
     *  card_number:string,
     *  card_month:string,
     *  card_year:string,
     *  total:int|float,
     *  user_id?:int
     * } $orderData
     *
     * @param array<int, array{product_id:int, quantity:int, price:int|float}> $items
     */
    public function createWithItems(array $orderData, array $items): array
    {
        $order = OrderModel::query()->create([
            'user_id'       => $orderData['user_id'] ?? null,
            'customer_name' => $orderData['customer_name'],
            'country'       => $orderData['country'],
            'city'          => $orderData['city'],
            'card_last_four_numbers'   => $orderData['card_last_four_numbers'],
            'card_month'    => $orderData['card_month'],
            'card_year'     => $orderData['card_year'],
            'total'         => $orderData['total'],
        ]);

        $order->items()->createMany(
            array_map(
                static fn (array $item): array => [
                    'product_id' => $item['product_id'],
                    'quantity'   => $item['quantity'],
                    'price'      => $item['price'],
                ],
                $items
            )
        );

        $order->load('items');

        return [
            'id'            => $order->id,
            'user_id'       => $order->user_id,
            'customer_name' => $order->customer_name,
            'country'       => $order->country,
            'city'          => $order->city,
            'total'         => $order->total,
            'items'         => $order->items->map(
                static fn ($item): array => [
                    'id'         => $item->id,
                    'order_id'   => $item->order_id,
                    'product_id' => $item->product_id,
                    'quantity'   => $item->quantity,
                    'price'      => $item->price,
                ]
            )->toArray(),
            'created_at'    => $order->created_at?->toDateTimeString(),
            'updated_at'    => $order->updated_at?->toDateTimeString(),
        ];
    }
}