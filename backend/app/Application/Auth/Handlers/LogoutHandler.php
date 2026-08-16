<?php

namespace App\Application\Auth\Handlers;

use App\Application\Auth\Commands\LogoutCommand;
use App\Domain\Auth\Repositories\AccessTokenRepository;
use Illuminate\Support\Facades\Log;

final class LogoutHandler
{
    public function __construct(
        private readonly AccessTokenRepository $tokens
    ) {}

    public function handle(LogoutCommand $cmd): void
    {
        if ($cmd->tokenId) {
            $this->tokens->revokeById($cmd->tokenId);
        }

        Log::info('auth.logout', [
            'user_id' => $cmd->userId,
            'ip' => $cmd->ip,
        ]);
    }
}
