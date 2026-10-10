<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MusicClass extends Model
{
    protected $fillable = [
        'name',
        'instructor',
        'type',
        'schedule',
        'time',
        'location',
        'capacity',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function enrollments(): HasMany
    {
        return $this->hasMany(MusicClassEnrollment::class);
    }
}