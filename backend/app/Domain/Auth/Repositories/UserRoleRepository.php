<?php

namespace App\Domain\Auth\Repositories;

use App\Domain\Auth\Enums\Role;

interface UserRoleRepository
{
    /**
     *
     * @param Role[] $roles
     */
    public function syncRoles(int $userId, array $roles): void;

    public function userHasAnyRole(int $userId, array $roles): bool;
}