<?php

namespace App\Http\Controllers;

use App\Models\PrayerRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrayerRequestController extends Controller
{
    public function index()
    {
        $prayers = PrayerRequest::with('user:id,name')
            ->where('status', 'approved')
            ->latest()
            ->get()
            ->map(fn ($p) => [
                'id' => $p->id,
                'name' => $p->is_anonymous
                    ? 'Anonymous'
                    : ($p->name ?: ($p->user->name ?? 'Member')),
                'request' => $p->request,
                'is_anonymous' => $p->is_anonymous,
                'created_at' => $p->created_at,
            ]);

        return Inertia::render('PrayerRequests', [
            'prayers' => $prayers,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'nullable|string|max:100',
            'request' => 'required|string|max:1000',
            'is_anonymous' => 'boolean',
        ]);

        PrayerRequest::create([
            'user_id' => $request->user()->id,
            'name' => $data['name'] ?? null,
            'request' => $data['request'],
            'is_anonymous' => $data['is_anonymous'] ?? false,
            'status' => 'approved',
        ]);

        return back()->with('success', 'Your prayer request was shared.');
    }
}