<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Utils\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Application\Auth\Handlers\LoginHandler;
use App\Application\Auth\Handlers\RegisterUserHandler;
use App\Application\Auth\Handlers\LogoutHandler;
use App\Application\Auth\Handlers\RefreshTokenHandler;

use App\Application\Auth\Commands\RegisterUserCommand;
use App\Application\Auth\Commands\LogoutCommand;
use App\Application\Auth\Commands\RefreshTokenCommand;

use App\Application\Auth\DTO\LoginData;

use App\Domain\Auth\Repositories\UserRepository;
use App\Domain\Auth\Repositories\AccessTokenRepository; 

final class AuthController extends Controller
{
    public function login(LoginRequest $request, LoginHandler $handler): JsonResponse
    {
        $v = $request->validated();

        try {
            $result = $handler->handle(new LoginCommand(
                email: $v['email'],
                password: $v['password'],
                deviceName: $v['device_name'] ?? null,
                ip: $request->ip(),
            ));

            return ApiResponse::success($result);

        } catch (\DomainException $e) {
            if ($e->getMessage() === 'INVALID_CREDENTIALS') {
                return ApiResponse::error([
                    ['code' => 'INVALID_CREDENTIALS', 'message' => 'Invalid credentials.']
                ], 401);
            }

            return ApiResponse::error([
                ['code' => 'AUTH_ERROR', 'message' => 'Authentication failed.']
            ], 401);
        }
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

        } catch (\Throwable $e) {
            return ApiResponse::error([
                [
                    'code' => 'VALIDATION_ERROR',
                    'message' => 'No se pudo procesar el registro con los datos proporcionados.',
                ]
            ], 422);
        }
    }

    public function me(Request $request, UserRepository $users): JsonResponse
    {
        $userId = (int) $request->user()->id;
        $user = $users->getById($userId);

        return ApiResponse::success([
            'user' => [
                'id' => $user->id(),       
                'name' => $user->name(),
                'email' => $user->email(), 
                'role' => $user->role()->value,
            ],
        ]);
    }

    public function logout(Request $request, LogoutHandler $handler): JsonResponse
    {
        $handler->handle(new LogoutCommand(
            userId: (int) $request->user()->id,
            tokenId: $request->user()->currentAccessToken()?->id,
            ip: $request->ip(),
        ));

        return ApiResponse::success(['message' => 'Logged out.']);
    }

    public function refresh(Request $request, RefreshTokenHandler $handler): JsonResponse
    {
        $newToken = $handler->handle(new RefreshTokenCommand(
            userId: (int) $request->user()->id,
            currentTokenId: $request->user()->currentAccessToken()?->id,
            deviceName: $request->header('X-Device-Name') ?? 'web',
            ip: $request->ip(),
        ));

        return ApiResponse::success([
            'token' => $newToken,
            'token_type' => 'Bearer',
        ]);
    }
}
