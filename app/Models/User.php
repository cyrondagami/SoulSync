<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string $role
 * @property string|null $age_group
 * @property string|null $profile_photo
 * @property string|null $contact_number
 * @property string|null $full_name
 * @property Carbon|null $birthdate
 * @property string|null $gender
 * @property string|null $address
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'name',
    'email',
    'password',
    'role',
    'age_group',
    'profile_photo',
    'contact_number',
    'full_name',
    'birthdate',
    'gender',
    'address',
])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    public function pointRewards(): HasMany
    {
        return $this->hasMany(UserPoint::class);
    }

    public function lifetimePoints(): int
    {
        return (int) $this->pointRewards()->sum('points');
    }

    public function weeklyPointsFor(?Carbon $weekStart = null): int
    {
        $weekStart = $weekStart ? Carbon::parse($weekStart)->startOfWeek() : now()->startOfWeek();
        $weekEnd = $weekStart->copy()->endOfWeek();

        return (int) $this->pointRewards()
            ->whereBetween('awarded_at', [$weekStart, $weekEnd])
            ->sum('points');
    }

    public function weeklyRankFor(?Carbon $weekStart = null): ?int
    {
        $leaderboard = UserPoint::leaderboardForWeek($weekStart);

        return $leaderboard->firstWhere('user_id', $this->id)['rank'] ?? null;
    }

    public function getLifetimePointsAttribute(): int
    {
        return $this->lifetimePoints();
    }

    public function getWeeklyPointsAttribute(): int
    {
        return $this->weeklyPointsFor();
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'birthdate' => 'date:Y-m-d',
        ];
    }
}