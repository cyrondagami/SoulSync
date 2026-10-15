<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\UserNotification;
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

        $announcement = Announcement::create($validated);

        if ($announcement->published) {
            $this->notifyMembers($announcement);
        }

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

    public function toggle(Announcement $announcement)
    {
        $announcement->update([
            'published' => ! $announcement->published,
        ]);

        if ($announcement->published) {
            $this->notifyMembers($announcement);
        }

        return back()->with('success', $announcement->published ? 'Published.' : 'Unpublished.');
    }

    private function notifyMembers(Announcement $announcement): void
    {
        UserNotification::sendToMembers(
            'Announcement posted: ' . $announcement->title,
            'A new announcement has been published by the admin. Check the Announcements page for details.',
            'announcement'
        );
    }
}