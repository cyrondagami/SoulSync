<?php

namespace App\Http\Controllers;

use App\Models\UserPoint;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $weekStart = now()->startOfWeek();
        $weekEnd = $weekStart->copy()->endOfWeek();

        $leaderboard = UserPoint::leaderboardForWeek($weekStart);
        $userEntry = $leaderboard->firstWhere('user_id', $user->id);

        return Inertia::render('Dashboard', [
            'weeklyPoints' => (int) $user->weeklyPointsFor($weekStart),
            'lifetimePoints' => (int) $user->lifetimePoints(),
            'weeklyRank' => $userEntry['rank'] ?? null,
            'completedActivities' => (int) $user->pointRewards()->whereBetween('awarded_at', [$weekStart, $weekEnd])->count(),
            'leaderboardPreview' => $leaderboard->take(3)->values()->all(),
        ]);
    }
}