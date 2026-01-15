<?php

namespace App\Application\Auth\Handlers;

use App\Application\Auth\DTO\LoginData;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

final class LoginHandler
{
    /**
     * @return array{user: array, token: string, token_type: string}
     *
     * @throws \DomainException
     */
    public function handle(LoginData $data): array
    {
        $user = User::query()
            ->where('email', $data->email)
            ->first();

        if (!$user || !Hash::check($data->password, $user->password)) {
            // No exponemos detalles; el controller lo mapea a 401 con ApiResponse.
            throw new \DomainException('INVALID_CREDENTIALS');
        }

        $tokenName = $data->deviceName ?? 'web';
        $token = $user->createToken($tokenName)->plainTextToken;

        Log::info('auth.login', [
            'user_id' => $user->id,
            'ip' => $data->ip,
        ]);

        return [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'token' => $token,
            'token_type' => 'Bearer',
        ];
    }
}
