<?php

namespace App\Infraestructure\Auth\Repositories;

use App\Domain\Auth\Entities\User as DomainUser;
use App\Domain\Auth\Enums\Role;
use App\Domain\Auth\Repositories\UserRepository;
use App\Infraestructure\Auth\Models\User as EloquentUser;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

final class EloquentUserRepository implements UserRepository
{
    public function existsByEmail(string $email): bool
    {
        return EloquentUser::query()
            ->where('email', $email)
            ->exists();
    }

    public function findById(int $id): ?DomainUser
    {
        $eloquent = EloquentUser::query()->find($id);

        return $eloquent ? $this->toDomain($eloquent) : null;
    }

    public function findByEmail(string $email): ?DomainUser
    {
        $eloquent = EloquentUser::query()
            ->where('email', $email)
            ->first();

        return $eloquent ? $this->toDomain($eloquent) : null;
    }

    public function getById(int $id): DomainUser
    {
        $user = $this->findById($id);

        if (!$user) {
            throw new ModelNotFoundException("User with id {$id} not found.");
        }

        return $user;
    }

    public function save(DomainUser $user): DomainUser
    {
        try {
            $eloquent = EloquentUser::query()->create([
                'name' => $user->name(),
                'email' => $user->email(),
                'password' => $user->passwordHash(),
                'role' => $user->role()->value,
            ]);
        } catch (QueryException $e) {
            throw new \DomainException('REGISTRATION_NOT_PROCESSABLE');
        }

        return $this->toDomain($eloquent);
    }

    private function toDomain(EloquentUser $eloquent): DomainUser
    {
        return DomainUser::reconstitute(
            id: $eloquent->id,
            name: $eloquent->name,
            email: $eloquent->email,
            passwordHash: $eloquent->password,
            role: Role::from($eloquent->role),
            createdAtIso: $eloquent->created_at?->toISOString(),
        );
    }
}