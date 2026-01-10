<?php

namespace App\Domain\Auth\Enums;

enum Role: string
{
    case ADMIN = 'admin';
    case CUSTOMER = 'customer';
}
