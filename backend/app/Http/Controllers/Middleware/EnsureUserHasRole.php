<?php

namespace App\Http\Middleware;

use App\Utils\Support\ApiResponse;
use Closure;
use Illuminate\Http\Request;

class EnsureUserHasRole
{
    public function handle(Request $request, Closure $next, string ...$roles)
    {
        $user = $request->user();

        if (!$user) {
            return ApiResponse::error([
                ['code' => 'UNAUTHENTICATED', 'message' => 'Authentication required.']
            ], 401);
        }

        if (!in_array($user->role, $roles, true)) {
            return ApiResponse::error([
                ['code' => 'FORBIDDEN', 'message' => 'You do not have permission to perform this action.']
            ], 403);
        }

        return $next($request);
    }
}
