<?php

namespace App\Http\Middleware;

use App\Models\UserNotification;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error'   => fn () => $request->session()->get('error'),
            ],
            'notifications' => fn () => $request->user()
                ? UserNotification::where('user_id', $request->user()->id)
                    ->latest()
                    ->take(20)
                    ->get()
                    ->map(fn ($n) => [
                        'id'      => $n->id,
                        'title'   => $n->title,
                        'message' => $n->message,
                        'time'    => $n->created_at->diffForHumans(),
                        'read'    => ! is_null($n->read_at),
                    ])
                    ->values()
                : [],
        ];
    }
}