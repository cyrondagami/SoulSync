<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventRegistration;
use App\Models\UserNotification;
use App\Services\PointRewardService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        // All user columns except sensitive ones
        $hidden = [
            'password', 'remember_token', 'email_verified_at',
            'two_factor_secret', 'two_factor_recovery_codes',
            'two_factor_confirmed_at', 'created_at', 'updated_at',
        ];

        $userColumns = array_values(
            array_diff(Schema::getColumnListing('users'), $hidden)
        );

        // event_id => registrations (with full member info)
        $registrations = EventRegistration::with('user:' . implode(',', $userColumns))
            ->latest()
            ->get()
            ->groupBy('event_id');

        $events = Event::latest('date')
            ->get()
            ->map(function ($event) use ($registrations, $userColumns) {
                $list = $registrations->get($event->id, collect());

                return array_merge($event->toArray(), [
                    'date' => Carbon::parse($event->date)->format('Y-m-d'),
                    'requires_approval' => (bool) ($event->requires_approval ?? false),

                    'attendees' => $list->where('status', 'approved')->count(),
                    'pending_count' => $list->where('status', 'pending')->count(),
                    'registrations_count' => $list->count(),

                    'registrations' => $list->map(fn ($r) => [
                        'id' => $r->id,
                        'status' => $r->status,
                        'decline_reason' => $r->decline_reason,
                        'created_at' => $r->created_at?->toISOString(),
                        'requested_at' => $r->created_at?->format('M d, Y h:i A'),
                        'user' => $r->user
                            ? $r->user->only($userColumns)
                            : ['id' => null, 'name' => 'Deleted user', 'email' => null],
                    ])->values(),
                ]);
            })
            ->values();

        return Inertia::render('Admin/Events', [
            'events' => $events,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'description' => 'nullable|string',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required|string|max:100',
            'location' => 'required|string|max:255',
            'organizer' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'status' => 'required|string|max:100',
            'icon' => 'nullable|string|max:20',
            'featured' => 'boolean',
            'requires_approval' => 'sometimes|boolean',
        ], [
            'date.after_or_equal' => 'The event date cannot be in the past. Please choose today or a future date.',
        ]);

        $validated['attendees'] = 0;

        $requiresApproval = $validated['requires_approval'] ?? null;
        unset($validated['requires_approval']);

        $event = Event::create($validated);

        if ($requiresApproval !== null) {
            $event->forceFill(['requires_approval' => (bool) $requiresApproval])->save();
        }

        UserNotification::sendToMembers(
            'New event: ' . $event->title,
            $event->title . ' is scheduled on ' . Carbon::parse($event->date)->format('M d, Y')
                . ' at ' . $event->location . '. Check the Events page to join.',
            'event'
        );

        return redirect()
            ->route('admin.events')
            ->with('success', 'Event created successfully.');
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return redirect()
            ->route('admin.events')
            ->with('success', 'Event deleted successfully.');
    }

    /**
     * Approve a member's request to join.
     */
    public function approveRegistration(EventRegistration $registration): RedirectResponse
    {
        $event = $registration->event;

        $wasApproved = $registration->status === 'approved';

        if (! $wasApproved) {
            $capacity = (int) ($event->capacity ?? 100);

            $approved = EventRegistration::where('event_id', $event->id)
                ->where('status', 'approved')
                ->count();

            if ($capacity > 0 && $approved >= $capacity) {
                return back()->withErrors([
                    'registration' => 'This event is already full.',
                ]);
            }
        }

        // Approving clears any old decline reason
        $registration->forceFill([
            'status' => 'approved',
            'decline_reason' => null,
        ])->save();

        if (! $wasApproved) {
            UserNotification::send(
                $registration->user_id,
                'Event registration approved',
                "Your registration for {$event->title} has been approved by the admin.",
                'event'
            );
        }

        return back()->with('success', 'Request approved.');
    }

    /**
     * Decline a member's request to join (with a reason the member can see).
     */
    public function rejectRegistration(Request $request, EventRegistration $registration): RedirectResponse
    {
        $validated = $request->validate([
            'reason' => ['required', 'string', 'max:500'],
        ], [
            'reason.required' => 'Please write the reason for declining.',
        ]);

        $registration->forceFill([
            'status' => 'rejected',
            'decline_reason' => trim($validated['reason']),
        ])->save();

        UserNotification::send(
            $registration->user_id,
            'Event registration declined',
            "Your registration for {$registration->event->title} was declined. Reason: " . trim($validated['reason']),
            'event'
        );

        return back()->with('success', 'Request declined.');
    }

    /**
     * Remove a registration completely (the member can request again).
     */
    public function destroyRegistration(EventRegistration $registration): RedirectResponse
    {
        $registration->delete();

        return back()->with('success', 'Registration removed.');
    }

    public function confirmAttendance(EventRegistration $registration): RedirectResponse
    {
        if ($registration->status !== 'approved') {
            return back()->withErrors([
                'registration' => 'Only approved registrations can be marked as attended.',
            ]);
        }

        $awarded = app(PointRewardService::class)->awardEventAttendance($registration);

        if (! $awarded) {
            return back()->withErrors([
                'registration' => 'Attendance was already confirmed for this event.',
            ]);
        }

        $eventName = $registration->event?->title
            ?? $registration->event?->name
            ?? 'the event';

        UserNotification::send(
            $registration->user_id,
            '+10 Points Earned',
            "Your attendance at {$eventName} was confirmed. You earned 10 points.",
            'points'
        );

        return back()->with('success', 'Attendance confirmed. 10 points earned.');
    }
}