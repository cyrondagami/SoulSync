<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserNotification extends Model
{
    protected $fillable = ['user_id', 'title', 'message', 'type', 'read_at'];

    protected function casts(): array
    {
        return ['read_at' => 'datetime'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function send(int $userId, string $title, string $message, ?string $type = null): self
    {
        return static::create([
            'user_id' => $userId,
            'title'   => $title,
            'message' => $message,
            'type'    => $type,
        ]);
    }

    /**
     * Send the same notification to every non-admin member.
     */
    public static function sendToMembers(string $title, string $message, ?string $type = null): void
    {
        $now = now();

        $rows = User::query()
            ->where(function ($q) {
                $q->where('role', '!=', 'admin')->orWhereNull('role');
            })
            ->pluck('id')
            ->map(fn ($id) => [
                'user_id'    => $id,
                'title'      => $title,
                'message'    => $message,
                'type'       => $type,
                'created_at' => $now,
                'updated_at' => $now,
            ])
            ->all();

        if (! empty($rows)) {
            static::insert($rows);
        }
    }
}