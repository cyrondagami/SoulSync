<?php

namespace App\Http\Controllers;

use App\Models\MusicClass;
use App\Models\MusicClassEnrollment;
use Inertia\Inertia;

class MusicClassController extends Controller
{
    public function index()
    {
        $mine = MusicClassEnrollment::where('user_id', auth()->id())
            ->pluck('status', 'music_class_id');

        $classes = MusicClass::where('is_active', true)
            ->withCount([
                'enrollments as approved_count' => fn ($q) => $q->where('status', 'approved'),
            ])
            ->orderBy('id')
            ->get()
            ->map(fn ($c) => [
                'id'             => $c->id,
                'name'           => $c->name,
                'instructor'     => $c->instructor,
                'type'           => $c->type,
                'schedule'       => $c->schedule,
                'time'           => $c->time,
                'location'       => $c->location,
                'capacity'       => $c->capacity,
                'approved_count' => $c->approved_count,
                'is_full'        => $c->approved_count >= $c->capacity,
                'my_status'      => $mine[$c->id] ?? null,
            ]);

        return Inertia::render('MusicClasses', ['classes' => $classes]);
    }

    public function join(MusicClass $musicClass)
    {
        abort_unless($musicClass->is_active, 404);

        $existing = MusicClassEnrollment::where('music_class_id', $musicClass->id)
            ->where('user_id', auth()->id())
            ->first();

        if ($existing && in_array($existing->status, ['pending', 'approved'])) {
            return back()->with('error', 'You already have a request for this class.');
        }

        $approved = $musicClass->enrollments()->where('status', 'approved')->count();

        if ($approved >= $musicClass->capacity) {
            return back()->with('error', 'Sorry, this class is already full.');
        }

        MusicClassEnrollment::updateOrCreate(
            [
                'music_class_id' => $musicClass->id,
                'user_id'        => auth()->id(),
            ],
            [
                'status'      => 'pending',
                'reviewed_by' => null,
                'reviewed_at' => null,
            ]
        );

        return back()->with('success', 'Request sent! Please wait for admin approval.');
    }

    public function cancel(MusicClass $musicClass)
    {
        MusicClassEnrollment::where('music_class_id', $musicClass->id)
            ->where('user_id', auth()->id())
            ->delete();

        return back()->with('success', 'Your request has been cancelled.');
    }
}