<?php

namespace App\Application\Auth\Handlers;

use App\Application\Auth\DTO\RegisterData;
use App\Domain\Auth\Enums\Role;
use App\Domain\Auth\Entities\User;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

final class RegisterHandler
{
     public function __construct(
        private readonly UserRepository $users,
    ) {}
    /**
     * @return array{user: array, token: string, token_type: string}
     *
     * @throws \DomainException
     */
    public function handle(RegisterUserCommand $cmd): AuthResult
    {
        $email = $cmd->email;

        if ($this->users->existsByEmail($email)) {
            throw new \DomainException('REGISTRATION_NOT_PROCESSABLE');
        }

        $passwordHash = Hash::make($cmd->password);

        $user = User::registerNew(
            name: $cmd->name,
            email: $email,
            passwordHash: $passwordHash,
            role: Role::customer
        );

        $saved = $this->users->save($user);

        $userId = $saved->id();
        if (!$userId) {
            throw new \RuntimeException('User persistence failed.');
        }

        $deviceName = $cmd->deviceName ?: 'web';
        $token = $user->createToken($deviceName)->plainTextToken;

        return new AuthResult(
            user: [
                'id' => $userId,
                'name' => $saved->name(),
                'email' => $saved->email()->value(),
                'role' => $saved->role()->value,
                'created_at' => $saved->createdAtIso(),
            ],
            token: $token
        );
    }
}
