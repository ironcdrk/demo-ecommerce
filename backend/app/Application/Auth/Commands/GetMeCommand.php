<?php

namespace App\Application\Auth\Commands;

final class GetMeCommand
{
    public function __construct(
        public readonly int $userId
    ) {}
}
