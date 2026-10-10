<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PrayerRequest;
use Inertia\Inertia;

class PrayerRequestController extends Controller
{
    public function index()
    {
        $prayers = PrayerRequest::with('user:id,name,email')
            ->latest()
            ->get()
            ->map(fn ($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'request' => $p->request,
                'is_anonymous' => $p->is_anonymous,
                'status' => $p->status,
                'author' => $p->user->name ?? 'Unknown',
                'author_email' => $p->user->email ?? null,
                'created_at' => $p->created_at,
            ]);

        return Inertia::render('Admin/PrayerRequests', [
            'prayers' => $prayers,
        ]);
    }

    public function toggle(PrayerRequest $prayerRequest)
    {
        $prayerRequest->update([
            'status' => $prayerRequest->status === 'approved' ? 'hidden' : 'approved',
        ]);

        return back();
    }

    public function destroy(PrayerRequest $prayerRequest)
    {
        $prayerRequest->delete();

        return back();
    }
}