<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MusicClass;
use App\Models\MusicClassEnrollment;
use App\Models\UserNotification;
use App\Services\PointRewardService;
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
                            'id'                    => $e->id,
                            'status'                => $e->status,
                            'name'                  => $e->user?->name,
                            'email'                 => $e->user?->email,
                            'requested'             => $e->created_at->diffForHumans(),
                            'completed_at'          => $e->completed_at?->toISOString(),
                            'attendance_confirmed' => ! is_null($e->completed_at),
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

    $wasApproved = $enrollment->status === 'approved';

    $enrollment->update([
        'status'      => 'approved',
        'reviewed_by' => auth()->id(),
        'reviewed_at' => now(),
    ]);

    if (! $wasApproved) {
        UserNotification::send(
            $enrollment->user_id,
            'Music class approved',
            "Your request to join {$class->name} has been approved by the admin.",
            'music_class'
        );
    }

    return back()->with('success', 'Request approved.');
}

   public function reject(MusicClassEnrollment $enrollment)
{
    $enrollment->update([
        'status'      => 'rejected',
        'reviewed_by' => auth()->id(),
        'reviewed_at' => now(),
    ]);

    UserNotification::send(
        $enrollment->user_id,
        'Music class request declined',
        "Your request to join {$enrollment->musicClass->name} was declined by the admin.",
        'music_class'
    );

    return back()->with('success', 'Request rejected.');
}

  public function complete(MusicClassEnrollment $enrollment)
{
    if ($enrollment->status !== 'approved') {
        return back()->withErrors([
            'enrollment' => 'Only approved enrollments can be marked as completed.',
        ]);
    }

    $awarded = app(PointRewardService::class)->awardMusicClassCompletion($enrollment);

    if (! $awarded) {
        return back()->withErrors([
            'enrollment' => 'This class completion was already marked.',
        ]);
    }

    UserNotification::send(
        $enrollment->user_id,
        '+10 Points Earned',
        "You completed {$enrollment->musicClass->name} and earned 10 points.",
        'points'
    );

    return back()->with('success', 'Class completed. 10 points earned.');
}
}