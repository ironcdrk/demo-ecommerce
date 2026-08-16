<?php

namespace App\Infraestructure\Auth\Services;

use App\Domain\Auth\Entities\User as DomainUser;
use App\Domain\Auth\Services\CredentialsVerifier;
use App\Infraestructure\Auth\Models\User as UserModel;
use Illuminate\Support\Facades\Hash;

final class EloquentCredentialsVerifier implements CredentialsVerifier
{
    public function verify(DomainUser $user, string $plainPassword): bool
    {
        $model = UserModel::query()->whereKey($user->id())->first();

        if (!$model) {
            return false;
        }

        return Hash::check($plainPassword, $model->password);
    }
}
