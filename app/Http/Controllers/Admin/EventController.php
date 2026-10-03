<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Events', [
            'events' => Event::latest('date')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'time' => 'required|string|max:100',
            'location' => 'required|string|max:255',
            'organizer' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'status' => 'required|string|max:100',
            'icon' => 'nullable|string|max:20',
            'featured' => 'boolean',
        ]);

        $validated['attendees'] = 0;

        Event::create($validated);

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
}