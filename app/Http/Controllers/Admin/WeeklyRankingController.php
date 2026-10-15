<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\UserPoint;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WeeklyRankingController extends Controller
{
    public function index(Request $request)
    {
        $selectedWeek = Carbon::parse($request->query('week', now()->toDateString()))->startOfWeek();
        $leaderboard = UserPoint::leaderboardForWeek($selectedWeek);

        return Inertia::render('Admin/WeeklyRanking', [
            'selectedWeek' => $selectedWeek->format('Y-m-d'),
            'weekLabel' => $selectedWeek->copy()->format('M d, Y') . ' - ' . $selectedWeek->copy()->endOfWeek()->format('M d, Y'),
            'previousWeek' => $selectedWeek->copy()->subWeek()->format('Y-m-d'),
            'nextWeek' => $selectedWeek->copy()->addWeek()->format('Y-m-d'),
            'leaderboard' => $leaderboard->values()->all(),
        ]);
    }
}
