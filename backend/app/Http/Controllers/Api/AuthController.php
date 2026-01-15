<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Utils\Support\ApiResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use App\Application\Auth\Handlers\RegisterUserHandler;
use App\Application\Auth\Commands\RegisterUserCommand;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        $user = User::query()
            ->where('email', $data['email'])
            ->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return ApiResponse::error([
                [
                    'code' => 'INVALID_CREDENTIALS',
                    'message' => 'Invalid credentials.',
                ]
            ], 401);
        }

        $tokenName = $data['device_name'] ?? 'web';
        $token = $user->createToken($tokenName)->plainTextToken;

        Log::info('auth.login', [
            'user_id' => $user->id,
            'ip' => $request->ip(),
        ]);

        return ApiResponse::success([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function register(RegisterRequest $request, RegisterUserHandler $handler): JsonResponse
    {
        $v = $request->validated();

        try {
            $result = $handler->handle(new RegisterUserCommand(
                name: $v['name'],
                email: $v['email'],
                password: $v['password'],
                deviceName: $v['device_name'] ?? null,
                ip: $request->ip(),
            ));

            return ApiResponse::success([
                'user' => $result->user,
                'token' => $result->token,
                'token_type' => 'Bearer',
            ], meta: [], status: 201);

        } catch (RegistrationNotProcessableException $e) {
            return ApiResponse::error([
                [
                    'code' => 'VALIDATION_ERROR',
                    'message' => 'No se pudo procesar el registro con los datos proporcionados.',
                ]
            ], 422);
        }
    }

}
