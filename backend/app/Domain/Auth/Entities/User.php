<?php

namespace App\Domain\Auth\Entities;

use App\Domain\Auth\Enums\Role;

final class User
{
    private ?int $id = null;

     /**
     * @param Role[] $roles
     */
    private function __construct(
        private string $name,
        private string $email,
        private string $passwordHash,
        private array $roles,
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

        return new self($name, $email, $passwordHash, [$role]);
    }

    public function id(): ?int { return $this->id; }
    public function name(): string { return $this->name; }
    public function email(): string { return $this->email; }
    public function passwordHash(): string { return $this->passwordHash; }
    public function role(): Role { return $this->roles[0] ?? Role::CUSTOMER; }
    public function createdAtIso(): ?string { return $this->createdAtIso; }

    /** @return Role[] */
    public function roles(): array { return $this->roles; }

    public function hasRole(Role $role): bool
    {
        foreach ($this->roles as $r) {
            if ($r === $role) return true;
        }
        return false;
    }

    public static function reconstitute(
        int $id,
        string $name,
        string $email,
        string $passwordHash,
        Role $role,
        ?string $createdAtIso = null,
    ): self {
        $self = new self($name, $email, $passwordHash, [$role], $createdAtIso);
        $self->id = $id;
        return $self;
    }
}
