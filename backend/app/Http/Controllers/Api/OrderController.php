<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'customer_name'  => 'required|string|max:255',
            'country'        => 'required|string|max:255',
            'city'           => 'required|string|max:255',
            'card_number'    => 'required|string|max:32',
            'card_month'     => 'required|string|max:2',
            'card_year'      => 'required|string|max:4',
            'items'          => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity'   => 'required|integer|min:1',
        ]);

        return DB::transaction(function () use ($data) {
            $total = 0;
            $itemsData = [];

            foreach ($data['items'] as $item) {
                $product = Product::find($item['product_id']);

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

                // Actualizar stock
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
            ]);

            foreach ($itemsData as $itemData) {
                $itemData['order_id'] = $order->id;
                OrderItem::create($itemData);
            }

            return response()->json([
                'message' => 'Order created successfully',
                'order_id' => $order->id,
                'total' => $order->total,
            ], 201);
        });
    }
}
