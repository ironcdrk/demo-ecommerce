<?php

namespace App\Application\Orders\Handlers;

use App\Application\Orders\Commands\CreateOrderCommand;
use App\Domain\Catalog\Exceptions\InsufficientStockException;
use App\Domain\Catalog\Exceptions\ProductNotFoundException;
use App\Domain\Catalog\Repositories\ProductRepository;
use App\Domain\Orders\Repositories\OrderRepository;
use Illuminate\Support\Facades\DB;

final class CreateOrderHandler
{
    public function __construct(
        private readonly ProductRepository $products,
        private readonly OrderRepository $orders,
    ) {}

    public function handle(CreateOrderCommand $command): array
    {
        return DB::transaction(function () use ($command) {

            $total = 0.0;
            $itemsForOrder = [];

            foreach ($command->items as $item) {
                $product = $this->products->findForUpdate((int) $item['product_id']);

                if (!$product) {
                    throw new ProductNotFoundException((int) $item['product_id']);
                }

                $qty = (int) $item['quantity'];

                if ($product['stock'] < $qty) {
                    throw new InsufficientStockException($product['id'], $product['name']);
                }

                $lineTotal = $product['price'] * $qty;
                $total += $lineTotal;

                $itemsForOrder[] = [
                    'product_id' => $product['id'],
                    'quantity' => $qty,
                    'price' => $product['price'],
                ];

                $this->products->decrementStock($product['id'], $qty);
            }

            $orderData = [
                'customer_name' => $command->customerName,
                'country' => $command->country,
                'city' => $command->city,
                'card_number' => $command->cardNumber,
                'card_month' => $command->cardMonth,
                'card_year' => $command->cardYear,
                'total' => $total,

                // Si ya agregas user_id en orders:
                // 'user_id' => $command->userId,
            ];

            return $this->orders->createWithItems($orderData, $itemsForOrder);
        });
    }
}
