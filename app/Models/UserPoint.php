<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserPoint extends Model
{
    protected $fillable = [
        'user_id',
        'points',
        'source_type',
        'source_id',
        'activity_type',
        'activity_id',
        'description',
        'awarded_at',
    ];

    protected $casts = [
        'points' => 'integer',
        'awarded_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

   public static function leaderboardForWeek(?Carbon $weekStart = null): \Illuminate\Support\Collection
    {
        $weekStart = $weekStart ? Carbon::parse($weekStart)->startOfWeek() : now()->startOfWeek();
        $weekEnd = $weekStart->copy()->endOfWeek();

        $records = static::with('user:id,name')->whereBetween('awarded_at', [$weekStart, $weekEnd])->get();

        $entries = $records->groupBy('user_id')->map(function ($items, $userId) {
            $user = $items->first()->user;

            return [
                'user_id' => (int) $userId,
                'name' => $user?->name ?? 'Unknown User',
                'events_attended' => $items->where('activity_type', 'event')->count(),
                'music_classes_completed' => $items->where('activity_type', 'music_class')->count(),
                'activities_completed' => $items->count(),
                'weekly_points' => (int) $items->sum('points'),
            ];
        })->sortByDesc('weekly_points')->values();

        $rank = 1;
        $lastPoints = null;

        $ranked = $entries->map(function ($entry, $index) use (&$rank, &$lastPoints) {
            if ($lastPoints !== null && $entry['weekly_points'] !== $lastPoints) {
                $rank = $index + 1;
            }

            $entry['rank'] = $rank;
            $lastPoints = $entry['weekly_points'];

            return $entry;
        });

        return $ranked;
    }
}
