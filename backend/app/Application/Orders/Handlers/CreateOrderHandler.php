<?php

namespace App\Application\Orders\Handlers;

use App\Application\Orders\Commands\CreateOrderCommand;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CreateOrderHandler
{
    public function handle(CreateOrderCommand $command): array
    {
        $data = $command->data;

        return DB::transaction(function () use ($data, $command) {
            $total = 0;
            $itemsData = [];

            foreach ($data['items'] as $item) {
                $product = Product::whereKey($item['product_id'])
                    ->lockForUpdate()
                    ->first();

                if (!$product) {
                    throw ValidationException::withMessages([
                        'items' => ['Product not found: ' . $item['product_id']],
                    ]);
                }

                if ($product->stock < $item['quantity']) {
                    throw ValidationException::withMessages([
                        'items' => ["Not enough stock for product {$product->name}"],
                    ]);
                }

                $lineTotal = $product->price * $item['quantity'];
                $total += $lineTotal;

                $itemsData[] = [
                    'product_id' => $product->id,
                    'quantity'   => $item['quantity'],
                    'price'      => $product->price,
                ];

                $product->decrement('stock', $item['quantity']);
            }

            $order = Order::create([
                'customer_name' => $data['customer_name'],
                'country'       => $data['country'],
                'city'          => $data['city'],
                'card_number'   => $data['card_number'],
                'card_month'    => $data['card_month'],
                'card_year'     => $data['card_year'],
                'total'         => $total,
                'user_id' => $command->userId,
            ]);

            foreach ($itemsData as $itemData) {
                $itemData['order_id'] = $order->id;
                OrderItem::create($itemData);
            }

            return [
                'order_id' => $order->id,
                'total' => $order->total,
            ];
        });
    }
}
