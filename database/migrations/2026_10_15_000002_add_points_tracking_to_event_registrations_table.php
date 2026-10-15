<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('event_registrations', function (Blueprint $table) {
            if (! Schema::hasColumn('event_registrations', 'attendance_confirmed_at')) {
                $table->timestamp('attendance_confirmed_at')->nullable()->after('status');
            }

            if (! Schema::hasColumn('event_registrations', 'attendance_confirmed_by')) {
                $table->foreignId('attendance_confirmed_by')->nullable()->constrained('users')->nullOnDelete()->after('attendance_confirmed_at');
            }
        });
    }

    public function down(): void
    {
        Schema::table('event_registrations', function (Blueprint $table) {
            if (Schema::hasColumn('event_registrations', 'attendance_confirmed_by')) {
                $table->dropConstrainedForeignId('attendance_confirmed_by');
            }

            if (Schema::hasColumn('event_registrations', 'attendance_confirmed_at')) {
                $table->dropColumn('attendance_confirmed_at');
            }
        });
    }
};
