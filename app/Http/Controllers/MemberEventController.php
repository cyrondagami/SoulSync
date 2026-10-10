<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventRegistration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class MemberEventController extends Controller
{
    /* Statuses where joining is not allowed (keep in sync with Events.jsx) */
    private const CLOSED_STATUSES = ['Cancelled', 'Completed', 'Closed'];

    /**
     * Events page for members.
     */
       public function index(Request $request): Response
    {
        $userId = $request->user()->id;

        // event_id => registration (status + decline_reason) ng current user
        $myRegistrations = EventRegistration::where('user_id', $userId)
            ->get(['event_id', 'status', 'decline_reason'])
            ->keyBy('event_id');

        // event_id => number of approved participants
        $approvedCounts = EventRegistration::where('status', 'approved')
            ->select('event_id', DB::raw('COUNT(*) as total'))
            ->groupBy('event_id')
            ->pluck('total', 'event_id');

        $events = Event::orderBy('date')
            ->get()
            ->map(function ($event) use ($myRegistrations, $approvedCounts) {
                $mine = $myRegistrations->get($event->id);

                return array_merge($event->toArray(), [
                    'date' => Carbon::parse($event->date)->format('Y-m-d'),
                    'attendees' => (int) ($approvedCounts[$event->id] ?? 0),
                    'registration_status' => $mine?->status,
                    'decline_reason' => $mine?->decline_reason,
                    'requires_approval' => (bool) ($event->requires_approval ?? false),
                ]);
            })
            ->values();

        return Inertia::render('Events', [
            'events' => $events,
        ]);
    }

    /**
     * Join an event (or send a join request).
     */
    public function join(Request $request, Event $event): RedirectResponse
    {
        $user = $request->user();

        if (in_array($event->status, self::CLOSED_STATUSES, true)) {
            return back()->withErrors(['event' => 'Registration for this event is closed.']);
        }

        if (Carbon::parse($event->date)->endOfDay()->isPast()) {
            return back()->withErrors(['event' => 'This event has already ended.']);
        }

        $error = null;

        DB::transaction(function () use ($event, $user, &$error) {
            // Lock the event row so two people cannot take the last spot together
            $event = Event::whereKey($event->id)->lockForUpdate()->first();

            $existing = EventRegistration::where('event_id', $event->id)
                ->where('user_id', $user->id)
                ->first();

            if ($existing) {
                $error = match ($existing->status) {
                    'approved' => 'You already joined this event.',
                    'pending' => 'Your request is still waiting for approval.',
                    default => 'Your request for this event was declined.',
                };

                return;
            }

            $capacity = (int) ($event->capacity ?? 100);
            $approved = EventRegistration::where('event_id', $event->id)
                ->where('status', 'approved')
                ->count();

            if ($capacity > 0 && $approved >= $capacity) {
                $error = 'Sorry, this event is already full.';

                return;
            }

            EventRegistration::create([
                'event_id' => $event->id,
                'user_id' => $user->id,
                'status' => ($event->requires_approval ?? false) ? 'pending' : 'approved',
            ]);
        });

        if ($error) {
            return back()->withErrors(['event' => $error]);
        }

        return back();
    }

    /**
     * Leave an event or cancel a pending request.
     */
        public function leave(Request $request, Event $event): RedirectResponse
    {
        if (Carbon::parse($event->date)->endOfDay()->isPast()) {
            return back()->withErrors(['event' => 'This event has already ended.']);
        }

        // Pending at approved lang ang pwedeng i-cancel.
        // Ang declined ay hindi buburahin para makita pa ng user ang reason.
        EventRegistration::where('event_id', $event->id)
            ->where('user_id', $request->user()->id)
            ->whereIn('status', ['pending', 'approved'])
            ->delete();

        return back();
    }
     
}
