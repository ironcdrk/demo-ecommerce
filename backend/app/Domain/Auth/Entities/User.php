<?php

namespace App\Domain\Auth\Entities;

use App\Domain\Auth\Enums\Role;

final class User
{
    private ?int $id = null;

    private function __construct(
        private string $name,
        private string $email,
        private string $passwordHash,
        private Role $role,
        private ?string $createdAtIso = null,
    ) {}

    public static function registerNew(string $name, string $email, string $passwordHash, Role $role): self
    {
        $name = trim($name);
        if ($name === '' || (strlen($name) < 5 || strlen($name) > 120)) {
            throw new \InvalidArgumentException('Invalid name.');
        }

        if ($passwordHash === '') {
            throw new \InvalidArgumentException('Invalid password hash.');
        }

        return new self($name, $email, $passwordHash, $role);
    }

    public function id(): ?int { return $this->id; }
    public function name(): string { return $this->name; }
    public function email(): string { return $this->email; }
    public function passwordHash(): string { return $this->passwordHash; }
    public function role(): Role { return $this->role; }
    public function createdAtIso(): ?string { return $this->createdAtIso; }
}
