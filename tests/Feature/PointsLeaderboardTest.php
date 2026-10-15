<?php

use App\Models\Event;
use App\Models\EventRegistration;
use App\Models\MusicClass;
use App\Models\MusicClassEnrollment;
use App\Models\User;
use App\Models\UserPoint;
use App\Services\PointRewardService;

it('awards event attendance points once and prevents duplicate rewards', function () {
    $user = User::factory()->create();
    $event = Event::create([
        'title' => 'Youth Worship Night',
        'category' => 'Worship',
        'description' => 'Night service',
        'date' => now()->addDay()->toDateString(),
        'time' => '18:00',
        'location' => 'Main Hall',
        'organizer' => 'Youth Team',
        'capacity' => 50,
        'attendees' => 0,
        'status' => 'Upcoming',
        'icon' => '🎵',
        'featured' => true,
    ]);

    $registration = EventRegistration::create([
        'event_id' => $event->id,
        'user_id' => $user->id,
        'status' => 'approved',
    ]);

    $service = new PointRewardService();

    $service->awardEventAttendance($registration);
    $service->awardEventAttendance($registration);

    expect(UserPoint::count())->toBe(1)
        ->and($user->fresh()->lifetime_points)->toBe(10)
        ->and($registration->fresh()->attendance_confirmed_at)->not->toBeNull();
});

it('awards music class completion points once and tracks weekly totals', function () {
    $user = User::factory()->create();
    $class = MusicClass::create([
        'name' => 'Guitar Basics',
        'instructor' => 'A. Smith',
        'type' => 'Instrument',
        'schedule' => 'Monday',
        'time' => '18:30',
        'location' => 'Music Room',
        'capacity' => 15,
        'is_active' => true,
    ]);

    $enrollment = MusicClassEnrollment::create([
        'music_class_id' => $class->id,
        'user_id' => $user->id,
        'status' => 'approved',
    ]);

    $service = new PointRewardService();

    $service->awardMusicClassCompletion($enrollment);
    $service->awardMusicClassCompletion($enrollment);

    expect(UserPoint::count())->toBe(1)
        ->and($user->fresh()->weekly_points)->toBe(10)
        ->and($user->fresh()->lifetime_points)->toBe(10)
        ->and($enrollment->fresh()->completed_at)->not->toBeNull();
});
