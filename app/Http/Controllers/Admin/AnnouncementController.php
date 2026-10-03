<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Announcements', [
            'announcements' => Announcement::latest('date')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'description' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|string|max:100',
            'priority' => 'required|string|max:50',
            'icon' => 'nullable|string|max:20',
            'published' => 'boolean',
        ]);

        Announcement::create($validated);

        return redirect()
            ->route('admin.announcements')
            ->with('success', 'Announcement created successfully.');
    }

    public function destroy(Announcement $announcement)
    {
        $announcement->delete();

        return redirect()
            ->route('admin.announcements')
            ->with('success', 'Announcement deleted successfully.');
    }
}