<?php

namespace App\Application\Auth\Commands;

final class LoginCommand
{
    public function __construct(
        public readonly string $email,
        public readonly string $password,
        public readonly ?string $deviceName,
        public readonly string $ip,
    ) {}
}
