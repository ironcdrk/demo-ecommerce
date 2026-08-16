<?php

namespace App\Domain\Auth\Repositories;

use App\Domain\Auth\Entities\User;

interface UserRepository
{
    public function existsByEmail(string $email): bool;

    public function findById(int $id): ?User;

    public function findByEmail(string $email): ?User;

    public function getById(int $id): User;

    /**
     * Persiste y retorna la entidad con ID asignado.
     */
    public function save(User $user): User;
}
