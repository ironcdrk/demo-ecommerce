<?php

namespace App\Infrastructure\Persistence;

use App\Domain\Auth\Entities\User as DomainUser;
use App\Domain\Auth\Repositories\UserRepository;
use App\Models\User as EloquentUser;
use Illuminate\Database\QueryException;

final class EloquentUserRepository implements UserRepository
{
    public function existsByEmail(string $email): bool
    {
        return EloquentUser::query()->where('email', $email->value())->exists();
    }

    public function save(DomainUser $user): DomainUser
    {
        try {
            $eloquent = EloquentUser::query()->create([
                'name' => $user->name(),
                'email' => $user->email()->value(),
                'password' => $user->passwordHash(),
                'role' => $user->role()->value,
            ]);
        } catch (QueryException $e) {
            throw new \DomainException('REGISTRATION_NOT_PROCESSABLE');
        }

        return $user;
    }
}
