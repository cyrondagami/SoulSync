<?php

use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\AdminMusicClassController;
use App\Http\Controllers\Admin\PrayerRequestController as AdminPrayerRequestController;
use App\Http\Controllers\MemberEventController;
use App\Http\Controllers\MusicClassController;
use App\Http\Controllers\PrayerRequestController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// ======================================================
// ROOT
// ======================================================

Route::get('/', function () {
    return redirect()->route('dashboard');
});


// ======================================================
// STUDENT DASHBOARD
// ======================================================

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// ======================================================
// ADMIN ROUTES
// ======================================================

Route::middleware(['auth', 'verified', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        // ==================================================
        // ADMIN DASHBOARD
        // ==================================================

        Route::get('/dashboard', function () {
            return Inertia::render('Admin/Dashboard');
        })->name('dashboard');


        // ==================================================
        // MANAGE USERS
        // ==================================================

        Route::get('/users', function () {
            return Inertia::render('Admin/Users', [
                'users' => \App\Models\User::select(
                    'id',
                    'name',
                    'email',
                    'role',
                    'created_at'
                )
                    ->latest()
                    ->get(),
            ]);
        })->name('users');


        // ==================================================
        // MANAGE EVENTS
        // ==================================================

        Route::get('/events', [EventController::class, 'index'])
            ->name('events');

        Route::post('/events', [EventController::class, 'store'])
            ->name('events.store');

        Route::delete('/events/{event}', [EventController::class, 'destroy'])
            ->name('events.destroy');


        // ==================================================
        // EVENT REGISTRATIONS
        // ==================================================

        Route::patch(
            '/registrations/{registration}/approve',
            [EventController::class, 'approveRegistration']
        )->name('registrations.approve');

        Route::patch(
            '/registrations/{registration}/reject',
            [EventController::class, 'rejectRegistration']
        )->name('registrations.reject');

        Route::delete(
            '/registrations/{registration}',
            [EventController::class, 'destroyRegistration']
        )->name('registrations.destroy');


        // ==================================================
        // MANAGE ANNOUNCEMENTS
        // ==================================================

        Route::get(
            '/announcements',
            [AnnouncementController::class, 'index']
        )->name('announcements');

        Route::post(
            '/announcements',
            [AnnouncementController::class, 'store']
        )->name('announcements.store');

        Route::delete(
            '/announcements/{announcement}',
            [AnnouncementController::class, 'destroy']
        )->name('announcements.destroy');


        // ==================================================
        // MANAGE PRAYER REQUESTS
        // ==================================================

        Route::get(
            '/prayer-requests',
            [AdminPrayerRequestController::class, 'index']
        )->name('prayer-requests');

        Route::patch(
            '/prayer-requests/{prayerRequest}/toggle',
            [AdminPrayerRequestController::class, 'toggle']
        )->name('prayer-requests.toggle');

        Route::delete(
            '/prayer-requests/{prayerRequest}',
            [AdminPrayerRequestController::class, 'destroy']
        )->name('prayer-requests.destroy');


        // ==================================================
        // MANAGE MUSIC CLASSES
        // ==================================================

        Route::get(
            '/music-classes',
            [AdminMusicClassController::class, 'index']
        )->name('music-classes');

        Route::post(
            '/music-classes',
            [AdminMusicClassController::class, 'store']
        )->name('music-classes.store');

        Route::delete(
            '/music-classes/{musicClass}',
            [AdminMusicClassController::class, 'destroy']
        )->name('music-classes.destroy');

        Route::patch(
            '/music-classes/enrollments/{enrollment}/approve',
            [AdminMusicClassController::class, 'approve']
        )->name('music-classes.approve');

        Route::patch(
            '/music-classes/enrollments/{enrollment}/reject',
            [AdminMusicClassController::class, 'reject']
        )->name('music-classes.reject');

    });


// ======================================================
// AUTHENTICATED STUDENT ROUTES
// ======================================================

Route::middleware(['auth', 'verified'])->group(function () {

    // ==================================================
    // ABOUT
    // ==================================================

    Route::get('/about', function () {
        return Inertia::render('About');
    })->name('about');


    // ==================================================
    // STUDENT EVENTS
    // ==================================================

    Route::get(
        '/events',
        [MemberEventController::class, 'index']
    )->name('events');

    Route::post(
        '/events/{event}/join',
        [MemberEventController::class, 'join']
    )->name('events.join');

    Route::delete(
        '/events/{event}/leave',
        [MemberEventController::class, 'leave']
    )->name('events.leave');


    // ==================================================
    // STUDENT ANNOUNCEMENTS
    // ==================================================

    Route::get('/announcements', function () {
        return Inertia::render('Announcements', [
            'announcements' => \App\Models\Announcement::where(
                'published',
                true
            )
                ->orderBy('date', 'asc')
                ->get(),
        ]);
    })->name('announcements');


    // ==================================================
    // STUDENT PRAYER REQUESTS
    // ==================================================

    Route::get(
        '/prayer-requests',
        [PrayerRequestController::class, 'index']
    )->name('prayer.requests');

    Route::post(
        '/prayer-requests',
        [PrayerRequestController::class, 'store']
    )->name('prayer.requests.store');


    // ==================================================
    // STUDENT MUSIC CLASSES
    // ==================================================

    Route::get(
        '/music-classes',
        [MusicClassController::class, 'index']
    )->name('music.classes');

    Route::post(
        '/music-classes/{musicClass}/join',
        [MusicClassController::class, 'join']
    )->name('music.classes.join');

    Route::delete(
        '/music-classes/{musicClass}/cancel',
        [MusicClassController::class, 'cancel']
    )->name('music.classes.cancel');


    // ==================================================
    // PROFILE
    // ==================================================

    Route::get(
        '/profile',
        [ProfileController::class, 'edit']
    )->name('profile.edit');

    Route::patch(
        '/profile',
        [ProfileController::class, 'update']
    )->name('profile.update');

    Route::delete(
        '/profile',
        [ProfileController::class, 'destroy']
    )->name('profile.destroy');

});


// ======================================================
// AUTH
// ======================================================

require __DIR__ . '/auth.php';