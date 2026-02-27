<?php

namespace App\Domain\Auth\Repositories;

use App\Domain\Auth\Enums\Role;

interface RoleRepository
{
    public function getIdByCode(Role $role): int;
}