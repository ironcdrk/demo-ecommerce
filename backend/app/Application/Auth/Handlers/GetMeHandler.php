<?php

namespace App\Application\Auth\Handlers;

use App\Application\Auth\Commands\GetMeCommand;
use App\Domain\Auth\Repositories\UserRepository;

final class GetMeHandler
{
    public function __construct(
        private readonly UserRepository $users
    ) {}

    public function handle(GetMeCommand $cmd): array
    {
        $user = $this->users->getById($cmd->userId);

        return [
            'id' => $user->id()->value(),
            'name' => $user->name()->value(),
            'email' => (string) $user->email(),
            'role' => $user->role()->value(),
        ];
    }
}
