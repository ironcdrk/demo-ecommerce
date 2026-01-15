<?php

namespace App\Domain\Auth\Repositories;

use App\Domain\Auth\Entities\User;
use App\Domain\Auth\ValueObjects\Email;

interface UserRepository
{
    public function existsByEmail(Email $email): bool;

    /**
     * Persiste y retorna la entidad con ID asignado.
     */
    public function save(User $user): User;
}
