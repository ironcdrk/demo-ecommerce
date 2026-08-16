<?php

namespace App\Application\Auth\Commands;

final class LogoutCommand
{
    public function __construct(
        public readonly int $userId,
        public readonly ?int $tokenId,
        public readonly string $ip,
    ) {}
}
