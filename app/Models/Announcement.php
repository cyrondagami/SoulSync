<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    protected $fillable = [
        'title',
        'category',
        'description',
        'date',
        'time',
        'priority',
        'icon',
        'published',
    ];

    protected $casts = [
        'date' => 'date',
        'published' => 'boolean',
    ];
}