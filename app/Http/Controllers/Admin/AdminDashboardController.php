<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Event;
use App\Models\Announcement;
use App\Models\PrayerRequest;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $weeklyActivity = collect(range(6, 0))
            ->map(function ($daysAgo) {
                $date = Carbon::today()->subDays($daysAgo);

                $activity =
                    User::whereDate('created_at', $date)->count()
                    + Event::whereDate('created_at', $date)->count()
                    + Announcement::whereDate('created_at', $date)->count()
                    + PrayerRequest::whereDate('created_at', $date)->count();

                return [
                    'day' => $date->format('D'),
                    'activity' => $activity,
                ];
            })
            ->values()
            ->all();

        return Inertia::render('Admin/Dashboard', [
            'analytics' => [
                'totalUsers' => User::count(),
                'totalEvents' => Event::count(),
                'totalAnnouncements' => Announcement::count(),
                'totalPrayerRequests' => PrayerRequest::count(),
                'weeklyActivity' => $weeklyActivity,
            ],
        ]);
    }
}
