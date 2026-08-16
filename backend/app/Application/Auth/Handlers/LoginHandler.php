<?php

namespace App\Application\Auth\Handlers;

use App\Application\Auth\Commands\LoginCommand;
use App\Domain\Auth\Repositories\AccessTokenRepository;
use App\Domain\Auth\Repositories\UserRepository;
use App\Domain\Auth\Services\CredentialsVerifier;
use Illuminate\Support\Facades\Log;

final class LoginHandler
{
    public function __construct(
        private readonly UserRepository $users,
        private readonly AccessTokenRepository $tokens,
        private readonly CredentialsVerifier $verifier,
    ) {}

    /**
     * @return array{user: array, token: string, token_type: string}
     */
    public function handle(LoginCommand $cmd): array
    {
        $user = $this->users->findByEmail($cmd->email);

        if (!$user || !$this->verifier->verify($user, $cmd->password)) {
            throw new \DomainException('INVALID_CREDENTIALS');
        }

        $userId = $user->id();
        if (!$userId) {
            throw new \DomainException('USER_NOT_PERSISTED');
        }

        $tokenName = $cmd->deviceName ?? 'web';
        $token = $this->tokens->createForUser($userId, $tokenName);

        Log::info('auth.login', [
            'user_id' => $userId,
            'ip' => $cmd->ip,
        ]);

        return [
            'user' => [
                'id' => $userId,
                'name' => $user->name(),
                'email' => $user->email(),
                'role' => $user->role()->value,
            ],
            'token' => $token,
            'token_type' => 'Bearer',
        ];
    }
}
