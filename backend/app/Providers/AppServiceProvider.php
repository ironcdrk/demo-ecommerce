<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use App\Domain\Auth\Repositories\UserRepository;
use App\Domain\Auth\Repositories\AccessTokenRepository;
use App\Domain\Auth\Services\CredentialsVerifier;

use App\Infraestructure\Auth\Repositories\EloquentUserRepository;
use App\Infraestructure\Auth\Repositories\EloquentAccessTokenRepository;
use App\Infraestructure\Auth\Services\EloquentCredentialsVerifier;

use App\Domain\Catalog\Repositories\ProductRepository;
use App\Domain\Orders\Repositories\OrderRepository;
use App\Infraestructure\Catalog\Repositories\EloquentProductRepository;
use App\Infraestructure\Orders\Repositories\EloquentOrderRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepository::class, EloquentUserRepository::class);
        $this->app->bind(AccessTokenRepository::class, EloquentAccessTokenRepository::class);
        $this->app->bind(CredentialsVerifier::class, EloquentCredentialsVerifier::class);
        $this->app->bind(ProductRepository::class, EloquentProductRepository::class);
        $this->app->bind(OrderRepository::class, EloquentOrderRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('login', function (Request $request) {
            return Limit::perMinute(5)->by(
                ((string) $request->input('email')) . '|' . $request->ip()
            );
        });
    }
}
