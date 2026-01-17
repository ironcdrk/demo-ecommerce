<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use App\Domain\Auth\Repositories\UserRepository;
use App\Domain\Auth\Repositories\AccessTokenRepository;
use App\Domain\Auth\Services\CredentialsVerifier;

use App\Infrastructure\Auth\Repositories\EloquentUserRepository;
use App\Infrastructure\Auth\Repositories\EloquentAccessTokenRepository;
use App\Infrastructure\Auth\Services\EloquentCredentialsVerifier;

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
