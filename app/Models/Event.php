<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title',
        'category',
        'description',
        'date',
        'time',
        'location',
        'organizer',
        'capacity',
        'attendees',
        'status',
        'icon',
        'featured',
    ];

    protected $casts = [
        'date' => 'date',
        'featured' => 'boolean',
    ];
}