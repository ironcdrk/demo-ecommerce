<?php

namespace App\Domain\Auth\Services;

use App\Domain\Auth\Entities\User;

interface CredentialsVerifier
{
    public function verify(User $user, string $plainPassword): bool;
}
