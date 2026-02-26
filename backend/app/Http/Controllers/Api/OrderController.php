<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Application\Orders\Commands\CreateOrderCommand;
use App\Application\Orders\Handlers\CreateOrderHandler;
use App\Domain\Catalog\Exceptions\InsufficientStockException;
use App\Domain\Catalog\Exceptions\ProductNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $userId = (int) $request->user()->id;

        $orders = Order::query()
            ->where('user_id', $userId)
            ->with('items')            
            ->latest()
            ->paginate(10);

        return response()->json($orders);
    }

    public function show(Request $request, Order $order)
    {
        $userId = (int) $request->user()->id;

        if ((int) $order->user_id !== $userId) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $order->load('items.product');

        return response()->json($order);
    }

    public function store(Request $request, CreateOrderHandler $handler)
    {
        $data = $request->validate([
            'customer_name'  => 'required|string|max:255',
            'country'        => 'required|string|max:255',
            'city'           => 'required|string|max:255',
            'card_number'    => 'required|string|max:32',
            'card_month'     => 'required|string|max:2',
            'card_year'      => 'required|string|max:4',
            'items'          => 'required|array|min:1',
            'items.*.product_id' => 'required|integer',
            'items.*.quantity'   => 'required|integer|min:1',
        ]);

        $command = new CreateOrderCommand(
            userId: (int) $request->user()->id,
            customerName: $data['customer_name'],
            country: $data['country'],
            city: $data['city'],
            cardNumber: $data['card_number'],
            cardMonth: $data['card_month'],
            cardYear: $data['card_year'],
            items: $data['items'],
        );

        try {
            $result = $handler->handle($command);
        } catch (ProductNotFoundException $e) {
            throw ValidationException::withMessages([
                'items' => ["Product not found: {$e->productId}"],
            ]);
        } catch (InsufficientStockException $e) {
            throw ValidationException::withMessages([
                'items' => ["Not enough stock for product {$e->productName}"],
            ]);
        }

        return response()->json([
            'message' => 'Order created successfully',
            'order_id' => $result['order_id'],
            'total' => $result['total'],
        ], 201);
    }
}
