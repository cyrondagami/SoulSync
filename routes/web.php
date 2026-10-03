<?php

use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('dashboard');
});


// ===============================
// STUDENT DASHBOARD
// ===============================

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// ===============================
// ADMIN ROUTES
// ===============================

Route::middleware(['auth', 'verified', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        // ===============================
        // ADMIN DASHBOARD
        // ===============================

        Route::get('/dashboard', function () {
            return Inertia::render('Admin/Dashboard');
        })->name('dashboard');


        // ===============================
        // MANAGE USERS
        // ===============================

        Route::get('/users', function () {
            return Inertia::render('Admin/Users', [
                'users' => \App\Models\User::select(
                    'id',
                    'name',
                    'email',
                    'role',
                    'created_at'
                )->latest()->get(),
            ]);
        })->name('users');


        // ===============================
        // MANAGE EVENTS
        // ===============================

        Route::get('/events', [EventController::class, 'index'])
            ->name('events');

        Route::post('/events', [EventController::class, 'store'])
            ->name('events.store');

        Route::delete('/events/{event}', [EventController::class, 'destroy'])
            ->name('events.destroy');


        // ===============================
        // MANAGE ANNOUNCEMENTS
        // ===============================

        Route::get('/announcements', [AnnouncementController::class, 'index'])
            ->name('announcements');

        Route::post('/announcements', [AnnouncementController::class, 'store'])
            ->name('announcements.store');

        Route::delete('/announcements/{announcement}', [AnnouncementController::class, 'destroy'])
            ->name('announcements.destroy');
    });


// ===============================
// AUTHENTICATED STUDENT ROUTES
// ===============================

Route::middleware(['auth', 'verified'])->group(function () {

    // ===============================
    // ABOUT
    // ===============================

    Route::get('/about', function () {
        return Inertia::render('About');
    })->name('about');


    // ===============================
    // STUDENT EVENTS
    // ===============================

    Route::get('/events', function () {
        return Inertia::render('Events', [
            'events' => \App\Models\Event::orderBy('date', 'asc')->get(),
        ]);
    })->name('events');


    // ===============================
    // STUDENT ANNOUNCEMENTS
    // ===============================

    Route::get('/announcements', function () {
        return Inertia::render('Announcements', [
            'announcements' => \App\Models\Announcement::where('published', true)
                ->orderBy('date', 'asc')
                ->get(),
        ]);
    })->name('announcements');


    // ===============================
    // PRAYER REQUESTS
    // ===============================

    Route::get('/prayer-requests', function () {
        return Inertia::render('PrayerRequests');
    })->name('prayer.requests');


    // ===============================
    // MUSIC CLASSES
    // ===============================

    Route::get('/music-classes', function () {
        return Inertia::render('MusicClasses');
    })->name('music.classes');


    // ===============================
    // PROFILE
    // ===============================

    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});


require __DIR__.'/auth.php';