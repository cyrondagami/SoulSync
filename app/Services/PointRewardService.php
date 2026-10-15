<?php

namespace App\Services;

use App\Models\EventRegistration;
use App\Models\MusicClassEnrollment;
use App\Models\UserPoint;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class PointRewardService
{
    public const POINT_VALUE = 10;

    public function awardEventAttendance(EventRegistration $registration): bool
    {
        if ($registration->status !== 'approved') {
            return false;
        }

        return DB::transaction(function () use ($registration) {
            $registration = EventRegistration::whereKey($registration->id)->lockForUpdate()->firstOrFail();

            if (! is_null($registration->attendance_confirmed_at)) {
                return false;
            }

            $payload = [
                'user_id' => $registration->user_id,
                'points' => self::POINT_VALUE,
                'source_type' => 'event_registration',
                'source_id' => $registration->id,
                'activity_type' => 'event',
                'activity_id' => $registration->event_id,
                'description' => $registration->event?->title ? 'Event attendance: '.$registration->event->title : 'Event attendance',
                'awarded_at' => now(),
            ];

            try {
                UserPoint::create($payload);
            } catch (QueryException $exception) {
                if (($exception->errorInfo[1] ?? null) === 1062 || str_contains($exception->getMessage(), 'Duplicate entry')) {
                    return false;
                }

                throw $exception;
            }

            $registration->forceFill([
                'attendance_confirmed_at' => now(),
                'attendance_confirmed_by' => auth()->id(),
            ])->save();

            return true;
        });
    }

    public function awardMusicClassCompletion(MusicClassEnrollment $enrollment): bool
    {
        if ($enrollment->status !== 'approved') {
            return false;
        }

        return DB::transaction(function () use ($enrollment) {
            $enrollment = MusicClassEnrollment::whereKey($enrollment->id)->lockForUpdate()->firstOrFail();

            if (! is_null($enrollment->completed_at)) {
                return false;
            }

            $payload = [
                'user_id' => $enrollment->user_id,
                'points' => self::POINT_VALUE,
                'source_type' => 'music_class_enrollment',
                'source_id' => $enrollment->id,
                'activity_type' => 'music_class',
                'activity_id' => $enrollment->music_class_id,
                'description' => $enrollment->musicClass?->name ? 'Music class completion: '.$enrollment->musicClass->name : 'Music class completion',
                'awarded_at' => now(),
            ];

            try {
                UserPoint::create($payload);
            } catch (QueryException $exception) {
                if (($exception->errorInfo[1] ?? null) === 1062 || str_contains($exception->getMessage(), 'Duplicate entry')) {
                    return false;
                }

                throw $exception;
            }

            $enrollment->forceFill([
                'completed_at' => now(),
                'completed_by' => auth()->id(),
            ])->save();

            return true;
        });
    }
}
