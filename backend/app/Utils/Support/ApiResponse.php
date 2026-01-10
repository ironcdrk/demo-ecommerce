<?php

namespace App\Utils\Support;

use Illuminate\Http\JsonResponse;

class ApiResponse
{
    public static function success(mixed $data = null, array $meta = [], int $status = 200): JsonResponse
    {
        $payload = [
            'success' => true,
            'data' => $data,
            'errors' => [],
        ];

        if (!empty($meta)) {
            $payload['meta'] = $meta;
        }

        return response()->json($payload, $status);
    }

    public static function error(array $errors, int $status, array $meta = []): JsonResponse
    {
        $payload = [
            'success' => false,
            'data' => null,
            'errors' => $errors,
        ];

        if (!empty($meta)) {
            $payload['meta'] = $meta;
        }

        return response()->json($payload, $status);
    }
}
