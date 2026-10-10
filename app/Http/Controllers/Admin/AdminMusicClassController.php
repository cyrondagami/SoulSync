<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MusicClass;
use App\Models\MusicClassEnrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminMusicClassController extends Controller
{
    public function index()
    {
        $classes = MusicClass::with(['enrollments.user:id,name,email'])
            ->orderBy('id')
            ->get()
            ->map(function ($c) {
                $approved = $c->enrollments->where('status', 'approved')->count();

                return [
                    'id'            => $c->id,
                    'name'          => $c->name,
                    'instructor'    => $c->instructor,
                    'type'          => $c->type,
                    'schedule'      => $c->schedule,
                    'time'          => $c->time,
                    'location'      => $c->location,
                    'capacity'      => $c->capacity,
                    'students'      => $approved,
                    'pending_count' => $c->enrollments->where('status', 'pending')->count(),
                    'enrollments'   => $c->enrollments
                        ->sortByDesc('created_at')
                        ->values()
                        ->map(fn ($e) => [
                            'id'        => $e->id,
                            'status'    => $e->status,
                            'name'      => $e->user?->name,
                            'email'     => $e->user?->email,
                            'requested' => $e->created_at->diffForHumans(),
                        ]),
                ];
            });

        return Inertia::render('Admin/MusicClasses', ['classes' => $classes]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'       => 'required|string|max:255',
            'instructor' => 'required|string|max:255',
            'type'       => 'required|string|max:50',
            'schedule'   => 'required|string|max:20',
            'time'       => 'required|string|max:50',
            'location'   => 'nullable|string|max:255',
            'capacity'   => 'nullable|integer|min:1|max:200',
        ]);

        $data['location'] = $data['location'] ?: 'Music Room';
        $data['capacity'] = $data['capacity'] ?? 15;

        MusicClass::create($data);

        return back()->with('success', 'Music class added.');
    }

    public function destroy(MusicClass $musicClass)
    {
        $musicClass->delete();

        return back()->with('success', 'Music class deleted.');
    }

    public function approve(MusicClassEnrollment $enrollment)
    {
        $class = $enrollment->musicClass;

        $approved = $class->enrollments()->where('status', 'approved')->count();

        if ($enrollment->status !== 'approved' && $approved >= $class->capacity) {
            return back()->with('error', 'This class is already full.');
        }

        $enrollment->update([
            'status'      => 'approved',
            'reviewed_by' => auth()->id(),
            'reviewed_at' => now(),
        ]);

        return back()->with('success', 'Request approved.');
    }

    public function reject(MusicClassEnrollment $enrollment)
    {
        $enrollment->update([
            'status'      => 'rejected',
            'reviewed_by' => auth()->id(),
            'reviewed_at' => now(),
        ]);

        return back()->with('success', 'Request rejected.');
    }
}