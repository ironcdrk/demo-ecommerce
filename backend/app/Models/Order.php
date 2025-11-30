<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'customer_name',
        'country',
        'city',
        'card_number',
        'card_month',
        'card_year',
        'total',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
