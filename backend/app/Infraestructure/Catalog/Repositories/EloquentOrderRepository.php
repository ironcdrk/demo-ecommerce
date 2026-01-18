<?php

namespace App\Infrastructure\Orders\Repositories;

use App\Domain\Orders\Repositories\OrderRepository;
use App\Infrastructure\Orders\Models\OrderModel;
use App\Infrastructure\Orders\Models\OrderItemModel;

final class EloquentOrderRepository implements OrderRepository
{
    public function createWithItems(array $orderData, array $items): array
    {
        $order = OrderModel::create($orderData);

        foreach ($items as $item) {
            OrderItemModel::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        return [
            'order_id' => (int) $order->id,
            'total' => (float) $order->total,
        ];
    }
}
